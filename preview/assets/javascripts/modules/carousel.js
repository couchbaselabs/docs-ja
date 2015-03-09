define(function() {
	var Carousel = function() {
		var modules = document.querySelectorAll('.carousel');

		for (var i = 0, j = modules.length; i < j; i++) {
			new CarouselModule(modules[i]);
		}
	};

	var CarouselModule = function(el) {
		this.el = el;

		this.init();
	};

	CarouselModule.prototype = {
		init: function() {
			this.setVars();

			if (this.pages.length > 1) {
				this.appendNavigation();
				this.bindEvents();

				this.setPagesWrapperHeight();
				this.setPageClasses();
			}
		},

		appendNavigation: function() {
			this.nextNav.innerHTML = '<span>Next</span>';
			this.nextNav.classList.add('carousel__navigation--next');
			this.nextNav.setAttribute('data-delta', '1');
			this.nextNav.setAttribute('type', 'button');

			this.prevNav.innerHTML = '<span>Previous</span>';
			this.prevNav.classList.add('carousel__navigation--previous');
			this.prevNav.setAttribute('data-delta', '-1');
			this.prevNav.setAttribute('type', 'button');

			this.carouselWrapper.appendChild(this.nextNav);
			this.carouselWrapper.appendChild(this.prevNav);
		},

		bindEvents: function() {
			this.nextNav.addEventListener('click', this.click.bind(this));
			this.prevNav.addEventListener('click', this.click.bind(this));

			window.addEventListener('resize', this.resize.bind(this));
		},

		click: function(event) {
			event.preventDefault();

			var button = event.currentTarget,
				delta = parseInt(button.getAttribute('data-delta'), 10);

			this.updateIndices(delta);
			this.setPageClasses();
		},

		resize: function(event) {
			var t = setTimeout(function() {
				this.pagesWrapper.removeAttribute('style');
				this.maxPageHeight = 0;

				this.setPagesWrapperHeight();

				clearTimeout(t);
			}.bind(this), 100);
		},

		setPageClasses: function() {
			for (var i = 0, j = this.pages.length; i < j; i++) {
				var page = this.pages[i];

				page.classList.remove(this.classNames.currentPage);
				page.classList.remove(this.classNames.nextPage);
				page.classList.remove(this.classNames.previousPage);

				if (i == this.currentIndex) {
					page.classList.add(this.classNames.currentPage);
				} else if (i == this.prevIndex) {
					page.classList.add(this.classNames.previousPage);
				} else {
					page.classList.add(this.classNames.nextPage);
				}
			}
		},

		setMaxPageHeight: function() {
			for (var i = 0, j = this.pages.length; i < j; i++) {
				var page = this.pages[i],
					pageHeight = page.offsetHeight;

				this.maxPageHeight = pageHeight > this.maxPageHeight ? pageHeight : this.maxPageHeight;
			}
		},

		setPagesWrapperHeight: function() {
			this.setMaxPageHeight();

			this.pagesWrapper.style.height = this.maxPageHeight + 'px';
		},

		setVars: function() {
			this.classNames = {
				currentPage: 'carousel__page--current',
				nextPage: 'carousel__page--next',
				previousPage: 'carousel__page--previous'
			};

			this.carouselWrapper = this.el.querySelector('.carousel__wrapper');
			this.pagesWrapper = this.carouselWrapper.querySelector('.carousel__pages');
			this.pages = this.pagesWrapper.querySelectorAll('.carousel__page');

			this.nextNav = document.createElement('button');
			this.prevNav = document.createElement('button');

			this.totalPages = this.pages.length;
			this.currentIndex = 0;
			this.nextIndex = 1;
			this.prevIndex = this.totalPages - 1;
			this.maxPageHeight = 0;
		},

		updateIndices: function(delta) {
			var newCurrentIndex = this.currentIndex + delta,
				newNextIndex = newCurrentIndex + 1,
				newPrevIndex = newCurrentIndex -1,
				lastPageIndex = this.totalPages - 1;

			switch(newCurrentIndex) {
				case -1:
					newCurrentIndex = lastPageIndex;
					newNextIndex = 0;
					newPrevIndex = newCurrentIndex - 1;
					break;
				case 0:
					newPrevIndex = lastPageIndex;
					break;
				case this.totalPages:
					newCurrentIndex = 0;
					newNextIndex = 1;
					newPrevIndex = lastPageIndex;
					break;
				case this.totalPages - 1:
					newNextIndex = 0;
					break;
				default:
					newNextIndex = newCurrentIndex + 1;
					newPrevIndex = newCurrentIndex - 1;
			}

			this.currentIndex = newCurrentIndex;
			this.nextIndex = newNextIndex;
			this.prevIndex = newPrevIndex;
		}
	};

	return Carousel;
});