export const formatCpfCnpj = (value: string): string => {
  if (!value) return "";

  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length === 11) {
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanedValue.length === 14) {
    return cleanedValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return cleanedValue;
  }
};
