/**
 * validateCpf Utility
 *
 * Função utilitária para validação de CPF (Brasil).
 * Aceita string com ou sem máscara e valida:
 * - 11 dígitos
 * - não permite sequências repetidas (ex: 11111111111)
 * - valida dígitos verificadores
 *
 * @example
 * ```ts
 * import { validateCpf } from '@/utils/validateCpf';
 *
 * validateCpf('39053344705'); // true
 * validateCpf('390.533.447-05'); // true
 * validateCpf('12345678900'); // false
 * ```
 *
 * @param cpf - String contendo o CPF (com ou sem máscara).
 * @returns `true` se o CPF for válido, caso contrário `false`.
 */
export const validateCpf = (cpf?: string): boolean => {
  if (!cpf) return false;

  const digits = cpf.trim().replace(/\D/g, "");
  if (!/^\d{11}$/.test(digits)) return false;

  // bloqueia sequências repetidas: 00000000000, 11111111111, etc.
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calcCheckDigit = (base: string, factor: number) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += Number(base[i]) * (factor - i);
    }
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const base9 = digits.slice(0, 9);
  const d1 = calcCheckDigit(base9, 10);
  const base10 = digits.slice(0, 10);
  const d2 = calcCheckDigit(base10, 11);

  return digits === `${base9}${d1}${d2}`;
};

/**
 * Função auxiliar para uso direto no TextFiledCustom.
 *
 * Retorna `null` se válido, ou uma mensagem de erro se inválido.
 * Pode ser usada diretamente na prop `validate` do componente.
 *
 * @example
 * ```tsx
 * <TextFiledCustom
 *   label="CPF"
 *   validate={validateCpfMessage}
 * />
 * ```
 *
 * @param cpf - String com o valor do campo.
 * @returns Mensagem de erro ou `null`.
 */
export const validateCpfMessage = (cpf: string): string | null => {
  return validateCpf(cpf)
    ? null
    : "CPF inválido. Use 11 dígitos (ex: 39053344705) ou com máscara (ex: 390.533.447-05).";
};
