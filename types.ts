import React from 'react';

export interface Cnae {
  codigo: number;
  descricao: string;
}

export interface Qsa {
  identificador_de_socio: number;
  nome_socio: string;
  cnpj_cpf_socio: string;
  codigo_qualificacao_socio: number;
  percentual_capital_social: number;
  data_entrada_sociedade: string;
}

export interface InscricaoEstadual {
  // Common fields
  uf?: string;
  uf_ie?: string; // Added for compatibility with Consultar.IO schema
  
  // BrasilAPI existing fields
  numero?: string;
  ativo?: boolean;
  atualizado_em?: string;

  // Consultar.IO fields (from documentation)
  ie?: string;
  situacao_ie?: string;
  situacao_cnpj?: string;
  data_situacao_uf?: string;
}

export interface CompanyData {
  cnpj: string;
  identificador_matriz_filial: number;
  descricao_matriz_filial: string;
  razao_social: string;
  nome_fantasia: string;
  situacao_cadastral: number;
  descricao_situacao_cadastral: string;
  data_situacao_cadastral: string;
  motivo_situacao_cadastral: number;
  nome_cidade_exterior: string | null;
  codigo_natureza_juridica: number;
  data_inicio_atividade: string;
  cnae_fiscal: number;
  cnae_fiscal_descricao: string;
  descricao_tipo_de_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: number;
  uf: string;
  codigo_municipio: number;
  municipio: string;
  ddd_telefone_1: string;
  ddd_telefone_2: string | null;
  ddd_fax: string | null;
  email: string | null; // Added email
  qualificacao_do_responsavel: number;
  capital_social: number;
  porte: number;
  descricao_porte: string;
  opcao_pelo_simples: boolean | null;
  data_opcao_pelo_simples: string | null;
  data_exclusao_do_simples: string | null;
  opcao_pelo_mei: boolean | null;
  data_opcao_pelo_mei: string | null;
  data_exclusao_do_mei: string | null;
  situacao_especial: string | null;
  data_situacao_especial: string | null;
  cnaes_secundarios: Cnae[];
  qsa: Qsa[];
  inscricoes_estaduais?: InscricaoEstadual[]; // Added for UI compatibility
  numero_inscricao_suframa?: string; // Added for UI compatibility
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}