define(['vendor/radio', 'vendor/enquire'], function(radio, enquire) {

	'use strict';

	var SectionVideo = function() {

		// detect video support
		var supports_video = false;
		if ((/iP(ad|hone|od)/i).test(navigator.userAgent) || (/android/i).test(navigator.userAgent)) {
			supports_video = false;
		} else if (!!document.createElement('video').canPlayType) {
			supports_video = true;
		}

		// add video class to body
		document.body.classList.add('video-' + supports_video);

		if (supports_video) {

			// add safari colors class
			if (safari()) document.body.classList.add('safari-colors');

			// set variables
			var videos = document.querySelectorAll('.product-section');

			// set up videos
			for (var i = 0, len = videos.length; i < len; i++) {
				new Video(videos[i]);
			}

			// set up enquire
			enquire.register('(min-width: 900px)', {
				match: function() {
					radio('largeViewSetup').broadcast();
				},
				unmatch: function() {
					radio('largeViewTeardown').broadcast();
				}
			}).register('(max-width: 899px)', {
				match: function() {
					radio('mobileViewSetup').broadcast();
				},
				unmatch: function() {
					radio('mobileViewTeardown').broadcast();
				}
			});
		}

		window.addEventListener('resize', function() {
			radio('videoResize').broadcast();
		});
	};

	var Video = function(elem) {
		this.elem = elem;
		if (this.elem) this.init();
	};

	Video.prototype = {
		classVideo: 'has-video',
		classImage: 'has-image',

		attrs: {
			'aria-hidden': 'true',
			'preload': '',
			'tabindex': '-1'
		},

		init: function() {
			this.setVariables();
			this.subscribe();
		},

		setVariables: function() {
			this.container = this.elem.querySelector('.product-section__graphic__inner');
			this.src = this.container.getAttribute('data-src');
			this.poster = this.container.getAttribute('data-poster');
			this.videoStateTimer;
			if (this.src) this.aspectRatio = this.container.getAttribute('data-ratio').split(':');
		},

		subscribe: function() {
			// mobile
			radio('mobileViewSetup').subscribe(this.mobileViewSetup.bind(this));
			radio('mobileViewTeardown').subscribe(this.mobileViewTeardown.bind(this));

			// large
			radio('largeViewSetup').subscribe(this.largeViewSetup.bind(this));
			radio('largeViewTeardown').subscribe(this.largeViewTeardown.bind(this));

			// scrolling
			radio('enterSection').subscribe(this.playVideo.bind(this));
			radio('exitSection').subscribe(this.stopVideo.bind(this));
		},


		/** setup/teardown */

		largeViewSetup: function() {
			if (this.src) {
				this.container.classList.add(this.classVideo);

				this.createVideo();
				this.sizeVideo();
				this.container.appendChild(this.videoContainer);

				radio('videoResize').subscribe(this.sizeVideo.bind(this));
			} else {
				this.container.classList.add(this.classImage);
			}
		},

		largeViewTeardown: function() {
			if (this.src) {
				this.container.classList.remove(this.classVideo);
				this.removeVideo();

				radio('videoResize').unsubscribe(this.sizeVideo.bind(this));
			} else {
				this.container.classList.remove(this.classImage);
			}

		},

		mobileViewSetup: function() {
			this.container.classList.add(this.classImage);
		},

		mobileViewTeardown: function() {
			this.container.classList.remove(this.classImage);
		},


		/** create video */

		createVideo: function() {
			var poster = (this.poster) ? this.poster : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

			this.videoContainer = document.createElement('div');
			this.videoContainer.classList.add('video__container');

			this.video = document.createElement('video');
			for (var key in this.attrs) this.video.setAttribute(key, this.attrs[key]);
			this.video.setAttribute('poster', poster);

			this.video.classList.add('video');

			this.setSource('webm');
			this.setSource('mp4');

			this.videoContainer.appendChild(this.video);
		},

		setSource: function(type) {
			var src = document.createElement('source');
			src.setAttribute('src', this.src + '.' + type);
			src.setAttribute('type', 'video/' + type);

			this.video.appendChild(src);
		},

		sizeVideo: function() {
			var clientW = this.container.clientWidth;
			var clientH = this.container.clientHeight;

			var newSize = scaleSize(
				clientW,
				clientH,
				parseInt(this.aspectRatio[0], 10),
				parseInt(this.aspectRatio[1], 10)
			);

			this.videoContainer.style.left = ((clientW - newSize[0]) / 2) + 'px';
			this.videoContainer.style.top = ((clientH - newSize[1]) / 2) + 'px';
			this.videoContainer.style.width = Math.floor(newSize[0]) + 'px';
			this.videoContainer.style.height = Math.floor(newSize[1]) + 'px';
		},


		/** play/pause video */

		playVideo: function(section) {
			if (this.src && section === this.elem.getAttribute('id')) {
				this.video.classList.add('play');
				this.videoStateChecker();
			}
		},

		videoStateChecker: function() {
			this.videoStateTimer = setTimeout(this.checkVideoState.bind(this), 10);
		},

		checkVideoState: function() {
			if (this.video.readyState === 4) {
				this.video.currentTime = 0;
				this.video.play();
			} else {
				this.videoStateChecker();
			}
		},

		stopVideo: function(section) {
			if (this.src) {
				clearTimeout(this.videoStateTimer);

				if (section === this.elem.getAttribute('id')) {
					this.video.classList.remove('play');
					this.video.pause();
				}
			}
		},


		/** remove video */

		removeVideo: function() {
			this.container.removeChild(this.videoContainer);
		}
	};


	/** utilities */

	var scaleSize = function(maxW, maxH, currW, currH) {
		var ratio = currH / currW;

		var sizeHeight = function() {
			currH = maxH;
			currW = currH / ratio;
		};

		var sizeWidth = function() {
			currW = maxW;
			currH = currW * ratio;
		};

		if (ratio <= 1) {
			sizeHeight();

			if (currW > maxW) sizeWidth();
		} else {
			sizeWidth();

			if (currH > maxH) sizeHeight();
		}

		return [currW, currH];
	};

	var safari = function() {
		var ua = navigator.userAgent;

		return (
			ua.indexOf('Mac OS X') !== -1 &&
			ua.indexOf('Safari') !== -1 &&
			ua.indexOf('Chrome') === -1 &&
			ua.indexOf('Mobile') === -1 &&
			(ua.indexOf('Version/5') !== -1 ||
			ua.indexOf('Version/6') !== -1 ||
			ua.indexOf('Version/7') !== -1)
		) ? true : false;
	};

	return SectionVideo;
});
