type formatCpfCnpjReturn = {
  value: string;
  type: "CPF" | "CNPJ";
};

export const formatCpfCnpj = (value: string): formatCpfCnpjReturn => {
  if (!value) throw new Error("Value is empty (formatCpfCnpj)");

  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length === 11) {
    return {
      value: cleanedValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      ),
      type: "CPF",
    };
  }

  if (cleanedValue.length === 14) {
    return {
      value: cleanedValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      ),
      type: "CNPJ",
    };
  }

  throw new Error("Value is invalid (formatCpfCnpj)");
};
