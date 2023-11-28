const quoteData1 = {}; // add your quote data
const invalidQuoteData = {}; // add invalid quote data
const applicationData1 = {};

describe('Testing quotesPackages with data sets', function () {
  let quotePackage1;
  // Setup
  before(function () {
    quotePackage1 = getQuote(quoteData1);
    const app = getApplication({}, {}, quotePackage1[0]);
  });

  // Quote test 1
  describe('Policy flow test 1', function () {
    it('quote data should pass validation', function () {
      const validationResult = validateQuoteRequest(quoteData1);
      expect(validationResult.error).to.equal(null);
    });

    it('quote data should fail validation', function () {
      const validationResult = validateQuoteRequest(invalidQuoteData);
      expect(validationResult.error).to.not.equal(null);
    });

    it('should create a quote package', function () {
      expect(quotePackage1[0].module).to.exist;
    });

    // add expected premium
    it('should return a suggested premium of RXXX.XX', function () {
      expect(quotePackage1[0].suggested_premium).to.equal('XXXXX'); // cents
    });

    it('application data should pass validation', function () {
      const validationResult = validateApplicationRequest(applicationData1);
      expect(validationResult.error).to.equal(null);
    });

    // add more tests
  });
});
