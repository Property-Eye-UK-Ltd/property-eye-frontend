import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Button } from "@/components/ui/button";
import { ScanSessionHistory } from "@/features/casescans/components/ScanSessionHistory";
import { useNavigate } from "react-router-dom";

const ScanHistory = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout variant="super-admin">
      <DynamicPageHeader
        title="Scan History"
        breadcrumbs={[
          { label: "Case Scans", href: "/admin/case-scans" },
          { label: "History" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/case-scans")}
            className="text-xs"
          >
            Back to Scans
          </Button>
        }
      />

      <DashboardPanel
        title="Previous Scan Sessions"
        description="View all past scan sessions and their results"
        noPadding
        hasBorder
      >
        <ScanSessionHistory />
      </DashboardPanel>
    </DashboardLayout>
  );
};

export default ScanHistory;
