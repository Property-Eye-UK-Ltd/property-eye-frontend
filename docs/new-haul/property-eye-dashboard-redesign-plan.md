## **Property Eye: Dashboard & Page Content Plan**

This document is one of four. It covers page content only: cards, charts, tables, and the case management workflow itself. Three related documents exist or will follow separately: 

- **Subscription & Recovery Revenue Model** , covering how Property Eye actually makes money, the proposed agency fee structure, and the reasoning behind it, written for the client conversation specifically 
- **Roles & Permissions** , covering what departments and roles exist on the Admin side and what each can access, plus what roles an agency can assign to their own team members 
- **Data Dictionary / Glossary** , covering one definition and calculation source per metric used anywhere in the product

Anything below that touches on roles or terminology gets flagged and deferred to those documents rather than decided here. 

Every table below uses the same four columns: **Element** (what it is), **Decision** (Keep, Remove, New, Modify, or Hold), **Why** (the reasoning behind that decision, written so it makes sense with no other context), and **What To Build** (the concrete instruction for whoever implements it). 

## **1. Problems We Found**

Going through the templates with the client, here is everything that came up before we got into solutions. 

1. **Recovered/revenue cards imply automation that does not exist.** Cards like “Total Income,” “Commission Recovered,” and “Total Recoveries” are presented as live, computed numbers. But the algorithm’s job stops the moment a buyer match is confirmed. Everything after that (pursuing recovery, legal action, settlement, the actual amount recovered) sits with the Legal team, and right now none of that has anywhere to live in the product. As built, these cards have no honest source behind them.
2. **Some metrics do not even reconcile with their own components.** On the Admin Overview template, “Total Income” does not add up to Commission Recovered plus Subscription Revenue. That is a placeholder-data symptom, but it points at a real structural problem. We are blending two completely different domains, real automatic subscription billing and manual Legal-dependent recovery, into one number.
3. **Several metrics have no defined source at all.** “Detection vs False Positive Ratio” and “Avg. Fraud Likelihood %” show up on the Agency Analytics template. The matching logic is not probabilistic: withdrawn, sold in the PPD, buyer matches an introduced buyer, that is a confirmed case. There is no defined mechanism that produces a “false positive” or a “likelihood” score unless we deliberately build a dispute process, and even then that is not something an agency should see.
4. **Terminology is inconsistent and sometimes duplicated.** “Total Identified Leaks,” “Total Fraud Alerts,” “Total Agencies,” and “Total Agency Users” show up with identical or nearidentical numbers across different pages, with nothing defining how each is actually calculated or how they differ from each other.
5. **There is no manual case-resolution workflow, even though we need one.** Recovery status, legal outcome, and amount recovered all come from Legal, not the algorithm, which means someone has to manually move a case from “confirmed match” through to “closed” with an outcome. Right now Case Management has no close action, no status lifecycle, no way to flag a stalling case, and barely functional search. Our own System Event Log already logs a “Closed Case” action, which means the data model half expects this workflow, but the actual page was never built to support it.

1

1. **Agencies are shown too much detail about their own cases.** Severity, recovery value, and case-strength signals on the agency side hand agencies exactly the information and motive they would need to go around us and settle directly with the buyer or seller. The client’s revenue depends on staying the intermediary for recovery, so this is a real exposure, not a minor UX issue.
2. **Marketing Admin is built as a separate product, duplicating the main Admin portal.** There is no reason for “Marketing Admin” to exist as a parallel product to “Property Eye Admin.” It should be a module inside the one Admin portal.
3. **Marketers are currently shown more case detail than the agency the case belongs to.** The marketer-facing template includes a full case-by-case breakdown (Detected / Under Review / Confirmed / Recovered, with fraud value and commission eligibility per case). That is more visibility into a case than the agency that owns the case gets. Marketers have their own financial incentive tied to outcomes, and there is no reason for them to see case-level detail at all. Aggregate counts are all they need.
4. **Roles are inconsistent and were never deliberately defined.** Admin/Analyst/Viewer shows up in one template, Manager/Agent in another, with no defined permission model behind either, on the Admin side or the Agency side. Covered fully in the Roles & Permissions document.
5. **Table columns have not been scrutinized the same way cards and charts have.** The Marketer Disputes table carries a Type column that duplicates information already visible in Linked Record. Every table on every page needs the same scrutiny: does this column earn its place.
6. **Settings that belong to Property Eye’s own platform-wide operations were placed in the Agency Settings page instead of Admin.** Scheduling (when checks run), Notification Message Templates (the wording of messages Property Eye sends to agencies), and Data Retention (Property Eye’s own data policy) are not agency-specific data at all. None of it should have been configurable per agency or visible there in the first place.
7. **A full column-level audit across every table surfaced a smaller, separate set of issues.** An undefined column (Rev. on the Agency Performance Report), naming inconsistencies for the same concept across pages (Sync vs Health, Integration vs Type), an inconsistent action label between Admin and Agency Team Management (View vs Edit), a data integrity issue in the placeholder data itself (duplicate transaction and invoice numbers), and one column that conflates two different kinds of billing charges (Payment Type on Agency Account & Billing). One additional case, the Marketer Commission Breakdown table still showing an individual case reference, needs your decision rather than a default fix, since it sits in the same territory as the case-level exposure questions already raised.
8. **The subscription model assumed in the original templates did not match how the business actually works, and has since been worked through properly.** The templates showed tiered plans (Basic, Pro, Premium, Enterprise) and per-agency metered checks against a usage quota, neither of which reflects the real model. The actual model has two distinct revenue streams: a compulsory fifty percent split on any commission recovered, which is the business’s primary profit mechanism, and a monthly fee that exists purely to cover the cost of running checks, priced against real Land Registry costs and banded by agency size rather than feature tier. The check sweep itself runs only twice a year, funded by the monthly fees accumulated over the preceding six months, both because a single month’s revenue alone is not enough to cover a check run, and because batching checks across all agencies at once lets Property Eye access Land Registry’s bulk pricing. Billing and the check sweep run on two separate, deliberately decoupled cycles. Full reasoning and worked figures are in the Subscription & Recovery Revenue Model document.

2 

## **2. Principles We Are Building Around**

A few rules the client and I agreed the team should build from going forward. 

- **The algorithm only ever produces three things automatically: a count of checks run, a confirmed fraud match, and a severity bucket** (Critical/High/Medium/Low, based on the gap between withdrawal date and sale date). Anything past that point is manual. 
- **Manual does not mean hidden. It means designed.** If a number depends on Legal’s work, we build a real step for someone to enter that outcome. We do not pretend it is automatic, and we do not leave it undefined either. 
- **Agencies get restricted visibility, on purpose.** Case status only, open or closed, with outcome. No severity, no recovery value, no internal notes. This protects the client’s position as the intermediary. 
- **Marketers get even less than agencies, aggregate counts only.** Cases found, confirmed, cleared, in progress, per agency they have referred. No case-level view, no individual fraud values, no statuses tied to specific properties. 
- **Every card, chart, and table column needs a one-line definition and a calculation source before it ships.** If we cannot answer what it is measuring and where the number comes from, it does not go on the page. 
- **Marketing folds into the main Admin product, not a separate one.** The external marketer portal stays separate, that is a different organization entirely. The internal Marketing Admin staff view does not need to be its own product.



## **3. Admin Portal (Property Eye staff, full visibility)**



## **3.1 Overview**


| Element           | Decision         | Why                   | What To Build           |
| ----------------- | ---------------- | --------------------- | ----------------------- |
| Next Sweep        | Keep             | Shows the date of the | Pull the live date from |
| countdown         |                  | next scheduled        | the Scheduling          |
|                   |                  | commission check      | settings rather than    |
|                   |                  | sweep and a           | hardcoding it. No       |
|                   |                  | countdown in days. It | other change needed.    |
|                   |                  | refects real          |                         |
|                   |                  | confguration already  |                         |
|                   |                  | defned in Settings >  |                         |
|                   |                  | Scheduling, so it is  |                         |
|                   |                  | accurate and          |                         |
|                   |                  | automatic.            |                         |
| Run Checks button | Keep, Admin only | This button manually  | No change needed for    |
| (header)          |                  | triggers a commission | Admin.                  |
|                   |                  | check sweep.          |                         |
|                   |                  | Confrmed Admin-only   |                         |
|                   |                  | in the Roles &        |                         |
|                   |                  | Permissions           |                         |
|                   |                  | document, agencies    |                         |
|                   |                  | have no role in       |                         |
|                   |                  | running checks        |                         |
|                   |                  | themselves, see 4.0   |                         |
|                   |                  | for why this same     |                         |
|                   |                  | button is removed     |                         |
|                   |                  | there.                |                         |


3 


| Element               | Decision               | Why                      | What To Build           |
| --------------------- | ---------------------- | ------------------------ | ----------------------- |
| Total Checks Run      | Keep                   | A literal count of how   | Display the count of    |
|                       |                        | many withdrawn           | checks run, all time or |
|                       |                        | properties have been     | fltered by the date     |
|                       |                        | checked against the      | range selector already  |
|                       |                        | Land Registry Price      | on the page.            |
|                       |                        | Paid Dataset. This is    |                         |
|                       |                        | the most basic           |                         |
|                       |                        | automatic output the     |                         |
|                       |                        | algorithm produces,      |                         |
|                       |                        | no ambiguity.            |                         |
| Total Agencies        | Keep                   | A simple count of        | No change needed.       |
|                       |                        | agencies onboarded       |                         |
|                       |                        | to the platform. Real    |                         |
|                       |                        | and operational, no      |                         |
|                       |                        | dependency on the        |                         |
|                       |                        | fraud algorithm.         |                         |
| Total Identifed Leaks | Remove or redefne      | This card currently      | Remove this card. If    |
|                       |                        | shows a number           | there is a genuine      |
|                       |                        | identical to Total       | distinct concept here,  |
|                       |                        | Agency Users             | for example a weaker    |
|                       |                        | elsewhere in the         | signal that has not yet |
|                       |                        | template, with           | reached                 |
|                       |                        | nothing anywhere         | confrmed-match          |
|                       |                        | defning what a leak      | status, defne it        |
|                       |                        | actually is or how it    | explicitly in the       |
|                       |                        | difers from a fraud      | Glossary document       |
|                       |                        | alert or a case. This is | before it goes back on  |
|                       |                        | a placeholder artifact,  | the page.               |
|                       |                        | not a real metric.       |                         |
| Total Income          | Remove, split into two | This card blends two     | Remove this card.       |
|                       | cards                  | completely diferent      | Replace with the two    |
|                       |                        | types of money: real,    | cards below so each     |
|                       |                        | automatic                | number has one clear,   |
|                       |                        | subscription revenue     | honest source.          |
|                       |                        | from agency billing,     |                         |
|                       |                        | and manual,              |                         |
|                       |                        | Legal-dependent          |                         |
|                       |                        | commission recovery.     |                         |
|                       |                        | In the current           |                         |
|                       |                        | template these do not    |                         |
|                       |                        | even add up correctly,   |                         |
|                       |                        | which is a symptom of    |                         |
|                       |                        | the deeper problem,      |                         |
|                       |                        | not a typo to fx.        |                         |


4 


