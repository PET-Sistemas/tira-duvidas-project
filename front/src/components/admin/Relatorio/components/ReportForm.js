import React from "react";

/**
 * Formulário de criação de relatório.
 * 
 * Componente de apresentação (Presentational Component) - não contém lógica de negócio,
 * apenas renderiza a UI baseada nas props recebidas.
 */
function ReportForm({
	formData,
	cargaHoraria,
	isAutoFilled,
	isLoading,
	onInputChange,
	onSubmit,
	onCancel,
}) {
	return (
		<form className="relatorio-form" onSubmit={onSubmit}>
			<div className="relatorio-grid">
				<label>
					CPF do respondente
					<input
						type="text"
						name="cpfRespondente"
						value={formData.cpfRespondente}
						onChange={onInputChange}
						placeholder="000.000.000-00"
						autoComplete="off"
					/>
					{isLoading && <span className="relatorio-loading-hint">Buscando...</span>}
				</label>

				<label>
					Período indicado (semestre)
					<input
						type="text"
						name="periodoSemestre"
						value={formData.periodoSemestre}
						onChange={onInputChange}
						placeholder="Ex: 2026.1"
					/>
				</label>

				<label>
					Nome do respondente
					<input
						type="text"
						name="nomeRespondente"
						value={formData.nomeRespondente}
						onChange={onInputChange}
						placeholder={isAutoFilled ? "" : "Preenchido automaticamente"}
						disabled={isAutoFilled}
					/>
				</label>

				<label>
					E-mail do respondente
					<input
						type="email"
						name="emailRespondente"
						value={formData.emailRespondente}
						onChange={onInputChange}
						placeholder={isAutoFilled ? "" : "Preenchido automaticamente"}
						disabled={isAutoFilled}
					/>
				</label>

				<label>
					Telefone do respondente
					<input
						type="text"
						name="telefoneRespondente"
						value={formData.telefoneRespondente}
						onChange={onInputChange}
						placeholder={isAutoFilled ? "" : "Preenchido automaticamente"}
						disabled={isAutoFilled}
					/>
				</label>

				<label>
					Número total de dúvidas respondidas
					<input
						type="text"
						name="totalDuvidasRespondidas"
						value={formData.totalDuvidasRespondidas}
						onChange={onInputChange}
						placeholder="Digite a quantidade"
					/>
				</label>

				<label>
					Carga horária (1 hora por dúvida)
					<input 
						type="text" 
						value={`${cargaHoraria}h`} 
						readOnly 
						tabIndex={-1}
					/>
				</label>
			</div>

			<div className="relatorio-form-actions">
				<button 
					type="submit" 
					className="relatorio-btn relatorio-btn-primary"
					disabled={isLoading}
				>
					Criar relatório
				</button>
				<button
					type="button"
					className="relatorio-btn relatorio-btn-outline"
					onClick={onCancel}
				>
					Cancelar
				</button>
			</div>
		</form>
	);
}

export default ReportForm;
