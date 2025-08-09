/**
 * Valida um CPF ou CNPJ.
 * @param {string} cpfCnpj - A string contendo o CPF ou CNPJ (apenas números).
 * @returns {boolean} Retorna `true` se o CPF/CNPJ for válido, `false` caso contrário.
 */
export const validateCpfCnpj = (cpfCnpj: string): boolean => {
  const cleaned = cpfCnpj.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return validateCPF(cleaned);
  } else if (cleaned.length === 14) {
    return validateCNPJ(cleaned);
  }

  return false;
};

/**
 * Valida um CPF.
 * @param {string} cpf - A string contendo o CPF (apenas números).
 * @returns {boolean} Retorna `true` se o CPF for válido, `false` caso contrário.
 */
const validateCPF = (cpf: string): boolean => {
  if (cpf === "00000000000") return false;
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

/**
 * Valida um CNPJ.
 * @param {string} cnpj - A string contendo o CNPJ (apenas números).
 * @returns {boolean} Retorna `true` se o CNPJ for válido, `false` caso contrário.
 */
const validateCNPJ = (cnpj: string): boolean => {
  if (cnpj === "00000000000000") return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};
