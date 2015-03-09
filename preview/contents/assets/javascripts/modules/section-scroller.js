define(
	[
		'vendor/smooth-scroll',
		'vendor/enquire',
		'vendor/radio',
		'modules/section-video'
	], function(smoothScroll, enquire, radio, sectionVideo) {

	'use strict';

	var SectionScroll = function() {
		new sectionVideo();
		new SectionScroller(document.querySelector('.section-scroller'));
	};

	var SectionScroller = function(elem) {
		this.elem = elem;

		if (this.elem) {
			enquire.register('(min-width: 900px)', {
				setup: this.setup.bind(this),
				deferSetup: true,
				match: this.init.bind(this),
				unmatch: this.destroy.bind(this)
			});
		}
	};

	SectionScroller.prototype = {
		setup: function() {
			this.setVars();
			this.bindEvents();
		},

		init: function() {
			this.active = true;
			this.current = null;
			this.checkScroll();

			smoothScroll.init({
				updateURL: true,
				callbackAfter: this.navClick.bind(this)
			});
		},

		destroy: function() {
			this.active = false;
			this.current = null;

			this.sectionNavHide();
			smoothScroll.destroy();
		},

		setVars: function() {
			this.classShow = 'section-nav--show';
			this.current = null;
			this.currentFocused = null;
			this.globalHeader = document.querySelector('.global-header');
			this.globalHeaderH = this.globalHeader.clientHeight;
			this.sections = this.elem.querySelectorAll('.product-section');
			this.sectionH = this.sections[0].clientHeight;
			this.sectionNav = document.querySelector('.product-section__nav');
			this.sectionNavH = this.sectionNav.clientHeight;
			this.sectionNavLinks = this.sectionNav.querySelectorAll('.product-section__nav__links a');
			this.scrollPos = 0;
		},

		bindEvents: function() {
			window.addEventListener('scroll', this.checkScroll.bind(this));
			window.addEventListener('resize', this.findCurrent.bind(this));

			// move between section nav links with keyboard arrows
			this.sectionNav.addEventListener('keydown', this.sectionNavKeyboard.bind(this));
		},

		sectionNavShow: function() {
			this.sectionNav.classList.add(this.classShow);
		},

		sectionNavHide: function() {
			this.sectionNav.classList.remove(this.classShow);
		},

		sectionNavKeyboard: function(event) {
			if (event.which >= 37 && event.which <= 40) {
				event.preventDefault();

				// move prev
				if (event.which === 37 || event.which === 38) {
					this.currentFocused--;
					if (this.currentFocused < 0) this.currentFocused = this.sectionNavLinks.length - 1;

				// move next
				} else if (event.which === 39 || event.which === 40) {
					this.currentFocused++;
					if (this.currentFocused > this.sectionNavLinks.length - 1) this.currentFocused = 0;
				}

				this.sectionNavLinks[this.currentFocused].focus();
			}
		},

		navClick: function(toggle, anchor) {
			var target = document.querySelector(toggle.getAttribute('href'));
			target.focus();

			this.findCurrent();
		},

		checkScroll: function() {
			if (this.active) {
				this.scrollPos = this.getScrollTop();

				// trigger section header when main header is scrolled past
				(this.scrollPos >= this.globalHeaderH) ? this.sectionNavShow() : this.sectionNavHide();

				this.findCurrent();
			}
		},

		findCurrent: function() {

			// adjust trigger by difference in height between main header and section header
			var currentPanel = Math.floor((this.scrollPos - (this.globalHeaderH - this.sectionNavH)) / this.sectionH);
			currentPanel = (currentPanel < 0) ? 0 : currentPanel;

			if (currentPanel !== this.current) {
				if (this.currentNav) {
					this.currentNav.setAttribute('aria-selected', 'false');
					this.currentNav.setAttribute('tabindex', '-1');

					radio('exitSection').broadcast(this.currentNav.getAttribute('href').substr(1));
				}

				this.currentNav = this.sectionNavLinks[currentPanel];
				this.currentNav.setAttribute('aria-selected', 'true');
				this.currentNav.setAttribute('tabindex', '0');

				this.current = this.currentFocused = currentPanel;

				radio('enterSection').broadcast(this.currentNav.getAttribute('href').substr(1));
			}
		},

		getScrollTop: function() {
			if (typeof pageYOffset != 'undefined') {
				//most browsers except IE before #9
				return pageYOffset;
			} else {
				var B = document.body; //IE 'quirks'
				var D = document.documentElement; //IE with doctype
				D = (D.clientHeight) ? D : B;

				return D.scrollTop;
			}
		}
	};

	return SectionScroll;
});
