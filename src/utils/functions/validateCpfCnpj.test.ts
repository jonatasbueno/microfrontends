import { validateCpfCnpj } from "./validateCpfCnpj";

describe("validateCpfCnpj", () => {
  it("should validate a valid CPF", () => {
    expect(validateCpfCnpj("12345678901")).toBe(true);
  });

  it("should invalidate an invalid CPF", () => {
    expect(validateCpfCnpj("11111111111")).toBe(false);
  });

  it("should validate a valid CNPJ", () => {
    expect(validateCpfCnpj("12345678000190")).toBe(true);
  });

  it("should invalidate an invalid CNPJ", () => {
    expect(validateCpfCnpj("11111111111111")).toBe(false);
  });

  it("should invalidate a CPF/CNPJ with incorrect length", () => {
    expect(validateCpfCnpj("123")).toBe(false);
  });

  it("should handle non-numeric characters by cleaning them", () => {
    expect(validateCpfCnpj("123.456.789-01")).toBe(true);
    expect(validateCpfCnpj("12.345.678/0001-90")).toBe(true);
  });
});
