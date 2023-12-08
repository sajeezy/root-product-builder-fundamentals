const policy_active = {
  policy_number: generatePolicyNumber(),
  package_name: 'DinoSure Protection', // The name of the "package" of cover
  sum_assured: 7500000,
  base_premium: 10000,
  monthly_premium: 205200,
  start_date: moment().add(1, 'day').format(), // policy starts the day after issue
  end_date: null,
};
const policy_lapsed = {
  ...policy_active,
  status: 'lapsed',
};
const policy_cancelled = {
  ...policy_active,
  status: 'cancelled',
};
const policy_expired = {
  ...policy_active,
  status: 'expired',
};

describe('Reactivation flow', () => {
  // Setup
  let reactivationOption;

  before(() => {
    // @ts-ignore
    reactivationOption = getReactivationOptions(policy_active)[0];
  });

  // Quote hook
  describe('Before reactivation', () => {
    // A policy being reactivated with a status of cancelled and lapsed can be reactivated.
    it('cancelled policy can be reactivated', () => {
      var error = null;
      try {
        beforePolicyReactivated({
          // @ts-ignore
          policy: policy_cancelled || policy_lapsed,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.equal(null);
    });

    // A policy with a status of expired cannot be reactivated.
    it('expired policy cannot be reactivated', () => {
      var error = null;
      try {
        beforePolicyReactivated({
          // @ts-ignore
          policy: policy_expired,
          reactivationOption: reactivationOption,
        });
      } catch (e) {
        error = e;
      }
      expect(error).to.not.equal(null);
    });
  });
});
