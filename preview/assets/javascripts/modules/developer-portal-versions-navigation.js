define(function() {
	var DeveloperPortalVersionsNavigation = function() {
		this.el = document.getElementById('developer-portal-versions-navigation');

		if (this.el) {
			this.init();
		}
	};

	DeveloperPortalVersionsNavigation.prototype = {
		init: function() {
			var attributes = {
				'aria-controls': 'developer-portal-versions-navigation',
				'aria-pressed': 'false',
				'class': 'developer-portal-sidebar__versions__toggler',
				'type': 'button'
			};

			var togglerWrapper = document.createElement('div');

			togglerWrapper.setAttribute('class', 'developer-portal-sidebar__versions__toggler');

			this.toggler = document.createElement('button');

			for (var attr in attributes) {
				this.toggler.setAttribute(attr, attributes[attr]);
			}

			this.toggler.innerHTML = '<span>' + this.el.querySelector('.active').textContent.trim() + '</span>';
			this.toggler.addEventListener('click', this.click.bind(this));

			togglerWrapper.appendChild(this.toggler);

			this.el.setAttribute('aria-expanded', 'false');
			this.el.parentNode.insertBefore(togglerWrapper, this.el);
		},

		click: function(event) {
			event.preventDefault();

			var isPressed = this.toggler.getAttribute('aria-pressed') !== 'true';

			this.el.setAttribute('aria-expanded', isPressed);
			this.toggler.setAttribute('aria-pressed', isPressed);
		}
	};

	return DeveloperPortalVersionsNavigation;
});