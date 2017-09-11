const template = require('../../template');

module.exports = (fb, sender, data, res) => {
	if (data.match(/^aide$|help/i)) fb.sendText(sender, template.helpMessage);
	res.sendStatus(200);
}
