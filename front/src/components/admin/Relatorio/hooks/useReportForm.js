import { useState, useEffect, useCallback, useRef } from "react";
import { getUserByCpf } from "../../../../services/user.service";

/**
 * Estado inicial do formulário de relatório.
 */
export const INITIAL_FORM_STATE = {
	cpfRespondente: "",
	periodoSemestre: "",
	nomeRespondente: "",
	emailRespondente: "",
	telefoneRespondente: "",
	totalDuvidasRespondidas: "",
};

/**
 * Remove caracteres não numéricos do CPF.
 */
const normalizeCpf = (cpf) => cpf.replace(/\D/g, "");

/**
 * Verifica se o CPF tem o tamanho mínimo para busca (11 dígitos).
 */
const isValidCpfLength = (cpf) => normalizeCpf(cpf).length === 11;

/**
 * Tempo de debounce em ms para a busca de usuário por CPF.
 */
const DEBOUNCE_DELAY = 500;

/**
 * Hook customizado para gerenciar o formulário de criação de relatório.
 * 
 * Responsabilidades:
 * - Gerenciar estado do formulário
 * - Buscar dados do usuário pelo CPF (com debounce)
 * - Calcular carga horária automaticamente
 * 
 * @param {Object} options - Opções do hook
 * @param {boolean} options.isActive - Se o formulário está ativo/visível
 * @param {Function} options.onFeedback - Callback para exibir mensagens
 * @returns {Object} Estado e handlers do formulário
 */
export function useReportForm({ isActive, onFeedback }) {
	const [formData, setFormData] = useState(INITIAL_FORM_STATE);
	const [isLoading, setIsLoading] = useState(false);
	const [isAutoFilled, setIsAutoFilled] = useState(false);
	
	// Ref para controlar o debounce
	const debounceTimerRef = useRef(null);
	// Ref para evitar buscas duplicadas
	const lastSearchedCpfRef = useRef("");

	/**
	 * Reseta o formulário para o estado inicial.
	 */
	const resetForm = useCallback(() => {
		setFormData(INITIAL_FORM_STATE);
		setIsAutoFilled(false);
		setIsLoading(false);
		lastSearchedCpfRef.current = "";
	}, []);

	/**
	 * Limpa os campos preenchidos automaticamente.
	 */
	const clearAutoFilledFields = useCallback(() => {
		setFormData((prev) => ({
			...prev,
			nomeRespondente: "",
			emailRespondente: "",
			telefoneRespondente: "",
			totalDuvidasRespondidas: "",
		}));
		setIsAutoFilled(false);
	}, []);

	/**
	 * Busca o usuário pelo CPF no backend.
	 */
	const fetchUserByCpf = useCallback(async (cpf) => {
		const normalizedCpf = normalizeCpf(cpf);
		
		// Evita buscar o mesmo CPF novamente
		if (normalizedCpf === lastSearchedCpfRef.current) {
			return;
		}

		lastSearchedCpfRef.current = normalizedCpf;
		setIsLoading(true);

		try {
			const user = await getUserByCpf(normalizedCpf);

			if (!user) {
				clearAutoFilledFields();
				onFeedback?.("Nenhum usuário encontrado para o CPF informado.");
				return;
			}

			setFormData((prev) => ({
				...prev,
				nomeRespondente: user.name || "",
				emailRespondente: user.email || "",
				telefoneRespondente: user.phone || "",
				// totalDuvidasRespondidas será preenchido manualmente ou por outra fonte
			}));
			setIsAutoFilled(true);
		} catch (error) {
			console.error("Erro ao buscar usuário por CPF:", error);
			clearAutoFilledFields();
			onFeedback?.("Erro ao buscar dados do usuário. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	}, [clearAutoFilledFields, onFeedback]);

	/**
	 * Efeito para buscar usuário quando o CPF muda (com debounce).
	 */
	useEffect(() => {
		if (!isActive) {
			return;
		}

		// Limpa timer anterior
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		const cpf = formData.cpfRespondente;

		// Se CPF não tem tamanho válido, limpa campos
		if (!isValidCpfLength(cpf)) {
			if (isAutoFilled) {
				clearAutoFilledFields();
			}
			lastSearchedCpfRef.current = "";
			return;
		}

		// Agenda busca com debounce
		debounceTimerRef.current = setTimeout(() => {
			fetchUserByCpf(cpf);
		}, DEBOUNCE_DELAY);

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [formData.cpfRespondente, isActive, isAutoFilled, clearAutoFilledFields, fetchUserByCpf]);

	/**
	 * Handler para mudança de campos do formulário.
	 */
	const handleInputChange = useCallback((event) => {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: name === "totalDuvidasRespondidas" 
				? value.replace(/[^0-9]/g, "") 
				: value,
		}));
	}, []);

	/**
	 * Carga horária calculada (1 hora por dúvida respondida).
	 */
	const cargaHoraria = Number(formData.totalDuvidasRespondidas || 0);

	/**
	 * Verifica se todos os campos obrigatórios estão preenchidos.
	 */
	const isFormValid = Object.values(formData).every(
		(field) => String(field).trim() !== ""
	);

	return {
		formData,
		setFormData,
		isLoading,
		isAutoFilled,
		cargaHoraria,
		isFormValid,
		handleInputChange,
		resetForm,
	};
}
