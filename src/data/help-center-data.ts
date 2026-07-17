export interface HelpCenterCard {
    id: string
    icon: string
    title: string
    description: string
    link: string
}

export interface HelpArticleSection {
    title: string
    content: string[]
    steps?: string[]
}

export interface HelpArticleContent {
    slug: string
    description: string
    lastModified: string
    sections: HelpArticleSection[]
}

export const helpCenterCards: HelpCenterCard[] = [
    {
        id: "1",
        icon: "LampCharge",
        title: "Getting Started",
        description: "Log in, navigate the dashboard, and understand what each section does.",
        link: "/dashboard/help/getting-started",
    },
    {
        id: "2",
        icon: "People",
        title: "Team Management",
        description: "Invite staff, assign roles, and control what each person can access.",
        link: "/dashboard/help/team-management",
    },
    {
        id: "3",
        icon: "Setting2",
        title: "Settings",
        description: "Configure notifications, scheduling, data retention, and message templates.",
        link: "/dashboard/help/settings",
    },
    {
        id: "4",
        icon: "Wallet1",
        title: "Billing",
        description: "Understand your subscription plan, billing cycle, and payment history.",
        link: "/dashboard/help/billing",
    },
    {
        id: "6",
        icon: "Profile",
        title: "Profile",
        description: "Update your personal details, contact info, and notification preferences.",
        link: "/dashboard/help/profile",
    },
    {
        id: "8",
        icon: "Book1",
        title: "Case Management",
        description: "Work cases from the queue, submit determinations, and handle disputes.",
        link: "/dashboard/help/case-management",
    },
    {
        id: "9",
        icon: "Data",
        title: "Integration",
        description: "Connect your property data feed so checks run against your withdrawn listings.",
        link: "/dashboard/help/integration",
    },
]

