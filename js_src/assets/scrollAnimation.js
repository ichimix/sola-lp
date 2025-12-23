export const SA = class {
	constructor(option = {}) {
		const defaultSelector = '.anm';
		const defaultMargin = window.innerHeight * 0.2;
		const defaultShowClass = 'show';
		this.selector = !('selector' in option) ? defaultSelector : option.selector;
		this.margin = !('margin' in option) ? defaultMargin : option.margin;
		this.showClass = !('showClass' in option) ? defaultShowClass : option.showClass;
		this.init();
	}
	init() {
		const elms = document.querySelectorAll(this.selector);
		if (elms.length === 0) {
			return false;
		}
		const saFunc = (elm) => {
			let status = true;
			let pos = elm.getBoundingClientRect().top;
			const delay = elm.getAttribute('data-delay');
			const trigger = elm.getAttribute('data-trigger');
			const trigElm = (trigger) ? document.querySelector(trigger) : elm;
			const showItem = () => {
				elm.classList.add(this.showClass);
				status = false;
			};
			return () => {
				if (!status) return;
				pos = trigElm.getBoundingClientRect().top;
				if (pos < window.innerHeight - this.margin || elm.classList.contains('animation_afterLoad')) {
					if (delay) {
						setTimeout(function () {
							showItem();
						}, delay);
						return;
					}
					showItem();
				}
			};
		};
		const sa = [];
		for (let i = 0; elms.length > i; i++) {
			sa[i] = saFunc(elms[i]);
		}
		const saListener = (e) => {
			for (var i = 0; sa.length > i; i++) {
				sa[i]();
			}
		};
		window.addEventListener('load', saListener);
		window.addEventListener('scroll', saListener);
	}
}
