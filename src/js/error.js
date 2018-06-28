export default class Error {
	constructor(container) {
		this.container = container;
		this.timerId = null;

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}
	
	show(errorMessage) {
		this.message = document.createElement('div');
		this.message.className = 'error js-error';
		this.message.innerHTML = errorMessage;
		this.container.insertBefore(this.message, this.container.firstChild);
		this.timerId = setTimeout(this.hide, 5000);
	}
	
	hide() {
		if ((this.message !== null) && (this.message !== undefined)) {
			clearTimeout(this.timerId);
			if (this.message.parentNode) {
				this.message.parentNode.removeChild(this.message);
			}
			this.message = null;
		}
	}
}