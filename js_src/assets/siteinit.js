export const SiteInit = class {
	constructor(option = {}) {
		const defaultClass = {
			menuBtn: 'menuBtn',
			menu: 'menu',
			menuBtnSwitch: 'on',
			menuSwitch: 'show',
			anchorIgnore: '.noscroll',
		};
		const defaultAnchorSpeed = 300;
		this.easing = function (t, b, c, d) { return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b; }; //jswing

		this.className = defaultClass;
		this.className.menuBtn = !('menuBtn' in option) ? defaultClass.menuBtn : option.menuBtn;
		this.className.menu = !('menu' in option) ? defaultClass.menu : option.menu;
		this.className.menuBtnSwitch = !('menuBtnSwitch' in option) ? defaultClass.menuBtnSwitch : option.menuBtnSwitch;
		this.className.menuSwitch = !('menuSwitch' in option) ? defaultClass.menuSwitch : option.menuSwitch;
		this.className.anchorIgnore = !('anchorIgnore' in option) ? defaultClass.anchorIgnore : option.anchorIgnore;
		this.anchorSpeed = !('anchorSpeed' in option) ? defaultAnchorSpeed : option.anchorSpeed;
		this.anchorCallback = !('anchorCallback' in option) ? null : option.anchorCallback;
		this.flags = !('flags' in option) ? null : option.flags;

		this.scrollElm = (function () {
			if ('scrollingElement' in document) { return document.scrollingElement; }
			if (navigator.userAgent.indexOf('WebKit') != -1) { return document.body; }
			return document.documentElement;
		})();

		this.menuBtn = document.getElementById(this.className.menuBtn);
		this.menu = document.getElementById(this.className.menu);

		const smoothScrollElm = document.querySelectorAll('a[href^="#"]:not(' + this.anchorIgnore + ')');

		if (smoothScrollElm.length > 0) {
			for (let i = 0; i < smoothScrollElm.length; i++) {
				let elm = smoothScrollElm[i];
				elm.addEventListener('click', (e) => {
					e.preventDefault();
					this.anchorScroll(elm.getAttribute('href'), this.anchorCallback);
				}, false);
			}
		}
		if (this.menuBtn) {
			this.menuBtn.addEventListener('click', (e) => { this.menuToggle(e); }, false);
		}
	}
	anchorScroll(href, cb) {
		let targetElm;
		if(typeof href === 'object') {
			targetElm = href;
		} else {
			targetElm = (href === '#') ? document.querySelector('html') : document.querySelector(href);
		}
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
		if(typeof cb === 'function') {
			cb();
		}
	}
	menuToggle() {
		if (this.menu.classList.contains(this.className.menuSwitch)) {
			this.menuClose();
		} else {
			this.menuOpen()
		}
	}
	menuOpen() {
		this.menu.classList.add(this.className.menuSwitch);
		this.menuBtn.classList.add(this.className.menuBtnSwitch);
	}
	menuClose() {
		this.menu.classList.remove(this.className.menuSwitch);
		this.menuBtn.classList.remove(this.className.menuBtnSwitch);
	}
	setFlag(name, val) {
		this.flags[name] = val;
	}
	getFlag(name) {
		return this.flags[name];
	}
}
