## **Property Eye: System Flows & Notifications** 

This connects the dots between the other four documents. Each one defines a page or a policy on its own, this one shows how an action in one place actually moves through the rest of the system, and defines every notification that needs to exist, who it goes to, what triggers it, and what it says. 

Going through this properly surfaced two real problems in the existing notification templates, not just gaps. Both are fixed below, not just flagged. 

## **Part A: End-to-End Flows** 

## **A1. Case Lifecycle Flow** 

1. The algorithm confirms a match, withdrawal, sale in the Price Paid Dataset, buyer matched. The case appears in the Case Queue on Admin Overview (3.1). 

2. There is no assignment step. Any user with Admin or Analyst access can open the case directly from the queue and start working it, whoever gets to it does. 

3. That person works the case through Case Management (3.3): Status moves from Open to Under Legal Review, optionally Flagged if recovery stalls. 

4. Whoever worked it submits a Determination, Recovery Outcome, and Recovered Amount if applicable. The case moves to Pending Approval. The Determination Pending Approval notification fires to Admin. 

5. An Admin reviews it. If sent back, the Determination Returned notification fires to whoever submitted it, with the reason, and the case returns to step 3. If approved, the case becomes Closed. 

6. Closing the case triggers everything downstream at once: the Fraud Detected or Case Cleared notification fires to the agency depending on Determination, the agency’s own Case Management view (4.2) updates to show the matching restricted status, Commission Recovered and Clearance Rate on Admin Overview (3.1) update, and if the case was Fraudulent and Recovered, the agency’s referring marketer’s aggregate counts on My Agencies (5) update and a Marketer Commission becomes calculable. 

## **A2. Agency Dispute Flow** 

1. An agency views a Closed case in their own Case Management (4.2) and uses Raise Dispute. This is only available on Closed cases. 

2. The Dispute Received notification fires to the agency immediately, confirming it was received. 

3. An Agency Dispute flag appears on that case in Admin Case Management (3.3), separate from any Recovery Outcome dispute. The Agency Dispute Raised notification fires to Admin. 

4. An Admin follows up with the agency directly, outside the platform if needed, and marks the flag Resolved. 

5. The Dispute Resolved notification fires to the agency, and the Dispute indicator on their case row updates to Resolved. 

## **A3. Marketer Attribution Flow** 

1. A marketer submits a claim on an agency, Manual, Invite, or Link, through their own portal. It appears in the Attribution Queue (3.7). 

2. The Attribution Claim Submitted notification fires to Admin. 

3. If another marketer already claims the same agency, the claim shows as Conflict, and the Attribution Conflict Detected notification fires to Admin. 

4. An Admin approves one claim and rejects any conflicting one. The Attribution Claim Approved or Attribution Claim Rejected notification fires to the relevant marketer or marketers. 

5. An approved claim makes the marketer eligible for Marketer Commission on any future confirmed and recovered case tied to that agency, see A5. 

1 

## **A4. Billing & Sweep Flow** 

1. Each agency is billed monthly, independent of any other agency’s billing date. This is real, automatic billing revenue, tracked on Billing & Finance (3.5). 

2. The Billing Reminder notification fires three days before each agency’s own monthly billing date. 

3. Twice a year, on the dates configured in Admin Settings under Scheduling (3.8), the Run Checks button becomes available to Admin. 

4. The day before, the Account Review Reminder notification fires to every agency, prompting them to make sure their data integration is healthy ahead of the review. This does not mention a sweep or a twice-yearly cycle, see Part B for why. 

5. Running checks processes every agency’s withdrawn properties and feeds new confirmed matches into the Case Queue, starting the Case Lifecycle Flow in A1 for each one. 

6. Once an agency’s properties have all been processed, the Account Review Update notification fires to that agency, a closure message with no case count attached, see Part B. 

## **A5. Marketer Commission Flow** 

1. A case closes as Fraudulent and Recovered, per A1. Property Eye Share is calculated as fifty percent of Recovered Amount. 

2. If the agency involved has an approved, active marketer attribution, a Marketer Commission is calculated against Property Eye Share, not the full Recovered Amount, see the Data Dictionary & Glossary for why. 

3. This appears as Pending Approval on Admin’s Marketer Commissions tab (3.5). The Commission Approval Pending notification fires to Admin. 

4. An Admin approves it. It moves to Approved (Awaiting Payment), and the Commission Approved notification fires to the marketer, including the amount and expected payment date. 

5. Once paid, it moves to Paid, and the Commission Paid notification fires to the marketer. 

6. The marketer’s own Commissions and Payments pages, and the relevant agency’s row on My Agencies, update to reflect this. 

## **Part B: Notifications** 

All templates are configured in one place, Admin Settings, under Notifications and Message Templates (3.8). This is the full list that page needs to support, not just the four shown in the original templates. 

## **Two existing templates needed fixing, not just listing** 

**Sweep Scheduled, as originally written, told agencies directly that a sweep was happening tomorrow.** That reveals the exact thing we decided agencies should never know, that checks run twice a year in a batch, since they are told the service runs monthly. Renamed to Account Review Reminder and reworded to keep the genuinely useful part, prompting them to check their data integration, without naming the cadence. 

**Check Completed, as originally written, stated a specific number of cases identified before any of those cases had gone through the approval workflow.** That overstates certainty on something that might later be cleared as Not Fraudulent. Renamed to Account Review Update and reworded as a closure message with no case count attached. Individual case outcomes are communicated through Fraud Detected and Case Cleared once each one is actually finalized. 

