export interface SendFormBrevoPayload {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export interface ApiResult {
  ok: boolean;
  status: number;
}

export async function SendFormBrevo(
  data: SendFormBrevoPayload,
  tokenBearer: string
): Promise<ApiResult> {

  const formData = new FormData();
  formData.append("nome", data.nome);
  formData.append("email", data.email);
  formData.append("telefone", data.telefone);
  formData.append("mensagem", data.mensagem);

  try {
    const response = await fetch(
      "https://backend-sites-production.up.railway.app/send-email-brevo",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenBearer}`,
        },
        body: formData,
      }
    );

    return {
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error("Erro na chamada da API:", error);

    return {
      ok: false,
      status: 0, // erro de rede / fetch
    };
  }
}
