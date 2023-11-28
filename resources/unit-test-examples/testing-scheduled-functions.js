// @ts-ignore
const validPolicy = () => {
  return {}; // add valid policy data
};

describe('activeAnnuityClaimDocumentationReminder custom comms', () => {
  it('should not trigger the function if premium is not 0', () => {
    const result = yourScheduledFunction({
      policy: validPolicy,
    });
    expect(result).to.equal(null);
  });

  it('should  trigger the function if premium is not 0', () => {
    const result = yourScheduledFunction({
      policy: validPolicy,
    });
    expect(result).to.deep.equal([
      {
        name: 'update_policy',
        data: {
          sumAssured: 1000,
        },
      },
    ]);
  });
});
