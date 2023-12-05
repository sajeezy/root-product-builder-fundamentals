/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */

// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

// Example quote data
const quoteData = {
  cover_amount: 1000000,
  birth_date: '1977-12-15',
  species: 'Tyrannosaurus Rex',
  start_date: '2023-12-15',
  health_checks_updated: true,
};

const invalidQuoteData = {
  cover_amount: 10000,
  birth_date: '1947-12-15',
  species: 'Tyrannosaurus',
  start_date: '2023-1-15',
  health_checks_updated: true,
};

// Example application data
const applicationData = {
  // quote_package_id: '77c375ff-4a0b-45e8-a0bd-745f16f461eb',
  // policyholder_id: '3c0da21c-f418-486b-8683-eea8e01a8582',
  name: 'James Dean',
  colour: 'Lilac',
  ndrn: 100001,
};

const invalidApplicationData = {
  // quote_package_id: '77c375ff-4a0b-45e8-a0bd-745f16f461eb',
  // policyholder_id: '3c0da21c-f418-486b-8683-eea8e01a8582',
  name: 'James Dean',
  colour: 'Brown',
  ndrn: 10000,
};
