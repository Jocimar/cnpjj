
import { API_BASE_URL_V1, API_BASE_URL_V2 } from '../constants';
import { CompanyData } from '../types';

export const fetchCompanyByCnpj = async (cnpj: string): Promise<CompanyData> => {
  const cleanCnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCnpj.length !== 14) {
    throw new Error("CNPJ deve conter 14 dígitos.");
  }

  const fetchWithFallback = async () => {
    // 1. Tenta BrasilAPI V2
    try {
      const response = await fetch(`${API_BASE_URL_V2}/${cleanCnpj}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) return await response.json();
      console.warn(`V2 falhou com status ${response.status}.`);
    } catch (err) {
      console.warn("Falha de rede na V2. Tentando V1...");
    }

    // 2. Tenta BrasilAPI V1
    try {
      const response = await fetch(`${API_BASE_URL_V1}/${cleanCnpj}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) return await response.json();
      if (response.status === 404) throw new Error("CNPJ não encontrado.");
      console.warn(`V1 falhou com status ${response.status}.`);
    } catch (err) {
      if (err instanceof Error && err.message === "CNPJ não encontrado") throw err;
      console.warn("Falha de rede na V1. Tentando fallback externo...");
    }

    // 3. Fallback Externo (Minha Receita)
    try {
      const response = await fetch(`https://minhareceita.org/api/cnpj/${cleanCnpj}`);
      if (response.ok) {
        const data = await response.json();
        return normalizeCompanyData(data);
      }
    } catch (err) {
      console.error("Falha em todos os provedores.");
    }

    throw new Error("Não foi possível conectar aos serviços de consulta (BrasilAPI/Receita). Isso pode ser um problema temporário ou bloqueio de rede.");
  };

  const normalizeCompanyData = (data: any): CompanyData => {
    // Garante que campos essenciais existam mesmo em fallbacks que usem nomes diferentes
    return {
      ...data,
      email: data.email || data.correio_eletronico || null,
      ddd_telefone_1: data.ddd_telefone_1 || data.telefone || data.telefone_1 || "",
      ddd_telefone_2: data.ddd_telefone_2 || data.telefone_2 || null,
      descricao_tipo_de_logradouro: data.descricao_tipo_de_logradouro || "",
      logradouro: data.logradouro || "",
      numero: data.numero || "",
      complemento: data.complemento || "",
      bairro: data.bairro || "",
      municipio: data.municipio || data.nome_municipio || "",
      uf: data.uf || data.sigla_uf || "",
      cep: data.cep || "",
      razao_social: data.razao_social || data.nome_empresarial || "",
      nome_fantasia: data.nome_fantasia || data.nome_de_fantasia || "",
      data_inicio_atividade: data.data_inicio_atividade || data.data_de_inicio_atividade || "",
      cnae_fiscal_descricao: data.cnae_fiscal_descricao || data.cnae_principal_descricao || "",
      descricao_porte: data.descricao_porte || data.porte_descricao || "",
      descricao_situacao_cadastral: data.descricao_situacao_cadastral || data.situacao_cadastral_descricao || (data.situacao === 2 ? "ATIVA" : "INATIVA")
    };
  };

  const result = await fetchWithFallback();
  return normalizeCompanyData(result);
};