| Element              | Decision             | Why                     | What To Build           |
| -------------------- | -------------------- | ----------------------- | ----------------------- |
| Subscription Revenue | New                  | Isolates the real,      | Pull directly from the  |
| (new card)           |                      | automatic billing       | billing system, the     |
|                      |                      | revenue Property Eye    | same source used on     |
|                      |                      | earns from the agency   | the Billing & Finance   |
|                      |                      | fee, completely         | page.                   |
|                      |                      | separate from           |                         |
|                      |                      | anything to do with     |                         |
|                      |                      | fraud case outcomes.    |                         |
|                      |                      | This is cost-recovery   |                         |
|                      |                      | revenue for running     |                         |
|                      |                      | checks, not the         |                         |
|                      |                      | business’s main proft   |                         |
|                      |                      | stream, see the         |                         |
|                      |                      | Subscription &          |                         |
|                      |                      | Recovery Revenue        |                         |
|                      |                      | Model document.         |                         |
| Commission           | New, only once 3.3’s | This is Property Eye’s  | Do not build this card  |
| Recovered (new card) | workfow exists       | revenue from the        | until the Case          |
|                      |                      | compulsory ffty         | Management              |
|                      |                      | percent recovery split, | close-out workfow in    |
|                      |                      | the business’s          | 3.3 exists and is in    |
|                      |                      | primary proft stream.   | active use. Once it     |
|                      |                      | It can only ever be as  | exists, this card shows |
|                      |                      | good as the manual      | ffty percent of the     |
|                      |                      | data entered when a     | sum of the Recovered    |
|                      |                      | case is closed, and     | Amount feld across      |
|                      |                      | there is no             | all cases closed as     |
|                      |                      | mechanism for           | Fraudulent and          |
|                      |                      | anyone to enter a       | Recovered, not the      |
|                      |                      | recovered amount yet.   | full recovered amount,  |
|                      |                      |                         | since the agency        |
|                      |                      |                         | keeps the other half.   |
| Clearance Rate (new  | New                  | Tells Admin what        | Calculate as the count  |
| card)                |                      | proportion of fagged    | of cases closed with    |
|                      |                      | cases turn out not to   | Determination equal     |
|                      |                      | be fraud, a real        | to Not Fraudulent,      |
|                      |                      | measure of how well     | divided by the count    |
|                      |                      | the algorithm’s signal  | of all cases ever       |
|                      |                      | is performing. This is  | closed, shown as a      |
|                      |                      | now possible because    | percentage.             |
|                      |                      | of the Determination    |                         |
|                      |                      | feld added in 3.3.      |                         |


5 


| Element              | Decision             | Why                     | What To Build           |
| -------------------- | -------------------- | ----------------------- | ----------------------- |
| Users Activity chart | Modify               | In the current          | Decide explicitly what  |
|                      |                      | template this is a line | this chart tracks. The  |
|                      |                      | chart labeled Users     | most useful version is  |
|                      |                      | Activity running        | probably number of      |
|                      |                      | January to December     | checks submitted by     |
|                      |                      | with values from 0 to   | agencies per month,     |
|                      |                      | 100, but nothing        | since that is           |
|                      |                      | anywhere defnes         | something we already    |
|                      |                      | what is actually being  | track and gives real    |
|                      |                      | counted. It could       | insight into platform   |
|                      |                      | mean agency staf        | usage. Whatever is      |
|                      |                      | logging in, Admin       | chosen, label the       |
|                      |                      | staf logging in, or     | chart title and the Y   |
|                      |                      | something else          | axis with that unit so  |
|                      |                      | entirely. As it stands, | it is unambiguous.      |
|                      |                      | nobody building the     |                         |
|                      |                      | backend knows what      |                         |
|                      |                      | query to write, and     |                         |
|                      |                      | nobody building the     |                         |
|                      |                      | frontend knows what     |                         |
|                      |                      | to label the axis.      |                         |
| Case Queue table     | Keep, most important | Lists newly confrmed    | No structural change    |
|                      | table on the page    | fraud matches that      | needed, but link each   |
|                      |                      | have not yet been       | row directly into the   |
|                      |                      | worked. This is the     | expanded Case           |
|                      |                      | literal point where the | Management page in      |
|                      |                      | algorithm’s automatic   | 3.3, so clicking a row  |
|                      |                      | output gets handed to   | opens the full case     |
|                      |                      | a human, the single     | record with Status      |
|                      |                      | most operationally      | and Determination       |
|                      |                      | important element on    | felds. Any user with    |
|                      |                      | this page.              | Admin or Analyst        |
|                      |                      |                         | access can open and     |
|                      |                      |                         | work any case from      |
|                      |                      |                         | this queue, there is no |
|                      |                      |                         | assignment step.        |
| Subscription Revenue | Modify               | The fee now comes       | Rebuild this as a       |
| Breakdown (donut)    |                      | from two named          | breakdown by Plan,      |
|                      |                      | plans, Starter and      | Starter versus          |
|                      |                      | Enterprise, identical   | Enterprise, see the     |
|                      |                      | in service and scaled   | Subscription &          |
|                      |                      | by agency size, rather  | Recovery Revenue        |
|                      |                      | than the original       | Model document for      |
|                      |                      | undefned feature        | the full plan           |
|                      |                      | tiers. A breakdown by   | defnitions and          |
|                      |                      | plan is meaningful      | pricing.                |
|                      |                      | again, just on an       |                         |
|                      |                      | honest basis this time. |                         |


6 


| Element               | Decision              | Why                    | What To Build          |
| --------------------- | --------------------- | ---------------------- | ---------------------- |
| Fraud Distribution    | Keep                  | Shows confrmed         | No change needed.      |
| (H1 vs H2 bar)        |                       | fraud case counts      |                        |
|                       |                       | split by frst half     |                        |
|                       |                       | versus second half of  |                        |
|                       |                       | the year. A real,      |                        |
|                       |                       | automatic output of    |                        |
|                       |                       | the algorithm, since   |                        |
|                       |                       | every confrmed         |                        |
|                       |                       | match has a date       |                        |
|                       |                       | attached.              |                        |
| Severity Distribution | Keep, consider        | Shows the breakdown    | No functional change   |
| (donut)               | merging visually with | of Critical, High,     | needed. During         |
|                       | Case Queue            | Medium, Low severity   | design, consider       |
|                       |                       | across cases,          | placing this directly  |
|                       |                       | calculated             | next to the Case       |
|                       |                       | automatically from     | Queue table rather     |
|                       |                       | the gap between        | than elsewhere on the  |
|                       |                       | withdrawal date and    | page, since they       |
|                       |                       | sale date. Draws from  | describe the same set  |
|                       |                       | the same underlying    | of cases from two      |
|                       |                       | data as the Case       | angles.                |
|                       |                       | Queue table, just      |                        |
|                       |                       | summarized             |                        |
|                       |                       | diferently.            |                        |
| Annual Checks         | Keep                  | Shows per-agency       | No change needed.      |
| Breakdown (table)     |                       | check counts split by  |                        |
|                       |                       | frst half and second   |                        |
|                       |                       | half of the year.      |                        |
|                       |                       | Purely operational     |                        |
|                       |                       | and automatic, no      |                        |
|                       |                       | ambiguity.             |                        |
| Fraud Detection       | Keep, fx axis         | A genuinely useful,    | Fix the chart so the X |
| Growth (line chart)   |                       | real metric, confrmed  | axis shows a single,   |
|                       |                       | fraud cases over time, | continuous timeline,   |
|                       |                       | but in the current     | for example month by   |
|                       |                       | template the X axis    | month over the last 24 |
|                       |                       | renders incorrectly,   | months, rather than    |
|                       |                       | repeating year labels  | the current            |
|                       |                       | across multiple        | overlapping year       |
|                       |                       | overlapping sets       | labels.                |
|                       |                       | instead of a single    |                        |
|                       |                       | clean timeline.        |                        |
| Marketing summary     | New                   | Now that Marketing     | Add a single card, for |
| card                  |                       | Admin is folding into  | example Active         |
|                       |                       | the main Admin         | Marketers: 32, that    |
|                       |                       | product, Overview      | links through to the   |
|                       |                       | should refect that at  | full Afiliates section |
|                       |                       | a glance without       | for anyone who wants   |
|                       |                       | becoming cluttered     | the detail. Do not     |
|                       |                       | with every marketing   | duplicate the full     |
|                       |                       | metric.                | marketing KPI set      |
|                       |                       |                        | here, see 3.7.         |




7 

## **3.2 Agencies**


| Element              | Decision          | Why                    | What To Build            |
| -------------------- | ----------------- | ---------------------- | ------------------------ |
| Total Agencies       | Keep              | Simple count of        | No change needed.        |
|                      |                   | onboarded agencies,    |                          |
|                      |                   | real and operational.  |                          |
| Total Agency Users   | Keep              | Count of individual    | No change needed.        |
|                      |                   | user accounts across   |                          |
|                      |                   | all agencies, real and |                          |
|                      |                   | operational.           |                          |
| Total Open Cases     | Keep              | Count of confrmed      | Count cases where        |
|                      |                   | fraud matches that     | Status is not yet        |
|                      |                   | have not yet reached   | Closed, once 3.3         |
|                      |                   | Closed status,         | ships.                   |
|                      |                   | combining the          |                          |
|                      |                   | algorithm’s automatic  |                          |
|                      |                   | output with the new    |                          |
|                      |                   | manual Status feld     |                          |
|                      |                   | from 3.3.              |                          |
| Commissions          | Move out, or hold | Same underlying        | Remove this card         |
| Recovered (top card) | until 3.3 exists  | issue as Total Income  | from this page until     |
|                      |                   | on Overview, this      | 3.3 is built. Once it    |
|                      |                   | number depends         | exists, it can return as |
|                      |                   | entirely on manual     | a real card sourced      |
|                      |                   | entry from the Case    | from the Recovered       |
|                      |                   | Management             | Amount feld.             |
|                      |                   | close-out workfow,     |                          |
|                      |                   | which does not exist   |                          |
|                      |                   | yet.                   |                          |
| Agencies table       | Keep as is        | Shows Plan Tier,       | No change needed.        |
|                      |                   | Users, Integration     |                          |
|                      |                   | type, Checks, Fraud    |                          |
|                      |                   | count, Sync health,    |                          |
|                      |                   | and Status per agency. |                          |
|                      |                   | All real, operational  |                          |
|                      |                   | data describing the    |                          |
|                      |                   | agency’s account and   |                          |
|                      |                   | integration health,    |                          |
|                      |                   | not fraud case detail, |                          |
|                      |                   | so nothing here is     |                          |
|                      |                   | sensitive.             |                          |


8 


