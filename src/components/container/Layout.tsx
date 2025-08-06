import React from "react";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="background">
      <Box as="header" bg="primary.500" color="white" p={4} shadow="md">
        <Flex align="center">
          <Text fontSize="xl" fontWeight="bold">
            Gerenciamento de Produtores
          </Text>
          <Spacer />
          {/* Adicionar elementos de navegação ou outros itens do cabeçalho aqui */}
        </Flex>
      </Box>
      <Box as="main" flex="1" p={4}>
        {children}
      </Box>
    </Flex>
  );
};
