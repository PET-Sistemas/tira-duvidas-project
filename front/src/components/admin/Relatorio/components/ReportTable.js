import React from "react";
import { formatDateBR } from "../utils/reportExport";

/**
 * Tabela de exibição de relatórios.
 * 
 * Componente de apresentação (Presentational Component).
 * 
 * @param {Object} props
 * @param {Array} props.reports - Lista de relatórios
 * @param {boolean} [props.isLoading=false] - Se está carregando
 */
function ReportTable({ reports, isLoading = false }) {
	if (isLoading) {
		return (
			<div className="relatorio-loading">
				<p>Carregando relatórios...</p>
			</div>
		);
	}

	return (
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
				{reports.length === 0 ? (
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
							<td>{formatDateBR(report.criadoEm)}</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	);
}

export default ReportTable;
