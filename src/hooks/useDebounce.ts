import { useEffect, useState } from 'react';

/**
 * Hook personalizado para "debounce" um valor, atrasando sua atualização até que um determinado tempo tenha passado sem novas alterações.
 * Útil para otimizar o desempenho em cenários como campos de busca, onde não se deseja executar uma ação a cada digitação.
 *
 * @template T - O tipo do valor a ser "debounced".
 * @param {T} value - O valor a ser "debounced".
 * @param {number} [delay=500] - O tempo de atraso em milissegundos antes que o valor "debounced" seja atualizado. O padrão é 500ms.
 * @returns {T} O valor "debounced".
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
