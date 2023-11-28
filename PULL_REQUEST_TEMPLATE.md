### Which part of the onboarding is this for?

- [ ] Part 1: Getting Set Up with Your First Product
- [ ] Part 2: Generating Insurance Quotes
- [ ] Part 3: Issuing Policies
- [ ] Part 4: Part 4: Amending Policies with Alteration Hooks
- [ ] Part 5: Lifecycle Hooks and Reactivation
- [ ] Part 6: Scheduled Functions and Anniversary Logic
- [ ] Part 7: Crafting Documents and Documentation
- [ ] Part 8: Building a Claims and Payout Flow
- [ ] 
### What has been implemented in this PR?

(The "what" of the PR should be a clearly defined title in present tense i.e "Add Reactivation Logic")

### How was testing done?

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

#### Were the specifications and Root guides clear enough?

#### What could have been explicated better to make this part easier to understand?

### Part Specific Questions

// Add your answers here for part specific questions, if necessary 