| Element              | Decision | Why                        | What To Build         |
| -------------------- | -------- | -------------------------- | --------------------- |
| Agencies table: Plan | Modify   | Keep the column            | Populate this column  |
| Tier column          |          | name Plan, but the         | from the agency’s     |
|                      |          | value is now one of        | actual seat count or  |
|                      |          | two defned plans,          | check volume against  |
|                      |          | Starter or Enterprise,     | the thresholds defned |
|                      |          | each with a                | in the Subscription & |
|                      |          | documented set of          | Recovery Revenue      |
|                      |          | inclusions, not the        | Model document, not   |
|                      |          | original undefned Ba-      | a chosen plan name.   |
|                      |          | sic/Pro/Premium/Enterprise |                       |
|                      |          | tiers. Assignment is       |                       |
|                      |          | based on an objective      |                       |
|                      |          | measure, staf seats        |                       |
|                      |          | or average check           |                       |
|                      |          | volume, not a tier the     |                       |
|                      |          | agency self-selects.       |                       |
| Sync column          | Modify   | This column shows          | Standardize on one    |
| terminology          |          | Healthy, Unhealthy, or     | name, recommend       |
|                      |          | Ofine for an               | Sync since it more    |
|                      |          | agency’s data feed         | precisely describes   |
|                      |          | connection. The same       | what is being         |
|                      |          | concept appears on         | measured, and use it  |
|                      |          | the Reports page’s         | everywhere this       |
|                      |          | Agency Performance         | concept appears,      |
|                      |          | Report under the           | including 3.6.        |
|                      |          | column name Health.        |                       |
|                      |          | Two diferent names         |                       |
|                      |          | for the same thing         |                       |
|                      |          | makes it harder for        |                       |
|                      |          | the team to know they      |                       |
|                      |          | are the same feld.         |                       |
| Integration column   | Modify   | This column shows          | Standardize on one    |
| terminology          |          | the agency’s data          | name, recommend       |
|                      |          | feed method, ALTO,         | Integration since     |
|                      |          | API, CSV, PDF, or          | Type alone is         |
|                      |          | Reapit. The same           | ambiguous outside     |
|                      |          | concept appears on         | this specifc context, |
|                      |          | the Reports page’s         | and use it everywhere |
|                      |          | Agency Performance         | this concept appears, |
|                      |          | Report under the           | including 3.6.        |
|                      |          | column name Type.          |                       |
|                      |          | Same naming                |                       |
|                      |          | inconsistency as           |                       |
|                      |          | Sync/Health above.         |                       |




## **3.3 Case Management, Admin**

This is the page that needs real build work, not just cleanup. This is where the manual workflow has to actually live. 

9 


| Element               | Decision         | Why                      | What To Build           |
| --------------------- | ---------------- | ------------------------ | ----------------------- |
| Case ID, Agency,      | Keep             | These are the core       | No change needed.       |
| Address, Buyer,       |                  | facts the algorithm      |                         |
| Withdrawal Date, Sale |                  | produces                 |                         |
| Date                  |                  | automatically for        |                         |
|                       |                  | every confrmed           |                         |
|                       |                  | match, which             |                         |
|                       |                  | property, which          |                         |
|                       |                  | agency, which buyer      |                         |
|                       |                  | was matched, and the     |                         |
|                       |                  | two dates used to        |                         |
|                       |                  | calculate severity. No   |                         |
|                       |                  | ambiguity here.          |                         |
| Severity              | Keep, Admin only | Automatically            | No change needed for    |
|                       |                  | calculated from the      | Admin.                  |
|                       |                  | gap between              |                         |
|                       |                  | withdrawal date and      |                         |
|                       |                  | sale date, bucketed      |                         |
|                       |                  | into Critical, High,     |                         |
|                       |                  | Medium, Low.             |                         |
|                       |                  | Restricted on the        |                         |
|                       |                  | agency side because      |                         |
|                       |                  | it signals how strong    |                         |
|                       |                  | a case is, see 4.2, but  |                         |
|                       |                  | Admin staf need full     |                         |
|                       |                  | visibility to prioritize |                         |
|                       |                  | their own workload.      |                         |
| Status                | New vocabulary   | The current template     | Replace the existing    |
|                       |                  | has no real status       | status feld with four   |
|                       |                  | lifecycle, just a binary | values: Open (just      |
|                       |                  | Checked/Pending.         | confrmed by the         |
|                       |                  | That does not refect     | algorithm, not yet      |
|                       |                  | what actually happens    | actioned), Under        |
|                       |                  | to a case after it is    | Legal Review (handed    |
|                       |                  | confrmed, it has to go   | to Legal), Flagged      |
|                       |                  | to Legal, sit there for  | (Recovery Issue)        |
|                       |                  | a while, possibly hit a  | (Legal has hit a snag), |
|                       |                  | snag, and eventually     | and Closed (the case    |
|                       |                  | close. Without a real    | has reached a fnal      |
|                       |                  | lifecycle there is no    | outcome, see            |
|                       |                  | way to track where a     | Determination below).   |
|                       |                  | case actually sits.      |                         |


10 


| Element          | Decision            | Why                    | What To Build           |
| ---------------- | ------------------- | ---------------------- | ----------------------- |
| Determination    | New                 | Closing a case as just | Add a required feld,    |
|                  |                     | Closed does not tell   | either Fraudulent       |
|                  |                     | anyone whether it      | (Confrmed) or Not       |
|                  |                     | actually turned out to | Fraudulent (Cleared).   |
|                  |                     | be fraud or not.       | Per the Roles &         |
|                  |                     | Without this feld,     | Permissions             |
|                  |                     | every closed case      | document, this is a     |
|                  |                     | looks identical        | propose-then-approve    |
|                  |                     | regardless of          | action, an Analyst or   |
|                  |                     | outcome, which         | Admin submits it, an    |
|                  |                     | means we lose the      | Admin gives fnal        |
|                  |                     | ability to measure     | approval before the     |
|                  |                     | how often our signal   | case actually closes.   |
|                  |                     | is right, and we lose  |                         |
|                  |                     | the data needed for a  |                         |
|                  |                     | meaningful false       |                         |
|                  |                     | positive metric.       |                         |
| Recovery Outcome | New, only shown if  | Once fraud is          | When Determination      |
|                  | Determination is    | confrmed, we still     | is set to Fraudulent,   |
|                  | Fraudulent          | need to know what      | reveal a second         |
|                  |                     | actually happened      | required feld with      |
|                  |                     | with the recovery      | three options:          |
|                  |                     | itself, did the agency | Recovered,              |
|                  |                     | get their commission,  | Unrecovered,            |
|                  |                     | did it become a legal  | Disputed. Keep this     |
|                  |                     | dispute, or did it     | feld hidden entirely    |
|                  |                     | ultimately go          | for Not Fraudulent      |
|                  |                     | unrecovered.           | cases.                  |
| Recovered Amount | New, only shown if  | This is the actual,    | A manual currency       |
|                  | Recovery Outcome is | honest source for the  | entry feld that only    |
|                  | Recovered           | Commission             | unlocks once            |
|                  |                     | Recovered card on      | Recovery Outcome is     |
|                  |                     | Overview and           | set to Recovered.       |
|                  |                     | elsewhere. This feld   | Once entered, the       |
|                  |                     | should capture the     | case record should      |
|                  |                     | full commission        | show both halves        |
|                  |                     | amount recovered,      | explicitly, Agency      |
|                  |                     | before the ffty        | Share and Property      |
|                  |                     | percent split, not     | Eye Share, each ffty    |
|                  |                     | Property Eye’s share   | percent of this fgure,  |
|                  |                     | alone.                 | rather than leaving     |
|                  |                     |                        | the split implicit. Any |
|                  |                     |                        | Commission              |
|                  |                     |                        | Recovered style         |
|                  |                     |                        | metric elsewhere in     |
|                  |                     |                        | the product should      |
|                  |                     |                        | sum the Property Eye    |
|                  |                     |                        | Share, not the full     |
|                  |                     |                        | Recovered Amount.       |


11 


| Element             | Decision             | Why                     | What To Build         |
| ------------------- | -------------------- | ----------------------- | --------------------- |
| Reason for Clearing | New, only shown if   | When a case turns out   | When Determination    |
|                     | Determination is Not | not to be fraud,        | is set to Not         |
|                     | Fraudulent           | discarding that         | Fraudulent, reveal a  |
|                     |                      | information wastes a    | required dropdown:    |
|                     |                      | learning opportunity.   | Data error,           |
|                     |                      | Knowing why it was      | Coincidental match,   |
|                     |                      | cleared, a data error   | Agency                |
|                     |                      | from the agency, a      | documentation         |
|                     |                      | coincidental name       | provided, Other (with |
|                     |                      | match, documentation    | a free text feld for  |
|                     |                      | that explains the sale, | Other).               |
|                     |                      | or something else,      |                       |
|                     |                      | helps us understand     |                       |
|                     |                      | whether the             |                       |
|                     |                      | algorithm’s signal      |                       |
|                     |                      | needs tuning over       |                       |
|                     |                      | time.                   |                       |
| Reopen action       | New                  | A case cleared as Not   | Add a Reopen action   |
|                     |                      | Fraudulent today        | available on any      |
|                     |                      | could turn out to       | Closed case, which    |
|                     |                      | actually be fraud if    | returns it to Open    |
|                     |                      | new evidence shows      | status and clears the |
|                     |                      | up later, for example   | previous              |
|                     |                      | if the agency submits   | Determination,        |
|                     |                      | documentation we did    | requiring it to go    |
|                     |                      | not have before.        | through the full      |
|                     |                      | Without a reopen        | close-out process     |
|                     |                      | path, that case is      | again once the new    |
|                     |                      | permanently and         | information has been  |
|                     |                      | incorrectly stuck as    | reviewed. Admin-only, |
|                     |                      | cleared with no way     | per the Roles &       |
|                     |                      | to correct it.          | Permissions           |
|                     |                      |                         | document, since it    |
|                     |                      |                         | reverses an           |
|                     |                      |                         | already-approved      |
|                     |                      |                         | outcome.              |


12 


| Element            | Decision | Why                    | What To Build          |
| ------------------ | -------- | ---------------------- | ---------------------- |
| Agency Dispute fag | New      | We agreed agencies     | Add a visible fag on   |
|                    |          | should be able to push | any case where the     |
|                    |          | back on a closed case  | linked agency has      |
|                    |          | without being able to  | used the Raise         |
|                    |          | reopen it themselves.  | Dispute action         |
|                    |          | This needs to show up  | described in 4.2. This |
|                    |          | clearly on the Admin   | should trigger a       |
|                    |          | side as its own        | notifcation to Admin   |
|                    |          | indicator, separate    | staf and should be     |
|                    |          | from the Recovery      | resolvable, marked     |
|                    |          | Outcome’s Disputed     | Resolved once          |
|                    |          | value, because those   | someone has followed   |
|                    |          | are two diferent       | up with the agency,    |
|                    |          | things. Recovery       | independently of       |
|                    |          | Outcome’s Disputed     | whatever the case’s    |
|                    |          | means the              | actual Status or       |
|                    |          | legal/recovery         | Determination          |
|                    |          | process itself is      | already is. Admin-only |
|                    |          | contested. This fag    | to resolve, per the    |
|                    |          | means the agency       | Roles & Permissions    |
|                    |          | disagrees with our     | document.              |
|                    |          | determination and      |                        |
|                    |          | wants to be contacted  |                        |
|                    |          | about it.              |                        |
| Flag / Note feld   | New      | Recovery can stall for | A free text note feld  |
|                    |          | all kinds of reasons,  | on each case, with the |
|                    |          | the agency is not      | ability to mark a note |
|                    |          | responding, the buyer  | as an active fag that  |
|                    |          | is contesting, Legal   | surfaces the case in a |
|                    |          | needs more             | fltered view of cases  |
|                    |          | documentation, and     | needing attention.     |
|                    |          | right now there is no  |                        |
|                    |          | way for staf to record |                        |
|                    |          | that a case needs      |                        |
|                    |          | attention without      |                        |
|                    |          | changing its formal    |                        |
|                    |          | Status.                |                        |
| Functional search  | New      | The search bar exists  | Make the search bar    |
|                    |          | in the current         | actually query against |
|                    |          | template but does not  | Case ID, Agency        |
|                    |          | actually flter         | name, Address, and     |
|                    |          | anything, it is purely | Buyer name,            |
|                    |          | decorative.            | returning matching     |
|                    |          |                        | rows in real time.     |


13 


