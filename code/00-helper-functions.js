// 00-helper-functions

// add helper functions here
function calculatePremium(data) {
  const age = moment().year() - moment(data.birth_date).year();

  let corePremium = data.cover_amount * (0.01 * (age * 0.001));

  switch (data.species) {
    case 'Tyrannosaurus Rex':
      corePremium = 0.81 * corePremium;
      break;
    case 'Stegosaurus':
      corePremium = 1.19 * corePremium;
      break;
    case 'Velociraptor':
      corePremium = 0.76 * corePremium;
      break;
    case 'Brachiosaurus':
      corePremium = 1.32 * corePremium;
      break;
    case 'Iguanodon':
      corePremium = 1.07 * corePremium;
      break;
  }

  if (!data.health_checks_updated) {
    corePremium += 2500;
  }

  const premium = corePremium * 100;

  return Math.round(premium);
}

// @ts-ignore
const generatePolicyNumber = () => {
  return '8CE463A4A6';
};
