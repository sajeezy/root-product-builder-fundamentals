/**
 * Validates the quote request data.
 * @param {Record<string, any>} data The data received in the body of the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) request
 *     (without the `type` property).
 * @return {{error: any; result: any}} The [validation result](https://joi.dev/api/?v=12.1.0#validatevalue-schema-options-callback).
 *    If there are no errors, the `value` property will contain the validated data, which is passed to `getQuote`.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */
const validateQuoteRequest = (data) => {
  const validationResult = Joi.validate(
    data,
    Joi.object()
      .keys({
        species: Joi.valid([
          'Tyrannosaurus Rex',
          'Stegosaurus',
          'Velociraptor',
          'Diplodocus',
          'Iguanodon',
        ]).required(),
        start_date: Joi.date()
          .min(moment().format('YYYY-MM-DD'))
          .max(moment().add(60, 'days').format('YYYY-MM-DD'))
          .required(),
        cover_amount: Joi.number()
          .integer()
          .min(10000 * 100)
          .max(100000 * 100)
          .required(),
        birth_date: Joi.number()
          .integer()
          .min(moment().year() - 50)
          .max(moment().year())
          .required(),
        health_checks_updated: Joi.boolean().required(),
      })
      .required(),
    { abortEarly: false },
  );
  return validationResult;
};

/**
 * Generates an array of quote packages from the quote request data.
 * @param {Record<string, any>} data The validated data returned by `validateQuoteRequest` as `result.value`.
 * @return {QuotePackage[]} The quote package(s) that will be returned by the
 *     [Create a quote](https://docs.rootplatform.com/reference/getting-a-quote-2) endpoint.
 * @see {@link https://docs.rootplatform.com/docs/quote-hook Quote hook}
 */

const getQuote = (data) => {
  const age = moment().year() - data.birth_date;
  let corePremium = data.cover_amount * (0.01 * (age * 0.001));
  if (data.species === 'Tyrannosaurus Rex') {
    corePremium = 0.81 * corePremium;
  } else if (data.species === 'Stegosaurus') {
    corePremium = 1.19 * corePremium;
  } else if (data.species === 'Velociraptor') {
    corePremium = 0.76 * corePremium;
  } else if (data.species === 'Brachiosaurus') {
    corePremium = 1.32 * corePremium;
  } else if (data.species === 'Iguanodon') {
    corePremium = 1.07 * corePremium;
  }

  if (!data.health_checks_updated) {
    corePremium = corePremium + 2500;
  }

  const premium = Math.round(corePremium);

  const quotePackage = new QuotePackage({
    // Below are standard fields for all products
    package_name: 'DinoSure Protection', // The name of the "package" of cover
    sum_assured: data.cover_amount, // Set the total, aggregated cover amount
    base_premium: premium, // Should be an integer, cents
    suggested_premium: premium, // Should be an integer, cents
    billing_frequency: 'monthly', // Can be monthly or yearly
    module: {
      // Save any data, calculations, or results here for future re-use.
      type: 'dinosure_course_steven',
      species: data.species,
      start_date: data.start_date,
      cover_amount: data.cover_amount,
      birth_date: data.birth_date,
      health_checks_updated: data.health_checks_updated,
      ...data,
    },
    input_data: { ...data },
  });
  return [quotePackage];
};
