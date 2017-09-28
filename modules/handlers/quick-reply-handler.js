module.exports = (fb, user, data, payloadHandeler, res) => {
	payloadHandeler.receive(data.payload);
  const commande = payloadHandeler.getCommande();
}
