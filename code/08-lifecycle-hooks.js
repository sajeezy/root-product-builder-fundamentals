// 08-lifecycle-hooks

/**
 * Get the reactivation options for inactive policies.
 * @param {PlatformPolicy} policy The policy to be reactivated.
 * @return {ReactivationOption[]} One of these options must be selected whenever an inactive policy is reactivated.
 */
const getReactivationOptions = (policy) => {
  return [
    new ReactivationOption({
      type: 'recommencement',
      description:
        'For a policy to be recommenced, all arrear premiums will be deducted from the first claim income.',
      minimumBalanceRequired: false,
    }),
  ];
};

/**
 * Executed before a policy is reactivated.
 * Can be used to prevent reactivation if certain conditions are not met.
 * @param {object} params
 * @param {PlatformPolicy} params.policy The policy to be reactivated
 * @param {PlatformPolicyholder} params.policyholder The policyholder linked to the policy
 * @param {ReactivationOption} params.reactivationOption The reactivation option selected
 * @return {ProductModuleAction[] | void} The actions to be queued by the platform
 */
const beforePolicyReactivated = ({
  policy,
  policyholder,
  reactivationOption,
}) => {
  // Check policy status is lapsed or cancelled
  const isPolicyLapsedOrCancelled = ['lapsed', 'cancelled'].includes(
    policy.status,
  );
  if (!isPolicyLapsedOrCancelled) {
    throw new Error(
      `Policy with status ${policy.status} cannot be reactivated. Policy status must be one of ['lapsed', 'cancelled'].`,
    );
  }

  const newModule = {
    ...policy.module,
    reactivation_date: moment().format('YYYY-MM-DD'),
  };

  return [
    {
      name: 'update_policy',
      data: {
        module: newModule,
      },
    },
  ];
};
