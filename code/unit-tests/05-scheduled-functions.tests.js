const validPolicy = {
  policy_number: generatePolicyNumber(),
  package_name: 'DinoSure Protection', // The name of the "package" of cover
  sum_assured: 7500000,
  base_premium: 10000,
  monthly_premium: 205200,
  start_date: moment().add(1, 'day').format(), // policy starts the day after issue
  end_date: null, // add valid policy data
};

describe('applyAnnualIncrease function', () => {
  // A policy younger than a year does not increase in cover on the 1st of January.
  it('should not increase cover if policy is younger than a year', () => {
    const policy = {
      ...validPolicy,
      start_date: moment().subtract(11, 'months').format(),
    };
    // @ts-ignore
    const result = applyAnnualIncrease({ policy });
    expect(result).to.equal(undefined);
  });

  // A policy older than a year does not increase in cover on the 1st of January.
  it('should not increase cover if policy is older than a year but today is not 1st of January', () => {
    const policy = {
      ...validPolicy,
      start_date: moment().subtract(2, 'years').format(),
    };
    // @ts-ignore
    const result = applyAnnualIncrease({ policy });

    if (moment().date() !== 1 && moment().month() !== 0) {
      expect(result).to.equal(undefined);
    }
  });

  // A policy older than a year does not increase in cover on any other date except 1st of January.
  it('should increase cover if policy is older than a year and today is 1st of January', () => {
    const policy = {
      ...validPolicy,
      start_date: moment().subtract(2, 'years').format(),
    };
    // @ts-ignore
    const result = applyAnnualIncrease({ policy });
    if (moment().date() === 1 && moment().month() === 0) {
      expect(result).to.equal([
        {
          name: 'update_policy',
          data: {
            sumAssured: policy.sum_assured + 10000,
            monthlyPremium: calculatePremium({
              ...policy,
              sum_assured: policy.sum_assured + 10000,
            }),
          },
        },
      ]);
    }
  });
});
