import React from "react";
import { Input, type InputProps } from "@chakra-ui/react";
import ReactInputMask from "react-input-mask";

interface InputMaskProps extends InputProps {
  mask: string;
  maskChar?: string | null;
}

export const InputMask: React.FC<InputMaskProps> = ({
  mask,
  maskChar,
  ...props
}) => {
  return (
    <ReactInputMask mask={mask} maskChar={maskChar}>
      {(inputProps: InputProps) => <Input {...inputProps} {...props} />}
    </ReactInputMask>
  );
};
