const API_URL = import.meta.env.VITE_API_URL;

type CreateReportPayload = {
  respondentName: string;
  semester: string;
  respondentCpf: string;
  respondentEmail: string;
  respondentPhone: string;
  totalAnsweredQuestions: number;
  workloadHours: number;
};

export async function allReports() {
  const response = await fetch(`${API_URL}/report/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar relatórios");
  }

  return await response.json();
}

export async function createReport(data: CreateReportPayload) {
  const response = await fetch(`${API_URL}/report/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Falha ao criar relatório");
  }

  return await response.json();
}
