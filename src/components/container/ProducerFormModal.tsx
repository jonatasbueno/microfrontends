import React, { useEffect, useRef } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Dialog,
  Portal,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  CloseButton,
  Button,
  Input,
  VStack,
  Text,
  Flex,
  Box,
  HStack,
  Select,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProducerFormSchema,
  PropertyFormSchema,
  CultureFormSchema,
} from "../../services/schemas/producerSchemas";
import { type Producer } from "@/types/types";
import { InputMask } from "@/components/ui/InputMask/InputMask";
import { useDispatch } from "react-redux";
import { addProducer, updateProducer } from "@/features/productoresSlice";
import { toaster } from "@/components/ui/Toaster/toaster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ProducerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  producer?: Producer;
}

type ProducerFormData = z.infer<typeof ProducerFormSchema>;

export const ProducerFormModal: React.FC<ProducerFormModalProps> = ({
  isOpen,
  onClose,
  producer,
}) => {
  const dispatch = useDispatch();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    control,
    watch,
  } = useForm<ProducerFormData>({
    resolver: zodResolver(ProducerFormSchema),
    mode: "onChange",
    defaultValues: {
      cpfOrCnpj: "",
      name: "",
      city: "",
      state: "",
      properties: [],
    },
  });

  const { fields: propertyFields, append: appendProperty, remove: removeProperty } = useFieldArray({
    control,
    name: "properties",
  });

  useEffect(() => {
    if (producer) {
      reset({
        id: producer.id,
        cpfOrCnpj: producer.cpfOrCnpj,
        name: producer.name,
        city: producer.city,
        state: producer.state,
        properties: producer.properties.map((prop) => ({
          id: prop.id,
          farmName: prop.farmName,
          city: prop.city,
          state: prop.state,
          totalArea: prop.totalArea,
          arableArea: prop.arableArea,
          vegetationArea: prop.vegetationArea,
          cultures: prop.cultures.map((cult) => ({
            id: cult.id,
            name: cult.name,
            year: cult.year,
          })),
        })),
      });
    } else {
      reset();
    }
  }, [producer, reset]);

  const handleConfirmSave = (data: ProducerFormData) => {
    if (producer) {
      dispatch(updateProducer({ id: producer.id, ...data }));
      toaster.success({
        title: "Produtor atualizado.",
        duration: 3000,
        closable: true,
      });
    } else {
      dispatch(addProducer(data));
      toaster.success({
        title: "Produtor cadastrado.",
        duration: 3000,
        closable: true,
      });
    }
    setIsAlertOpen(false);
    onClose();
  };

  const onSubmit = (data: ProducerFormData) => {
    setIsAlertOpen(true);
  };

  const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  const citiesByState: Record<string, string[]> = {
    SP: ["São Paulo", "Campinas", "Santos"],
    RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
    MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
    GO: ["Goiânia", "Rio Verde", "Anápolis"],
    // ... more states and cities
  };

  return (
    <>
      {/* Dialog principal do formulário */}
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent maxW="6xl">
              <DialogHeader>
                <DialogTitle>
                  {producer ? "Editar Produtor" : "Cadastrar Novo Produtor"}
                </DialogTitle>
                <DialogCloseTrigger asChild>
                  <CloseButton size="sm" />
                </DialogCloseTrigger>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogBody>
                  <VStack spacing={4} align="stretch">
                    <Box p={4} borderWidth="1px" borderRadius="lg">
                      <Text fontSize="lg" mb={4} fontWeight="bold">Dados do Produtor</Text>
                      <VStack spacing={4}>
                        <FormControl isInvalid={!!errors.cpfOrCnpj}>
                          <FormLabel>CPF/CNPJ</FormLabel>
                          <InputMask
                            mask={
                              watch("cpfOrCnpj")?.replace(/\D/g, "").length === 14
                                ? "99.999.999/9999-99"
                                : "999.999.999-99"
                            }
                            maskChar={null}
                            {...register("cpfOrCnpj")}
                            placeholder="CPF ou CNPJ"
                            disabled={!!producer}
                          />
                          {errors.cpfOrCnpj && (
                            <Text color="red.500" fontSize="sm">
                              {errors.cpfOrCnpj.message}
                            </Text>
                          )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.name}>
                          <FormLabel>Nome do Produtor</FormLabel>
                          <Input
                            {...register("name")}
                            placeholder="Nome completo"
                          />
                          {errors.name && (
                            <Text color="red.500" fontSize="sm">
                              {errors.name.message}
                            </Text>
                          )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.state}>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            {...register("state")}
                            placeholder="Selecione o Estado"
                          >
                            {states.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </Select>
                          {errors.state && (
                            <Text color="red.500" fontSize="sm">
                              {errors.state.message}
                            </Text>
                          )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.city}>
                          <FormLabel>Cidade</FormLabel>
                          <Select
                            {...register("city")}
                            placeholder="Selecione a Cidade"
                            disabled={!watch("state")}
                          >
                            {watch("state") &&
                              citiesByState[watch("state")]?.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                          </Select>
                          {!watch("state") && (
                            <Text color="gray.500" fontSize="sm">
                              Escolha um estado para habilitar esse campo.
                            </Text>
                          )}
                          {errors.city && (
                            <Text color="red.500" fontSize="sm">
                              {errors.city.message}
                            </Text>
                          )}
                        </FormControl>
                      </VStack>
                    </Box>

                    {propertyFields.map((property, propertyIndex) => (
                      <Box
                        key={property.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                      >
                        <HStack justifyContent="space-between" mb={4}>
                          <Text fontSize="lg" fontWeight="bold">
                            Propriedade {propertyIndex + 1}
                          </Text>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => removeProperty(propertyIndex)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </HStack>
                        <VStack spacing={4}>
                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.farmName}>
                            <FormLabel>Nome da Fazenda</FormLabel>
                            <Input
                              {...register(`properties.${propertyIndex}.farmName`)}
                              placeholder="Nome da Fazenda"
                            />
                            {errors.properties?.[propertyIndex]?.farmName && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.farmName?.message}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.state}>
                            <FormLabel>Estado da Propriedade</FormLabel>
                            <Select
                              {...register(`properties.${propertyIndex}.state`)}
                              placeholder="Selecione o Estado"
                            >
                              {states.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </Select>
                            {errors.properties?.[propertyIndex]?.state && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.state?.message}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.city}>
                            <FormLabel>Cidade da Propriedade</FormLabel>
                            <Select
                              {...register(`properties.${propertyIndex}.city`)}
                              placeholder="Selecione a Cidade"
                              disabled={!watch(`properties.${propertyIndex}.state`)}
                            >
                              {watch(`properties.${propertyIndex}.state`) &&
                                citiesByState[watch(`properties.${propertyIndex}.state`)]?.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                            </Select>
                            {!watch(`properties.${propertyIndex}.state`) && (
                              <Text color="gray.500" fontSize="sm">
                                Escolha um estado para habilitar esse campo.
                              </Text>
                            )}
                            {errors.properties?.[propertyIndex]?.city && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.city?.message}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.totalArea}>
                            <FormLabel>Área Total (ha)</FormLabel>
                            <Input
                              type="number"
                              {...register(`properties.${propertyIndex}.totalArea`, { valueAsNumber: true })}
                              placeholder="Área Total"
                            />
                            {errors.properties?.[propertyIndex]?.totalArea && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.totalArea?.message}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.arableArea}>
                            <FormLabel>Área Agricultável (ha)</FormLabel>
                            <Input
                              type="number"
                              {...register(`properties.${propertyIndex}.arableArea`, { valueAsNumber: true })}
                              placeholder="Área Agricultável"
                            />
                            {errors.properties?.[propertyIndex]?.arableArea && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.arableArea?.message}
                              </Text>
                            )}
                          </FormControl>

                          <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.vegetationArea}>
                            <FormLabel>Área de Vegetação (ha)</FormLabel>
                            <Input
                              type="number"
                              {...register(`properties.${propertyIndex}.vegetationArea`, { valueAsNumber: true })}
                              placeholder="Área de Vegetação"
                            />
                            {errors.properties?.[propertyIndex]?.vegetationArea && (
                              <Text color="red.500" fontSize="sm">
                                {errors.properties[propertyIndex]?.vegetationArea?.message}
                              </Text>
                            )}
                          </FormControl>

                          {/* Cultures for this property */}
                          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
                            <Text fontSize="md" mb={4} fontWeight="bold">Culturas</Text>
                            <VStack spacing={4}>
                              {property.cultures.map((culture, cultureIndex) => (
                                <HStack key={culture.id} width="100%" spacing={2}>
                                  <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.cultures?.[cultureIndex]?.name}>
                                    <FormLabel>Nome da Cultura</FormLabel>
                                    <Input
                                      {...register(`properties.${propertyIndex}.cultures.${cultureIndex}.name`)}
                                      placeholder="Nome da Cultura"
                                    />
                                    {errors.properties?.[propertyIndex]?.cultures?.[cultureIndex]?.name && (
                                      <Text color="red.500" fontSize="sm">
                                        {errors.properties[propertyIndex]?.cultures[cultureIndex]?.name?.message}
                                      </Text>
                                    )}
                                  </FormControl>
                                  <FormControl isInvalid={!!errors.properties?.[propertyIndex]?.cultures?.[cultureIndex]?.year}>
                                    <FormLabel>Ano</FormLabel>
                                    <Input
                                      type="number"
                                      {...register(`properties.${propertyIndex}.cultures.${cultureIndex}.year`, { valueAsNumber: true })}
                                      placeholder="Ano"
                                    />
                                    {errors.properties?.[propertyIndex]?.cultures?.[cultureIndex]?.year && (
                                      <Text color="red.500" fontSize="sm">
                                        {errors.properties[propertyIndex]?.cultures[cultureIndex]?.year?.message}
                                      </Text>
                                    )}
                                  </FormControl>
                                  <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => {
                                      const currentProperties = getValues("properties");
                                      const currentCultures = currentProperties[propertyIndex].cultures;
                                      const newCultures = currentCultures.filter((_, idx) => idx !== cultureIndex);
                                      setValue(`properties.${propertyIndex}.cultures`, newCultures);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </HStack>
                              ))}
                            </VStack>
                            <Button
                              leftIcon={<FontAwesomeIcon icon={faPlus} />}
                              colorScheme="green"
                              size="sm"
                              mt={4}
                              onClick={() => {
                                const currentProperties = getValues("properties");
                                const currentCultures = currentProperties[propertyIndex].cultures || [];
                                const newCulture = { id: Math.random().toString(), name: "", year: new Date().getFullYear() };
                                setValue(`properties.${propertyIndex}.cultures`, [...currentCultures, newCulture]);
                              }}
                            >
                              Adicionar Cultura
                            </Button>
                          </Box>
                        </VStack>
                      </Box>
                    ))}

                    <Button
                      leftIcon={<FontAwesomeIcon icon={faPlus} />}
                      colorScheme="blue"
                      onClick={() =>
                        appendProperty({
                          id: Math.random().toString(),
                          farmName: "",
                          city: "",
                          state: "",
                          totalArea: 0,
                          arableArea: 0,
                          vegetationArea: 0,
                          cultures: [],
                        })
                      }
                    >
                      Adicionar Propriedade
                    </Button>
                  </VStack>
                </DialogBody>

                <DialogFooter>
                  <Flex justifyContent="space-between" width="100%">
                    <Button variant="outline" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      disabled={!isValid}
                    >
                      Salvar
                    </Button>
                  </Flex>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </Dialog.Root>

      {/* Dialog de confirmação */}
      <Dialog.Root
        open={isAlertOpen}
        onOpenChange={(open) => setIsAlertOpen(!!open)}
      >
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Ação</DialogTitle>
                <DialogCloseTrigger asChild>
                  <CloseButton size="sm" />
                </DialogCloseTrigger>
              </DialogHeader>

              <DialogBody>
                <Text>Tem certeza que deseja salvar as alterações?</Text>
              </DialogBody>

              <DialogFooter>
                <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={() => handleConfirmSave(getValues())} ml={3}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
