define(function() {
	var GlobalHeaderSearch = function() {
		this.el = document.querySelector('#global-header-search');

		if (this.el) {
			this.init();
		}
	};

	GlobalHeaderSearch.prototype = {
		init: function() {
			var attributes = {
				'aria-controls': 'global-header-search__items',
				'aria-pressed': 'false',
				'class': 'global-header-search__toggler',
				'type': 'button'
			};

			this.searchInput = this.el.querySelector('input[type="search"]');
			this.toggler = document.createElement('button');

			for (var attr in attributes) {
				this.toggler.setAttribute(attr, attributes[attr]);
			}

			this.toggler.innerHTML = '<span>Search</span>';
			this.toggler.addEventListener('click', this.click.bind(this));

			this.el.setAttribute('aria-expanded', 'false');
			this.el.appendChild(this.toggler);
			this.el.classList.add('global-header-search--js');
		},

		click: function(event) {
			event.preventDefault();

			var isPressed = this.toggler.getAttribute('aria-pressed') !== 'true';

			this.el.setAttribute('aria-expanded', isPressed);
			this.toggler.setAttribute('aria-pressed', isPressed);

			if (isPressed) {
				this.searchInput.focus();
			} else {
				this.toggler.focus();
			}
		}
	};

	return GlobalHeaderSearch;
});