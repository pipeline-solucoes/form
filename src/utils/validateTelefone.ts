/**
 * validateTelefone Utility
 *
 * Função utilitária para validação de números de telefone brasileiros.
 * Aceita apenas dígitos e valida o formato DDD + número (total de 11 dígitos).
 *
 * @example
 * ```ts
 * import { validateTelefone } from '@/utils/validateTelefone';
 *
 * const isValid = validateTelefone('11987654321'); // true
 * const isInvalid = validateTelefone('12345'); // false
 * ```
 *
 * @param telefone - String contendo o número do telefone.
 * @returns `true` se o telefone for válido, caso contrário `false`.
 */
export const validateTelefone = (telefone?: string): boolean => {
 
  if (!telefone) return false;
  const digits = telefone.trim().replace(/\D/g, '');  
  const isValid = /^\d{11}$/.test(digits);  
  return isValid;
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
 *   label=\"Telefone\"
 *   validate={validateTelefoneMessage}
 * />
 * ```
 *
 * @param telefone - String com o valor do campo.
 * @returns Mensagem de erro ou `null`.
 */
export const validateTelefoneMessage = (telefone: string): string | null => {
  return validateTelefone(telefone)
    ? null
    : 'Telefone inválido. Use o formato DDD + número (ex: 11987654321)';
};
