import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/landing-page/Home";
import Contact from "./pages/landing-page/Contact";
// RequestDemo page kept at ./pages/landing-page/RequestDemo.tsx — route hidden
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/landing-page/PrivacyPolicy";
import CookiePolicy from "./pages/landing-page/CookiePolicy";
import TermsAndConditions from "./pages/landing-page/TermsAndConditions";
import Pricing from "./pages/landing-page/Pricing";
import FAQ from "./pages/landing-page/FAQ";
import About from "./pages/landing-page/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePasswordRequired from "./pages/auth/ChangePasswordRequired";
import Signup from "./pages/auth/Signup";
import OTPVerification from "./pages/auth/OTPVerification";
import AgencyOwnerInfo from "./pages/auth/AgencyOwnerInfo";
import AgencyInformation from "./pages/auth/AgencyInformation";
import { AuthFlowLayout } from "./components/auth/AuthFlowLayout";
import { AuthProvider } from "./features/auth/context/AuthContext";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import AdminProtectedRoute from "./features/auth/components/AdminProtectedRoute";
import Overview from "./pages/dashboard/Overview";
import CaseManagement from "./pages/dashboard/CaseManagement";
import CaseDetails from "./pages/dashboard/CaseDetails";
import Properties from "./pages/dashboard/Properties";
import TeamManagement from "./pages/dashboard/TeamManagement";
import AccountBilling from "./pages/dashboard/AccountBilling";
import SubscriptionPlans from "./pages/dashboard/SubscriptionPlans";
import CheckoutCancelled from "./pages/dashboard/CheckoutCancelled";
import HelpCenter from "./pages/dashboard/HelpCenter";
import HelpArticle from "./pages/dashboard/HelpArticle";
import Settings from "./pages/dashboard/Settings";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminForgotPassword from "./pages/auth/AdminForgotPassword";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminCaseManagement from "./pages/admin/CaseManagement";
import AdminCaseDetails from "./pages/admin/AdminCaseDetails";
import BillingFinance from "./pages/admin/BillingFinance";
import TransactionDetails from "./pages/admin/TransactionDetails";
import AdminTeamManagement from "./pages/admin/TeamManagement";
import StaffDetails from "./pages/admin/StaffDetails";
import ReportsExports from "./pages/admin/ReportsExports";
import Agencies from "./pages/admin/Agencies";
import AgencyProfile from "./pages/admin/AgencyProfile";
import Affiliates from "./pages/admin/Affiliates";
import AdminSettings from "./pages/admin/AdminSettings";
import MarketingOverview from "./pages/marketing/MarketingOverview";
import MarketingReferrals from "./pages/marketing/MarketingReferrals";
import MarketingAgencies from "./pages/marketing/MarketingAgencies";
import MarketingAgencyDetail from "./pages/marketing/MarketingAgencyDetail";
import MarketingCommissions from "./pages/marketing/MarketingCommissions";
import MarketingCommissionDetail from "./pages/marketing/MarketingCommissionDetail";
import MarketingPayments from "./pages/marketing/MarketingPayments";
import MarketingPaymentDetail from "./pages/marketing/MarketingPaymentDetail";
import MarketingDisputes from "./pages/marketing/MarketingDisputes";
import MarketingSettings from "./pages/marketing/MarketingSettings";
import { SubscribeGateModal } from "./components/modals/SubscribeGateModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <SubscribeGateModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          {/* /request-demo route hidden — page file retained for future use */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />

          {/* Auth Flow Routes with Persistent Layout */}
          <Route element={<AuthFlowLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/agency-owner-info" element={<AgencyOwnerInfo />} />
            <Route path="/agency-information" element={<AgencyInformation />} />
            {/* Super Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          </Route>

          {/* Dashboard Routes (agency, requires authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/change-password" element={<ChangePasswordRequired />} />
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/cases" element={<CaseManagement />} />
            <Route path="/dashboard/cases/:caseId" element={<CaseDetails />} />
            <Route path="/dashboard/properties" element={<Properties />} />
            <Route path="/dashboard/team" element={<TeamManagement />} />
            <Route path="/dashboard/billing" element={<AccountBilling />} />
            <Route path="/dashboard/billing/plans" element={<SubscriptionPlans />} />
            <Route path="/dashboard/billing/cancelled" element={<CheckoutCancelled />} />
            <Route path="/dashboard/help" element={<HelpCenter />} />
            <Route path="/dashboard/help/:articleId" element={<HelpArticle />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* Super Admin Dashboard Routes (requires authentication) */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/change-password" element={<ChangePasswordRequired redirectTo="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<AdminOverview />} />
            <Route path="/admin/agencies" element={<Agencies />} />
            <Route path="/admin/agencies/:agencyId" element={<AgencyProfile />} />
            <Route path="/admin/affiliates" element={<Affiliates />} />
            <Route path="/admin/cases" element={<AdminCaseManagement />} />
            <Route path="/admin/cases/:caseId" element={<AdminCaseDetails />} />
            <Route path="/admin/billing" element={<BillingFinance />} />
            <Route path="/admin/billing/transaction/:transactionId" element={<TransactionDetails />} />
            <Route path="/admin/team" element={<AdminTeamManagement />} />
            <Route path="/admin/team/staff/:staffId" element={<StaffDetails />} />
            <Route path="/admin/reports" element={<ReportsExports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          {/* Marketing Agent Portal Routes */}
          <Route path="/marketing/dashboard" element={<MarketingOverview />} />
          <Route path="/marketing/referrals" element={<MarketingReferrals />} />
          <Route path="/marketing/agencies" element={<MarketingAgencies />} />
          <Route path="/marketing/agencies/:agencyId" element={<MarketingAgencyDetail />} />
          <Route path="/marketing/commissions" element={<MarketingCommissions />} />
          <Route path="/marketing/commissions/:lineId" element={<MarketingCommissionDetail />} />
          <Route path="/marketing/payments" element={<MarketingPayments />} />
          <Route path="/marketing/payments/:paymentId" element={<MarketingPaymentDetail />} />
          <Route path="/marketing/disputes" element={<MarketingDisputes />} />
          <Route path="/marketing/settings" element={<MarketingSettings />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