export const helpArticles: Record<string, HelpArticleContent> = {
    "getting-started": {
        slug: "getting-started",
        description: "Log in, navigate the dashboard, and understand what each section does.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "Logging In",
                content: [
                    "Go to your Property Eye login URL and enter your email address and password. If your agency owner has not yet sent you an invitation, ask them to invite you from the Team Management page.",
                    "Once logged in, your role determines which pages you can see. Agency Owners have full access to their account. Agency Staff can view and raise disputes on cases. Agency Viewers have read-only access."
                ],
                steps: [
                    "Visit your Property Eye login link",
                    "Enter your registered email and password",
                    "You will land on the Overview dashboard",
                ],
            },
            {
                title: "Dashboard Overview",
                content: [
                    "The Overview page shows a summary of your account activity. You will see your current case counts — open, in progress, and closed — and a breakdown of outcomes for any closed cases.",
                    "The left-hand navigation gives you access to Cases, Properties, Team, Billing, Help, and Settings depending on your role.",
                ],
            },
            {
                title: "Properties",
                content: [
                    "The Properties section lists every property your agency has submitted for monitoring. Each row shows the address, buyer and vendor, the date it was withdrawn, and its current status.",
                    "Properties are submitted automatically via your data integration. If you do not see a property you expect, check the Integration settings page to confirm your feed is healthy.",
                ],
            },
            {
                title: "Cases",
                content: [
                    "A case is created when Property Eye's algorithm matches one of your withdrawn properties to a sale in the Land Registry Price Paid Dataset. Cases appear in your Case Management page once a Property Eye analyst has confirmed the match.",
                    "You can view the status of any case — Open, Closed (Confirmed Fraud), or Closed (Not Fraud). If a case is closed and you believe the determination is incorrect, you can raise a dispute directly from the case row.",
                ],
            },
        ],
    },

    "team-management": {
        slug: "team-management",
        description: "Invite staff, assign roles, and control what each person can access.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "The Three Agency Roles",
                content: [
                    "Every person on your Property Eye account is assigned one of three roles. Roles are deliberately named differently from Property Eye's own internal staff roles so there is no confusion in a support conversation.",
                ],
            },
            {
                title: "Agency Owner",
                content: [
                    "Full control of the agency account. An Agency Owner can do everything listed below and is the only role that can manage team members and change account-level settings.",
                    "✓ View all cases (status and outcome only)",
                    "✓ Raise a dispute on any closed case",
                    "✓ Invite, edit, or deactivate team members",
                    "✓ Manage billing and subscription plan",
                    "✓ Configure integration, notifications, and security settings",
                    "✗ Cannot see internal case severity, recovered amounts, or Property Eye's internal notes",
                ],
            },
            {
                title: "Agency Staff",
                content: [
                    "Working access to cases with the ability to raise disputes. Suitable for estate agents or coordinators who need to act on case outcomes.",
                    "✓ View all cases (status and outcome only)",
                    "✓ Raise a dispute on any closed case",
                    "✗ Cannot manage other staff members",
                    "✗ Cannot change billing, integration, or security settings",
                    "✗ Cannot see internal case severity, recovered amounts, or Property Eye's internal notes",
                ],
            },
            {
                title: "Agency Viewer",
                content: [
                    "Read-only access. Suitable for a trainee, a compliance contact, or anyone who needs visibility without taking action.",
                    "✓ View all cases (status and outcome only)",
                    "✗ Cannot raise a dispute",
                    "✗ Cannot manage team members",
                    "✗ Cannot change any settings",
                ],
            },
            {
                title: "What All Roles Have in Common",
                content: [
                    "All three roles see exactly the same case information: status (Open, Processing Dispute, Closed) and outcome (Confirmed Fraud / Not Fraudulent). No role at the agency level can see the internal severity score, the recovered amount, or any notes left by Property Eye analysts. This is intentional — Property Eye acts as the intermediary and that information stays internal.",
                ],
            },
            {
                title: "Inviting a Team Member",
                content: [
                    "Only Agency Owners can invite new staff. Go to Team Management, click Add Team Member, fill in their name, email, and select their role. They will receive an email with a link to set their password.",
                ],
                steps: [
                    "Navigate to Team Management in the left sidebar",
                    "Click Add Team Member",
                    "Enter their full name and email address",
                    "Select their role (Owner, Staff, or Viewer)",
                    "Click Send Invite — they receive a setup email immediately",
                ],
            },
            {
                title: "Changing a Role or Deactivating Someone",
                content: [
                    "Click any team member row to open the edit panel. You can change their role at any time or deactivate their account. Deactivated accounts lose access immediately. Their history and any actions they took are retained.",
                    "You cannot delete your own account from the Team Management page — contact Property Eye support if you need to transfer ownership.",
                ],
            },
        ],
    },

    "settings": {
        slug: "settings",
        description: "Configure notifications, scheduling, data retention, and message templates.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "Notification Preferences",
                content: [
                    "The Notifications tab lets you control which alerts you receive and via which channel — email, SMS, or push. Channels can be toggled independently per notification type.",
                    "Agency-facing notifications include: Fraud Detected (email), Case Cleared (email), Account Review Reminder (SMS), Billing Reminder (SMS), Dispute Received (email), and Dispute Resolved (email). You cannot edit the content of these messages — that is controlled centrally by Property Eye.",
                ],
            },
            {
                title: "Integration Settings",
                content: [
                    "Integration settings let you manage the data connection between your agency's property feed and Property Eye. If your feed goes unhealthy, withdrawn properties may be missed in the next check run. Keep this up to date, especially before scheduled account reviews.",
                ],
            },
            {
                title: "Profile and Personal Settings",
                content: [
                    "Update your name, email address, and phone number under Profile. Changes to your email require verification before they take effect.",
                ],
            },
        ],
    },

    "billing": {
        slug: "billing",
        description: "Understand your subscription plan, billing cycle, and payment history.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "Subscription Plans",
                content: [
                    "Property Eye offers two plans: Starter and Enterprise. Both plans include the same core service — fraud monitoring against the Land Registry Price Paid Dataset. The difference is pricing, which scales by agency size rather than by features.",
                    "Your current plan and next billing date are shown at the top of the Billing page.",
                ],
            },
            {
                title: "How Billing Works",
                content: [
                    "You are billed monthly. Property Eye sends an SMS reminder three days before your billing date. If payment fails, your access may be suspended until it is resolved.",
                    "The monthly subscription fee funds the cost of running checks against the Land Registry. Checks run twice a year in batch, not monthly — your monthly fees accumulate to cover each run.",
                ],
            },
            {
                title: "Recovery Revenue Split",
                content: [
                    "If a fraud case results in a successful recovery, the recovered amount is split equally between your agency and Property Eye (50/50). This split is separate from your subscription fee and only applies to confirmed fraudulent cases where funds are recovered.",
                ],
            },
            {
                title: "Payment History",
                content: [
                    "The Billing page shows a full history of payments made. You can download individual invoices from this page for your records.",
                ],
            },
        ],
    },

    "profile": {
        slug: "profile",
        description: "Update your personal details, contact info, and notification preferences.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "Updating Your Details",
                content: [
                    "Navigate to Settings > Profile to update your full name, email address, and phone number. Email changes require a confirmation link sent to the new address before they take effect.",
                ],
            },
            {
                title: "Notification Preferences",
                content: [
                    "Your personal notification preferences are set on the Profile page. You can choose to receive alerts by email, SMS, or push notification for each event type.",
                    "Note: the content of system notifications (such as Fraud Detected or Billing Reminder) is set centrally by Property Eye and cannot be edited here.",
                ],
            },
            {
                title: "Changing Your Password",
                content: [
                    "Use the Change Password option on the Profile page. You will need to enter your current password before setting a new one. Passwords must be at least 8 characters.",
                ],
                steps: [
                    "Go to Settings > Profile",
                    "Click Change Password",
                    "Enter your current password",
                    "Enter and confirm your new password",
                    "Click Save Changes",
                ],
            },
        ],
    },

    "case-management": {
        slug: "case-management",
        description: "Work cases from the queue, submit determinations, and handle disputes.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "What a Case Is",
                content: [
                    "A case is created when Property Eye's algorithm finds a confirmed match between one of your withdrawn properties and a completed sale in the Land Registry Price Paid Dataset. This indicates the property may have been sold without your agency's knowledge, which is the core fraud signal the platform monitors.",
                    "Cases only appear in your dashboard after a Property Eye analyst has reviewed and confirmed the match. You will receive a Fraud Detected email notification when this happens.",
                ],
            },
            {
                title: "Case Status and Recovery Outcome",
                content: [
                    "Each case has two distinct pieces of information: Status (where the case is in the process) and Recovery Outcome (the result of any legal or financial recovery effort).",
                    "Status values: Open, Under Legal Review, Flagged, Processing Dispute, Pending Approval, Closed. Recovery Outcome values: Recovered, Unrecovered, In Progress — these are set by Property Eye after legal action concludes.",
                    "You will only ever see Status and Outcome. You will not see severity scores, internal notes, or the recovered amount — these are internal to Property Eye.",
                ],
            },
            {
                title: "Raising a Dispute",
                content: [
                    "If a case has been closed and you believe the determination is incorrect, you can raise a dispute. Only Agency Owners and Agency Staff can do this — Viewers cannot.",
                    "Click the case row to open its details, then select Raise Dispute. Enter a brief note explaining your grounds. Property Eye will follow up with you directly. While the dispute is being reviewed, the case status changes to Processing Dispute.",
                    "You will receive a Dispute Received email when your dispute is logged, and a Dispute Resolved email when it has been reviewed. The admin will set the new case status explicitly when resolving — it does not revert automatically.",
                ],
                steps: [
                    "Go to Cases and find the closed case",
                    "Click the row to open the case detail",
                    "Click Raise Dispute and enter your reason",
                    "Submit — the case moves to Processing Dispute",
                    "Wait for Property Eye to contact you directly",
                ],
            },
            {
                title: "What Happens After a Case Closes",
                content: [
                    "Once a case closes as Confirmed Fraud, Property Eye initiates the recovery process with Legal. The Recovery Outcome column in your Case Management table will update as that process progresses.",
                    "If the case closes as Not Fraudulent (Cleared), no further action is taken and you will receive a Case Cleared email.",
                ],
            },
        ],
    },

    "integration": {
        slug: "integration",
        description: "Connect your property data feed so checks run against your withdrawn listings.",
        lastModified: "Jul 2025",
        sections: [
            {
                title: "Why Integration Matters",
                content: [
                    "Property Eye checks your withdrawn properties against the Land Registry Price Paid Dataset to detect fraud. For this to work, your agency's withdrawn property data must be connected and up to date.",
                    "If your integration goes unhealthy, properties may be excluded from the next check run. You will receive an Account Review Reminder SMS before each scheduled check — use it as a prompt to verify your connection.",
                ],
            },
            {
                title: "Setting Up Your Integration",
                content: [
                    "Integration is configured by your Agency Owner. Go to Settings > Integration to view your current connection status and configure your data feed.",
                    "If you need help connecting your CRM or property management system, contact Property Eye support. Only supported data formats can be processed — ask support for the current list.",
                ],
                steps: [
                    "Go to Settings > Integration",
                    "Review the connection status shown at the top",
                    "If disconnected, follow the on-screen instructions or contact support",
                    "Verify at least one week before each scheduled account review",
                ],
            },
            {
                title: "Check Run Schedule",
                content: [
                    "Checks against the Land Registry run twice a year, not monthly. Your monthly subscription fee accumulates to fund each run. This batch approach allows Property Eye to access Land Registry bulk pricing, keeping costs manageable.",
                    "You will not be told the exact check dates in advance — this is intentional. You will receive an Account Review Reminder SMS the day before and an Account Review Update email once your properties have been processed.",
                ],
            },
        ],
    },
}
