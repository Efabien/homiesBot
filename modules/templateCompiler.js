module.exports = (text, params) => {
	for (key in params) {
		let pattern = new RegExp(`{{${key}}}`, 'g');
		text = text.replace(pattern, params[key]);
	}
	return text;
}