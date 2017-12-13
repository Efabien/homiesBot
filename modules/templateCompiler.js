module.exports = class {
	constructor(maxLength) {
		this._stringMaxLength = maxLength;
		this._findBreakingPoint = this._findBreakingPoint.bind(this);
		this._splitEachMaxLength = this._splitEachMaxLength.bind(this);
	}

	_replacePlaceHolder(text, params = {}) {
		for (const key in params) {
			let pattern = new RegExp(`{{${key}}}`, 'g');
			text = text.replace(pattern, params[key]);
		}
		return text;
	}

	_splitEachMaxLength (data, container) {
		if (data.join(' ').length <= this._stringMaxLength && !data.join().match(/#/)) {
			container.push({ text: data.join(' ') });
			return container;
		}
		const breakingPoint = this._findBreakingPoint(data, this._stringMaxLength);
		const hold = data.splice(0, breakingPoint);
		container.push({ text: hold.join(' ') });
		return this._splitEachMaxLength(data, container);
	}

	_findBreakingPoint (data, limit) {
		let i = 1;
		let result = data[0] + ' ';
		let count;
		let breakingPoint;
		while(true) {
			result += data[i] + ' ';
			if (data[i].match(/^#/) || result.length + data[i+1].length >= limit) {
				if (data[i].match(/^#/)) {
					breakingPoint = i;
					data[i] = data[i].replace(/^#/, '');
					break;
				} else {
					breakingPoint = i + 1;
					break;
				}

			}
			i++;
		}
		return breakingPoint;
	}

	execute(text, params) {
		const replaced = this._replacePlaceHolder(text, params);
		return this._splitEachMaxLength(replaced.split(' '), []);
	}
}
