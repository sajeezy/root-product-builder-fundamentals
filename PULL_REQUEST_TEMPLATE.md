### Which part of the onboarding is this for?

- [ ] Part 1: Setup and settings
- [ ] Part 2: Quote creation and validation
- [ ] Part 3: Application & policy creation and validation
- [ ] Part 4: Updating a policy with alteration hooks
- [ ] Part 5: Using lifecycle hooks with reactivation
- [ ] Part 6: Using scheduled functions to apply anniversary logic
- [ ] Part 7: Creating documents and communication events
- [ ] Part 8: Creating a claims flow
- [ ] Part 9: Getting the product Embed ready
- [ ] Part 10: Wrapping up

### What has been implemented in this PR

(The "what" of the PR should be a clearly defined title in present tense i.e "Add Reactivation Logic")

### How was it implemented?

(This should be as succinct pseudo code as possible i.e)

### Root specification section link

[ Add the section link here for the Root Spec Doc]()

### Testing plan

**Types of tests required**

- [ ] Unit test check (tests to be done prior to handing to reviewer)
- [ ] API endpoint testing

**Acceptance criteria**
[A list of tests to perform to pass, split into testing types if required] eg:

- Unit test for reactivation logic check logic
  - Using date-hacking, call reactivation function with date under 3 months and nothing should be returned
  - Using date-hacking, call date over 3 months and error should be returned
- Using API endpoint test:
  - Issue policy, cancel, and reactivate
  - Change start date to over 3 months in the past, try to reactivate, should get error returned.
- Issuing from dashboard:
  - Issue policy from dashboard, cancel from dashboard dropdown, reactivate from dashboard dropdown

### Authors considerations checklist

- [ ] Has unit tests been written to prove the PR is working?
- [ ] Is this PR being created into the correct branch (main or development)?

### Feedback and review

[Please add any feedback here]:

- Was the specification clear enough?
- Was the Root documentation and guides clear enough?
