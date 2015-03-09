define(function() {
	var DeveloperPortalSidebarNavigation = function() {
		this.el = document.getElementById('developer-portal-sidebar-navigation');

		if (this.el) {
			this.init();
		}
	};

	DeveloperPortalSidebarNavigation.prototype = {
		init: function() {
			var attributes = {
				'aria-controls': 'developer-portal-sidebar-navigation',
				'aria-pressed': 'false',
				'class': 'developer-portal-sidebar__navigation__toggler',
				'type': 'button'
			};

			this.toggler = document.createElement('button');

			for (var attr in attributes) {
				this.toggler.setAttribute(attr, attributes[attr]);
			}

			this.toggler.innerHTML = '<span>' + this.el.querySelector('.current').textContent.trim() + '</span>';
			this.toggler.addEventListener('click', this.click.bind(this));

			this.el.setAttribute('aria-expanded', 'false');
			this.el.parentNode.insertBefore(this.toggler, this.el);
		},

		click: function(event) {
			event.preventDefault();

			var isPressed = this.toggler.getAttribute('aria-pressed') !== 'true';

			this.el.setAttribute('aria-expanded', isPressed);
			this.toggler.setAttribute('aria-pressed', isPressed);
		}
	};

	return DeveloperPortalSidebarNavigation;
});