/**
 * validateEmail Utility
 *
 * Função utilitária para validação de endereços de e-mail.
 * Usa uma expressão regular simples que verifica a presença de caracteres antes e depois de '@' e '.'.
 *
 * @example
 * ```ts
 * import { validateEmail } from '@/utils/validateEmail';
 *
 * const isValid = validateEmail('usuario@dominio.com'); // true
 * const isInvalid = validateEmail('usuario@dominio');   // false
 * ```
 *
 * @param email - String contendo o endereço de e-mail a ser validado.
 * @returns `true` se o e-mail for válido, caso contrário `false`.
 */
export const validateEmail = (email: string): boolean => {
  
  if (!email) {
    return true;
  }

  const cleanedEmail = email.trim();
  const regex = /^\S+@\S+\.\S+$/;
  const isValid = regex.test(cleanedEmail);
  return isValid;
};

/**
 * validateEmailMessage Utility
 *
 * Versão da validação de e-mail adaptada para uso direto no componente `TextFiledCustom`.
 * Retorna `null` se válido, ou uma mensagem de erro se o e-mail for inválido.
 *
 * @example
 * ```tsx
 * <TextFiledCustom
 *   label=\"E-mail\"
 *   placeholder=\"Digite seu e-mail\"
 *   validate={validateEmailMessage}
 * />
 * ```
 *
 * @param email - String contendo o endereço de e-mail.
 * @returns `null` se válido, ou uma string com mensagem de erro se inválido.
 */
export const validateEmailMessage = (email: string): string | null => {
  return validateEmail(email)
    ? null
    : 'E-mail inválido. Use um formato válido (ex: exemplo@dominio.com)';
};