| Element                  | Decision | Why                   | What To Build          |
| ------------------------ | -------- | --------------------- | ---------------------- |
| Filters: status, agency, | New      | As the number of      | Add flter dropdowns    |
| severity,                |          | cases grows, Admin    | for Status, Agency,    |
| determination, date      |          | staf need to narrow   | Severity,              |
| range                    |          | the list down to      | Determination, and a   |
|                          |          | exactly what they are | date range picker, all |
|                          |          | working on, for       | usable in combination  |
|                          |          | example all Critical  | with each other and    |
|                          |          | severity cases still  | with the search bar    |
|                          |          | Open, or all cases    | above.                 |
|                          |          | closed this month as  |                        |
|                          |          | Not Fraudulent.       |                        |




## **3.4 Team Management**


| Element             | Decision           | Why                     | What To Build          |
| ------------------- | ------------------ | ----------------------- | ---------------------- |
| Page structure      | Keep               | The layout, Total Staf, | No change needed to    |
|                     |                    | Active Today,           | the layout itself.     |
|                     |                    | Suspended Staf stat     |                        |
|                     |                    | cards plus a staf list  |                        |
|                     |                    | table, is sound and     |                        |
|                     |                    | does not need           |                        |
|                     |                    | restructuring.          |                        |
| Role column values  | Resolved           | Settled in the Roles &  | Populate this column   |
|                     |                    | Permissions             | from the three         |
|                     |                    | document: Admin,        | defned roles.          |
|                     |                    | Analyst, Viewer.        |                        |
|                     |                    | Manager and Agent       |                        |
|                     |                    | are retired entirely.   |                        |
| Status              | Keep               | Simple, real,           | No change needed.      |
| (Active/Disabled)   |                    | operational state of a  |                        |
|                     |                    | staf account.           |                        |
| Action column label | Resolved, use Edit | Team Management is      | Use Edit consistently, |
|                     |                    | Admin-only per the      | matching the Agency    |
|                     |                    | Roles & Permissions     | side.                  |
|                     |                    | document, nobody        |                        |
|                     |                    | who can only view       |                        |
|                     |                    | this page exists, so    |                        |
|                     |                    | View versus Edit was    |                        |
|                     |                    | never really a live     |                        |
|                     |                    | distinction.            |                        |
| Page access         | New                | This page should only   | Restrict this entire   |
|                     |                    | be reachable by users   | page to Admin, per     |
|                     |                    | holding the Admin       | the Roles &            |
|                     |                    | role.                   | Permissions            |
|                     |                    |                         | document.              |


**3.5 Billing & Finance** 

14 


| Element                | Decision             | Why                     | What To Build        |
| ---------------------- | -------------------- | ----------------------- | -------------------- |
| Subscription Revenue,  | Keep                 | Real, automatic         | No change needed.    |
| Subscribers,           |                      | numbers describing      |                      |
| Cancelled              |                      | the fat monthly         |                      |
| Subscriptions          |                      | subscription business,  |                      |
|                        |                      | accurate regardless of  |                      |
|                        |                      | pricing structure.      |                      |
| Pending Renewal        | Keep                 | Billing is monthly and  | No change needed     |
|                        |                      | per agency, each        | beyond confrming     |
|                        |                      | agency has its own      | this refects         |
|                        |                      | individual renewal      | per-agency monthly   |
|                        |                      | date, this is a normal, | renewal dates, not a |
|                        |                      | real count of agencies  | platform-wide cycle. |
|                        |                      | whose monthly           |                      |
|                        |                      | payment is due soon.    |                      |
|                        |                      | This is not tied to the |                      |
|                        |                      | twice-yearly check      |                      |
|                        |                      | sweep, the two run on   |                      |
|                        |                      | separate, deliberately  |                      |
|                        |                      | decoupled cycles.       |                      |
| Billing History table  | Keep                 | Transaction record      | No structural change |
|                        |                      | per agency, sound       | needed. See the Plan |
|                        |                      | regardless of pricing   | column note below.   |
|                        |                      | model.                  |                      |
| Billing History table: | Keep, now meaningful | Since the fee varies    | Populate from the    |
| Plan column            |                      | by plan, recording      | agency’s plan at the |
|                        |                      | which plan, Starter or  | time the transaction |
|                        |                      | Enterprise, applied to  | occurred.            |
|                        |                      | a given transaction     |                      |
|                        |                      | matters, particularly   |                      |
|                        |                      | if an agency moves      |                      |
|                        |                      | from Starter to         |                      |
|                        |                      | Enterprise over time    |                      |
|                        |                      | as they grow.           |                      |
| Billing History data   | Modify               | In the original         | No new feld needed,  |
| integrity              |                      | template, every single  | just a build note:   |
|                        |                      | transaction row         | ensure transaction   |
|                        |                      | shows the identical     | numbers and amounts  |
|                        |                      | reference number,       | are generated        |
|                        |                      | #367280, and several    | correctly per real   |
|                        |                      | rows show identical     | transaction, never   |
|                        |                      | amounts. Placeholder    | duplicated.          |
|                        |                      | artifact, not a real    |                      |
|                        |                      | bug, but worth stating  |                      |
|                        |                      | explicitly before this  |                      |
|                        |                      | is built for real.      |                      |


15 


| Element     |     | Decision | Why                    | What To Build          |
| ----------- | --- | -------- | ---------------------- | ---------------------- |
| Marketer    |     | New      | This is where the old  | Add a second tab on    |
| Commissions | tab |          | Marketing Admin’s      | this page, alongside   |
|             |     |          | separate Finance       | the existing Billing   |
|             |     |          | page folds in.         | History, showing       |
|             |     |          | Subscription revenue,  | marketer commission    |
|             |     |          | money coming in from   | liability, outstanding |
|             |     |          | agencies, and          | commission, and        |
|             |     |          | marketer commission    | paid-this-quarter      |
|             |     |          | liability, money owed  | fgures, sourced from   |
|             |     |          | out to referral        | the same data that     |
|             |     |          | partners, are two      | previously lived in    |
|             |     |          | sides of the same      | Marketing Admin’s      |
|             |     |          | fnancial picture, and  | Finance page.          |
|             |     |          | there is no reason for |                        |
|             |     |          | them to live in two    |                        |
|             |     |          | diferent products.     |                        |




## **3.6 Reports & Exports**


| Element               | Decision | Why                    | What To Build         |
| --------------------- | -------- | ---------------------- | --------------------- |
| Commission            | Split    | Same underlying        | Apply the same split  |
| Recovered,            |          | issue as Overview,     | described in 3.1:     |
| Subscription Revenue, |          | blending automatic     | Subscription Revenue  |
| Cases Open (top       |          | billing data with      | as its own real,      |
| cards)                |          | manual recovery data   | automatic card,       |
|                       |          | into cards that look   | Commission            |
|                       |          | equally live when they | Recovered held back   |
|                       |          | are not.               | until the Case        |
|                       |          |                        | Management            |
|                       |          |                        | workfow exists and is |
|                       |          |                        | feeding it real data. |
| Agency Performance    | Keep     | Per-agency             | No structural change, |
| Report table          |          | breakdown of checks,   | but the Recovered     |
|                       |          | fraud counts,          | column should refect  |
|                       |          | recovered amounts,     | real entries from the |
|                       |          | revenue, and           | Recovered Amount      |
|                       |          | integration health.    | feld in 3.3, not a    |
|                       |          | Mostly real and        | placeholder number.   |
|                       |          | operational, though    |                       |
|                       |          | the Recovered column   |                       |
|                       |          | inherits the same      |                       |
|                       |          | dependency on the      |                       |
|                       |          | 3.3 workfow as         |                       |
|                       |          | everything else        |                       |
|                       |          | recovery-related.      |                       |


16 


| Element              | Decision          | Why                     | What To Build           |
| -------------------- | ----------------- | ----------------------- | ----------------------- |
| Agency Performance   | Resolved          | Defned in full in the   | Calculate as Plan fee   |
| Report: Rev. column  |                   | Data Dictionary &       | plus Property Eye       |
|                      |                   | Glossary document:      | Share for that agency,  |
|                      |                   | that agency’s Plan fee  | for the selected        |
|                      |                   | for the period, plus    | period. Consider        |
|                      |                   | Property Eye Share of   | adding a second         |
|                      |                   | anything recovered      | report that splits      |
|                      |                   | for them in that        | these two streams       |
|                      |                   | period.                 | apart, since they       |
|                      |                   |                         | behave very             |
|                      |                   |                         | diferently over time,   |
|                      |                   |                         | see the Subscription    |
|                      |                   |                         | & Recovery Revenue      |
|                      |                   |                         | Model document.         |
| System Event Log     | Keep, merge with  | Right now there are     | Merge both logs into    |
|                      | Marketing Admin’s | two separate audit      | a single table, with an |
|                      | Audit Log         | trails, one for the     | Actor and Role          |
|                      |                   | main Admin product      | column that makes       |
|                      |                   | and one for Marketing   | clear whether the       |
|                      |                   | Admin. Once             | action was taken by     |
|                      |                   | Marketing folds into    | core Admin staf or by   |
|                      |                   | the main Admin          | someone acting on       |
|                      |                   | product, see 3.7,       | Afiliates/marketing     |
|                      |                   | there is no reason to   | functions.              |
|                      |                   | keep two logs.          |                         |
| Marketer             | New               | These three exports     | Add these as            |
| Performance,         |                   | previously lived on     | additional export       |
| Attribution Summary, |                   | the separate            | options alongside the   |
| Payout Register      |                   | Marketing Admin         | existing Agency         |
| exports              |                   | Reports page, folded    | Performance Report,     |
|                      |                   | in here as part of      | no change to their      |
|                      |                   | merging Marketing       | underlying logic, just  |
|                      |                   | Admin into the main     | relocated.              |
|                      |                   | Admin product.          |                         |
| Clearance / False    | New               | Now that the            | Add an exportable       |
| Positive Rate report |                   | Determination feld      | report showing, per     |
|                      |                   | exists in 3.3, we have  | agency and over time,   |
|                      |                   | a real, defned source   | the count and           |
|                      |                   | for a false positive    | percentage of cases     |
|                      |                   | rate for the frst time, | closed as Not           |
|                      |                   | something the           | Fraudulent versus       |
|                      |                   | original template       | Fraudulent.             |
|                      |                   | tried to show on the    | Admin-only, not         |
|                      |                   | Agency side with no     | exposed to agencies     |
|                      |                   | real data behind it.    | or marketers, see 4.3.  |




## **3.7 New: Affiliates module (Marketing folded into Admin)**

17 


