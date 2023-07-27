import { useEffect, useRef } from "react";

export function useDebounce(operation, delay) {
	const timeoutRef = useRef(null);
	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);
	return (...args) => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			operation(...args);
		}, delay);
	};
}
