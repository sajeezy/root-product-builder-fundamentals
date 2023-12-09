/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

const validAlterationData = {
  // valid data for alteration
  cover_amount: 7500000,
};

const invalidAlterationData = {
  // invalid data for alteration
  cover_amount: 10,
};

const examplePolicy = {
  // copy policy object here
  policy_number: generatePolicyNumber(),
  package_name: 'DinoSure Protection', // The name of the "package" of cover
  sum_assured: 7500000,
  base_premium: 10000,
  monthly_premium: 205200,
  start_date: moment().add(1, 'day').format(), // policy starts the day after issue
  end_date: null,
};
