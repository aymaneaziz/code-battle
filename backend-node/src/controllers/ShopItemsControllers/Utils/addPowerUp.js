export const addPowerUp = (user, item) => {
  // vérifier si le powerUp existe déjà
  const existingPowerUp = user.powerUps.find(
    (p) => p.powerUp.toString() === item.refId._id.toString()
  );

  if (existingPowerUp) {
    // augmenter la quantité
    existingPowerUp.quantity += 1;
  } else {
    // créer un nouveau powerUp
    user.powerUps.push({
      powerUp: item.refId,
      quantity: 1,
    });
  }

  return user;
};