| Element             | Decision       | Why                    | What To Build          |
| ------------------- | -------------- | ---------------------- | ---------------------- |
| Afiliates nav item  | New            | There is no reason for | Add Afiliates as a     |
|                     |                | Marketing Admin to     | top-level nav item in  |
|                     |                | be a separate product  | the main Admin         |
|                     |                | from Property Eye      | portal, sitting        |
|                     |                | Admin. Folding it in   | alongside Agencies     |
|                     |                | as its own nav item    | and Case               |
|                     |                | keeps the marketing    | Management.            |
|                     |                | functionality clearly  |                        |
|                     |                | organized without      |                        |
|                     |                | duplicating an entire  |                        |
|                     |                | second admin           |                        |
|                     |                | product.               |                        |
| Network sub-tab     | New, folded in | This is the marketer   | Move this page’s       |
|                     |                | list and management    | content into a         |
|                     |                | view that previously   | Network sub-tab        |
|                     |                | lived on the separate  | under the new          |
|                     |                | Marketing Admin’s      | Afiliates nav item, no |
|                     |                | Network page. The      | functional changes     |
|                     |                | functionality itself,  | needed.                |
|                     |                | marketer list,         |                        |
|                     |                | agencies referred,     |                        |
|                     |                | fraud value,           |                        |
|                     |                | commission,            |                        |
|                     |                | suspend/activate,      |                        |
|                     |                | does not need to       |                        |
|                     |                | change, only its       |                        |
|                     |                | location.              |                        |
| Attribution sub-tab | New, folded in | Covers the Attribution | Move this page’s       |
|                     |                | Queue (claims          | content into an        |
|                     |                | awaiting approval,     | Attribution sub-tab    |
|                     |                | with confict detection | under the new          |
|                     |                | when two marketers     | Afiliates nav item, no |
|                     |                | claim the same         | functional changes     |
|                     |                | agency) and the        | needed.                |
|                     |                | Disputes tab (Agency   |                        |
|                     |                | Ownership and          |                        |
|                     |                | Commission disputes).  |                        |
|                     |                | This logic is sound as |                        |
|                     |                | designed and does not  |                        |
|                     |                | need rework, only      |                        |
|                     |                | relocation.            |                        |


18 


| Element              | Decision        | Why                    | What To Build          |
| -------------------- | --------------- | ---------------------- | ---------------------- |
| Attribution sub-tab, | Keep            | Unlike the marketer’s  | Keep this column       |
| Dispute Resolution:  |                 | own Disputes view,     | here. This is a        |
| Type column          |                 | see Section 5, where   | deliberate exception   |
|                      |                 | Type was removed       | to the Type-column     |
|                      |                 | because a marketer     | removal applied on     |
|                      |                 | only ever sees their   | the marketer side, not |
|                      |                 | own handful of         | an oversight.          |
|                      |                 | disputes and Linked    |                        |
|                      |                 | Record alone is        |                        |
|                      |                 | self-explanatory, this |                        |
|                      |                 | Admin-side table is    |                        |
|                      |                 | used to triage         |                        |
|                      |                 | disputes across every  |                        |
|                      |                 | marketer at once. At   |                        |
|                      |                 | that scale, being able |                        |
|                      |                 | to see and flter by    |                        |
|                      |                 | Type, Agency           |                        |
|                      |                 | Ownership versus       |                        |
|                      |                 | Commission, has real   |                        |
|                      |                 | operational value.     |                        |
| Finance              | Merged into 3.5 | Marketer commission    | Nothing here, covered  |
|                      |                 | liability is now a tab | in 3.5.                |
|                      |                 | on the main Billing &  |                        |
|                      |                 | Finance page rather    |                        |
|                      |                 | than its own separate  |                        |
|                      |                 | page.                  |                        |
| Reports              | Merged into 3.6 | Marketer-related       | Nothing here, covered  |
|                      |                 | exports are now part   | in 3.6.                |
|                      |                 | of the main Reports &  |                        |
|                      |                 | Exports page rather    |                        |
|                      |                 | than their own         |                        |
|                      |                 | separate page.         |                        |




## **3.8 New: Settings, Admin**

The Admin nav already includes a Settings item, but its content was never specified in any of the original templates. This is where the three misplaced tabs from Agency Settings belong, alongside Admin’s own account settings. 


| Element    | Decision | Why                    | What To Build          |
| ---------- | -------- | ---------------------- | ---------------------- |
| Profle tab | New      | Mirrors the structure  | Build a Profle tab for |
|            |          | of the agency-side     | Property Eye’s own     |
|            |          | Profle tab, but covers | company details or     |
|            |          | Property Eye’s own     | the Admin user’s       |
|            |          | organizational details | account profle.        |
|            |          | or the logged-in       |                        |
|            |          | Admin user’s own       |                        |
|            |          | account, whichever     |                        |
|            |          | the team actually      |                        |
|            |          | needs to manage day    |                        |
|            |          | to day.                |                        |


19 


| Element           | Decision        | Why                     | What To Build          |
| ----------------- | --------------- | ----------------------- | ---------------------- |
| Notifcations &    | New, moved from | The templates here,     | Move the Message       |
| Message Templates | Agency          | Fraud Detected,         | Templates sub-tab      |
| tab               |                 | Sweep Scheduled,        | here in full,          |
|                   |                 | Check Completed,        | unchanged in content,  |
|                   |                 | Billing Reminder, are   | just relocated. This   |
|                   |                 | messages Property       | becomes the single     |
|                   |                 | Eye sends to agencies.  | place these four       |
|                   |                 | The wording of those    | templates are edited   |
|                   |                 | messages is Property    | platform-wide.         |
|                   |                 | Eye’s own outbound      |                        |
|                   |                 | communication,          |                        |
|                   |                 | agencies are the        |                        |
|                   |                 | recipients, not the     |                        |
|                   |                 | author, so it makes no  |                        |
|                   |                 | sense for an agency to  |                        |
|                   |                 | edit the content of a   |                        |
|                   |                 | message Property Eye    |                        |
|                   |                 | uses to inform them.    |                        |
| Scheduling tab    | New, moved from | Check Frequency,        | Move this tab here in  |
|                   | Agency          | Scheduled Sweep         | full. This becomes the |
|                   |                 | Dates, and Automatic    | single source of truth |
|                   |                 | Execution rules         | for the platform’s     |
|                   |                 | control when Property   | check schedule, and    |
|                   |                 | Eye runs its            | the Next Sweep         |
|                   |                 | commission checks       | badge on Admin         |
|                   |                 | against the Price Paid  | Overview should pull   |
|                   |                 | Dataset. This already   | from it directly.      |
|                   |                 | exists as a single      |                        |
|                   |                 | platform-wide setting   |                        |
|                   |                 | refected in the Next    |                        |
|                   |                 | Sweep badge on          |                        |
|                   |                 | Admin Overview, it      |                        |
|                   |                 | was never something     |                        |
|                   |                 | that should vary per    |                        |
|                   |                 | agency or be visible to |                        |
|                   |                 | one.                    |                        |


20 


| Element                 | Decision        | Why                      | What To Build          |
| ----------------------- | --------------- | ------------------------ | ---------------------- |
| Scheduling tab:         | Note            | The Check Frequency      | No change needed       |
| relationship to billing |                 | and Scheduled Sweep      | here beyond making     |
| cycle                   |                 | Dates confgured here     | sure nobody building   |
|                         |                 | are deliberately         | this assumes           |
|                         |                 | separate from each       | Scheduling and         |
|                         |                 | agency’s monthly         | Billing share a single |
|                         |                 | billing date. Billing is | cycle. They do not,    |
|                         |                 | monthly and per          | and should not.        |
|                         |                 | agency, the sweep        |                        |
|                         |                 | runs twice a year for    |                        |
|                         |                 | everyone at once,        |                        |
|                         |                 | funded by the monthly    |                        |
|                         |                 | fees accumulated over    |                        |
|                         |                 | the preceding six        |                        |
|                         |                 | months. This             |                        |
|                         |                 | decoupling is            |                        |
|                         |                 | intentional, it smooths  |                        |
|                         |                 | cash fow for the         |                        |
|                         |                 | business while still     |                        |
|                         |                 | allowing checks to be    |                        |
|                         |                 | run in one large,        |                        |
|                         |                 | cost-eficient batch      |                        |
|                         |                 | that qualifes for the    |                        |
|                         |                 | lower Land Registry      |                        |
|                         |                 | rate, see the            |                        |
|                         |                 | Subscription &           |                        |
|                         |                 | Recovery Revenue         |                        |
|                         |                 | Model document for       |                        |
|                         |                 | the full reasoning.      |                        |
| Data Retention tab      | New, moved from | Retention Period,        | Move this tab here in  |
|                         | Agency          | Auto Delete, and         | full, as a single      |
|                         |                 | Backup Frequency         | platform-wide policy   |
|                         |                 | are policy decisions     | rather than a          |
|                         |                 | about how Property       | per-agency setting.    |
|                         |                 | Eye stores and           |                        |
|                         |                 | disposes of data,        |                        |
|                         |                 | carrying real            |                        |
|                         |                 | compliance weight.       |                        |
|                         |                 | Property Eye, not an     |                        |
|                         |                 | individual agency, is    |                        |
|                         |                 | accountable for that     |                        |
|                         |                 | policy, so it should not |                        |
|                         |                 | be confgurable per       |                        |
|                         |                 | agency.                  |                        |
| Security tab            | New             | Covers the Admin         | Build a standard       |
|                         |                 | user’s own password      | Security tab here,     |
|                         |                 | and two-factor           | same pattern as the    |
|                         |                 | authentication,          | agency-side Security   |
|                         |                 | separate from            | tab but scoped to the  |
|                         |                 | anything to do with an   | logged-in Admin user.  |
|                         |                 | agency’s account         |                        |
|                         |                 | security.                |                        |


21 

## **4. Agency Portal (client’s customers, deliberately restricted on purpose)**



## **4.0 Persistent Header (appears on every Agency page)**


| Element           | Decision | Why                     | What To Build        |
| ----------------- | -------- | ----------------------- | -------------------- |
| Last data pull    | Remove   | Shows agencies          | Remove this from the |
| timestamp         |          | exactly when Property   | agency-facing header |
|                   |          | Eye last pulled their   | entirely.            |
|                   |          | data, which is internal |                      |
|                   |          | operational timing      |                      |
|                   |          | that does not serve     |                      |
|                   |          | the agency in any way   |                      |
|                   |          | and only exposes how    |                      |
|                   |          | the backend pipeline    |                      |
|                   |          | runs.                   |                      |
| Credits counter   | Remove   | Exposes an internal     | Remove this from the |
| (e.g. 450/500)    |          | quota or capacity       | agency-facing header |
|                   |          | mechanic, presumably    | entirely.            |
|                   |          | related to how many     |                      |
|                   |          | checks or API calls     |                      |
|                   |          | are available in a      |                      |
|                   |          | billing period. Not     |                      |
|                   |          | something an agency     |                      |
|                   |          | needs visibility into,  |                      |
|                   |          | and could let them      |                      |
|                   |          | infer things about      |                      |
|                   |          | timing or capacity      |                      |
|                   |          | they could act on.      |                      |
| Run Checks button | Remove   | Checks run on           | Remove this from the |
|                   |          | Property Eye’s own      | agency-facing header |
|                   |          | schedule, defned in     | entirely. The        |
|                   |          | Settings >              | equivalent button    |
|                   |          | Scheduling, not on      | stays on the Admin   |
|                   |          | demand by an agency.    | side, see 3.1, since |
|                   |          | A button suggesting     | Admin staf are the   |
|                   |          | otherwise is both       | ones who actually    |
|                   |          | misleading and gives    | trigger checks.      |
|                   |          | the agency a false      |                      |
|                   |          | sense of control over   |                      |
|                   |          | a process they have     |                      |
|                   |          | no part in.             |                      |




## **4.1 Overview**

22 


