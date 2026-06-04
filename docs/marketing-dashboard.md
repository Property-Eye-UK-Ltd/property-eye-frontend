# Marketing Dashboard — Agent Portal & Admin Control Tower

> **Source:** Dashboard design spec (Marketing + Admin), images 1–4.  
> **Companion doc:** [marketing-attribution-process.md](./marketing-attribution-process.md) — referral links, invites, rules engine, and data model.

## Overview

Property Eye’s marketing program needs **two distinct dashboards**:

| Dashboard | Audience | Philosophy |
|-----------|----------|------------|
| **Marketing Agent Portal** | Marketers / referral partners | Transparent **earnings + pipeline tracker** — high visibility, **minimal control** |
| **Main Admin Dashboard (Control Tower)** | Platform ops / finance / compliance | **Operations + finance + compliance** in one place — full control with auditability |

Marketers must **not** edit commissions, confirm fraud, or self-assign agencies after the fact. Every state change is driven by **status labels** and admin workflows.

---

## Part 1: Marketing Agent Portal

### Design principle

> *“Transparent earnings + pipeline tracker — not a control panel.”*

### Core layout

Single scrollable dashboard (or tabbed sections) with:

1. **Top summary** — KPI cards with trend indicators  
2. **Section 1** — My Agencies  
3. **Section 2** — Fraud Cases / Transactions  
4. **Section 3** — Commission Tracker *(most important)*  
5. **Section 4** — Payment History  
6. **Section 5** — Invite & Referral Tools  
7. **Section 6** — Disputes / Support  

---

### Top summary (at-a-glance KPIs)

Visual **metric cards** with trend indicators (match existing `MetricCards` / `DashboardPanel` patterns).

| KPI | Description |
|-----|-------------|
| Total Agencies Referred | All agencies tied to this marketer (any status) |
| Active Agencies | Approved + active on platform |
| Fraud Cases Identified | Count of fraud cases linked to marketer’s agencies |
| Total Commission Earned | Lifetime earned (all statuses) |
| Pending Commission | Awaiting approval or payment |
| Paid Commission | Successfully paid out |

---

### Section 1: My Agencies

Marketer’s **portfolio** — table view.

| Column | Notes |
|--------|--------|
| Agency Name | — |
| Status | `Pending` \| `Active` \| `Rejected` |
| Date Added | — |
| Attribution Method | `link` \| `invite` \| `manual` |
| Total Fraud Value | Sum across cases for this agency |
| Total Commission Earned | Sum for this agency |
| Actions | **View details** · **Submit claim** (when not yet attributed) |

**Submit claim:** Opens modal/form for manual attribution (evidence upload) — always creates `pending` record; never auto-approves. See attribution doc.

---

### Section 2: Fraud Cases / Transactions

Builds trust in commission math — shows **what generated earnings**.

| Column | Notes |
|--------|--------|
| Agency | — |
| Case ID / Transaction Ref | Link to case detail (read-only) |
| Fraud Value | Currency |
| Status | `Detected` \| `Under Review` \| `Confirmed` \| `Recovered` |
| Commission Status | `eligible` \| `not eligible` |

Read-only for marketers. Status driven by platform fraud workflow.

---

### Section 3: Commission Tracker

**Most important section** for marketers.

#### Summary row (sub-cards)

| Metric | Maps to lifecycle |
|--------|-------------------|
| Total Earned | All time |
| Pending Approval | Awaiting admin approval |
| Approved (Awaiting Payment) | Approved, not yet paid |
| Paid | Paid out |

#### Detail table

| Column | Notes |
|--------|--------|
| Agency | — |
| Fraud Case | Case ref |
| Commission % | From marketer contract |
| Commission Amount | Calculated |
| Status | `Pending` \| `Approved` \| `Paid` *(extend as needed)* |

---

### Section 4: Payment History

| Column | Notes |
|--------|--------|
| Payment Date | — |
| Amount | — |
| Period Covered | e.g. Q1 2026 |
| Payment Status | e.g. `Paid` \| `Rejected` |

**Action:** **Download Statement (PDF)** per row or per period.

---

### Section 5: Invite & Referral Tools

Primary growth mechanism for marketers.

