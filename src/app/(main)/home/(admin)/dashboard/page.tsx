"use client";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import TabManagementPlant from "@/components/ui/home/(admin)/dashboard/components/admin/tab-management-plant";
import TabSubmission from "@/components/ui/home/(admin)/dashboard/components/admin/tab-submission";
import TableSubmission from "@/components/ui/home/(admin)/dashboard/components/admin/table-submission";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import TableSubmissionPlant from "@/components/ui/home/(admin)/dashboard/components/admin/table-submission-plant";
import TableStokPlantSeeds from "@/components/ui/home/(admin)/dashboard/components/admin/table-stock-plant-seeds";
import { usePermission } from "@/store/usePermission";
import AdminDashboardPage from "@/components/ui/home/(admin)/dashboard/view/dashboard-admin";
import DistributorDashboardPage from "@/components/ui/home/(admin)/dashboard/view/dashboard-distributor";

/**
 * DashboardPage component renders the main dashboard page for the admin.
 * It includes a date range picker, tab navigation for different sections,
 * and displays corresponding tables based on the selected tab.
 *
 * @component
 * @example
 * return (
 *   <DashboardPage />
 * )
 *
 * @returns {JSX.Element} The rendered dashboard page component.
 *
 * @remarks
 * - Uses `useState` to manage the selected date range, main tab, and child tab states.
 * - Contains two main tabs: "Pengajuan" and "Manajemen Tanaman".
 * - "Pengajuan" tab displays the `TabSubmission` and `TableSubmission` components.
 * - "Manajemen Tanaman" tab displays the `TabManagementPlant` component and conditionally renders `TableSubmissionPlant` or `TableStokPlantSeeds` based on the selected child tab.
 */
export default function DashboardPage() {
  const role = usePermission((state) => state.role);
  return (
    <div>
      {
        role === "admin" && (
          <AdminDashboardPage />
        ) 
      }
      { role === "distributor" && (
        <DistributorDashboardPage/>
      )}
    </div>
  );
}
