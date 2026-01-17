/**
 * Formata CEP automaticamente para máscara 00000-000.
 *
 * - Remove caracteres não numéricos
 * - Limita a 8 dígitos
 * - Aplica o hífen progressivamente
 *
 * @example
 * formatCep("24210310")       // "24210-310"
 * formatCep("24210")          // "24210"
 * formatCep("24210-310999")   // "24210-310"
 */
export const formatCep = (value?: string): string => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 8);

  const p1 = digits.slice(0, 5);
  const p2 = digits.slice(5, 8);

  let out = p1;

  if (p2) out += `-${p2}`;

  return out;
};

/**
 * Remove máscara do CEP (mantém apenas dígitos).
 *
 * @example
 * unformatCep("24210-310") // "24210310"
 */
export const unformatCep = (value?: string): string => {
  if (!value) return "";
  return value.replace(/\D/g, "");
};
