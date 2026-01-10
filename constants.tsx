
import { 
  Search, 
  BookOpen,
  Activity,
  Info,
  Shield,
  FileText,
  Ban,
  ShieldCheck,
  Clock,
  Truck,
  CreditCard,
  Percent,
  Infinity
} from 'lucide-react';

export const API_BASE_URL = 'https://brasilapi.com.br/api/cnpj/v1';

export const AFFILIATE_LINK = "https://ton.com.br/catalogo/?referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

export const MACHINE_MODELS = [
  "Ton T3 Smart",
  "Ton T3",
  "Ton T2+",
  "Ton T1 Chip",
  "Ton T1"
];

export const TON_BENEFITS = [
  { icon: Percent, title: "Taxas a partir de 0,74%", desc: "As melhores taxas do mercado" },
  { icon: Ban, title: "Sem aluguel", desc: "A máquina é sua de verdade" },
  { icon: Infinity, title: "Garantia Vitalícia", desc: "Segurança total para sempre" },
  { icon: Clock, title: "Receba na hora", desc: "Venda e receba o dinheiro rápido" }
];

export const NAV_ITEMS = [
  {
    category: 'Ferramentas',
    items: [
      { title: 'Consulta CNPJ', href: '/', icon: Search },
      { title: 'Status do Serviço', href: '/status', icon: Activity },
      { title: 'Maquininha de Cartão', href: AFFILIATE_LINK, icon: CreditCard, external: true },
    ],
  },
  {
    category: 'Desenvolvedores',
    items: [
      { title: 'Documentação API', href: '/docs', icon: BookOpen },
    ]
  },
  {
    category: 'Institucional',
    items: [
      { title: 'Sobre', href: '/sobre', icon: Info },
      { title: 'Políticas de Privacidade', href: '/privacidade', icon: Shield },
      { title: 'Termos de Uso', href: '/termos', icon: FileText },
    ],
  },
];

export const FOOTER_LINKS = [
  {
    title: 'Ferramentas',
    items: [
      { title: 'Consulta CNPJ', href: '/', icon: Search },
      { title: 'Status do Serviço', href: '/status', icon: Activity },
      { title: 'Maquininha de Cartão', href: AFFILIATE_LINK, icon: CreditCard, external: true },
    ],
  },
  {
    title: 'Desenvolvedores',
    items: [
      { title: 'Documentação API', href: '/docs', icon: BookOpen },
    ]
  },
  {
    title: 'Institucional',
    items: [
      { title: 'Sobre', href: '/sobre', icon: Info },
      { title: 'Políticas de Privacidade', href: '/privacidade', icon: Shield },
      { title: 'Termos de Uso', href: '/termos', icon: FileText },
    ],
  },
];

export const MOCK_CODE_EXAMPLE = `curl -X GET "https://brasilapi.com.br/api/cnpj/v1/00000000000191"`;

export const MOCK_JSON_RESPONSE = `{
  "cnpj": "00.000.000/0001-91",
  "razao_social": "BANCO DO BRASIL SA",
  "nome_fantasia": "DIRECAO GERAL",
  "situacao_cadastral": 2,
  "descricao_situacao_cadastral": "ATIVA",
  "data_inicio_atividade": "1966-08-02",
  "cnae_fiscal_descricao": "Bancos múltiplos, com carteira comercial",
  "logradouro": "SAUN QD 5 LT B TORRES I, II E III",
  "municipio": "BRASILIA",
  "uf": "DF"
}`;
