import { API_BASE_URL } from '../constants';
import { CompanyData } from '../types';

export const fetchCompanyByCnpj = async (cnpj: string): Promise<CompanyData> => {
  const cleanCnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCnpj.length !== 14) {
    throw new Error("CNPJ deve conter 14 dígitos.");
  }

  const response = await fetch(`${API_BASE_URL}/${cleanCnpj}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("CNPJ não encontrado.");
    }
    if (response.status === 429) {
      throw new Error("Muitas requisições. Tente novamente em instantes.");
    }
    throw new Error("Erro ao consultar CNPJ. Verifique sua conexão.");
  }

  return response.json();
};