| Feature | Behavior |
|---------|----------|
| Unique referral link | Display + **Copy** button; URL pattern e.g. `/signup?ref={referral_code}` |
| Invite Agency form | Agency name + contact email → sends invite with marketer-bound token |
| Invite status tracking | Per invite: `Sent` → `Opened` → `Signed up` |

Integrates with signup flow and attribution capture (see companion doc).

---

### Section 6: Disputes / Support

| Feature | Behavior |
|---------|----------|
| Raise dispute | Types: **agency ownership**, **commission** |
| Track status | `Open` \| `Under Review` \| `Resolved` |

Linked in admin Control Tower to agency, attribution, and commission records.

---

### Marketer UX rules (non-negotiable)

- [ ] **No** editing commissions  
- [ ] **No** “confirm fraud” actions  
- [ ] **No** self-assigning agencies after the fact (except **Submit claim** → pending admin review)  
- [ ] **Everything** shows a clear status label (badges)  
- [ ] Read-only fraud/case views; actions limited to invite, copy link, submit claim, raise dispute, download statement  

---

## Part 2: Main Admin Dashboard (Control Tower)

> *“Real power — operations + finance + compliance in one place.”*

Can live as a **new nav group** on the existing super-admin shell (`DashboardLayout variant="super-admin"`) or a dedicated `/admin/marketing/*` subtree. Shares agency/fraud data with current admin but adds marketer-specific entities.

### Top-level overview (executive view)

KPI cards:

| Metric |
|--------|
| Total Marketers |
| Total Agencies |
| Total Fraud Value Detected |
| Total Commission Liability |
| Paid vs. Outstanding Commission |
| Active Disputes |

---

### Section 1: Marketer Management

| Feature | Details |
|---------|---------|
| Marketer list | All marketers with status |
| Performance per marketer | Agencies referred, fraud generated, commission earned |
| Contract terms | Commission % (and conditions — tie to Commission Engine) |
| Admin actions | Activate / deactivate marketer; adjust commission rules |

---

### Section 2: Agency Management

| Feature | Details |
|---------|---------|
| All agencies | Platform-wide list |
| Attribution tracking | Referring marketer + method (`link` \| `invite` \| `manual`) |
| Status | `Pending approval` \| `Active` \| `Rejected` |
| Duplicate detection | Warnings for same domain, registration, fuzzy name match |

---

### Section 3: Attribution Control ⚠️ CRITICAL

> *“This is where most systems fail if missing.”*

| Feature | Details |
|---------|---------|
| Attribution records | Full list with filters |
| Conflict detection | e.g. two marketers claiming same agency |
| Evidence view | For manual claims |
| Actions | Approve / reject / override / **lock** attribution |

Locked attributions are immutable without admin override + audit log.

---

### Section 4: Fraud Case Management

| Feature | Details |
|---------|---------|
| All detected fraud transactions | Platform-wide |
| Assign to agencies | If unassigned |
| Status workflow | `detected` → `confirmed` → `recovered` |
| Commission link | Fraud status drives commission eligibility |

---

### Section 5: Commission Engine

Structured rules — **not spreadsheets**.

| Feature | Details |
|---------|---------|
| Rule definition | % per marketer; conditions (e.g. pay only after `recovered`) |
| Auto-calculation | On fraud confirmation / recovery events |
| Manual override | Allowed with **mandatory audit log** |

---

### Section 6: Commission Approval Queue

Gate before marketers see money.

| Feature | Details |
|---------|---------|
| Pending commissions list | — |
| Breakdown | Agency, fraud case, amount |
| Actions | Approve / reject |

---

### Section 7: Payment Management

| Feature | Details |
|---------|---------|
| Mark as paid | Per commission or batch |
| Batch payments | Finance workflow |
| Export | For finance team |
| Payment history logs | Immutable log |

---

### Section 8: Dispute Resolution

| Feature | Details |
|---------|---------|
| All marketer disputes | Filterable queue |
| Linked records | Agency, attribution, commission |
| Admin actions | Review evidence, resolve, override |

---

### Section 9: Audit Logs (non-negotiable)

Track **everything**:

- Attribution changes  
- Commission edits  
- Approvals / rejections  
- Payments  

UI: filterable table (actor, entity, action, timestamp, before/after).

---

### Section 10: Reporting

Dimensions:

- By marketer  
- By agency  
- By fraud value  
- By commission  
- Time-based (date range)  

Reuse `reports` feature patterns; add export (CSV/PDF).

