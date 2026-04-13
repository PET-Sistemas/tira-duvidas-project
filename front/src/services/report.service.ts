const API_URL = import.meta.env.VITE_API_URL;

type ReportFormat = "csv" | "pdf";

type DownloadRespondentsReportParams = {
  startDate: string;
  endDate: string;
  format: ReportFormat;
};

export async function downloadRespondentsReport({
  startDate,
  endDate,
  format,
}: DownloadRespondentsReportParams) {
  const query = new URLSearchParams({
    startDate,
    endDate,
    format,
  });

  const response = await fetch(`${API_URL}/report/export?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Falha ao gerar relatório");
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition") || "";
  const fileNameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  const fileName =
    fileNameMatch?.[1] || `relatorio-respondentes.${format === "pdf" ? "pdf" : "csv"}`;

  return { blob, fileName };
}
