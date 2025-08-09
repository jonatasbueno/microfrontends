import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useBreakpointValue } from '@chakra-ui/react/hooks';

import { getProducers } from '@/services/producerService';
import { setProducers } from '@/features/productoresSlice';
import { useDebounce } from '@/hooks/useDebounce';
import type { RootState } from '@/store/GlobalStore';
import type { Producer } from '@/types/types';

/**
 * @typedef {object} UseProducersReturn
 * @property {boolean} isLoading - Indica se os produtores estão sendo carregados.
 * @property {string | null} error - Mensagem de erro, se houver.
 * @property {Producer[]} filteredProducers - Lista de produtores filtrados.
 * @property {boolean | undefined} isMobile - Indica se o dispositivo é mobile.
 * @property {string} searchTerm - Termo de busca atual.
 * @property {(id: string) => void} redirectDetails - Função para redirecionar para a página de detalhes do produtor.
 * @property {(term: string) => void} setSearchTerm - Função para definir o termo de busca.
 */

/**
 * Hook personalizado para gerenciar a lista de produtores, incluindo busca e filtragem.
 * @returns {UseProducersReturn} Objeto contendo o estado e funções relacionadas aos produtores.
 */
export const useProducers = () => {
  const dispatch = useDispatch();
  const { producers } = useSelector((state: RootState) => state.producers);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { isLoading, error } = useQuery<Producer[]>({
    queryKey: ['producers'],
    queryFn: async () => {
      const producers = await getProducers();

      dispatch(setProducers(producers));

      return producers;
    },
  });

  const filteredProducers = producers.filter((producer: Producer) => {
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();
    return (
      producer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      producer.cpfOrCnpj.includes(lowerCaseSearchTerm) ||
      producer.state.toLowerCase().includes(lowerCaseSearchTerm) ||
      producer.city.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  /**
   * Redireciona para a página de detalhes de um produtor específico.
   * @param {string} id - O ID do produtor.
   */
  const redirectDetails = (id: string) => navigate(`/details/${id}`);

  return {
    isLoading,
    error: error?.message || null,
    filteredProducers,
    isMobile,
    searchTerm,
    redirectDetails,
    setSearchTerm,
  };
};
