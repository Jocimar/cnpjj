
import { 
  Search, 
  BookOpen,
  Activity,
  Info,
  Shield,
  FileText,
  Ban,
  Clock,
  Truck,
  CreditCard,
  Percent,
  Infinity
} from 'lucide-react';

export const API_BASE_URL = 'https://brasilapi.com.br/api/cnpj/v1';

export const AFFILIATE_LINK = "https://ton.com.br/catalogo/?referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor";

export const MACHINE_MODELS_DATA = [
  {
    name: "T3 Smart Pro",
    desc: "A maquininha Android, mais rápida e melhor bateria",
    benefit: "Frete Grátis para todo Brasil",
    link: "https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_SMART_POS_B&referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor"
  },
  {
    name: "T3 Pro",
    desc: "A maquininha com comprovante impresso",
    benefit: "Frete Grátis para todo Brasil",
    link: "https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_S920_B&referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor"
  },
  {
    name: "T2 Pro",
    desc: "A maquininha compacta que tá sempre com você",
    benefit: "Frete Grátis para todo Brasil",
    link: "https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D195_B&referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor"
  },
  {
    name: "T1 Pro",
    desc: "A maquininha compacta que conecta com o seu celular",
    benefit: "Frete Grátis para todo Brasil",
    link: "https://ton.com.br/checkout/cart/?productId=TONPRO_TIER_NOV24_D150_B&referrer=EA9DA3C9-84B0-4436-A864-AE01BEC154EC&userAnticipation=0&userTag=tonpro_tier_nov24_b&utm_medium=invite_share&utm_source=revendedor"
  }
];

export const TON_BENEFITS = [
  { icon: Percent, title: "Melhores Taxas", desc: "Taxas competitivas para o seu negócio" },
  { icon: Ban, title: "Sem aluguel", desc: "A máquina é sua de verdade" },
  { icon: Infinity, title: "Garantia Vitalícia", desc: "Segurança total para sempre" },
  { icon: Truck, title: "Frete Grátis", desc: "Entrega rápida em todo o Brasil" }
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
