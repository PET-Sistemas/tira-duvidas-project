import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import "../globalAdmin.css";
import "./Relatorio.css";
import { downloadRespondentsReport } from "../../../services/report.service";

function Relatorio() {
  const navigate = useNavigate();
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [formato, setFormato] = useState("csv");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    setFeedbackMessage("");

    if (!dataInicial || !dataFinal) {
      setFeedbackMessage("Informe a data inicial e a data final.");
      return;
    }

    if (new Date(dataInicial) > new Date(dataFinal)) {
      setFeedbackMessage("A data inicial deve ser menor ou igual à data final.");
      return;
    }

    try {
      setIsLoading(true);
      const { blob, fileName } = await downloadRespondentsReport({
        startDate: dataInicial,
        endDate: dataFinal,
        format: formato,
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setFeedbackMessage("Relatório gerado com sucesso.");
    } catch (error) {
      setFeedbackMessage(error.message || "Não foi possível gerar o relatório.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="table-report-manager">
        <button className="btn-back-details" onClick={() => navigate('/admin')}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </button>

        <div className="header-div">
          <h1>Relatórios</h1>
          <p>Relatório de apoio a emissão de certificado</p>
        </div>

        <div className="relatorio-card">
          {/* NOVA ÁREA DE FILTRO E BOTÃO CENTRALIZADO */}
          <div className="relatorio-gerar-container">
            <div className="relatorio-datas-group">
              <div className="input-group-date">
                <label htmlFor="dataInicial">Data Inicial</label>
                <input 
                  type="date" 
                  id="dataInicial" 
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                  className="input-date"
                />
              </div>
              
              <div className="input-group-date">
                <label htmlFor="dataFinal">Data Final</label>
                <input 
                  type="date" 
                  id="dataFinal"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                  className="input-date"
                />
              </div>

              <div className="input-group-date">
                <label htmlFor="formato">Formato</label>
                <select
                  id="formato"
                  value={formato}
                  onChange={(e) => setFormato(e.target.value)}
                  className="input-date"
                >
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
            </div>

            <div className="relatorio-action-centralized">
              <button
                type="button"
                onClick={handleGenerateReport}
                disabled={isLoading}
              >
                {isLoading ? "Gerando..." : "Gerar Relatório"}
              </button>
            </div>
          </div>

          {feedbackMessage && <p className="relatorio-feedback">{feedbackMessage}</p>}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Relatorio;
