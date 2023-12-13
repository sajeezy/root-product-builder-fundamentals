// 06-scheduled-functions
/**
 * Executed on the schedule defined in `.root-config.json`.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy for which the scheduled function is running.
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform.
 */
const applyAnnualIncrease = ({ policy, policyholder }) => {
  const policyStartDate = moment(policy.start_date);
  const oneYearAgo = moment().subtract(1, 'years');
  const today = moment();
  if (
    policyStartDate.isSameOrBefore(oneYearAgo) &&
    today.date() === 1 &&
    today.month() === 0
  ) {
    const increasedCover = policy.sum_assured + 10000;
    const policyData = {
      ...policy,
      sum_assured: increasedCover,
    };

    const newPremium = calculatePremium(policyData);

    return [
      {
        name: 'update_policy',
        data: {
          sumAssured: increasedCover,
          monthlyPremium: newPremium,
        },
      },
    ];
  }
};
