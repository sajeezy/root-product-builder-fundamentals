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
  const species = [
    'Tyrannosaurus Rex',
    'Stegosaurus',
    'Velociraptor',
    'Diplodocus',
    'Iguanodon',
  ];
  const validationResult = Joi.validate(
    data,
    Joi.object()
      .keys({
        // keys and validation
        type: Joi.valid(species).required(),
        start_date: Joi.date().iso().min('now').max('60 days').required(),
        cover_amount: Joi.number()
          .integer()
          .min(10000.0)
          .max(100000.0)
          .required(),
        birth_date: Joi.date().iso().max('now').min('50 years').required(),
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
  let corePremium = data.cover_amount * (0.01 * (data.age * 0.001));
  let typeBasedPremium = corePremium;
  if (data.type === 'Tyrannosaurus Rex') {
    typeBasedPremium = 0.81 * corePremium;
  } else if (data.type === 'Stegosaurus') {
    typeBasedPremium = 1.19 * corePremium;
  } else if (data.type === 'Velociraptor') {
    typeBasedPremium = 0.76 * corePremium;
  } else if (data.type === 'Brachiosaurus') {
    typeBasedPremium = 1.32 * corePremium;
  } else if (data.type === 'Iguanodon') {
    typeBasedPremium = 1.07 * corePremium;
  }

  if (!data.health_checks_updated) {
    typeBasedPremium += 25000;
    corePremium += 25000;
  }

  const quotePackage = new QuotePackage({
    // Below are standard fields for all products
    package_name: 'DinoSure Protection', // The name of the "package" of cover
    // sum_assured: 10000 * 100, // Set the total, aggregated cover amount
    sum_assured: data.cover_amount, // Set the total, aggregated cover amount
    base_premium: corePremium, // Should be an integer, cents
    suggested_premium: typeBasedPremium, // Should be an integer, cents
    billing_frequency: 'monthly', // Can be monthly or yearly
    module: {
      // Save any data, calculations, or results here for future re-use.
      type: 'dinosure_steven_ext_dev',
      start_date: '2023-02-03T11:17:09.747Z',
      cover_amount: 10000,
      birth_date: '2020-02-03T11:17:09.747Z',
      health_checks_updated: true,
      ...data,
    },
    input_data: { ...data },
  });
  return [quotePackage];
};
