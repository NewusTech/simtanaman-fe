"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  pathname: string;
}

function getSegmentLabel(segment: string) {
  if (segment === "home") return "";
  if (segment === "farmer") return "Petani";
  if (segment === "management") return "Manajemen Pengguna";
  if (segment === "user") return "Pengguna";
  if (segment === "master") return "Data Master";
  if (segment === "type-plant") return "Jenis Tanaman";
  if (segment === "planting-methods") return "Metode Penanaman Tanaman";
  if (segment === "distribution-method") return "Metode Distribusi";
    if (segment === "land-ownership-status") return "Status Kepemilikan Lahan";
    if (segment === "terms-and-conditions") return "Syarat dan Ketentuan";
  if (segment === "access") return "Hak Akses";
  if (segment === "report") return "Laporan";
  if (segment === "submission") return "Pengajuan";
  if (segment === "plant-submission") return "Pengajuan Tanaman";
  if (segment === "distribution") return "Distribusi";
  if (segment === "submission-plant") return "Pengajuan Tanaman";
  if (segment === "seed-stock") return "Stok Bibit";
  if (segment === "planting") return "Manajemen Tanaman";
  if (!segment) return null;
  return segment.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}

function getBreadcrumbHref(segments: string[], index: number) {
  // Buat path sampai index saat ini
  return "/" + segments.slice(1, index + 1).join("/");
}

function Breadcrumb({ pathname }: BreadcrumbProps) {
  const segments = pathname.split("/").filter(Boolean);

  // Jangan render jika tidak ada segmen
  if (segments.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-semibold text-primary-default">
        {segments[1] === "management" && segments[2] === "user"
          ? "Manajemen Pengguna"
          : getSegmentLabel(segments[1])}
      </div>
      <nav className="text-sm text-gray-500">
        <ol className="list-reset flex">
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center">
              {index > 1 && (
              <span className="mx-2">
                <ChevronRight size={16} />
              </span>
              )}
              {index === segments.length - 1 ? (
              <span className="text-primary-default">
                {getSegmentLabel(segment.replace(/%20/g, " "))}
              </span>
              ) : (
              <Link
                href={getBreadcrumbHref(pathname.split("/"), index + 1)}
                className="hover:underline"
              >
                {getSegmentLabel(segment.replace(/%20/g, " "))}
              </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
export default Breadcrumb;
