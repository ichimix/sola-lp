export const CSSAcdn = class {
	constructor({ switchClass = 'open' } = {}) {
		this.switchClass = switchClass;
		this.cloneElms = [];
		this.idCount = 0;
	}
	open(elm) {
		if (elm.classList.contains(this.switchClass)) {
			return;
		}
		const _removeStyle = (e) => {
			if (e.propertyName !== 'height') {
				return;
			}
			this.removeStyle(e.target);
			e.target.removeEventListener('transitionend', _removeStyle);
		};
		elm.style.height = elm.scrollHeight + 'px';
		elm.classList.add(this.switchClass);
		elm.addEventListener('transitionend', _removeStyle);
	}
	close(elm) {
		if (!elm.classList.contains(this.switchClass)) {
			return;
		}
		elm.style.height = getComputedStyle(elm).getPropertyValue('height');
		setTimeout(() => {
			elm.style.height = '';
			elm.classList.remove(this.switchClass);
		}, 10);
	}
	toggle(elm) {
		if (elm.classList.contains(this.switchClass)) {
			this.close(elm);
		} else {
			this.open(elm);
		}
	}
	removeStyle(elm) {
		elm.style.height = '';
	}
};
