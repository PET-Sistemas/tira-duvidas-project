import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import "../globalAdmin.css";
import "./Relatorio.css";
import { allReports, createReport } from "../../../services/report.service";
import { getUserByCpf } from "../../../services/user.service";

const initialForm = {
	nomeRespondente: "",
	periodoSemestre: "",
	cpfRespondente: "",
	emailRespondente: "",
	telefoneRespondente: "",
	totalDuvidasRespondidas: "",
};

function Relatorio() {
	const navigate = useNavigate();
	const [reports, setReports] = useState([]);
	const [viewMode, setViewMode] = useState("list");
	const [formData, setFormData] = useState(initialForm);
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [downloadFormat, setDownloadFormat] = useState("csv");
	const [isAutoFilled, setIsAutoFilled] = useState(false);

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

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const data = await allReports();
				if (Array.isArray(data)) {
					setReports(data.map(mapApiToUiReport));
				}
			} catch (error) {
				console.error("Erro ao carregar relatórios", error);
				setFeedbackMessage("Não foi possível carregar os relatórios.");
			}
		};

		fetchReports();
	}, []);

	useEffect(() => {
		if (!feedbackMessage) {
			return;
		}

		const timeout = setTimeout(() => {
			setFeedbackMessage("");
		}, 3000);

		return () => clearTimeout(timeout);
	}, [feedbackMessage]);

	const cargaHoraria = useMemo(
		() => Number(formData.totalDuvidasRespondidas || 0),
		[formData.totalDuvidasRespondidas]
	);

	useEffect(() => {
		if (viewMode !== "create") {
			return;
		}

		const rawCpf = formData.cpfRespondente.replace(/\D/g, "");

		if (rawCpf.length !== 11) {
			setIsAutoFilled(false);
			setFormData((prev) => ({
				...prev,
				nomeRespondente: "",
				emailRespondente: "",
				telefoneRespondente: "",
			}));
			return;
		}

		let cancelled = false;

		getUserByCpf(rawCpf)
			.then((user) => {
				if (cancelled) return;

				if (!user) {
					setIsAutoFilled(false);
					setFormData((prev) => ({
						...prev,
						nomeRespondente: "",
						emailRespondente: "",
						telefoneRespondente: "",
					}));
					setFeedbackMessage("Nenhum respondente encontrado para o CPF informado.");
					return;
				}

				setIsAutoFilled(true);
				setFormData((prev) => ({
					...prev,
					nomeRespondente: user.name || "",
					emailRespondente: user.email || "",
					telefoneRespondente: user.phone || "",
				}));
			})
			.catch((error) => {
				if (cancelled) return;
				console.error("Erro ao buscar respondente por CPF", error);
				setFeedbackMessage("Erro ao buscar dados do respondente.");
			});

		return () => { cancelled = true; };
	}, [formData.cpfRespondente, viewMode]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "totalDuvidasRespondidas" ? value.replace(/[^0-9]/g, "") : value,
		}));
	};

	const handleCreateReport = async (event) => {
		event.preventDefault();

		const requiredFields = Object.values(formData).every((field) => String(field).trim() !== "");
		if (!requiredFields) {
			setFeedbackMessage("Preencha todos os campos para criar o relatório.");
			return;
		}

		try {
			const payload = {
				respondentName: formData.nomeRespondente,
				semester: formData.periodoSemestre,
				respondentCpf: formData.cpfRespondente,
				respondentEmail: formData.emailRespondente,
				respondentPhone: formData.telefoneRespondente,
				totalAnsweredQuestions: Number(formData.totalDuvidasRespondidas),
				workloadHours: cargaHoraria,
			};

			const createdReport = await createReport(payload);
			setReports((prev) => [mapApiToUiReport(createdReport), ...prev]);
			setFormData(initialForm);
			setIsAutoFilled(false);
			setViewMode("list");
			setFeedbackMessage("Relatório criado com sucesso.");
		} catch (error) {
			console.error("Erro ao criar relatório", error);
			setFeedbackMessage("Não foi possível criar o relatório.");
		}
	};

	const handleCancel = () => {
		setFormData(initialForm);
		setIsAutoFilled(false);
		setViewMode("list");
	};

	const escapeCsvField = (value) => {
		const safeValue = String(value ?? "").replace(/"/g, '""');
		return `"${safeValue}"`;
	};

	const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("pt-BR");

	const downloadCsv = () => {
		const headers = [
			"Nome do respondente",
			"Período (semestre)",
			"CPF do respondente",
			"E-mail do respondente",
			"Telefone do respondente",
			"Número total de dúvidas respondidas",
			"Carga horária",
		];

		const rows = reports.map((report) => [
			report.nomeRespondente,
			report.periodoSemestre,
			report.cpfRespondente,
			report.emailRespondente,
			report.telefoneRespondente,
			report.totalDuvidasRespondidas,
			`${report.cargaHoraria}h`,
		]);

		const csvContent = [headers, ...rows]
			.map((row) => row.map(escapeCsvField).join(";"))
			.join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "relatorio-certificacao.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const downloadPdf = () => {
		const tableRows = reports
			.map(
				(report) => `
					<tr>
						<td>${report.nomeRespondente}</td>
						<td>${report.periodoSemestre}</td>
						<td>${report.cpfRespondente}</td>
						<td>${report.emailRespondente}</td>
						<td>${report.telefoneRespondente}</td>
						<td>${report.totalDuvidasRespondidas}</td>
						<td>${report.cargaHoraria}h</td>
					</tr>
				`
			)
			.join("");

		const printWindow = window.open("", "_blank");
		if (!printWindow) {
			return;
		}

		printWindow.document.write(`
			<html>
				<head>
					<title>Relatório de apoio à emissão de certificado</title>
					<style>
						body { font-family: Arial, sans-serif; padding: 24px; }
						h1 { margin-bottom: 16px; color: #3498db; }
						table { width: 100%; border-collapse: collapse; font-size: 12px; }
						th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
						th { background: #f3f4f6; }
					</style>
				</head>
				<body>
					<h1>Relatório de apoio à emissão de certificado</h1>
					<table>
						<thead>
							<tr>
								<th>Nome do respondente</th>
								<th>Período (semestre)</th>
								<th>CPF</th>
								<th>E-mail</th>
								<th>Telefone</th>
								<th>Total de dúvidas</th>
								<th>Carga horária</th>
							</tr>
						</thead>
						<tbody>
							${tableRows}
						</tbody>
					</table>
				</body>
			</html>
		`);

		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
	};

	const handleDownload = () => {
		if (!reports.length) {
			setFeedbackMessage("Não há relatórios disponíveis para download.");
			return;
		}

		if (downloadFormat === "csv") {
			downloadCsv();
			return;
		}

		downloadPdf();
	};

	return (
		<AdminLayout>
			<div className="relatorio-back-actions">
				<button className="btn-back-details" onClick={() => navigate('/admin')}>
					<i className="bi bi-arrow-left"></i>
					Voltar
				</button>
			</div>

			<header className="header-admin">
				<h1>Relatórios</h1>
				<p>Relatório de apoio a emissão de certificado</p>
			</header>

			<div className="table-admin relatorio-card">
				<div className="relatorio-top-actions">
					<button
						type="button"
						className="relatorio-btn relatorio-btn-primary"
						onClick={() => setViewMode("create")}
					>
						Gerar Relatório
					</button>
				</div>

				{feedbackMessage && <p className="relatorio-feedback">{feedbackMessage}</p>}

				{viewMode === "create" ? (
					<form className="relatorio-form" onSubmit={handleCreateReport}>
						<div className="relatorio-grid">
							<label>
								CPF do respondente
								<input
									type="text"
									name="cpfRespondente"
									value={formData.cpfRespondente}
									onChange={handleInputChange}
									placeholder="000.000.000-00"
								/>
							</label>

							<label>
								Período indicado (semestre)
								<input
									type="text"
									name="periodoSemestre"
									value={formData.periodoSemestre}
									onChange={handleInputChange}
									placeholder="Ex: 2026.1"
								/>
							</label>

							<label>
								Nome do respondente
								<input
									type="text"
									name="nomeRespondente"
									value={formData.nomeRespondente}
									placeholder="Preenchido automaticamente"
									disabled={isAutoFilled}
								/>
							</label>

							<label>
								E-mail do respondente
								<input
									type="email"
									name="emailRespondente"
									value={formData.emailRespondente}
									placeholder="Preenchido automaticamente"
									disabled={isAutoFilled}
								/>
							</label>

							<label>
								Telefone do respondente
								<input
									type="text"
									name="telefoneRespondente"
									value={formData.telefoneRespondente}
									placeholder="Preenchido automaticamente"
									disabled={isAutoFilled}
								/>
							</label>

							<label>
								Número total de dúvidas respondidas
								<input
									type="text"
									name="totalDuvidasRespondidas"
									value={formData.totalDuvidasRespondidas}
									placeholder="Preenchido automaticamente"
									disabled={isAutoFilled}
								/>
							</label>

							<label>
								Carga horária (1 hora por dúvida)
								<input type="text" value={`${cargaHoraria}h`} readOnly />
							</label>
						</div>

						<div className="relatorio-form-actions">
							<button type="submit" className="relatorio-btn relatorio-btn-primary">
								Criar relatório
							</button>
							<button type="button" className="relatorio-btn relatorio-btn-outline" onClick={handleCancel}>
								Cancelar
							</button>
						</div>
					</form>
				) : (
					<>
						<div className="relatorio-download">
							<select value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)}>
								<option value="csv">CSV</option>
								<option value="pdf">PDF</option>
							</select>
							<button type="button" className="relatorio-btn relatorio-btn-primary" onClick={handleDownload}>
								Download
							</button>
						</div>

						<table className="user-table relatorio-table">
							<thead>
								<tr>
									<th>Nome do respondente</th>
									<th>Período (semestre)</th>
									<th>CPF</th>
									<th>E-mail</th>
									<th>Telefone</th>
									<th>Total de dúvidas</th>
									<th>Carga horária</th>
									<th>Criado em</th>
								</tr>
							</thead>
							<tbody>
								{!reports.length ? (
									<tr>
										<td colSpan="8" className="relatorio-empty">
											Nenhum relatório disponível.
										</td>
									</tr>
								) : (
									reports.map((report) => (
										<tr key={report.id}>
											<td>{report.nomeRespondente}</td>
											<td>{report.periodoSemestre}</td>
											<td>{report.cpfRespondente}</td>
											<td>{report.emailRespondente}</td>
											<td>{report.telefoneRespondente}</td>
											<td>{report.totalDuvidasRespondidas}</td>
											<td>{report.cargaHoraria}h</td>
											<td>{formatDate(report.criadoEm)}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</>
				)}
			</div>
		</AdminLayout>
	);
}

export default Relatorio;
