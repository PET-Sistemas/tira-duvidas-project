import { useState, useEffect, useCallback } from "react";
import { allReports, createReport } from "../../../../services/report.service";

/**
 * Mapeia a resposta da API para o formato usado na UI.
 * Isola a transformação de dados, facilitando manutenção se a API mudar.
 */
const mapApiToUiReport = (report) => ({
	id: report.id,
	nomeRespondente: report.respondentName,
	periodoSemestre: report.semester,
	cpfRespondente: report.respondentCpf,
	emailRespondente: report.respondentEmail,
	telefoneRespondente: report.respondentPhone,
	totalDuvidasRespondidas: report.totalAnsweredQuestions,
	cargaHoraria: report.workloadHours,
	criadoEm: report.createdAt,
});

/**
 * Mapeia os dados do formulário para o formato esperado pela API.
 */
const mapFormToApiPayload = (formData, cargaHoraria) => ({
	respondentName: formData.nomeRespondente,
	semester: formData.periodoSemestre,
	respondentCpf: formData.cpfRespondente,
	respondentEmail: formData.emailRespondente,
	respondentPhone: formData.telefoneRespondente,
	totalAnsweredQuestions: Number(formData.totalDuvidasRespondidas),
	workloadHours: cargaHoraria,
});

/**
 * Hook customizado para gerenciar a lista de relatórios.
 * 
 * Responsabilidades (SRP):
 * - Carregar relatórios da API
 * - Criar novos relatórios
 * - Manter estado da lista
 * 
 * @param {Object} options - Opções do hook
 * @param {Function} options.onFeedback - Callback para exibir mensagens
 * @returns {Object} Estado e handlers dos relatórios
 */
export function useReports({ onFeedback } = {}) {
	const [reports, setReports] = useState([]);
	const [isLoadingReports, setIsLoadingReports] = useState(true);

	/**
	 * Carrega todos os relatórios da API.
	 */
	const loadReports = useCallback(async () => {
		setIsLoadingReports(true);
		try {
			const data = await allReports();
			if (Array.isArray(data)) {
				setReports(data.map(mapApiToUiReport));
			}
		} catch (error) {
			console.error("Erro ao carregar relatórios:", error);
			onFeedback?.("Não foi possível carregar os relatórios.");
		} finally {
			setIsLoadingReports(false);
		}
	}, [onFeedback]);

	/**
	 * Cria um novo relatório.
	 * @param {Object} formData - Dados do formulário
	 * @param {number} cargaHoraria - Carga horária calculada
	 * @returns {boolean} true se criou com sucesso
	 */
	const submitReport = useCallback(async (formData, cargaHoraria) => {
		try {
			const payload = mapFormToApiPayload(formData, cargaHoraria);
			const createdReport = await createReport(payload);
			
			// Adiciona o novo relatório no início da lista (mais recente primeiro)
			setReports((prev) => [mapApiToUiReport(createdReport), ...prev]);
			onFeedback?.("Relatório criado com sucesso.");
			
			return true;
		} catch (error) {
			console.error("Erro ao criar relatório:", error);
			onFeedback?.("Não foi possível criar o relatório.");
			return false;
		}
	}, [onFeedback]);

	// Carrega relatórios na montagem do componente
	useEffect(() => {
		loadReports();
	}, [loadReports]);

	return {
		reports,
		isLoadingReports,
		submitReport,
		reloadReports: loadReports,
	};
}
