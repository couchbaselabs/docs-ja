define(function() {
	var DownloadSection = function() {
		var modules = document.querySelectorAll('.download-section');

		for (var i = 0, j = modules.length; i < j; i++) {
			new DownloadSectionModule(modules[i]);
		}
	};

	var DownloadSectionModule = function(el) {
		this.el = el;

		this.init();
	};

	DownloadSectionModule.prototype = {
		init: function() {
			this.initInstructions();
			this.initAdditionalVersions();
		},

		initAdditionalVersions: function() {
			var anchors = this.el.querySelectorAll('.additional-versions a'),
				containers = this.el.querySelectorAll('.download-table--additional-versions');

			this.initElements(anchors, containers);
		},

		initInstructions: function() {
			var anchors = this.el.querySelectorAll('.instructions'),
				containers = this.el.querySelectorAll('.download-table__instructions');

			this.initElements(anchors, containers);
		},

		initElements: function(anchors, containers) {
			for (var i = 0, j = anchors.length; i < j; i++) {
				var anchor = anchors[i],
					container = containers[i];

				anchor.addEventListener('click', this.click.bind(this));
				anchor.setAttribute('aria-controls', container.getAttribute('id'));
				anchor.setAttribute('aria-pressed', 'false');

				container.setAttribute('aria-expanded', 'false');
			}
		},

		click: function(event) {
			event.preventDefault();

			var anchor = event.currentTarget,
				isActive = anchor.getAttribute('aria-pressed') !== 'true',
				containerId = anchor.getAttribute('aria-controls');

			this.el.querySelector('#' + containerId).setAttribute('aria-expanded', isActive);
			anchor.setAttribute('aria-pressed', isActive);
		}
	};

	return DownloadSection;
});