| Element               | Decision           | Why                     | What To Build        |
| --------------------- | ------------------ | ----------------------- | -------------------- |
| Total Checks          | Keep               | Counts how many of      | No change needed.    |
|                       |                    | the agency’s own        |                      |
|                       |                    | withdrawn properties    |                      |
|                       |                    | have been checked.      |                      |
|                       |                    | Their own data, no      |                      |
|                       |                    | risk, since it does not |                      |
|                       |                    | reveal anything about   |                      |
|                       |                    | case strength or        |                      |
|                       |                    | outcome.                |                      |
| Total Cases, count    | Keep, strip detail | A simple count of how   | Show the count only, |
| only                  |                    | many cases are open     | no severity          |
|                       |                    | or closed for this      | breakdown or value   |
|                       |                    | agency is useful and    | attached.            |
|                       |                    | not sensitive on its    |                      |
|                       |                    | own, the risk only      |                      |
|                       |                    | comes from attaching    |                      |
|                       |                    | severity, value, or     |                      |
|                       |                    | detailed status to it.  |                      |
| Severity Distribution | Remove             | Breaks down the         | Remove this chart    |
| (donut)               |                    | agency’s cases by       | from the Agency      |
|                       |                    | Critical, High,         | Overview entirely.   |
|                       |                    | Medium, Low severity,   |                      |
|                       |                    | which directly signals  |                      |
|                       |                    | which of their cases    |                      |
|                       |                    | are strongest. That is  |                      |
|                       |                    | exactly the kind of     |                      |
|                       |                    | information that could  |                      |
|                       |                    | prompt an agency to     |                      |
|                       |                    | try resolving a case on |                      |
|                       |                    | their own rather than   |                      |
|                       |                    | waiting on Property     |                      |
|                       |                    | Eye, since they would   |                      |
|                       |                    | be able to tell which   |                      |
|                       |                    | ones are likely wins.   |                      |
| Top Property          | Remove entirely    | Shows individual        | Remove this table    |
| Recoveries table      |                    | properties along with   | entirely from the    |
|                       |                    | the exact commission    | Agency Overview.     |
|                       |                    | value recovered on      |                      |
|                       |                    | each one. This is the   |                      |
|                       |                    | clearest example in     |                      |
|                       |                    | the whole template of   |                      |
|                       |                    | leaking information     |                      |
|                       |                    | an agency could use     |                      |
|                       |                    | to estimate value and   |                      |
|                       |                    | go around Property      |                      |
|                       |                    | Eye to negotiate        |                      |
|                       |                    | directly.               |                      |


23 


| Element              | Decision | Why                    | What To Build        |
| -------------------- | -------- | ---------------------- | -------------------- |
| Fraud Detection      | Keep     | A trend line showing   | Confrm this chart    |
| Growth, count trend, |          | how many cases have    | only ever shows a    |
| no value             |          | been detected over     | count, never a       |
|                      |          | time, with no          | monetary value, when |
|                      |          | monetary value         | it is built.         |
|                      |          | attached, is low risk, |                      |
|                      |          | it shows activity      |                      |
|                      |          | without revealing      |                      |
|                      |          | anything about case    |                      |
|                      |          | strength or worth.     |                      |




## **4.2 Case Management, Agency**


| Element             | Decision | Why                        | What To Build         |
| ------------------- | -------- | -------------------------- | --------------------- |
| Page subtitle       | Modify   | The original               | Replace with a        |
|                     |          | template’s subtitle        | generic description,  |
|                     |          | reads “Monitor             | for example “Monitor  |
|                     |          | property withdrawals       | the status of your    |
|                     |          | and sales verifed via      | fraud cases,” with no |
|                     |          | Price Paid Dataset,”       | mention of the data   |
|                     |          | which names the            | source or method.     |
|                     |          | exact data source and      |                       |
|                     |          | method used to detect      |                       |
|                     |          | fraud. Same problem        |                       |
|                     |          | as the subscription        |                       |
|                     |          | plan copy, this tells      |                       |
|                     |          | anyone reading it how      |                       |
|                     |          | detection actually         |                       |
|                     |          | works.                     |                       |
| Case ID, Property   | Keep     | None of this is            | No change needed.     |
| Address, Buyer name |          | sensitive, it is literally |                       |
|                     |          | the data the agency        |                       |
|                     |          | submitted to Property      |                       |
|                     |          | Eye themselves, their      |                       |
|                     |          | own withdrawn              |                       |
|                     |          | property list and the      |                       |
|                     |          | buyers they                |                       |
|                     |          | introduced. No             |                       |
|                     |          | containment reason to      |                       |
|                     |          | hide an agency’s own       |                       |
|                     |          | data from them.            |                       |


24 


| Element            | Decision | Why                      | What To Build             |
| ------------------ | -------- | ------------------------ | ------------------------- |
| Status             | Expand   | A plain Open/Closed      | Show only three           |
|                    |          | status does not tell     | states to the agency:     |
|                    |          | the agency anything      | Open, Closed              |
|                    |          | useful about outcome,    | (Confrmed Fraud),         |
|                    |          | but the full             | Closed (Not Fraud).       |
|                    |          | Admin-side Status and    | Do not expose Under       |
|                    |          | Determination felds,     | Legal Review,             |
|                    |          | Under Legal Review,      | Flagged, Recovery         |
|                    |          | Flagged, Recovery        | Outcome, or               |
|                    |          | Outcome, Recovered       | Recovered Amount.         |
|                    |          | Amount, reveal far       |                           |
|                    |          | more than we want        |                           |
|                    |          | agencies to see. This    |                           |
|                    |          | is the middle ground,    |                           |
|                    |          | enough information to    |                           |
|                    |          | be useful, not enough    |                           |
|                    |          | to be exploitable.       |                           |
| Severity           | Remove   | Same reasoning as        | Do not include this       |
|                    |          | the Severity             | feld anywhere on the      |
|                    |          | Distribution chart on    | agency-facing case        |
|                    |          | Overview, this tells an  | list or case detail       |
|                    |          | agency how strong a      | view.                     |
|                    |          | specifc case is,         |                           |
|                    |          | exactly the signal we    |                           |
|                    |          | do not want them         |                           |
|                    |          | acting on                |                           |
|                    |          | independently.           |                           |
| Recovered Amount / | Remove   | This applies to the full | Do not include any        |
| fnancial detail    |          | Recovered Amount         | monetary detail tied      |
|                    |          | and to the individual    | to an individual case     |
|                    |          | Agency Share and         | anywhere on the           |
|                    |          | Property Eye Share       | agency-facing case        |
|                    |          | fgures introduced in     | list or case detail view, |
|                    |          | 3.3. Showing an          | including their own       |
|                    |          | agency the exact         | share of a specifc        |
|                    |          | value at stake on a      | recovery.                 |
|                    |          | specifc case, even       |                           |
|                    |          | just their own ffty      |                           |
|                    |          | percent share, gives     |                           |
|                    |          | them a concrete          |                           |
|                    |          | number to negotiate      |                           |
|                    |          | around if they decided   |                           |
|                    |          | to go directly to the    |                           |
|                    |          | buyer or seller          |                           |
|                    |          | themselves.              |                           |


25 


| Element              | Decision     | Why                       | What To Build          |
| -------------------- | ------------ | ------------------------- | ---------------------- |
| Internal fags/notes  | Never shown  | These notes exist for     | Ensure the             |
| from 3.3             |              | Property Eye staf to      | agency-facing case     |
|                      |              | track why a recovery      | detail view has no     |
|                      |              | is stalling or what is    | path to these felds at |
|                      |              | happening internally      | all, not even          |
|                      |              | with Legal. None of       | read-only.             |
|                      |              | that is the agency’s      |                        |
|                      |              | business, and showing     |                        |
|                      |              | it would also likely      |                        |
|                      |              | reveal sensitive detail   |                        |
|                      |              | about the recovery        |                        |
|                      |              | process itself.           |                        |
| Raise Dispute action | New          | We agreed agencies        | Add a Raise Dispute    |
|                      |              | should not be able to     | button, available only |
|                      |              | reopen a case or          | on cases with a        |
|                      |              | override our              | Closed status.         |
|                      |              | determination             | Clicking it does not   |
|                      |              | themselves, but they      | change the case’s      |
|                      |              | should have some way      | Status or              |
|                      |              | to push back if they      | Determination, it      |
|                      |              | disagree with how a       | creates a record       |
|                      |              | case was closed. This     | Admin staf can see     |
|                      |              | gives them a voice        | (the Agency Dispute    |
|                      |              | without giving them       | fag described in 3.3)  |
|                      |              | control.                  | and triggers a         |
|                      |              |                           | notifcation so         |
|                      |              |                           | someone follows up     |
|                      |              |                           | with the agency        |
|                      |              |                           | privately, outside the |
|                      |              |                           | platform if needed.    |
| Dispute indicator    | New          | Once an agency has        | Show a simple          |
|                      |              | raised a dispute, they    | Dispute: Open or       |
|                      |              | need some way to see      | Dispute: Resolved      |
|                      |              | it has been received      | label only on case     |
|                      |              | and is being looked at,   | rows where the         |
|                      |              | without requiring a       | agency has actually    |
|                      |              | full back-and-forth       | used the Raise         |
|                      |              | dispute resolution        | Dispute action. No     |
|                      |              | interface.                | detail beyond that     |
|                      |              |                           | two-state label.       |
| Search               | Keep, scoped | The agency should be      | Functional search      |
|                      |              | able to search their      | against Case ID,       |
|                      |              | own cases just as         | Property Address, and  |
|                      |              | easily as Admin can       | Buyer name, scoped     |
|                      |              | search the full case      | only to this agency’s  |
|                      |              | list, there is no reason  | own cases.             |
|                      |              | to limit their ability to |                        |
|                      |              | fnd their own data.       |                        |




## **4.3 Analytics & Reports, Agency**

This page needs the heaviest cuts of anything we reviewed. 

26 


| Element               | Decision             | Why                     | What To Build         |
| --------------------- | -------------------- | ----------------------- | --------------------- |
| Avg. Fraud Likelihood | Remove               | Our matching process    | Remove this card      |
| %                     |                      | is not probabilistic, a | entirely from the     |
|                       |                      | case is either a        | Agency Analytics      |
|                       |                      | confrmed match or it    | page.                 |
|                       |                      | is not, so there is no  |                       |
|                       |                      | real mechanism          |                       |
|                       |                      | producing a likelihood  |                       |
|                       |                      | score in the frst       |                       |
|                       |                      | place. Even if we built |                       |
|                       |                      | one, showing an         |                       |
|                       |                      | aggregate likelihood    |                       |
|                       |                      | number to an agency     |                       |
|                       |                      | would still hint at how |                       |
|                       |                      | strong their cases are  |                       |
|                       |                      | on average.             |                       |
| Detection vs False    | Remove               | Same root issue, the    | Remove this chart     |
| Positive Ratio chart  |                      | underlying concept      | entirely from the     |
|                       |                      | has no real defned      | Agency Analytics      |
|                       |                      | source given how        | page.                 |
|                       |                      | matching actually       |                       |
|                       |                      | works. Even with the    |                       |
|                       |                      | new Determination       |                       |
|                       |                      | feld giving us a        |                       |
|                       |                      | legitimate false        |                       |
|                       |                      | positive metric on the  |                       |
|                       |                      | Admin side, see 3.1,    |                       |
|                       |                      | this still is not       |                       |
|                       |                      | something an agency     |                       |
|                       |                      | should see about their  |                       |
|                       |                      | own cases. It would     |                       |
|                       |                      | let them estimate how   |                       |
|                       |                      | often we are wrong,     |                       |
|                       |                      | which undermines        |                       |
|                       |                      | confdence in cases      |                       |
|                       |                      | we do fag and gives     |                       |
|                       |                      | them grounds to act     |                       |
|                       |                      | independently.          |                       |
| Fraud Rate Over Time  | Keep, as count trend | A simple trend of how   | Confrm this only ever |
|                       |                      | many cases have         | shows a count over    |
|                       |                      | come up over time,      | time, nothing else.   |
|                       |                      | with no value or        |                       |
|                       |                      | strength signal         |                       |
|                       |                      | attached, is            |                       |
|                       |                      | informative without     |                       |
|                       |                      | being risky.            |                       |
| Open Cases / Closed   | Keep                 | Coarse counts on        | No change needed      |
| Cases counts          |                      | their own, without      | beyond ensuring no    |
|                       |                      | severity or value       | further detail is     |
|                       |                      | breakdowns, are         | layered onto these    |
|                       |                      | useful operational      | counts.               |
|                       |                      | visibility for the      |                       |
|                       |                      | agency without          |                       |
|                       |                      | exposing anything       |                       |
|                       |                      | sensitive.              |                       |


