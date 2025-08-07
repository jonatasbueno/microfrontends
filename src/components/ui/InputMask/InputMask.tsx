import React, { useCallback } from "react";
import { Input, type InputProps } from "@chakra-ui/react";

interface InputMaskProps extends InputProps {
  maskType: "cpf" | "cnpj" | "cpfCnpj";
}

export const InputMask: React.FC<InputMaskProps> = ({
  maskType,
  onChange,
  value,
  ...props
}) => {
  const applyCpfMask = useCallback((val: string) => {
    val = val.replace(/\D/g, "");
    val = val.replace(/(\d{3})(\d)/, "$1.$2");
    val = val.replace(/(\d{3})(\d)/, "$1.$2");
    val = val.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return val;
  }, []);

  const applyCnpjMask = useCallback((val: string) => {
    val = val.replace(/\D/g, "");
    val = val.replace(/^(\d{2})(\d)/, "$1.$2");
    val = val.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    val = val.replace(/\.(\d{3})(\d)/, ".$1/$2");
    val = val.replace(/(\d{4})(\d)/, "$1-$2");
    return val;
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let maskedValue = event.target.value;
      const cleanedValue = maskedValue.replace(/\D/g, "");

      if (maskType === "cpf") {
        maskedValue = applyCpfMask(cleanedValue);
      } else if (maskType === "cnpj") {
        maskedValue = applyCnpjMask(cleanedValue);
      } else if (maskType === "cpfCnpj") {
        if (cleanedValue.length <= 11) {
          maskedValue = applyCpfMask(cleanedValue);
        } else {
          maskedValue = applyCnpjMask(cleanedValue);
        }
      }

      const syntheticEvent = {
        ...event,
        target: { ...event.target, value: maskedValue },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    },
    [maskType, onChange, applyCpfMask, applyCnpjMask]
  );

  return <Input {...props} value={value} onChange={handleChange} />;
};
