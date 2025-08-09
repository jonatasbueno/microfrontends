import React from 'react';
import { Box, Flex, Text, Spacer } from '@chakra-ui/react';

import { colors } from '@/styles';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.100">
      <Box
        as="header"
        bg={colors.backgroundPrimary}
        color="white"
        p={4}
        shadow="md"
      >
        <Flex align="center">
          <Text fontSize="xl" fontWeight="bold">
            Carteira de Produtores
          </Text>
          <Spacer />
        </Flex>
      </Box>
      <Box as="main" bg="" flex="1" p={4}>
        {children}
      </Box>
    </Flex>
  );
};