27 


| Element              | Decision        | Why                    | What To Build     |
| -------------------- | --------------- | ---------------------- | ----------------- |
| Event Log            | Remove entirely | This log currently     | Remove this table |
|                      |                 | shows internal staf    | entirely from the |
|                      |                 | actions (Triggered     | Agency Analytics  |
|                      |                 | Case, Closed Case,     | page.             |
|                      |                 | Role Override,         |                   |
|                      |                 | Printed Invoice) with  |                   |
|                      |                 | internal role labels   |                   |
|                      |                 | like Manager and       |                   |
|                      |                 | Agent. None of this is |                   |
|                      |                 | something a client     |                   |
|                      |                 | should ever see, it is |                   |
|                      |                 | purely an internal     |                   |
|                      |                 | operational record.    |                   |
| Fraud Patterns tab   | Remove          | Based on the name      | Remove this tab   |
|                      |                 | and placement, this    | entirely.         |
|                      |                 | tab exists specifcally |                   |
|                      |                 | to show deeper         |                   |
|                      |                 | analysis of how fraud  |                   |
|                      |                 | is occurring, exactly  |                   |
|                      |                 | the kind of detail we  |                   |
|                      |                 | are trying to keep     |                   |
|                      |                 | away from agencies.    |                   |
| Financial Impact tab | Remove          | Same reasoning as      | Remove this tab   |
|                      |                 | Top Property           | entirely.         |
|                      |                 | Recoveries on          |                   |
|                      |                 | Overview, a tab        |                   |
|                      |                 | specifcally about      |                   |
|                      |                 | fnancial impact is     |                   |
|                      |                 | almost certainly going |                   |
|                      |                 | to surface recovery    |                   |
|                      |                 | values, the core thing |                   |
|                      |                 | we are containing.     |                   |




## **4.4 Team Management, Agency**


| Element        | Decision | Why                    | What To Build        |
| -------------- | -------- | ---------------------- | -------------------- |
| Page structure | Keep     | The layout, Total      | No structural change |
|                |          | Users, Active Today,   | needed.              |
|                |          | plus a staf list, is a |                      |
|                |          | reasonable structure   |                      |
|                |          | for an agency to       |                      |
|                |          | manage their own       |                      |
|                |          | team.                  |                      |


28 


| Element              | Decision     | Why                     | What To Build           |
| -------------------- | ------------ | ----------------------- | ----------------------- |
| Role taxonomy        | Resolved     | Settled in the Roles &  | Populate this column    |
|                      |              | Permissions             | from the three          |
|                      |              | document: Agency        | defned agency roles.    |
|                      |              | Owner, Agency Staf,     |                         |
|                      |              | Agency Viewer.          |                         |
|                      |              | Named diferently        |                         |
|                      |              | from the Admin-side     |                         |
|                      |              | roles deliberately, to  |                         |
|                      |              | avoid confusing one     |                         |
|                      |              | Admin for the other in  |                         |
|                      |              | support                 |                         |
|                      |              | conversations.          |                         |
| Cases Opened / Fraud | Keep, verify | These currently show    | Before building this,   |
| % donut rings        |              | ratios like Withdrawn   | confrm the exact        |
|                      |              | & Sold over Total       | calculation behind      |
|                      |              | Checks, and Fraud       | each ring matches the   |
|                      |              | over Withdrawn &        | same restricted,        |
|                      |              | Sold. It is not yet     | aggregate-only          |
|                      |              | clear whether these     | philosophy used in 4.1  |
|                      |              | expose more granular    | and 4.2. If either ring |
|                      |              | detail than the rest of | would reveal anything   |
|                      |              | the agency portal       | more specifc than a     |
|                      |              | allows, since a fraud   | coarse count, redefne   |
|                      |              | percentage ring could   | or remove it.           |
|                      |              | end up implying the     |                         |
|                      |              | same kind of strength   |                         |
|                      |              | signal we are           |                         |
|                      |              | removing elsewhere.     |                         |




## **4.5 Account & Billing, Agency**


| Element               | Decision       | Why                     | What To Build          |
| --------------------- | -------------- | ----------------------- | ---------------------- |
| Page structure and    | Keep structure | The overall page, a     | No structural change   |
| Payment History table |                | current plan summary    | needed.                |
|                       |                | plus a payment          |                        |
|                       |                | history table, is the   |                        |
|                       |                | right shape for this    |                        |
|                       |                | page.                   |                        |
| Current Plan card     | Modify         | The plan is assigned    | Show the agency’s      |
|                       |                | by agency size rather   | plan name, the         |
|                       |                | than chosen by the      | resulting monthly fee, |
|                       |                | agency, so the card     | their seat allowance,  |
|                       |                | should show which       | and their next billing |
|                       |                | named plan they are     | date. See the          |
|                       |                | on, Starter or          | Subscription &         |
|                       |                | Enterprise, and what    | Recovery Revenue       |
|                       |                | it includes, not a plan | Model document for     |
|                       |                | they picked             | the full plan          |
|                       |                | themselves.             | defnitions.            |


29 


| Element               | Decision     | Why                      | What To Build            |
| --------------------- | ------------ | ------------------------ | ------------------------ |
| Recovery commission   | New          | This is the agency’s     | Add a clear, simple      |
| split disclosure      |              | actual contractual       | statement of the ffty    |
|                       |              | terms, that a            | percent split on this    |
|                       |              | recovered commission     | page, separate from      |
|                       |              | is split ffty percent to | any individual case      |
|                       |              | them and ffty percent    | detail, since this is a  |
|                       |              | to Property Eye, and     | standing term of their   |
|                       |              | it currently appears     | account, not             |
|                       |              | nowhere on the           | information about a      |
|                       |              | agency side of the       | specifc case.            |
|                       |              | product. An agency       |                          |
|                       |              | should be able to see    |                          |
|                       |              | their own terms          |                          |
|                       |              | clearly, not just        |                          |
|                       |              | discover them when a     |                          |
|                       |              | case closes.             |                          |
| Checks usage bar      | Remove       | Checks are not           | Remove this bar          |
| (e.g. 230/750 checks) |              | metered per agency       | entirely. This is the    |
|                       |              | at all, Property Eye     | second, independent      |
|                       |              | runs one batched         | reason the credits       |
|                       |              | sweep across every       | counter was already      |
|                       |              | agency twice a year,     | removed from the         |
|                       |              | funded by                | agency header in 4.0,    |
|                       |              | accumulated monthly      | the metering concept     |
|                       |              | fees, not by individual  | itself does not exist in |
|                       |              | agency usage against     | this business model.     |
|                       |              | a quota. There is no     |                          |
|                       |              | quota to show.           |                          |
| CRM users usage bar   | Remove       | Tied to the same         | Remove this bar          |
|                       |              | now-removed              | entirely.                |
|                       |              | plan-tier structure.     |                          |
|                       |              | With one fat plan for    |                          |
|                       |              | everyone, there is no    |                          |
|                       |              | per-tier user limit to   |                          |
|                       |              | track against.           |                          |
| Change Plan button    | Remove as    | An agency does not       | Remove this as a         |
|                       | self-service | choose their own         | self-service button.     |
|                       |              | band, it is determined   | Band reassignment        |
|                       |              | by their size. There is  | should happen            |
|                       |              | nothing for them to      | administratively, for    |
|                       |              | self-select between.     | example reviewed at      |
|                       |              |                          | each sweep cycle as      |
|                       |              |                          | an agency grows, not     |
|                       |              |                          | triggered by the         |
|                       |              |                          | agency themselves.       |
| Cancel Plan button    | Keep         | An agency canceling      | No change needed.        |
|                       |              | their subscription is a  |                          |
|                       |              | real action regardless   |                          |
|                       |              | of pricing structure.    |                          |


30 


| Element   |              | Decision | Why                    | What To Build            |
| --------- | ------------ | -------- | ---------------------- | ------------------------ |
| Payment   | History data | Modify   | Same issue as the      | Ensure invoice           |
| integrity |              |          | Admin-side Billing     | numbers and amounts      |
|           |              |          | History, every row     | are generated            |
|           |              |          | shows the identical    | correctly per real       |
|           |              |          | invoice number,        | transaction, never       |
|           |              |          | #7392013, and the      | duplicated.              |
|           |              |          | identical amount,      |                          |
|           |              |          | £232.00. Placeholder   |                          |
|           |              |          | artifact, but worth    |                          |
|           |              |          | stating as a build     |                          |
|           |              |          | note.                  |                          |
| Payment   | Type column  | Remove   | Previously fagged for  | Remove this column.      |
|           |              |          | mixing subscription    | Billing Date, Amount,    |
|           |              |          | plan names with what   | and Status already       |
|           |              |          | looked like a separate | tell the full story of a |
|           |              |          | usage-based charge,    | fat monthly payment.     |
|           |              |          | Property Check.        |                          |
|           |              |          | Neither exists         |                          |
|           |              |          | anymore, every         |                          |
|           |              |          | payment is the same    |                          |
|           |              |          | fat monthly fee, so    |                          |
|           |              |          | there is nothing for   |                          |
|           |              |          | this column to         |                          |
|           |              |          | diferentiate.          |                          |




## **4.6 Settings, Agency**


| Element          | Decision          | Why                     | What To Build         |
| ---------------- | ----------------- | ----------------------- | --------------------- |
| Profle tab       | Keep              | The agency’s own        | No change needed.     |
|                  |                   | contact details, name,  |                       |
|                  |                   | and address.            |                       |
|                  |                   | Genuinely theirs to     |                       |
|                  |                   | manage.                 |                       |
| Notifcations tab | Keep, remove      | Whether an agency       | Keep the on/of        |
|                  | Message Templates | wants email, SMS, or    | notifcation toggles.  |
|                  | sub-tab           | push notifcations is a  | Remove the Message    |
|                  |                   | legitimate personal     | Templates sub-tab     |
|                  |                   | preference for them     | entirely, it moves to |
|                  |                   | to control. The actual  | Admin Settings.       |
|                  |                   | wording of those        |                       |
|                  |                   | messages, the           |                       |
|                  |                   | Message Templates       |                       |
|                  |                   | sub-tab, is Property    |                       |
|                  |                   | Eye’s own content,      |                       |
|                  |                   | see 3.8, not            |                       |
|                  |                   | something an agency     |                       |
|                  |                   | should be able to edit. |                       |


31 


