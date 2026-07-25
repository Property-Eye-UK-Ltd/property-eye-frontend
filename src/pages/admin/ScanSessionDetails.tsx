import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DynamicPageHeader } from "@/components/dashboard/DynamicPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScanResultsTable } from "@/features/casescans/components/ScanResultsTable";
import { getScanSession } from "@/features/casescans/api/scanSessionService";
import type { ScanSession } from "@/types/scan-session.types";
import { useToast } from "@/hooks/use-toast";

const ScanSessionDetails = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<ScanSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const { data } = await getScanSession(sessionId);
        setSession(data);
      } catch (error) {
        setNotFound(true);
        toast({
          title: "Error loading scan session",
          description:
            error instanceof Error ? error.message : "Failed to load scan session",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, toast]);

  return (
    <DashboardLayout variant="super-admin">
      <DynamicPageHeader
        title="Scan Session Results"
        breadcrumbs={[
          { label: "Case Scans", href: "/admin/case-scans" },
          { label: "History", href: "/admin/case-scans/history" },
          { label: sessionId ? sessionId.substring(0, 12) + "..." : "Session" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/case-scans/history")}
            className="text-xs"
          >
            Back to History
          </Button>
        }
      />

      {loading && (
        <DashboardPanel hasBorder>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </DashboardPanel>
      )}

      {!loading && notFound && (
        <DashboardPanel hasBorder>
          <p className="text-sm text-muted-foreground text-center py-8">
            Scan session not found.
          </p>
        </DashboardPanel>
      )}

      {!loading && session && (
        <>
          <DashboardPanel className="mb-6 bg-blue-50/50 border-blue-100">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm">Scan Summary</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Session ID: {session.id} •{" "}
                  {session.admin_user_name && `Run by ${session.admin_user_name} • `}
                  Scanned on {new Date(session.started_at).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-muted-foreground">Total Scanned</p>
                  <p className="text-lg font-bold text-blue-600">{session.total_count}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-100">
                  <p className="text-xs text-muted-foreground">Confirmed Fraud</p>
                  <p className="text-lg font-bold text-red-600">
                    {session.confirmed_fraud_count}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-100">
                  <p className="text-xs text-muted-foreground">Ruled Out</p>
                  <p className="text-lg font-bold text-green-600">
                    {session.not_fraud_count}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-amber-100">
                  <p className="text-xs text-muted-foreground">Errors</p>
                  <p className="text-lg font-bold text-amber-600">{session.error_count}</p>
                </div>
              </div>
            </div>
          </DashboardPanel>

          <DashboardPanel hasBorder>
            <ScanResultsTable
              results={session.results ?? []}
              sessionId={session.id}
            />
          </DashboardPanel>
        </>
      )}
    </DashboardLayout>
  );
};

export default ScanSessionDetails;
