const config = require('../config');
const tool = require('./tool');
const Restifeo = require('./api-call/restifeo');
const restifeo = new Restifeo(config);
const ref = '1501101603000';


const txt = 'this #is a #test for smart split and I dont have any idea of what I funcking do';

const splitEachMaxLength = (data, limit, container) => {
	if (data.join(' ').length <= limit) {
		container.push({ text: data.join(' ') });
		return container;
	}
	const breakingPoint = findBreakingPoint(data, limit);
	const hold = data.splice(0, breakingPoint);
	container.push({ text: hold.join(' ')});
	return splitEachMaxLength(data, limit, container);
}

const findBreakingPoint = (data, limit) => {
	let i = 1;
	let result = data[0] + ' ';
	let count;
	let breakingPoint;
	while(true) {
		result += data[i] + ' ';
		if (result.length + data[i+1].length >= limit || data[i].match(/^#/)) {
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
const data = txt.split(' ');
const result = splitEachMaxLength(data, 20, []);
console.log(result);