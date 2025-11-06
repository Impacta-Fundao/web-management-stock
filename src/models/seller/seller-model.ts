import {
  ApiRespondeSellerRaw,
  SellerPropsModel,
} from "./types/seller-props-model";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:9090";

export async function getSellers(): Promise<SellerPropsModel[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/mercados`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }); 
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const rawData = await response.json();
    console.log(`Resposta da API: ${rawData} `);

    const data: ApiRespondeSellerRaw = rawData;
    return data.data;
  } catch (error) {
    console.error(`Error ${error}`);
    throw new Error(
      `Erro ao listar sellers: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function getSellerByID(id: number): Promise<SellerPropsModel> {
  try {
    const resp = await fetch(`${API_BASE_URL}/mercados/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);
    const rawData = await resp.json();
    console.log("Resposta da API: ", rawData);

    const data: SellerPropsModel = rawData;
    return data;
  } catch (err) {
    console.error(`Error ${err}`);
    throw new Error(
      `Erro ao trazer seller por id: ${err} | ${
        err instanceof Error ? err.message : "Erro desconhecido"
      }`
    );
  }
}

export async function postSeller(
  sellerData: Omit<SellerPropsModel, "id">
): Promise<SellerPropsModel> {
  try {
    const resp = await fetch(`${API_BASE_URL}/mercados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerData),
    });
    if (!resp.ok) throw new Error(`Erro na requisição: ${resp.status}`);
    const rawData = await resp.json();
    console.log("Resposta da API: ", rawData.data); // data é o que retorna na api, dentro de data há os campos cadastrados

    const data: SellerPropsModel = rawData.data;
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(
      `Erro ao criar seller: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function putSeller(
  id: number,
  sellerData: SellerPropsModel
): Promise<SellerPropsModel> {
  try {
    const resp = await fetch(`${API_BASE_URL}/mercados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerData),
    });
    if (!resp.ok) throw new Error(`Erro na requsição: ${resp.status}`);
    const rawData = await resp.json();
    console.log("Resposta da API: ", rawData);
    const data: SellerPropsModel = rawData.data;
    return data;
  } catch (error) {
    console.error(`putSeller error: ${(error as Error).cause}`);
    throw new Error(
      `Erro ao atualizar seller: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function patchSeller(
  id: number,
  sellerData: Partial<SellerPropsModel>
): Promise<SellerPropsModel> {
  try {
    const resp = await fetch(`${API_BASE_URL}/mercados/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerData),
    });
    if (!resp.ok) throw new Error(`Erro na requsição: ${resp.status}`);
    const rawData = await resp.json();
    console.log("Resposta da API: ", rawData);
    const data: SellerPropsModel = rawData.data;
    return data;
  } catch (error) {
    console.error("patchSeller error:", error);
    throw new Error(
      `Erro ao atualizar seller: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function deleteSeller(id: number): Promise<void> {
  try {
    const resp = await fetch(`${API_BASE_URL}/mercados/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw new Error(`Erro na requsição: ${resp.status}`);
  } catch (error) {
    throw new Error(
      `Erro ao atualizar seller: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}