## **Agency-facing** 

2 

|Notifcation|Channel|Trigger|Template|
|---|---|---|---|
|Fraud Detected|Email|Case closes with|“Dear [Agency Name],|
|||Determination|we’ve identifed a|
|||Fraudulent|confrmed case|
|||(Confrmed)|afecting [Property|
||||Address]. Please|
||||review the details in|
||||your dashboard.”|
|Case Cleared|Email|Case closes with|“Dear [Agency Name],|
|||Determination Not|the case we were|
|||Fraudulent (Cleared)|reviewing for|
||||[Property Address]|
||||has been cleared and|
||||did not involve fraud.|
||||No further action is|
||||needed.”|
|Account Review|SMS|One day before a|“Property Eye Alert:|
|Reminder||scheduled Sweep|Your account review|
|||Date|is coming up. Please|
||||make sure your data|
||||integration is up to|
||||date and healthy.”|
|Account Review|Email|An agency’s|“Your account review|
|Update||properties have|for [Period] is|
|||fnished processing in|complete. Check your|
|||the current sweep|dashboard for any|
||||updates to your|
||||cases.”|
|Billing Reminder|SMS|Three days before the|“Your Property Eye|
|||agency’s own monthly|subscription for|
|||billing date|[Month] is due.|
||||Please review your|
||||billing tab to avoid|
||||service interruption.”|
|Dispute Received|Email|Agency uses Raise|“We’ve received your|
|||Dispute on a closed|dispute regarding|
|||case|[Case Reference]. Our|
||||team will be in touch|
||||directly to discuss this|
||||with you.”|
|Dispute Resolved|Email|Admin marks an|“Your dispute|
|||Agency Dispute fag|regarding [Case|
|||Resolved|Reference] has been|
||||resolved. Please|
||||check your dashboard,|
||||or reach out if you|
||||have any questions.”|



## **Admin and Analyst facing, internal** 

3 

|Notifcation|Channel|Trigger|Template|
|---|---|---|---|
|Determination|In-app|An Analyst submits a|“[Case Reference] is|
|Pending Approval||Determination|awaiting your|
||||approval.”|
|Determination|In-app|An Admin sends a|“[Case Reference]|
|Returned||Determination back|was returned with|
|||with feedback|feedback: [Note].”|
|Agency Dispute|In-app and email|An agency raises a|“[Agency Name] has|
|Raised||dispute on a closed|raised a dispute on|
|||case|[Case Reference].|
||||Review and follow up|
||||directly.”|
|Attribution Claim|In-app|A marketer submits|“[Marketer Name]|
|Submitted||an attribution claim|has submitted a claim|
||||on [Agency Name].”|
|Attribution Confict|In-app|Two marketers claim|“Confict detected on|
|Detected||the same agency|[Agency Name]|
||||between [Marketer A]|
||||and [Marketer B].”|
|Commission Approval|In-app|A marketer|“[Marketer Name]’s|
|Pending||commission is|commission on [Case|
|||calculated and|Reference] is awaiting|
|||awaiting approval|approval.”|



## **Marketer-facing** 

|Notifcation|Channel|Trigger|Template|
|---|---|---|---|
|Attribution Claim|Email|Admin approves a|“Your claim on|
|Approved||marketer’s claim|[Agency Name] has|
||||been approved.”|
|Attribution Claim|Email|Admin rejects a|“Your claim on|
|Rejected||marketer’s claim|[Agency Name] was|
||||not approved.”|
|New Activity On Your|Email|Any of a referred|“One of the agencies|
|Agency||agency’s case counts|you referred has new|
|||change|account activity.|
||||Check your dashboard|
||||for updated fgures.”|
|Commission Approved|Email|A marketer|“Your commission of|
|||commission moves to|[Amount] is approved|
|||Approved (Awaiting|and will be paid on|
|||Payment)|[Date].”|
|Commission Paid|Email|A marketer|“Your commission of|
|||commission is paid|[Amount] has been|
|||out|paid.”|



The marketer-facing templates state real amounts. This is the marketer’s own earnings, not case detail about an agency, so it carries none of the containment concerns that apply to agency or case-level information elsewhere in the product. 

4 

## **Part C: Gaps Found While Building This** 

- **Marketers have no notification settings page, and this needs building.** Every persona shows a notification bell, but no screenshot ever showed a Marketer Settings page with the kind of email, SMS, push toggle agencies have in 4.6. A Settings nav item should be added to the Marketer Portal with a Notifications tab, Email, SMS, and Push toggles only, no message templates, since template content stays Admin-controlled, mirroring exactly how 4.6 works for agencies. This is now a build item, see the Dashboard & Page Content Plan, Section 5. 

- **The marketer commission rate.** The 7.5 percent figure that appeared in the original templates is placeholder data, not a real value, and should not be read as suggesting anything about what the actual rate should be. Whether it is a single flat rate or varies by marketer is entirely undecided and needs a real decision from scratch, not an estimate carried over from mock data. 

- **Channel assignments for every newly defined notification are recommendations, not confirmed decisions.** The four original templates had a stated channel, the new ones in this document were assigned a channel based on what seemed sensible, in-app for internal operational events, email for anything with a financial or case outcome attached. Worth a final pass before these are built. 

5 

