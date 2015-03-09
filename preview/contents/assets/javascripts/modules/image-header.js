define(function() {
	var ImageHeader = function() {
		var modules = document.querySelectorAll('.image-header[data-bg-large][data-bg-small]');

		for (var i = 0, j = modules.length; i < j; i++) {
			new ImageHeaderModule(modules[i]);
		}
	};

	var ImageHeaderModule = function(el) {
		this.el = el;

		this.init();
	};

	ImageHeaderModule.prototype = {
		init: function() {
			this.setVars();
			this.bindEvents();

			this.setBackgroundImage(window.outerWidth);
		},

		bindEvents: function() {
			window.addEventListener('resize', this.resize.bind(this));
		},

		resize: function(event) {
			var t = setTimeout(function() {
				this.setBackgroundImage(window.outerWidth);

				clearTimeout(t);
			}.bind(this), 500);
		},

		setBackgroundImage: function(width) {
			var src = (width < this.breakpoint) ? this.smallSrc : this.largeSrc;

			this.el.style.backgroundImage = 'url(' + src + ')';
		},

		setVars: function() {
			this.breakpoint = 800;

			this.largeSrc = this.el.getAttribute('data-bg-large');
			this.smallSrc = this.el.getAttribute('data-bg-small');
		}
	};

	return ImageHeader;
});