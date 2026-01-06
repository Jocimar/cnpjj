
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
  Truck
} from 'lucide-react';

export const API_BASE_URL = 'https://brasilapi.com.br/api/cnpj/v1';

export const PAGBANK_AFFILIATE_LINK = "https://pagbank.vc/indica-maquininhas-a58abebd9";

export const MACHINE_MODELS = [
  "Moderninha Pro 2",
  "Moderninha ProFit",
  "Moderninha Smart 2",
  "Minizinha Chip 3",
  "Moderninha Plus 2",
  "Minizinha NFC 2"
];

export const PAGBANK_BENEFITS = [
  { icon: Ban, title: "Sem aluguel", desc: "Livre-se do aluguel" },
  { icon: ShieldCheck, title: "Garantia", desc: "Maquininhas com 5 anos de garantia" },
  { icon: Clock, title: "Dinheiro na hora", desc: "Receba seu dinheiro na hora" },
  { icon: Truck, title: "Frete grátis", desc: "Entrega rápida garantida" }
];

export const NAV_ITEMS = [
  {
    category: 'Ferramentas',
    items: [
      { title: 'Consulta CNPJ', href: '/', icon: Search },
      { title: 'Status do Serviço', href: '/status', icon: Activity },
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
