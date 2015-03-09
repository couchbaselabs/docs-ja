if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, '');
	};
}