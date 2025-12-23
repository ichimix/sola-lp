const SiteInit = class {
	constructor(option = {}) {
		const defaultSelectors = {
			menuBtn: '#menuBtn',
			menu: '#menu',
			anchorIgnore: '.noscroll',
			sa: '.anm'
		}
		const defaultAnchorSpeed = 300,
			defaultsaMargin = window.innerHeight * 0.2;
		this.easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; }; //jswing

		this.selectors = defaultSelectors;
		this.selectors.menuBtn = !('menuBtn' in option) ? defaultSelectors.menuBtn : option.menuBtn;
		this.selectors.menu = !('menu' in option) ? defaultSelectors.menu : option.menu;
		this.selectors.anchorIgnore = !('anchorIgnore' in option) ? defaultSelectors.anchorIgnore : option.anchorIgnore;
		this.selectors.sa = !('sa' in option) ? defaultSelectors.sa : option.sa;
		this.anchorSpeed = !('anchorSpeed' in option) ? defaultAnchorSpeed : option.anchorSpeed;
		this.saMargin = !('saMargin' in option) ? defaultsaMargin : option.saMargin;
		this.flags = !('flags' in option) ? null : option.flags;

		this.scrollElm = (function () {
			if ('scrollingElement' in document) { return document.scrollingElement; }
			if (navigator.userAgent.indexOf('WebKit') != -1) { return document.body; }
			return document.documentElement;
		})();

		this.menuBtn = document.querySelector(this.selectors.menuBtn);
		this.menu = document.querySelector(this.selectors.menu);

		const smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + this.anchorIgnore + ')');

		if (smoothScrollElm.length > 0) {
			for (let i = 0; i < smoothScrollElm.length; i++) {
				let elm = smoothScrollElm[i];
				elm.addEventListener('click', (e) => {
					e.preventDefault();
					this.anchorScroll(elm.getAttribute('href'));
					if (this.menuBtn) {
						this.menuClose();
					}
				}, false);
			}
		}
		if (this.menuBtn) {
			this.menuBtn.addEventListener('click', (e) => { this.menuToggle(e); }, false);
		}

		this.saInit();

	}
	anchorScroll(href) {
		const targetElm = (href === '#') ? document.querySelector('html') : document.querySelector(href);
		if (!targetElm) return;
		const startTime = Date.now();
		const scrollFrom = this.scrollElm.scrollTop;
		const duration = this.anchorSpeed;
		const loop = () => {
			const targetPos = targetElm.getBoundingClientRect().top + this.scrollElm.scrollTop - scrollFrom;
			const currentTime = Date.now() - startTime;
			if (currentTime < duration) {
				scrollTo(0, this.easing(currentTime, scrollFrom, targetPos, duration));
				window.requestAnimationFrame(loop);
			} else {
				scrollTo(0, targetPos + scrollFrom);
			}
		};
		loop();
	}
	menuToggle() {
		if (this.menu.classList.contains('show')) {
			this.menuClose();
		} else {
			this.menuOpen()
		}
	}
	menuOpen() {
		this.menu.classList.add('show');
		this.menuBtn.classList.add('on');
	}
	menuClose() {
		this.menu.classList.remove('show');
		this.menuBtn.classList.remove('on');
	}
	setFlag(name, val) {
		this.flags[name] = val;
	}
	getFlag(name) {
		return this.flags[name];
	}
	saInit() {
		const saElms = document.querySelectorAll(this.selectors.sa);
		if (saElms.length === 0) {
			return false;
		}
		const saFunc = (elm) => {
			let status = true;
			let pos = elm.getBoundingClientRect().top;
			const delay = elm.getAttribute('data-delay');
			const trigger = elm.getAttribute('data-trigger');
			const trigElm = (trigger) ? document.querySelector(trigger) : elm;
			const showItem = function () {
				elm.classList.add('show');
				status = false;
			};
			return () => {
				if (!status) return;
				pos = trigElm.getBoundingClientRect().top;
				if (pos < window.innerHeight - this.saMargin || elm.classList.contains('animation_afterLoad')) {
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
		for (let i = 0; saElms.length > i; i++) {
			sa[i] = saFunc(saElms[i]);
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

/*
option default
{
	menuBtn: '#menuBtn', //メニューボタンのセレクタ
	menu: '#menu', //メニューのセレクタ
	anchorIgnore: '.noscroll', //スムーススクロールを適用しない要素のセレクタ
	anchorSpeed: 300, //スムーススクロールのスピード
	sa: '.anm', //スクロールアニメーションのセレクタ
	saMargin: window.innerHeight * 0.2 //スクロールアニメーションを適用する要素を表示させる位置（デフォルトは画面の一番下から20%の位置）
}
*/
const siteInit = new SiteInit();
