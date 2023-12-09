const updateCoverValid = () => {
  return {}; // add data
};

const updateCoverInvalid = {};

describe('Alteration hook tests', () => {
  // Update grade alteration
  describe('Update cover amount alterations', () => {
    const alterationHookKey = 'modify_cover_amount'; // add alteration hook key

    it('should pass validation', () => {
      const validationResult = validateAlterationPackageRequest({
        alteration_hook_key: alterationHookKey,
        data: updateCoverValid(),
      });
      expect(validationResult.error).to.equal(null);
    });

    it('should fail validation', () => {
      const validationResult = validateAlterationPackageRequest({
        alteration_hook_key: alterationHookKey,
        data: updateCoverInvalid,
      });
      expect(validationResult.error).to.not.equal(null);
    });

    it('should succeed the get alteration request', () => {
      var error;
      try {
        getAlteration({
          alteration_hook_key: alterationHookKey,
          data: updateCoverInvalid,
          policy: policy,
          policyholder: policyholder,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.not.equal(null);
    });

    it('should succeed with an updated cover request', () => {
      const validationResult = validateAlterationPackageRequest({
        alteration_hook_key: alterationHookKey,
        data: updateCoverValid(),
      });
      expect(validationResult.error).to.equal(null);

      const alterationPackage = getAlteration({
        alteration_hook_key: alterationHookKey,
        data: updateCoverValid(),
        policy: policy,
        policyholder: policyholder,
      });

      const alteredPolicy = applyAlteration({
        alteration_hook_key: alterationHookKey,
        policy: policy,
        policyholder: policyholder,
        alteration_package: alterationPackage,
      });

      // Ensure that all dependents have been removed from the altered policy
      expect(alteredPolicy.sum_assured).to.equal();
      expect(alteredPolicy.monthly_premium).to.equal();
    });
  });
});
