import { Fragment } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Text,
  VStack,
  Card,
  Flex,
  Table,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useProducers } from '@/hooks/useProducers';
import { formatCpfCnpj } from '@/utils/functions/formatCpfCnpj';
import { Loading } from '@/components/ui/Loading/loading';
import { AlertCustom } from '@/components/ui/Alert/alert';
import { InputCustom } from '@/components/ui/Input/input';
import { EyeButton } from './components/EyeButton';
import { ProducerFormModal } from '@/components/container/ProducerFormModal';
import { colors } from '@/styles';

export const HomePage: React.FC = () => {
  const {
    error,
    isLoading,
    filteredProducers,
    isMobile,
    searchTerm,
    redirectDetails,
    setSearchTerm,
  } = useProducers();
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <AlertCustom title="Erro" description="Erro ao carregar produtores" />
    );
  }

  return (
    <>
      <Text as={'h1'} textStyle="3xl" mb={4}>
        Lista de Produtores
      </Text>

      <Box bg="white" p={4} borderRadius="md" shadow="sm" mb={4}>
        <Flex
          flexDirection={isMobile ? 'column' : 'row'}
          gap={4}
          justifyContent={'space-between'}
        >
          <Button
            bg={colors.backgroundPrimary}
            onClick={() => navigate('/dashboard')}
            width={isMobile ? '100%' : 'auto'}
          >
            <Text>Ir para o Dashboard </Text>
            <FontAwesomeIcon icon={faChartPie} />
          </Button>

          <Button
            bg={colors.backgroundPrimary}
            onClick={onOpen}
            width={isMobile ? '100%' : 'auto'}
          >
            <Text>Cadastrar Produtor </Text> <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Flex>
      </Box>

      <Flex
        bg="white"
        direction="column"
        p={4}
        gap={4}
        borderRadius="md"
        boxShadow="sm"
      >
        <Box borderRadius="md" boxShadow="sm">
          <InputCustom
            placeholder="Buscar por nome ou CPF/CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        {filteredProducers.length === 0 && (
          <Text>Nenhum produtor encontrado.</Text>
        )}

        {filteredProducers.length > 0 && (
          <>
            {isMobile ? (
              <VStack gap={4}>
                {filteredProducers.map((producer) => {
                  const { type, value } = formatCpfCnpj(producer.cpfOrCnpj);

                  return (
                    <Fragment key={producer.id}>
                      <Card.Root bg="blue.50" width="full">
                        <Card.Body p={4}>
                          <Card.Title>{producer.name}</Card.Title>
                          <Card.Description>
                            {type === 'CNPJ' ? 'CNPJ' : 'CPF'}: {value}
                          </Card.Description>
                          <Card.Description>
                            Cidade: {producer.city}
                          </Card.Description>
                          <Card.Description>
                            Estado: {producer.state}
                          </Card.Description>
                          <Card.Description>
                            Propriedades: {producer.properties.length}
                          </Card.Description>
                        </Card.Body>
                        <Card.Footer pb={4} px={4}>
                          <EyeButton
                            handleClick={() => redirectDetails(producer.id)}
                            width="100%"
                          />
                        </Card.Footer>
                      </Card.Root>
                    </Fragment>
                  );
                })}
              </VStack>
            ) : (
              <Table.Root
                size="md"
                variant="line"
                borderStyle={'solid'}
                borderWidth={'thin'}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader fontWeight={700}>
                      CPF ou CNPJ
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Nome do Produtor
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Estado
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Cidade
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700} width={170}>
                      Ações
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredProducers.map((producer) => (
                    <Table.Row key={producer.id}>
                      <Table.Cell>
                        {formatCpfCnpj(producer.cpfOrCnpj).value}
                      </Table.Cell>
                      <Table.Cell>{producer.name}</Table.Cell>
                      <Table.Cell>{producer.state}</Table.Cell>
                      <Table.Cell>{producer.city}</Table.Cell>
                      <Table.Cell display={'flex'} justifyContent={'flex-end'}>
                        <EyeButton
                          handleClick={() => redirectDetails(producer.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </>
        )}
      </Flex>

      <ProducerFormModal isOpen={open} onClose={onClose} />
    </>
  );
};
