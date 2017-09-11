const template = require('../../template');

module.exports = (fb, sender, data, payloadHandeler, res) => {
  
  payloadHandeler.receive(data.payload);
  const commande = payloadHandeler.getCommande();

  res.sendStatus(200);
}