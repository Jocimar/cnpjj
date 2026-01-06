
import React, { useState, useEffect } from 'react';
import { CompanyData } from '../types';
import { MapPin, Users, Building2, ChevronDown, ChevronUp, CreditCard, CheckCircle2, ArrowRight, Truck, ShieldCheck, Clock, Ban } from 'lucide-react';
import { PAGBANK_AFFILIATE_LINK } from '../constants';

const MACHINE_MODELS = [
  "Moderninha Pro 2",
  "Moderninha ProFit",
  "Moderninha Smart 2",
  "Minizinha Chip 3",
  "Moderninha Plus 2",
  "Minizinha NFC 2"
];

const BENEFITS = [
  { icon: Ban, title: "Sem aluguel", desc: "Livre-se do aluguel" },
  { icon: ShieldCheck, title: "Garantia", desc: "5 anos de garantia" },
  { icon: Clock, title: "Rapidez", desc: "Receba na hora" },
  { icon: Truck, title: "Entrega", desc: "Frete grátis" }
];

// PagBank Custom Banner Component
const PagBankBanner: React.FC<{ type: 'horizontal' | 'card', modelIndex: number }> = ({ type, modelIndex }) => {
  const modelName = MACHINE_MODELS[modelIndex % MACHINE_MODELS.length];

  if (type === 'horizontal') {
    return (
      <a 
        href={PAGBANK_AFFILIATE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full overflow-hidden rounded-xl border border-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 shadow-md transition-all hover:shadow-lg md:p-6"
      >
        <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-white/30 md:flex shadow-inner">
              <CreditCard className="h-7 w-7 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">PagBank</span>
                <h4 className="text-lg font-black text-slate-900 md:text-2xl uppercase tracking-tighter">{modelName}</h4>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                 {BENEFITS.slice(0, 2).map((b, i) => (
                   <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                     <b.icon className="h-3.5 w-3.5" />
                     <span>{b.desc}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between md:mt-0 gap-6">
            <div className="hidden lg:flex items-center gap-4 border-l border-slate-900/10 pl-6">
               {BENEFITS.slice(2).map((b, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                    <b.icon className="h-4 w-4 text-slate-900 mb-0.5" />
                    <span className="text-[10px] font-bold text-slate-800 uppercase leading-none">{b.title}</span>
                 </div>
               ))}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform group-hover:scale-105 active:scale-95">
              Ver Ofertas <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
      </a>
    );
  }

  return (
    <a 
      href={PAGBANK_AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-yellow-400 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-28 w-full bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 flex flex-col items-center justify-center">
        <CreditCard className="h-16 w-16 text-slate-900 opacity-10 absolute -right-2 -bottom-2 rotate-12" />
        <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest mb-1 shadow-sm">PagBank</span>
        <h4 className="text-xl font-black text-slate-900 text-center uppercase tracking-tighter">{modelName}</h4>
      </div>
      <div className="p-5 flex flex-col h-full">
        <div className="space-y-3 mb-6 flex-1">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <span>{benefit.desc}</span>
            </div>
          ))}
        </div>
        <div className="w-full rounded-lg bg-emerald-600 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all group-hover:bg-emerald-700 group-hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
          Ver Ofertas <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
};

// Reusable Responsive Ad Component
const ResponsiveAd = ({ isMobile, modelIndex }: { isMobile: boolean, modelIndex: number }) => (
  <div className="w-full">
    {isMobile ? (
      <PagBankBanner type="card" modelIndex={modelIndex} />
    ) : (
      <PagBankBanner type="horizontal" modelIndex={modelIndex} />
    )}
  </div>
);

const CopyableValue: React.FC<{ value: string | number | null | undefined; className?: string; label?: string; truncate?: boolean }> = ({ value, className, label, truncate = true }) => {
  const [copied, setCopied] = useState(false);
  
  const hasValue = value !== null && value !== undefined && value !== '';
  const displayValue = hasValue ? value : '-';

  const handleCopy = (e: React.MouseEvent) => {
    if (!hasValue) return;
    e.stopPropagation();
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block group max-w-full">
      <div 
        onClick={handleCopy} 
        className={`${hasValue ? 'cursor-pointer group-hover:text-emerald-600 dark:group-hover:text-emerald-400' : ''} transition-colors flex flex-col ${className}`}
        aria-label={hasValue ? "Clique para copiar" : undefined}
      >
        {label && <span className="text-xs text-slate-500 font-medium mb-0.5">{label}</span>}
        <span className={`${truncate ? 'truncate' : ''} ${hasValue ? 'border-b border-dashed border-slate-300 dark:border-slate-700 group-hover:border-emerald-500' : ''} pb-0.5 select-none`}>
            {displayValue}
        </span>
      </div>
      {hasValue && (
        <div className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 
          text-xs font-medium text-white rounded bg-slate-800 shadow-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50
          ${copied ? 'bg-emerald-600' : 'bg-slate-800'}
        `}>
          {copied ? 'Copiado!' : 'Clique para copiar'}
          <div className={`
            absolute top-full left-1/2 -translate-x-1/2 
            border-4 border-transparent 
            ${copied ? 'border-t-emerald-600' : 'border-t-slate-800'}
          `}></div>
        </div>
      )}
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: string | number | null | undefined }> = ({ label, value }) => (
  <div className="py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <CopyableValue label={label} value={value} className="text-sm text-slate-700 dark:text-slate-200 font-medium" />
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-slate-100 text-slate-800' }) => (
  <span className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold ${color}`}>
    {children}
  </span>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-900/50 px-2 rounded-lg transition-colors"
      >
        <span className="font-medium text-slate-900 dark:text-slate-100 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const CnaeRow: React.FC<{ code: number | string; description: string; isPrincipal?: boolean }> = ({ code, description, isPrincipal = false }) => {
  const formattedCode = String(code).replace(/\D/g, '').padStart(7, '0').replace(/^(\d{2})(\d{2})(\d)(\d{2})/, '$1.$2-$3-$4');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-3 flex items-start gap-3">
        <CopyableValue 
          value={formattedCode} 
          className={`mt-0.5 px-2 py-0.5 rounded text-xs font-mono font-bold whitespace-nowrap ${isPrincipal ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
        />
        <CopyableValue 
          value={description} 
          truncate={false}
          className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight pt-0.5"
        />
    </div>
  );
};

// Define the interface for the component props
interface CompanyDetailsProps {
  data: CompanyData;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (data && data.razao_social) {
      document.title = `${data.razao_social} - CNPJJ`;
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ATIVA': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'BAIXADA': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number | undefined) => {
      if (value === undefined || value === null) return '-';
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return (
    <div className="space-y-6">
      
      {/* 1. New Summary Block */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white uppercase leading-tight">
                  {data.razao_social}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2">
                  <Badge color={getStatusColor(data.descricao_situacao_cadastral)}>
                      {data.descricao_situacao_cadastral}
                  </Badge>
                  
                  <Badge color="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      CNPJ: {data.cnpj.replace(/\D/g, '')}
                  </Badge>

                  {data.opcao_pelo_simples && (
                       <Badge color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                           Simples Nacional
                       </Badge>
                  )}
                  
                  {data.opcao_pelo_mei && (
                      <Badge color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          MEI
                      </Badge>
                  )}
              </div>
          </div>
      </div>

      {/* 2. Banner 1: Moderninha Pro 2 */}
      <ResponsiveAd isMobile={isMobile} modelIndex={0} />

      {/* 3. Header (Registration & Location) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Dados Cadastrais</h3>
             </div>
             
             <div className="flex flex-col gap-1">
                 <DataRow label="CNPJ" value={data.cnpj} />
                 <DataRow label="Razão Social" value={data.razao_social} />
                 <DataRow label="Nome Fantasia" value={data.nome_fantasia || 'NÃO INFORMADO'} />
                 <DataRow label="Capital Social" value={formatCurrency(data.capital_social)} />
                 <DataRow label="Data Abertura" value={formatDate(data.data_inicio_atividade)} />
                 <DataRow label="Email" value={data.email?.toLowerCase()} />
                 <DataRow label="Telefone" value={data.ddd_telefone_1 ? `(${data.ddd_telefone_1}) ${data.ddd_telefone_2 || ''}` : '-'} />
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-fit">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Localização</h3>
             </div>

             <div className="flex flex-col gap-1">
                 <DataRow label="Logradouro" value={`${data.descricao_tipo_de_logradouro} ${data.logradouro}`} />
                 <DataRow label="Número" value={data.numero} />
                 <DataRow label="Complemento" value={data.complemento} />
                 <DataRow label="Bairro" value={data.bairro} />
                 <DataRow label="Município / UF" value={`${data.municipio} / ${data.uf}`} />
                 <DataRow label="CEP" value={data.cep} />
             </div>
          </div>
      </div>

      {/* 4. Banner 2: Moderninha ProFit */}
      <ResponsiveAd isMobile={isMobile} modelIndex={1} />

      {/* 5. Atividades Econômicas */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Atividades Econômicas</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividade Principal</h3>
            </div>
            <CnaeRow 
              code={data.cnae_fiscal} 
              description={data.cnae_fiscal_descricao} 
              isPrincipal={true} 
            />
          </div>
          
          {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 mt-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividades Secundárias</h3>
                <span className="bg-slate-100 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">{data.cnaes_secundarios.length}</span>
              </div>
              <div className="grid gap-2">
                {data.cnaes_secundarios.map((cnae) => (
                  <CnaeRow 
                    key={cnae.codigo} 
                    code={cnae.codigo} 
                    description={cnae.descricao} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Banner 3: Moderninha Smart 2 */}
      <ResponsiveAd isMobile={isMobile} modelIndex={2} />

      {/* 7. Regime Tributário */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold text-slate-900 dark:text-white">Regime Tributário</h3>
          </div>
          
          <div className="flex flex-col gap-0.5">
             {data.opcao_pelo_simples ? (
               <>
                 <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Simples Nacional
                    </p>
                    {data.data_opcao_pelo_simples && (
                      <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_simples)}</p>
                    )}
                 </div>
                 {data.opcao_pelo_mei && (
                   <div className="mt-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        MEI (Microempreendedor)
                      </p>
                      {data.data_opcao_pelo_mei && (
                        <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_mei)}</p>
                      )}
                   </div>
                 )}
               </>
             ) : (
               <div className="py-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Lucro Real ou Presumido
                  </p>
                  <p className="text-xs text-slate-500">Não optante pelo Simples Nacional</p>
               </div>
             )}

             <div className="py-1 mt-1">
                 <p className="text-sm font-medium text-slate-900 dark:text-white">
                   {data.descricao_porte}
                 </p>
             </div>
          </div>
       </div>

      {/* 8. Banner 4: Minizinha Chip 3 */}
      <ResponsiveAd isMobile={isMobile} modelIndex={3} />

      {/* 9. Sócios e Administradores */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-900 dark:text-white">Sócios e Administradores</h3>
             <div className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600">
                {data.qsa ? data.qsa.length : 0}
             </div>
          </div>
          
          {data.qsa && data.qsa.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {data.qsa.map((socio, idx) => (
                  <div key={idx} className="flex flex-col bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-4 rounded-lg">
                     <div className="flex items-start gap-3 mb-2">
                        <div className="bg-white dark:bg-slate-800 p-2 rounded-full shrink-0 shadow-sm">
                           <Users className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                           <CopyableValue 
                             value={socio.nome_socio} 
                             className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate block uppercase" 
                           />
                        </div>
                     </div>
                     <div className="text-xs text-slate-500 space-y-1">
                        <p>Entrada: {socio.data_entrada_sociedade}</p>
                     </div>
                  </div>
               ))}
            </div>
          ) : (
             <div className="text-center py-6 text-slate-500 text-sm">
                Esta empresa não possui sócios informados na base de dados.
             </div>
          )}
       </div>

       {/* 10. Banner 5: Moderninha Plus 2 */}
       <ResponsiveAd isMobile={isMobile} modelIndex={4} />

       {/* 11. FAQ Section */}
       <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            FAQ - Perguntas e Respostas
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <FaqItem 
              question={`De quem é o CNPJ ${data.cnpj}?`}
              answer={`O CNPJ ${data.cnpj} pertence à razão social ${data.razao_social}, com nome fantasia ${data.nome_fantasia || 'não informado'}, localizada na cidade de ${data.municipio} - ${data.uf}.`}
            />
            <FaqItem 
              question={`Qual a razão social da empresa de CNPJ ${data.cnpj}?`}
              answer={`A razão social é ${data.razao_social}.`}
            />
             <FaqItem 
              question={`Qual o CNAE da empresa ${data.razao_social}?`}
              answer={`A atividade principal (CNAE) é ${data.cnae_fiscal} - ${data.cnae_fiscal_descricao}.`}
            />
            <FaqItem 
              question={`Qual o endereço da empresa ${data.razao_social}?`}
              answer={`A empresa está localizada em: ${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero} ${data.complemento ? `- ${data.complemento}` : ''}, Bairro ${data.bairro}, ${data.municipio} - ${data.uf}, CEP ${data.cep}.`}
            />
          </div>
       </div>

       {/* 12. Banner 6: Minizinha NFC 2 */}
       <ResponsiveAd isMobile={isMobile} modelIndex={5} />
    </div>
  );
};
