import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const DetailsPage: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl">Detalhes do Produtor</Text>
      <Text>Esta é a página de detalhes do produtor.</Text>
      {/* Aqui você pode adicionar a lógica para exibir os detalhes de um produtor específico */}
    </Box>
  );
  
};

export default DetailsPage;