| Element            | Decision        | Why                     | What To Build        |
| ------------------ | --------------- | ----------------------- | -------------------- |
| Scheduling tab     | Remove entirely | This is not             | Remove this tab from |
|                    |                 | agency-specifc data,    | Agency Settings      |
|                    |                 | it is Property Eye’s    | entirely.            |
|                    |                 | own platform-wide       |                      |
|                    |                 | confguration for        |                      |
|                    |                 | when checks run, see    |                      |
|                    |                 | 3.8. It should never    |                      |
|                    |                 | have lived here.        |                      |
| Integration tab    | Keep            | Genuinely               | No change needed.    |
|                    |                 | agency-specifc, each    |                      |
|                    |                 | agency connects their   |                      |
|                    |                 | own data feed (ALTO,    |                      |
|                    |                 | API, CSV, PDF), so      |                      |
|                    |                 | this confguration only  |                      |
|                    |                 | makes sense per         |                      |
|                    |                 | agency.                 |                      |
| Security tab       | Keep            | The agency’s own        | No change needed.    |
|                    |                 | password and            |                      |
|                    |                 | two-factor              |                      |
|                    |                 | authentication for      |                      |
|                    |                 | their account.          |                      |
|                    |                 | Genuinely theirs.       |                      |
| Data Retention tab | Remove entirely | Same reasoning as       | Remove this tab from |
|                    |                 | Scheduling, this is a   | Agency Settings      |
|                    |                 | platform-wide policy    | entirely.            |
|                    |                 | decision Property Eye   |                      |
|                    |                 | is accountable for, not |                      |
|                    |                 | something that should   |                      |
|                    |                 | vary by or be visible   |                      |
|                    |                 | to an individual        |                      |
|                    |                 | agency, see 3.8.        |                      |




## **5. Marketer Portal (external referral partners, aggregate visibility only)**


| Element  | Decision | Why                    | What To Build     |
| -------- | -------- | ---------------------- | ----------------- |
| Overview | Keep     | The referral link,     | No change needed. |
|          |          | invite CTA, and        |                   |
|          |          | aggregate counts       |                   |
|          |          | (Total Agencies        |                   |
|          |          | Referred, Active       |                   |
|          |          | Agencies, Fraud        |                   |
|          |          | Cases Identifed) are   |                   |
|          |          | already at the right   |                   |
|          |          | level of detail,       |                   |
|          |          | aggregate numbers      |                   |
|          |          | about their own        |                   |
|          |          | referral activity, not |                   |
|          |          | case-level detail.     |                   |


32 


| Element                | Decision        | Why                    | What To Build         |
| ---------------------- | --------------- | ---------------------- | --------------------- |
| Fraud Cases page, full | Remove entirely | Currently shows        | Remove this page      |
| case-by-case table     |                 | individual case        | from the marketer     |
|                        |                 | references, individual | portal entirely,      |
|                        |                 | fraud values, and      | replaced by the       |
|                        |                 | individual statuses    | aggregate counts      |
|                        |                 | (Detected, Under       | below.                |
|                        |                 | Review, Confrmed,      |                       |
|                        |                 | Recovered) per case.   |                       |
|                        |                 | That is more detail    |                       |
|                        |                 | about a case than the  |                       |
|                        |                 | agency that owns the   |                       |
|                        |                 | case is even allowed   |                       |
|                        |                 | to see, and marketers  |                       |
|                        |                 | have their own         |                       |
|                        |                 | fnancial incentive     |                       |
|                        |                 | tied to outcomes,      |                       |
|                        |                 | which makes this       |                       |
|                        |                 | exposure even riskier  |                       |
|                        |                 | than showing it to an  |                       |
|                        |                 | agency would be.       |                       |
| My Agencies, Total     | Keep            | Aggregate fgures       | No change needed.     |
| Fraud Value,           |                 | tied to the marketer’s |                       |
| Commission Earned      |                 | own money and the      |                       |
|                        |                 | overall value they     |                       |
|                        |                 | have generated by      |                       |
|                        |                 | referring agencies,    |                       |
|                        |                 | not a breakdown of     |                       |
|                        |                 | individual cases.      |                       |
| My Agencies, Cases     | New             | This is the direct     | Add four columns to   |
| Found / Confrmed       |                 | replacement for the    | the existing My       |
| Fraud / Cleared / In   |                 | removed Fraud Cases    | Agencies table, one   |
| Progress               |                 | page, giving the       | per agency: Cases     |
|                        |                 | marketer exactly what  | Found, Confrmed       |
|                        |                 | they need to know per  | Fraud, Cleared, In    |
|                        |                 | agency they have       | Progress. These are   |
|                        |                 | referred, how many     | simple counts derived |
|                        |                 | cases have come up,    | from the              |
|                        |                 | how many turned out    | Determination feld in |
|                        |                 | to be real fraud, how  | 3.3, rolled up per    |
|                        |                 | many were cleared,     | agency.               |
|                        |                 | how many are still     |                       |
|                        |                 | being worked, without  |                       |
|                        |                 | any case-level detail, |                       |
|                        |                 | individual values, or  |                       |
|                        |                 | property addresses.    |                       |
| Commissions,           | Keep            | These describe the     | No change needed.     |
| Payments, Referrals    |                 | marketer’s own         |                       |
| pages                  |                 | earnings, payout       |                       |
|                        |                 | history, and invite    |                       |
|                        |                 | funnel, none of which  |                       |
|                        |                 | involves case-level    |                       |
|                        |                 | fraud detail.          |                       |


33 


| Element            | Decision          | Why                      | What To Build        |
| ------------------ | ----------------- | ------------------------ | -------------------- |
| Disputes page,     | Keep, remove Type | This page is about       | Remove the Type      |
| Attribution /      | column            | attribution conficts,    | column from this     |
| Commission         |                   | which marketer gets      | table. No other      |
|                    |                   | credit for referring an  | change needed.       |
|                    |                   | agency, and              |                      |
|                    |                   | commission               |                      |
|                    |                   | disagreements, a         |                      |
|                    |                   | completely diferent      |                      |
|                    |                   | concern from fraud       |                      |
|                    |                   | case outcomes, and       |                      |
|                    |                   | stays as designed.       |                      |
|                    |                   | The Type column          |                      |
|                    |                   | specifcally should go    |                      |
|                    |                   | because it just          |                      |
|                    |                   | repeats information      |                      |
|                    |                   | already visible in       |                      |
|                    |                   | Linked Record, if the    |                      |
|                    |                   | Linked Record is an      |                      |
|                    |                   | agency name it is an     |                      |
|                    |                   | Agency Ownership         |                      |
|                    |                   | dispute, if it is a case |                      |
|                    |                   | reference it is a        |                      |
|                    |                   | Commission dispute.      |                      |
| Fraud case dispute | Not added         | This is a distinct,      | Do not build any     |
| ability            |                   | separate ability from    | marketer-facing path |
|                    |                   | the Attribu-             | to dispute a case’s  |
|                    |                   | tion/Commission          | Status or            |
|                    |                   | disputes page above,     | Determination.       |
|                    |                   | the ability to contest a |                      |
|                    |                   | specifc fraud case’s     |                      |
|                    |                   | determination or         |                      |
|                    |                   | closure. We decided      |                      |
|                    |                   | marketers should not     |                      |
|                    |                   | get this, only agencies  |                      |
|                    |                   | get a limited version    |                      |
|                    |                   | of it, see 4.2, since    |                      |
|                    |                   | marketers have no        |                      |
|                    |                   | role in the underlying   |                      |
|                    |                   | fraud determination      |                      |
|                    |                   | process at all.          |                      |


Commission Breakdown: Fraud Case reference column | Keep, with a safeguard | This table, under the Commissions page, shows an individual case reference, for example #PE-256545, per commission line. This looked at first like the same over-exposure problem the Fraud Cases page had, but the key difference is that this reference only ever appears on a line where the commission has already been calculated and paid. The case has reached a final outcome and the money has already moved, so there is no live signal left to act on. It also serves a real purpose the Fraud Cases page did not: it lets the marketer reconcile their own earnings against their own records, removing it entirely would leave them with an unexplained lump sum and invite more payment disputes, not fewer. | Keep the reference, but enforce a strict rule: this column must only ever be populated for a case where Determination is Fraudulent and Recovery Outcome is Recovered. It must never be possible for a case that is Open, Under Legal Review, Flagged, or Disputed to appear here. | 

34 

Sequencing note: a marketer’s commission cannot be finalized until a case is actually closed with a recovered amount entered (3.3). Case closes, then recovered amount is entered, then marketer commission is calculated, then payout triggers. 

## **New: Settings (Marketer Portal)**


| Element           | Decision | Why                     | What To Build         |
| ----------------- | -------- | ----------------------- | --------------------- |
| Settings nav item | New      | Every marketer          | Add a Settings nav    |
|                   |          | persona shows a         | item to the Marketer  |
|                   |          | notifcation bell, but   | Portal.               |
|                   |          | no Settings page        |                       |
|                   |          | exists anywhere in the  |                       |
|                   |          | marketer portal to      |                       |
|                   |          | control what they       |                       |
|                   |          | actually receive. This  |                       |
|                   |          | is a real gap, not just |                       |
|                   |          | a missing               |                       |
|                   |          | nice-to-have.           |                       |
| Notifcations tab  | New      | Marketers need the      | Add Email, SMS, and   |
|                   |          | same basic control      | Push toggles only,    |
|                   |          | over their own          | mirroring 4.6’s       |
|                   |          | notifcation channels    | reduced version       |
|                   |          | that agencies already   | exactly. No Message   |
|                   |          | have in 4.6.            | Templates sub-tab,    |
|                   |          |                         | template content      |
|                   |          |                         | stays                 |
|                   |          |                         | Admin-controlled, see |
|                   |          |                         | 3.8.                  |




## **6. New Build Items**

Things that do not exist yet and need to be built, not just cleaned up. 

1. Manual case-close workflow: status lifecycle, determination, recovery outcome, recovered amount, flag/note field (3.3)
2. Functional search and filters on Admin Case Management (3.3)
3. Reopen workflow for cases closed as Not Fraud, in case new evidence surfaces later (3.3)
4. Notification template and trigger point for a case cleared as Not Fraud (3.3)
5. Unified audit log, with entries specific to the determination outcome, not a generic Closed Case entry (3.6)
6. Affiliates module inside Admin nav (3.7)
7. Per-agency case-stage aggregate counts on the Marketer portal’s My Agencies page (5)
8. Agency-facing Raise Dispute action on closed cases, plus the Admin-side flag and resolution handling (3.3, 4.2)
9. Notification trigger to Admin when an agency raises a dispute on a closed case (3.3, 4.2)
10. Build out the Admin Settings page in full: Profile, Notifications & Message Templates, Scheduling, Data Retention, Security (3.8)
11. Remove Scheduling, Message Templates, and Data Retention from Agency Settings (4.6)
12. Build a Settings page for the Marketer Portal with a Notifications tab, Email, SMS, Push toggles only (Section 5)

35 

## **7. Still Open Within This Document**

- Timing of the full column-level audit across every table on every page: run now as a continuation of this document, or as its own follow-up pass



## **8. Moved To Other Documents**

- The Admin and Agency role taxonomies are now both settled in full, including the case determination approval step, in the Roles & Permissions document. 
- The Leaks versus Fraud Alerts versus Cases naming confusion is now resolved in the Data Dictionary & Glossary document. The canonical term is Case, or Fraud Case. 
- The subscription model is now settled in full: a compulsory fifty percent recovery split as the primary revenue stream, plus a monthly fee banded by agency size that exists purely to cover the cost of running checks, priced against real Land Registry costs. Reflected throughout 3.1, 3.2, 3.3, 3.5, 3.6, 3.8, and 4.5. Full reasoning, the cost basis, and worked figures are in the Subscription & Recovery Revenue Model document, written specifically for the client conversation.

36 