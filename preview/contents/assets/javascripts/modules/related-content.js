define(function() {
	var RelatedContent = function() {
		var modules = document.querySelectorAll('.related-content');

		for (var i = 0, j = modules.length; i < j; i++) {
			new RelatedContentModule(modules[i]);
		}
	};

	var RelatedContentModule = function(el) {
		this.el = el;

		this.init();
	};

	RelatedContentModule.prototype = {
		init: function() {
			this.setVars();
			this.initToggler();
			this.initItems();
		},

		click: function(event) {
			event.preventDefault();

			var isPressed = this.toggler.getAttribute('aria-pressed') !== 'true';

			this.toggler.innerHTML = isPressed ? this.togglerTextClose : this.togglerTextOpen;
			this.toggler.setAttribute('aria-pressed', isPressed);

			this.items.setAttribute('aria-expanded', isPressed);
		},

		initItems: function() {
			this.items.setAttribute('aria-expanded', 'false');
		},

		initToggler: function() {
			this.toggler.innerHTML = this.togglerTextOpen;
			this.toggler.classList.add('related-content__toggler');
			this.toggler.setAttribute('aria-pressed', 'false');
			this.toggler.setAttribute('type', 'button');

			this.toggler.addEventListener('click', this.click.bind(this));

			this.el.insertBefore(this.toggler, this.items);
		},

		setVars: function() {
			this.items = this.el.querySelector('.related-content__items');
			this.toggler = document.createElement('button');

			this.togglerTextOpen = this.el.getAttribute('data-toggler-text-open');
			this.togglerTextClose = this.el.getAttribute('data-toggler-text-close');
		}
	};

	return RelatedContent;
});