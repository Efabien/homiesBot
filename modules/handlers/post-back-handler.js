const template = require('../../template');
const compiler = require('../templateCompiler');

module.exports = (fb, user, data, payloadHandeler, res) => {
  payloadHandeler.receive(data.payload);
  const commande = payloadHandeler.getCommande();
  if (commande.type === 'start') fb.sendText(user.id, compiler(template.welcomeMessage, { userName: user.first_name}));
  res.sendStatus(200);
}