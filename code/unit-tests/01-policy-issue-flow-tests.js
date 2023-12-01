/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

describe('Policy issue flow', function () {
  // Setup
  let quotePackage;
  let applicationPackage;
  before(function () {
    quotePackage = getQuote(quoteData)[0];
    applicationPackage = getApplication(
      applicationData,
      undefined,
      // @ts-ignore
      quotePackage,
    );
  });

  // Quote hook
  describe('Quote hook', function () {
    it('valid data should pass validation', function () {
      const validationResult = validateQuoteRequest(quoteData);
      expect(validationResult.error).to.equal(null);
    });

    it('invalid data should fail validation', function () {
      const validationResult = validateQuoteRequest(invalidQuoteData);
      expect(validationResult.error).to.not.equal(null);
    });

    it('20-year-old Tyrannosaurus Rex with R90,000.00 has a premium of R1458.00', function () {
      const testQuoteData = {
        ...quoteData,
        birth_date: moment().year() - 20,
        cover_amount: 90000.0,
      };
      const calculatedPremium = calculatePremium(testQuoteData);
      expect(calculatedPremium).to.equal(1458.0);
    });

    it('a 36-year-old Velociraptor with R50,000.00 has a premium of R1368.00', function () {
      const testQuoteData = {
        ...quoteData,
        birth_date: moment().year() - 36,
        species: 'Velociraptor',
        cover_amount: 50000.0,
      };

      const calculatedPremium = calculatePremium(testQuoteData);
      expect(calculatedPremium).to.equal(1368.0);
    });

    it('a 16-year-old Brachiosaurus with R65,000.00 has a premium of R1372.80', function () {
      const testQuoteData = {
        ...quoteData,
        birth_date: moment().year() - 16,
        species: 'Brachiosaurus',
        cover_amount: 65000.0,
      };

      const calculatedPremium = calculatePremium(testQuoteData);
      expect(calculatedPremium).to.equal(1372.8);
    });
  });

  // Application hook
  describe('Application hook', function () {
    it('should pass application data validation ', function () {
      const validationResult = validateApplicationRequest(
        applicationData,
        undefined,
        undefined,
      );
      expect(validationResult.error).to.equal(null);
    });
    it('should return the correct module data', function () {
      expect(applicationPackage.module.SOME_PROPERTY).to.equal(
        '<SOME_PROPERTY>',
      );
    });
  });

  // Policy issue hook
  describe('Policy issue hook', function () {
    it('should create a policy with the correct parameters', function () {
      const policy = getPolicy(applicationPackage, undefined, undefined);
      expect(policy.package_name).to.equal('<CORRECT PACKAGE NAME>');
      expect(policy.monthly_premium).to.equal(1234);
      expect(policy.sum_assured).to.equal(12345678);
    });
  });
});
