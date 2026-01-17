/**
 * Formata CPF automaticamente para máscara 000.000.000-00.
 *
 * - Remove não-dígitos
 * - Limita a 11 dígitos
 * - Aplica pontos e hífen progressivamente
 *
 * @example
 * formatCpf("39053344705")      // "390.533.447-05"
 * formatCpf("390.533")         // "390.533"
 * formatCpf("39053344705999")  // "390.533.447-05"
 */
export const formatCpf = (value?: string): string => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 11);

  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 9);
  const p4 = digits.slice(9, 11);

  let out = p1;

  if (p2) out += `.${p2}`;
  if (p3) out += `.${p3}`;
  if (p4) out += `-${p4}`;

  return out;
};

export const unformatCpf = (value?: string): string => {
  if (!value) return "";
  return value.replace(/\D/g, "");
};
