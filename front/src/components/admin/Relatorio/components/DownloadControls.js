import React from "react";

/**
 * Opções de formato de download disponíveis.
 */
const DOWNLOAD_FORMATS = [
	{ value: "csv", label: "CSV" },
	{ value: "pdf", label: "PDF" },
];

/**
 * Controles de download de relatórios.
 * 
 * Componente de apresentação (Presentational Component).
 * 
 * @param {Object} props
 * @param {string} props.format - Formato selecionado ('csv' ou 'pdf')
 * @param {Function} props.onFormatChange - Handler de mudança de formato
 * @param {Function} props.onDownload - Handler de download
 * @param {boolean} [props.disabled=false] - Se os controles estão desabilitados
 */
function DownloadControls({ format, onFormatChange, onDownload, disabled = false }) {
	return (
		<div className="relatorio-download">
			<select 
				value={format} 
				onChange={(e) => onFormatChange(e.target.value)}
				aria-label="Formato de download"
			>
				{DOWNLOAD_FORMATS.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			<button
				type="button"
				className="relatorio-btn relatorio-btn-primary"
				onClick={onDownload}
				disabled={disabled}
			>
				Download
			</button>
		</div>
	);
}

export default DownloadControls;
