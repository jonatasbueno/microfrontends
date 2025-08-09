type formatCpfCnpjReturn = {
  value: string;
  type: 'CPF' | 'CNPJ';
};

/**
 * @typedef {object} FormatCpfCnpjReturn
 * @property {string} value - O valor formatado do CPF ou CNPJ.
 * @property {'CPF' | 'CNPJ'} type - O tipo do documento (CPF ou CNPJ).
 */

/**
 * Formata uma string de CPF ou CNPJ, adicionando pontuações e traços.
 * @param {string} value - A string contendo apenas números do CPF ou CNPJ.
 * @returns {FormatCpfCnpjReturn} Um objeto contendo o valor formatado e o tipo do documento.
 * @throws {Error} Se o valor for vazio ou inválido.
 */
export const formatCpfCnpj = (value: string): formatCpfCnpjReturn => {
  if (!value) throw new Error('Value is empty (formatCpfCnpj)');

  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length === 11) {
    return {
      value: cleanedValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      ),
      type: 'CPF',
    };
  }

  if (cleanedValue.length === 14) {
    return {
      value: cleanedValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      ),
      type: 'CNPJ',
    };
  }

  throw new Error('Value is invalid (formatCpfCnpj)');
};
