# Property Eye - Project Overview

## What is Property Eye?

**Property Eye** is a fraud detection and commission recovery platform built specifically for real estate agencies. The platform helps agencies identify, track, and recover commissions lost when clients or buyers bypass the agency after introductions have been made.

### The Digital Watchdog

Property Eye acts as a **digital watchdog** — continuously monitoring, flagging, and reporting potential fraudulent or bypass transactions — empowering agencies to reclaim lost revenue and safeguard trust in their operations.

---

## The Core Problem

Real estate agencies invest heavily in **lead generation, marketing, and client relationships**. However, many lose commissions due to:

- **Clients going "behind closed doors"** to close deals directly with sellers
- **Limited visibility** into post-introduction buyer-seller activities
- **Manual and fragmented tracking systems** (emails, spreadsheets, calls)
- **Lack of a unified fraud detection or verification system**

These gaps lead to **significant revenue leakage, operational inefficiencies, and poor accountability**.

---

## The Solution (How Property Eye Works)

Property Eye provides a **centralized and automated fraud monitoring system** that integrates with agency workflows and data points (e.g., property listings, introductions, transaction records, etc.) to detect suspicious matches and patterns.

### At a High Level:

1. **Agencies sign up** and connect their property and client data (e.g., listings, viewing logs, buyer profiles)

2. **Property Eye monitors** buyer-seller interactions, patterns, and closed property transactions

3. **The system flags potential bypass activity**, such as:
   - A property listed as "withdrawn" later reappearing as "sold" but not by the same agency
   - A buyer from the agency database matching a public transaction

4. **Alerts are generated** in real time, appearing in dashboards and notifications

5. **Agencies can act** — review the alert, build the case, and initiate recovery or legal steps

The platform becomes both a **monitoring tool** and a **recovery support system** for lost commissions.

---

## Platform Architecture

### User Roles & Dashboards

Based on the Figma designs, the platform will support multiple user types:

#### 1. **Authentication System**
- User registration and login
- Role-based access control
- Secure authentication flow

#### 2. **User Admin Dashboard** (Real Estate Agencies)
- View and manage property listings
- Track client introductions and viewing logs
- Monitor alerts and flagged transactions
- Access commission recovery tools
- Generate reports and analytics
- Manage agency team members

#### 3. **Property Eye Super Admin Dashboard**
- Platform-wide oversight
- Manage all registered agencies
- System configuration and settings
- Analytics across all agencies
- Support and moderation tools

#### 4. **Landing Page** (To be implemented)
- Marketing and product information
- Call-to-action for agency sign-ups
- Feature highlights and benefits
- Pricing information
- Contact and support

---

## Technical Implementation Plan

### Phase 1: Foundation & Branding ✅
- [x] Set up React + TypeScript + Vite starter
- [x] Install UI component library (shadcn/ui)
- [x] Install Iconsax icon library
- [ ] Add brand fonts
- [ ] Configure design tokens (colors, spacing, typography)
- [ ] Update index.html with branding
- [ ] Set up docs directory

### Phase 2: Authentication Pages
- [ ] Login page
- [ ] Registration page
- [ ] Password reset flow
- [ ] Email verification
- [ ] Role selection during signup

### Phase 3: User Admin Dashboard
- [ ] Dashboard layout and navigation
- [ ] Property listings management
- [ ] Client/buyer database
- [ ] Alerts and notifications center
- [ ] Commission tracking
- [ ] Reports and analytics
- [ ] Team management

### Phase 4: Super Admin Dashboard
- [ ] Platform overview dashboard
- [ ] Agency management
- [ ] System configuration
- [ ] Platform-wide analytics
- [ ] User support tools

### Phase 5: Landing Page
- [ ] Hero section
- [ ] Features showcase
- [ ] How it works section
- [ ] Pricing plans
- [ ] Testimonials
- [ ] FAQ
- [ ] Contact form

---

## Key Features to Implement

### Fraud Detection & Monitoring
- Real-time transaction monitoring
- Pattern recognition algorithms
- Automated alert generation
- Suspicious activity flagging

### Commission Recovery
- Case building tools
- Evidence collection and documentation
- Recovery workflow management
- Legal support integration

### Data Management
- Property listing integration
- Client database management
- Viewing log tracking
- Transaction record matching

### Analytics & Reporting
- Revenue leakage analytics
- Commission recovery metrics
- Agency performance dashboards
- Custom report generation

### Notifications & Alerts
- Real-time alert system
- Email notifications
- In-app notifications
- Alert prioritization

---

## Technology Stack

### Frontend (Current)
- **React 18.3.1** - UI framework
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **shadcn/ui** - Component library
- **Iconsax React** - Icon library
- **React Router DOM** - Navigation
- **TanStack React Query** - Data fetching
- **React Hook Form + Zod** - Form handling

### Backend (To be determined)
- API integration points needed
- Authentication service
- Database for agencies, users, properties, transactions
- Real-time monitoring service
- Alert notification service

---

## Next Steps

1. **Receive brand assets** (fonts, colors, logos)
2. **Set up design tokens** in Tailwind config and CSS variables
3. **Update index.html** with branding and metadata
4. **Implement authentication pages** based on Figma designs
5. **Build out dashboard layouts** for both user types
6. **Integrate backend APIs** (when available)
7. **Implement landing page** (final phase)

---

## Project Goals

- **Empower real estate agencies** to protect their commissions
- **Automate fraud detection** to reduce manual tracking
- **Provide actionable insights** through alerts and analytics
- **Create a seamless user experience** across all dashboards
- **Build a scalable platform** that can grow with agency needs

---

*Last Updated: November 21, 2025*
