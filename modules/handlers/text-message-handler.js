const template = require('../../template');

module.exports = (fb, user, data, res) => {
	if (data.match(/^aide$|help/i)) fb.sendText(user.id, template.helpMessage);
	if (data.match(/^Hello$/i)) fb.sendText(user.id, `Hello ${user.first_name}`);
	res.sendStatus(200);
}
