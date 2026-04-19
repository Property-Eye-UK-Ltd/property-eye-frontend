# Dashboard Refinement Plan

This document outlines the required frontend fixes and enhancements for the Property Eye dashboards, categorized by phase and section.

## Phase 1: Global Improvements & Settings

### [ ] Global Features
- **Run Checks Button & Progress Bar**: Implement a global button for running checks.
- **Status Reporting**: Add a progress bar that appears after the button is clicked to report the status of checks.
- **Logic**: The button should be greyed out/disabled until the two dates specified in settings are reached.

### [ ] Global Settings
- **Check Frequency**: Add options in the settings page to specify how checks are run:
  - Annually
  - Bi-Annually
  - Quarterly
  - Monthly
- **Scheduling**: Add fields to specify specific dates and times for these checks.
- **SMS & Notifications**: Implement messaging templates for SMS and notifications.
- **Integrations**: Design a "Coming Soon" placeholder in the Integration Tab.

---

## Phase 2: Main Property Eye Admin Dashboard

### [ ] Overview Page
1. **Sweep Countdown**: Add a visible marker for the next sweep date (sweeps are twice a year) and a "days left" countdown.
2. **Card Update**: Rename "RECOVERED COMMISSION" to "TOTAL INCOME" (Sum of all-time earnings from Subscriptions and Commissions).
3. **User Activity Graph**: Investigate and clarify what the "User Activity" graph is tracking.
4. **Fraud Distribution Chart**: 
   - Add a Graph/Bar Chart/Donut Chart showing fraud found across the two annual checks.
   - Show "Total Fraud - First Half", "Total Fraud - Second Half".
   - Center text: "SUM (ALL TIME TOTAL FRAUDS DETECTED)".
   - Filters: Specific Years and Specific Agencies (drop-downs).
5. **Card Update**: Rename "TOTAL CHECKS USED" to "TOTAL LAND REGISTRY CHECKS" (or "TOTAL LR CHECKS"). Tracks hits against Land Registry API.
6. **Checks Table**: Add a table measuring the number of checks done in each of the two annual periods. Filterable by Year and Agency.
7. **Card Update**: Rename "TOTAL OPEN CASES" to a more appropriate title.
8. **Case Queue Refinement**: 
   - Remove "FRAUD TYPE".
   - Add "AGENCY NAME".
   - Add "PERIOD FOUND" (First or Second half).
   - Filters: Filter by Year, Order by Agency.
9. **Cleanup**: Delete the "MOST COMMON FRAUD TYPES" table.
10. **Fraud Detection Over Time**: Update to show *only* yearly growth. No filters. (Year 1 = single dot).

### [ ] Agencies Page
1. **Card Update**: Replace "SELF-HANDLED AGENCIES" with "COMMISSIONS RECOVERED" (as first or last card).
2. **Agency Classification**: Remove the concept of classifying agencies into "Self-Managed", etc.
3. **Agency List Table**: Add new fields:
   - Integration Type (CSV, PDF, ALTO, etc.)
   - Checks Done
   - Fraud Detected (Previously Open Cases)
4. **Sync Health**: Update "Last Data Sync" to show "HEALTHY" or "UNHEALTHY". Use hyphen (-) for CSV/PDF types.
5. **Agency View Actions**:
   - **Agency Stats**: Remove "CHECKS USED", "LAST DATA PULL", "OVERDUE INVOICES".
   - **Status**: Change "DATA PULL STATUS" to "INTEGRATION STATUS".
   - **Cleanup**: Delete "LAND REGISTRY" and "TRANSACTION METADATA" sections.
   - **Cases Tab**: Delete "FRAUD TYPE". Add "DATE PROPERTY WAS SOLD" (from Price Paid Dataset).

### [ ] Case Details (View Action)
1. **Property & Parties**: 
   - Delete "AGENT" and "INTRODUCED BUYERS".
   - Add: "Date withdrawn", "Date sold", "Sold amount", "Sold to" (Buyer).
2. **Logic**: Remove "CLOSE CASE" and "TRIGGER CASE" functionality.
3. **Case Overview**: 
   - Delete "FRAUD TYPE", "RECOVERY MODE", "EVIDENCE STATUS".
   - Update "STATUS": Show "CHECKED" if verified against Land Registry, else blank.
