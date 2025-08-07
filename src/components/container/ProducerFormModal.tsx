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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProducerFormSchema } from "../../services/schemas/producerSchemas";
import { type Producer } from "@/types/types";
import { InputMask } from "@/components/ui/InputMask/InputMask";
import { useDispatch } from "react-redux";
import { addProducer, updateProducer } from "@/features/productoresSlice";
import { toaster } from "@/components/ui/Toaster/toaster";

interface ProducerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  producer?: Producer;
}

interface ProducerFormData {
  cpfOrCnpj: string;
  name: string;
  city: string;
  state: string;
}

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
  } = useForm<ProducerFormData>({
    resolver: zodResolver(ProducerFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (producer) {
      setValue("cpfOrCnpj", producer.cpfOrCnpj);
      setValue("name", producer.name);
      setValue("city", producer.city);
      setValue("state", producer.state);
    } else {
      reset();
    }
  }, [producer, reset, setValue]);

  const handleConfirmSave = () => {
    const data = getValues();
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

  const onSubmit = () => {
    setIsAlertOpen(true);
  };

  return (
    <>
      {/* Dialog principal do formulário */}
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
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
                  <VStack width={4}>
                    <FormControl isInvalid={!!errors.cpfOrCnpj}>
                      <FormLabel>CPF/CNPJ</FormLabel>
                      <InputMask
                        mask={
                          getValues("cpfOrCnpj")?.length === 14
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

                    <FormControl isInvalid={!!errors.city}>
                      <FormLabel>Cidade</FormLabel>
                      <Input {...register("city")} placeholder="Cidade" />
                      {errors.city && (
                        <Text color="red.500" fontSize="sm">
                          {errors.city.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.state}>
                      <FormLabel>Estado</FormLabel>
                      <Input
                        {...register("state")}
                        placeholder="Estado (ex: SP)"
                        maxLength={2}
                      />
                      {errors.state && (
                        <Text color="red.500" fontSize="sm">
                          {errors.state.message}
                        </Text>
                      )}
                    </FormControl>
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
                <Button colorScheme="blue" onClick={handleConfirmSave} ml={3}>
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
