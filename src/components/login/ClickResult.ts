/**
 * Retorno do onClick/onSubmit do componente pai.
 * - success: define se a ação foi bem sucedida
 * - message: mensagem para exibir no próprio FormLogin
 * - color: cor opcional para a mensagem (caso queira sobrescrever as cores padrão)
 */
export interface ClickResult {
  success: boolean;
  message: string;
  color?: string;
}