import { formatCpfCnpj } from "./formatCpfCnpj";

describe("formatCpfCnpj", () => {
  it("should format CPF correctly", () => {
    const cpf = "12345678901";
    const formatted = formatCpfCnpj(cpf);
    expect(formatted.value).toBe("123.456.789-01");
    expect(formatted.type).toBe("CPF");
  });

  it("should format CNPJ correctly", () => {
    const cnpj = "12345678000190";
    const formatted = formatCpfCnpj(cnpj);
    expect(formatted.value).toBe("12.345.678/0001-90");
    expect(formatted.type).toBe("CNPJ");
  });

  it("should throw error for empty value", () => {
    expect(() => formatCpfCnpj("")).toThrow("Value is empty (formatCpfCnpj)");
  });

  it("should throw error for invalid length", () => {
    expect(() => formatCpfCnpj("123")).toThrow("Value is invalid (formatCpfCnpj)");
  });
});