4. **Cleanup**: Delete "EVIDENCE OVERVIEW TABLE".
5. **Timeline/Audit Trail**: Track: Case opened, Check opened, Check completed, Classification (Fraud/Not Fraud).

### [ ] Case Management
1. **Cleanup**: Delete "FRAUD TYPE" field.
2. **Filtering**: Add "AGENCY" filter.
3. **Logic**: The list should record every property withdrawn that was sold (Price Paid Dataset match).
4. **Dynamic Updates**: Completion Date, Buyer Name, and Status should update *after* Land Registry checks.
5. **Transaction Metadata**: Remove "Payer" and "Recipient" (redundant with Buyer Name).

### [ ] Team Management
1. **Roles**: Define specific events/actions for each user profile/role.
2. **Avatars**: Implement stock/fun placeholder templates for users without profile images.

### [ ] Billing & Finance
1. **Card Update**: Rename "REVENUE GENERATED" to "TOTAL SUBSCRIPTION REVENUE".

### [ ] Reports & Exports
1. **Cards Update**: 
   - Card 1: "COMMISSION RECOVERED"
   - Card 2: "TOTAL SUBSCRIPTION REVENUE"
   - Card 3: "CASES OPEN"
   - Card 4: "FRAUD DETECTED"
2. **Detail Level**: Significant increase in report detail (to be designed).
3. **Cleanup**: Remove "Checks Consumption by Plan" and "Cases Open VS Cases Closed" graphs.

---

## Phase 3: Agency Dashboard Refinement

### [ ] Overview Page
1. **Time Filters**: Change "THIS MONTH", "LAST WEEK" to "FIRST HALF OF YEAR", "SECOND HALF OF YEAR".
2. **Card Update**: Rename "AVERAGE FRAUD LIKELIHOOD" to "TOTAL CHECKS".
3. **Recoveries Card**: Link search functionality in Case Management to recoveries to allow this card to track accurately.
4. **Top Properties**: Replace "REPEAT OFFENDERS" with "TOP 5 Properties Withdrawn and Sold with Most Commission".
5. **Severity Distribution**: Add Severity Distribution graph (matching Admin Overview).
6. **Fraud Detection Graph**: Update to yearly growth only (matches Admin Overview item 10).

### [ ] Case Management
1. **Cleanup**: Remove "Self Managed" and "Managed" tabs. All cases are Managed.
2. **View Action**: Apply same changes as Admin Case Management view.
3. **Cleanup**: Remove "FALSE POSITIVE RATE" and "RECOVERY RATE" cards. Focus on the table (make it longer).
4. **Logic**: Remove "CLOSE CASE" button. Agencies cannot close cases.

### [ ] Analytics
1. **Logs**: Add an Event Log table (matching Admin Dashboard).
2. **Case Stats**: Add representation for "OPEN CASES" and "ALL TIME CLOSED CASES".
3. **Closed Cases Table**: Add a table showing cases closed by Admin.
4. **Metric Review**: Analyze "FRAUD RATE OVER TIME" and "DETECTION VS FALSE POSITIVE RATIO".
5. **Tabs**: Merge "OVERVIEW", "FRAUD PATTERNS", "FINANCIAL IMPACT" tabs.
6. **Cleanup**: Delete "MOST COMMON FRAUD TYPES" graph.
7. **Graph Labels**: Add axis labels to "Timing Gaps Distribution". Y-axis: "NUMBER OF PROPERTIES SOLD", X-axis: "TIME".

### [ ] Team Management
1. **Metrics**: "Cases Opened" card should show (Properties Withdrawn & Sold) / (Total Checks).
2. **Cleanup**: Remove "Evidence Uploaded" or replace with "FRAUD PERCENTAGE" (Fraud Detected / Properties Withdrawn & Sold). Center remaining cards.

### [ ] Account & Billing
1. **Cleanup**: Remove both progress bars.
2. **Subscription**: Refine the Subscription Plan details.

### [ ] Help Centre
1. **Content**: Replace all dummy text.
2. **Contact**: Implement functionality for "CONTACT US" button.
