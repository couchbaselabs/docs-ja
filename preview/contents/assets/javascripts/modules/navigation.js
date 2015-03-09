define(function() {
	var Navigation = function() {
		this.el = document.getElementById('primary-navigation');

		if (this.el) {
			this.init();
		}
	};

	Navigation.prototype = {
		init: function() {
			var attributes = {
				'aria-controls': 'primary-navigation__wrapper',
				'aria-pressed': 'false',
				'class': 'primary-navigation__toggler',
				'type': 'button'
			};

			this.wrapper = document.getElementById('primary-navigation__wrapper');
			this.toggler = document.createElement('button');

			for (var attr in attributes) {
				this.toggler.setAttribute(attr, attributes[attr]);
			}

			this.toggler.innerHTML = '<span>Menu</span>';
			this.toggler.addEventListener('click', this.click.bind(this));

			this.wrapper.setAttribute('aria-expanded', 'false');

			this.el.insertBefore(this.toggler, this.wrapper);
		},

		click: function(event) {
			event.preventDefault();

			var isPressed = this.toggler.getAttribute('aria-pressed') !== 'true';

			this.wrapper.setAttribute('aria-expanded', isPressed);
			this.toggler.setAttribute('aria-pressed', isPressed);
		}
	};

	return Navigation;
});