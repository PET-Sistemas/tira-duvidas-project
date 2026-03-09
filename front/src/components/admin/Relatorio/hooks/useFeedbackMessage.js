import { useState, useEffect, useCallback } from "react";

/**
 * Tempo padrão em ms para ocultar mensagens de feedback.
 */
const DEFAULT_TIMEOUT = 4000;

/**
 * Hook customizado para gerenciar mensagens de feedback com auto-dismiss.
 * 
 * @param {number} timeout - Tempo em ms para ocultar a mensagem (default: 4000)
 * @returns {Object} Estado e handler do feedback
 */
export function useFeedbackMessage(timeout = DEFAULT_TIMEOUT) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!message) {
			return;
		}

		const timer = setTimeout(() => {
			setMessage("");
		}, timeout);

		return () => clearTimeout(timer);
	}, [message, timeout]);

	const showFeedback = useCallback((msg) => {
		setMessage(msg);
	}, []);

	const clearFeedback = useCallback(() => {
		setMessage("");
	}, []);

	return {
		message,
		showFeedback,
		clearFeedback,
	};
}
