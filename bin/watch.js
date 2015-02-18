var child_process = require('child_process'),
    path = require('path'),
    util = require('util'),
    fs = require('fs'),
    watchr = require('watchr'),
    iconv = require('iconv-lite');

var debuglog = util.debuglog('debug');

var config = require('./env.json');

var projectDir = path.resolve(__dirname, '..');
var ditaMap = path.join(projectDir, 'ja', 'learn', 'admin', 'Admin.ditamap');
var outDir = path.join(projectDir, 'out');
var consoleEncoding = (process.platform === 'win32') ? 'cp932' : 'utf8';
var building = false;
var buildWaiting = 0;

function rmdirRecursiveSync(dirPath) {
    var files = [];
    if (fs.existsSync(dirPath)) {
        files = fs.readdirSync(dirPath);
        files.forEach(function (file, index) {
            var p = path.join(dirPath, file);
            if (fs.lstatSync(p).isDirectory()) {
                rmdirRecursiveSync(p);
            } else {
                fs.unlinkSync(p);
            }
        });

        fs.rmdirSync(dirPath);
    }
};

function build(name, callback, delayed) {
    if (building) {
        setTimeout(build, 1000 * 1, name, callback, true);
        if (!delayed) {
            buildWaiting += 1;
            debuglog('Build delayed, waitings = ' + buildWaiting);
        }

        return;
    }

    if (buildWaiting > 1) {
        buildWaiting -= 1;
        debuglog('Build skipped because waitings = ' + buildWaiting);

        return;
    }

    building = true;
    buildWaiting = 0;

    var buildName = name ? name + ' build' : 'Build';

    var dita = child_process.spawn(config.ditaExe, ['-f', 'html5', '-i', ditaMap, '-o', outDir]);

    console.log(buildName + ' started');

    dita.stdout.on('data', function (data) {
        console.log(iconv.decode(data, consoleEncoding));
    });

    dita.stderr.on('data', function (data) {
        console.log(iconv.decode(data, consoleEncoding));
    });

    dita.on('close', function (code) {
        console.log(buildName + ' finished with code ' + code);

        if (callback) {
            callback(code);
        }

        building = false;
    });
}

process.env['JAVA_HOME'] = config.javaHome;

watchr.watch({
    paths: ['ja'],
    listeners: {
        log: function(logLevel) {
        },
        error: function(err) {
            console.log('an error occured:', err);
        },
        watching: function(err, watcherInstance, isWatching) {
            if (err) {
                console.log('Watching DITA source changes on path ' + watcherInstance.path + ' failed with error', err);
            } else {
                console.log('Watching DITA source changes on path ' + watcherInstance.path + ' started');

                rmdirRecursiveSync(outDir);
                build('Initial', function (code) {
                    if (code === 0) {
                        console.log('Please open another console, and run the following commands:');
                        console.log('    cd ' + process.cwd());
                        console.log('    ' + path.join('node_modules', '.bin', 'http-server') + ' out');
                    }
                });
            }
        },
        change: function(changeType, filePath, fileCurrentStat, filePreviousStat) {
            console.log('File changed:', filePath);
            build();
        }
    }
});
