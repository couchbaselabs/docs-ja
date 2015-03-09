define(function() {
	var Videoblock = function() {
		var modules = document.querySelectorAll('.videoblock');

		for (var i = 0, j = modules.length; i < j; i++) {
			new VideoblockModule(modules[i]);
		}
	};

	var VideoblockModule = function(el) {
		this.el = el;

		this.init();
	};

	VideoblockModule.prototype = {
		init: function() {
			this.container = this.el.querySelector('.videoblock__content');
			this.iframe = this.el.querySelector('iframe');

			this.button = document.createElement('button');
			this.button.innerHTML = '<span>Play</span>';
			this.button.setAttribute('class', 'videoblock__button');
			this.button.setAttribute('type', 'button');

			this.button.addEventListener('click', this.click.bind(this));

			this.cover = document.createElement('div');
			this.cover.setAttribute('class', 'videoblock__cover');

			this.container.appendChild(this.cover);
			this.container.appendChild(this.button);
		},

		click: function(event) {
			event.preventDefault();

			this.container.removeChild(this.button);
			this.container.removeChild(this.cover);
			this.iframe.setAttribute('src', this.iframe.getAttribute('src') + '?autoplay=1');
		}
	};

	return Videoblock;
});