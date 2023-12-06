/* global expect moment ReactivationOption InvalidRequestError AlteredPolicy AlterationPackage QuotePackage Application Policy generatePolicyNumber Joi RequotePolicy root */
// This file is used by the 'rp test -u' unit testing command and allows you to write and run unit tests locally.
// This file automatically get's commented out by the CLI tool when being pushed to Root.
// This ensures that it does not interfere with production execution.

describe('Amendment alteration hook', function () {
  const alterationHookKey = 'modify_cover_amount';

  // A payload with valid data passes validateAlterationPackageRequest
  it('valid data  should pass validation', function () {
    const validationResult = validateAlterationPackageRequest({
      alteration_hook_key: alterationHookKey,
      data: validAlterationData,
      policy: undefined,
      policyholder: undefined,
    });
    expect(validationResult.error).to.equal(null);
  });

  // A payload with invalid data fails validateAlterationPackageRequest
  it('invalid data should generate validation error', function () {
    const validationResult = validateAlterationPackageRequest({
      alteration_hook_key: alterationHookKey,
      data: invalidAlterationData,
      policy: undefined,
      policyholder: undefined,
    });
    expect(validationResult.error).to.not.equal(null);
  });

  // A 20-year-old Tyrannosaurus Rex with R90,000.00 has its cover changed to R75,000.00 with a resulting premium of R1215.00
  it('should update the cover amount and premium for a 20-year-old Tyrannosaurus Rex', function () {
    const alterationPackage = getAlteration({
      alteration_hook_key: alterationHookKey,
      data: validAlterationData,
      //@ts-ignore
      policy: {
        ...examplePolicy,
        monthly_premium: 121500,
      },
      policyholder: undefined,
    });
    expect(alterationPackage.module.cover_amount).to.equal(7500000);
    expect(alterationPackage.monthly_premium).to.equal(121500);
  });

  // A 36-year-old Velociraptor with R50,000.00 has its cover changed to R75,000.00 with a resulting premium of R2052.00
  it('should update the cover amount and premium for a 36-year-old Velociraptor', function () {
    const alterationPackage = getAlteration({
      alteration_hook_key: alterationHookKey,
      data: validAlterationData,
      //@ts-ignore
      policy: examplePolicy,
      policyholder: undefined,
    });
    expect(alterationPackage.module.cover_amount).to.equal(7500000);
    expect(alterationPackage.monthly_premium).to.equal(205200);
  });
});
