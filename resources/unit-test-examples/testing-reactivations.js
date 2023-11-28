const policy_active = {};
const policy_lapsed = {};
const policy_cancelled = {};

describe('Reactivation flow', () => {
  // Setup
  let reactivationOption;

  before(() => {
    reactivationOption = getReactivationOptions(policy_active)[0];
  });

  // Quote hook
  describe('Before reactivation', () => {
    it('should return an error because the policy is already active', async () => {
      var error = null;
      try {
        await beforePolicyReactivated({
          policy: policy_active,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.not.equal(null);
    });

    it('should return without error: lapsed policy', () => {
      var error = null;
      try {
        beforePolicyReactivated({
          policy: policy_lapsed,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);
    });

    it('should return without error: cancelled policy', () => {
      var error = null;
      try {
        beforePolicyReactivated({
          policy: policy_cancelled,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);
    });
  });
});
