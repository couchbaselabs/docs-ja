$BIN_DIR = (Get-Item $MyInvocation.MyCommand.Path | Select-Object Directory).Directory
$PROJECT_HOME = Join-Path $BIN_DIR ..
$OUT_DIR = Join-Path $PROJECT_HOME out
$DITAMAP = Join-Path $PROJECT_HOME "ja\learn\admin\Admin.ditamap"

if (Test-Path "$BIN_DIR\env.ps1") {
    . "$BIN_DIR\env.ps1"
}

if (Test-Path $OUT_DIR) {
    echo "deleting old contents from $OUT_DIR."
    Remove-Item $OUT_DIR -Recurse -Force
}

echo "generating contents using $DITAMAP..."
dita -f html5 -i $DITAMAP -o $OUT_DIR