---

### Key design principles

1. **Separation of power** — Marketers see; admins control.  
2. **Status-driven UI** — No ambiguous states; badges everywhere.  
3. **Attribution before money** — Lock attribution before commission approval.  
4. **Audit everything** — Especially overrides and attribution changes.  
5. **Don’t overwrite old records** — Version/history for rule and attribution changes (see attribution doc).

---

## Status enums (reference)

```typescript
// Agency (marketer portfolio / admin)
type AgencyAttributionStatus = "pending" | "active" | "rejected";

// Attribution record
type AttributionSource = "link" | "invite" | "manual";
type AttributionStatus = "pending" | "approved" | "rejected";

// Fraud (marketer view labels)
type FraudCaseStatus = "detected" | "under_review" | "confirmed" | "recovered";
type CommissionEligibility = "eligible" | "not_eligible";

// Commission line
type CommissionLineStatus = "pending" | "approved" | "paid";

// Invite
type InviteStatus = "sent" | "opened" | "signed_up";

// Dispute
type DisputeStatus = "open" | "under_review" | "resolved";
type DisputeType = "agency_ownership" | "commission";

// Payment (marketer history)
type PaymentStatus = "paid" | "rejected";
```

---

## Frontend implementation plan

Aligned with existing Property Eye frontend (`src/pages`, `src/features`, `src/data`, `DashboardLayout`, `config/navigation.ts`).

### Phase 0 — Foundation (mock data, same as rest of app)

- [ ] Add `src/data/marketing/` mock modules (marketer overview, agencies, fraud cases, commissions, payments, invites, disputes)  
- [ ] Add `src/types/marketing.types.ts` (enums above)  
- [ ] Extend `components.json` patterns only as needed (no new UI lib)

### Phase 1 — Marketer portal (STEP 1 MVP per attribution doc)

**Routes** (`App.tsx`):

| Path | Page | Notes |
|------|------|--------|
| `/marketing/login` | `MarketingLogin` | Or shared login with role redirect |
| `/marketing/dashboard` | `MarketingOverview` | KPI + sections 1–3 on one page initially |
| `/marketing/agencies` | `MarketingAgencies` | Section 1 full table + agency detail drawer |
| `/marketing/fraud-cases` | `MarketingFraudCases` | Section 2 |
| `/marketing/commissions` | `MarketingCommissions` | Section 3 (priority) |
| `/marketing/payments` | `MarketingPayments` | Section 4 |
| `/marketing/referrals` | `MarketingReferrals` | Section 5 — link + invites |
| `/marketing/disputes` | `MarketingDisputes` | Section 6 |

**Layout:**

```
src/components/marketing/
  MarketingLayout.tsx          # wraps DashboardLayout variant="marketer"
  MarketingSidebarContent.tsx  # or extend DashboardSidebarContent
```

**Nav** (`src/config/navigation.ts`):

```typescript
export const marketerNavConfig: NavConfig = {
  mainItems: [
    { label: "Overview", path: "/marketing/dashboard", ... },
    { label: "My Agencies", path: "/marketing/agencies", ... },
    { label: "Fraud Cases", path: "/marketing/fraud-cases", ... },
    { label: "Commissions", path: "/marketing/commissions", ... },
    { label: "Payments", path: "/marketing/payments", ... },
    { label: "Referrals", path: "/marketing/referrals", ... },
  ],
  bottomItems: [
    { label: "Disputes", path: "/marketing/disputes", ... },
  ],
  showProCard: false,
};
```

**Features** (`src/features/marketing/`):

| Module | Components |
|--------|------------|
| `overview/` | `MarketingMetricCards`, `MarketingTrendCard` |
| `agencies/` | `MarketerAgenciesTable`, `AgencyDetailSheet`, `SubmitClaimModal` |
| `fraud-cases/` | `MarketerFraudCasesTable` |
| `commissions/` | `CommissionSummaryCards`, `CommissionLinesTable` |
| `payments/` | `PaymentHistoryTable`, `DownloadStatementButton` |
| `referrals/` | `ReferralLinkCard`, `InviteAgencyModal`, `InviteStatusTable` |
| `disputes/` | `DisputesTable`, `RaiseDisputeModal` |

**Modals:**

- `SubmitClaimModal` — agency identifier, evidence upload (placeholder), notes  
- `InviteAgencyModal` — name, email  
- `RaiseDisputeModal` — type, linked agency/commission, description  
- `AgencyDetailSheet` — read-only portfolio detail  

**Reuse from codebase:**

- `DashboardLayout`, `DashboardPanel`, `TablePagination`, `DynamicPageHeader`  
- `components/ui/table`, `badge`, `dialog`, `sheet`, `card`, `button`  
- `ModalShell` for consistent modal chrome  
- Status badges: same pattern as agency case status in `AgenciesTablePanel`

### Phase 2 — Admin Control Tower (marketing admin)

**Option A (recommended):** Sub-routes under existing super admin — avoids a third full shell.

| Path | Page |
|------|------|
| `/admin/marketing` | `MarketingAdminOverview` — executive KPIs |
| `/admin/marketing/marketers` | `MarketerManagement` |
| `/admin/marketing/marketers/:id` | `MarketerDetail` |
| `/admin/marketing/attributions` | `AttributionControl` — **build early** |
| `/admin/marketing/commissions/rules` | `CommissionEngine` |
| `/admin/marketing/commissions/approvals` | `CommissionApprovalQueue` |
| `/admin/marketing/payments` | `MarketingPaymentManagement` |
| `/admin/marketing/disputes` | `MarketingDisputeResolution` |
| `/admin/marketing/audit` | `MarketingAuditLogs` |
| `/admin/marketing/reports` | `MarketingReports` |

Extend `superAdminNavConfig` with a **Marketing** group (or nested items). Reuse existing `/admin/agencies` where overlap exists; add attribution column + duplicate warnings on agency list.

**Features** (`src/features/marketing-admin/`):

| Module | Key components |
|--------|----------------|
| `overview/` | Executive metric cards |
| `marketers/` | `MarketersTable`, `MarketerDetailPanel`, `EditCommissionRulesModal`, activate/deactivate |
| `attributions/` | `AttributionQueueTable`, `AttributionConflictAlert`, `AttributionEvidenceModal`, approve/reject/lock actions |
| `commissions/` | `CommissionRulesForm`, `CommissionApprovalTable`, override with reason |
| `payments/` | `BatchPaymentPanel`, `MarkPaidModal`, export button |
| `disputes/` | `AdminDisputesTable`, `ResolveDisputeModal` |
| `audit/` | `AuditLogTable` with filters |
| `reports/` | Reuse `reports` charts/tables with marketer dimensions |

**Agency management enhancements** (existing `/admin/agencies`):

- [ ] Add columns: referring marketer, attribution method, attribution status  
- [ ] `DuplicateAgencyWarning` banner on profile when match detected  

**Fraud case management** (existing `/admin/cases`):

- [ ] Add admin fields: commission eligibility, marketer payout link  
- [ ] Status transitions: `detected` → `confirmed` → `recovered`  

### Phase 3 — Signup integration (cross-cutting)

Requires backend; frontend hooks:

- [ ] Parse `?ref=` on `/signup` and persist to session/cookie  
- [ ] Invite token on signup from invite email link  
- [ ] Post-signup: show “attribution pending” in agency dashboard (optional)  

See [marketing-attribution-process.md](./marketing-attribution-process.md).

### Phase 4 — Polish

- [ ] PDF statement download (mock → API)  
- [ ] Trend indicators on KPI cards  
- [ ] Conflict alerts badge on admin Attribution nav item  
- [ ] Role-based route guards (marketer vs super-admin vs agency)

---

## Suggested build order

1. **Types + mock data** for marketer portal  
2. **Marketing layout + nav + Overview page** (KPIs + condensed tables)  
3. **Commissions + Referrals** (highest marketer value)  
4. **Submit claim + Invite modals**  
5. **Admin Attribution Control** + approval queue (unblocks trust)  
6. **Commission engine UI** (rules form + auto-calc display)  
7. **Payments, disputes, audit, reports**  
8. **Signup `?ref=` and invite token** wiring when API exists  

---

## Open questions for product

- [ ] Separate login for marketers vs shared auth with role claim?  
- [ ] Is Control Tower a new role (`marketing_admin`) or existing super admin?  
- [ ] Commission % global per marketer or per-agency overrides?  
- [ ] PDF statement: template ownership (finance vs engineering)?  

---

*Last updated: June 4, 2026*
