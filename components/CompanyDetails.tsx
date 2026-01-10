
import React, { useState, useEffect } from 'react';
import { CompanyData } from '../types';
import { MapPin, Users, Building2, ChevronDown, ChevronUp, CreditCard, CheckCircle2, ArrowRight, Truck, Sparkles, X } from 'lucide-react';
import { AFFILIATE_LINK, MACHINE_MODELS_DATA } from '../constants';

// Ton Custom Banner Component
const TonBanner: React.FC<{ type: 'horizontal' | 'card', modelIndex: number }> = ({ type, modelIndex }) => {
  const model = MACHINE_MODELS_DATA[modelIndex % MACHINE_MODELS_DATA.length];

  if (type === 'horizontal') {
    return (
      <a 
        href={model.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full overflow-hidden rounded-xl border border-lime-400 bg-gradient-to-r from-lime-400 to-lime-500 p-4 shadow-md transition-all hover:shadow-lg md:p-6"
      >
        <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-slate-900 md:flex shadow-xl">
              <CreditCard className="h-7 w-7 text-lime-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-lime-400 uppercase tracking-wider">Ton</span>
                <h4 className="text-lg font-black text-slate-900 md:text-2xl uppercase tracking-tighter">{model.name}</h4>
              </div>
              <p className="text-xs font-bold text-slate-900 mb-1">{model.desc}</p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900/70">
                 <Truck className="h-3.5 w-3.5" />
                 <span>{model.benefit}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between md:mt-0 gap-6">
            <div className="hidden lg:flex items-center gap-4 border-l border-slate-900/10 pl-6">
               <div className="flex flex-col items-center text-center">
                  <Sparkles className="h-4 w-4 text-slate-900 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-900 uppercase leading-none">Garantia Vitalícia</span>
               </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-lime-400 shadow-lg transition-transform group-hover:scale-105 active:scale-95 whitespace-nowrap uppercase tracking-tighter">
              peça já sua maquininha <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
      </a>
    );
  }

  return (
    <a 
      href={model.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-lime-400 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-28 w-full bg-gradient-to-br from-lime-400 to-lime-500 p-6 flex flex-col items-center justify-center">
        <CreditCard className="h-16 w-16 text-slate-900 opacity-10 absolute -right-2 -bottom-2 rotate-12" />
        <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-lime-400 uppercase tracking-widest mb-1 shadow-sm">Maquininha Ton</span>
        <h4 className="text-xl font-black text-slate-900 text-center uppercase tracking-tighter">{model.name}</h4>
      </div>
      <div className="p-5 flex flex-col h-full">
        <div className="space-y-3 mb-6 flex-1">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight mb-2">{model.desc}</p>
          <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="h-6 w-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center shrink-0">
              <Truck className="h-4 w-4 text-lime-600" />
            </div>
            <span className="text-xs font-bold">{model.benefit}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="h-6 w-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 text-lime-600" />
            </div>
            <span className="text-xs font-bold">Garantia Vitalícia</span>
          </div>
        </div>
        <div className="w-full rounded-lg bg-slate-900 py-3.5 text-center text-sm font-bold text-lime-400 shadow-md transition-all group-hover:bg-slate-800 group-hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide">
          ver oferta ton <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
};

const ResponsiveAd = ({ isMobile, modelIndex }: { isMobile: boolean, modelIndex: number }) => (
  <div className="w-full">
    {isMobile ? (
      <TonBanner type="card" modelIndex={modelIndex} />
    ) : (
      <TonBanner type="horizontal" modelIndex={modelIndex} />
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

interface CompanyDetailsProps {
  data: CompanyData;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isQsaModalOpen, setIsQsaModalOpen] = useState(false);

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
      
      {/* Summary Block */}
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

      {/* Ad Pos 1: Under Summary */}
      <ResponsiveAd isMobile={isMobile} modelIndex={0} />

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

      {/* Ad Pos 2: Under Location Grid */}
      <ResponsiveAd isMobile={isMobile} modelIndex={1} />

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Atividades Econômicas</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividade Principal</h3>
            </div>
            <CnaeRow code={data.cnae_fiscal} description={data.cnae_fiscal_descricao} isPrincipal={true} />
          </div>
          {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 mt-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividades Secundárias</h3>
                <span className="bg-slate-100 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">{data.cnaes_secundarios.length}</span>
              </div>
              <div className="grid gap-2">
                {data.cnaes_secundarios.map((cnae) => (
                  <CnaeRow key={cnae.codigo} code={cnae.codigo} description={cnae.descricao} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ad Pos 3: Under Economic Activities */}
      <ResponsiveAd isMobile={isMobile} modelIndex={2} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Regime Tributário</h3>
            <div className="flex flex-col gap-0.5">
               {data.opcao_pelo_simples ? (
                 <>
                   <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Simples Nacional</p>
                      {data.data_opcao_pelo_simples && <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_simples)}</p>}
                   </div>
                   {data.opcao_pelo_mei && (
                     <div className="mt-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">MEI (Microempreendedor)</p>
                        {data.data_opcao_pelo_mei && <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_mei)}</p>}
                     </div>
                   )}
                 </>
               ) : (
                 <div className="py-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Lucro Real ou Presumido</p>
                    <p className="text-xs text-slate-500">Não optante pelo Simples Nacional</p>
                 </div>
               )}
               <div className="py-1 mt-1">
                   <p className="text-sm font-medium text-slate-900 dark:text-white">{data.descricao_porte}</p>
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-slate-900 dark:text-white">Sócios e Administradores</h3>
               <div className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600">{data.qsa ? data.qsa.length : 0}</div>
            </div>
            {data.qsa && data.qsa.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                 {data.qsa.slice(0, 3).map((socio, idx) => (
                    <div key={idx} className="flex flex-col bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-4 rounded-lg">
                       <div className="flex items-start gap-3">
                          <Users className="w-4 h-4 text-slate-500 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <CopyableValue value={socio.nome_socio} className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate block uppercase" />
                          </div>
                       </div>
                    </div>
                 ))}
                 {data.qsa.length > 3 && (
                    <button 
                      onClick={() => setIsQsaModalOpen(true)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-bold text-center underline decoration-dotted underline-offset-4 pt-2"
                    >
                      + {data.qsa.length - 3} outros sócios
                    </button>
                 )}
              </div>
            ) : (
               <div className="text-center py-6 text-slate-500 text-sm">Esta empresa não possui sócios informados.</div>
            )}
         </div>
      </div>

       {/* Ad Pos 4: Under Registry Info */}
       <ResponsiveAd isMobile={isMobile} modelIndex={3} />

       <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">FAQ - Perguntas e Respostas</h2>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <FaqItem question={`De quem é o CNPJ ${data.cnpj}?`} answer={`O CNPJ ${data.cnpj} pertence à razão social ${data.razao_social}, com nome fantasia ${data.nome_fantasia || 'não informado'}, localizada na cidade de ${data.municipio} - ${data.uf}.`} />
            <FaqItem question={`Qual a razão social da empresa de CNPJ ${data.cnpj}?`} answer={`A razão social é ${data.razao_social}.`} />
            <FaqItem question={`Qual o CNAE da empresa ${data.razao_social}?`} answer={`A atividade principal (CNAE) é ${data.cnae_fiscal} - ${data.cnae_fiscal_descricao}.`} />
            <FaqItem question={`Qual o endereço da empresa ${data.razao_social}?`} answer={`A empresa está localizada em: ${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero} ${data.complemento ? `- ${data.complemento}` : ''}, Bairro ${data.bairro}, ${data.municipio} - ${data.uf}, CEP ${data.cep}.`} />
          </div>
       </div>

       {/* QSA Modal */}
       {isQsaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quadro de Sócios e Administradores</h3>
                      <p className="text-sm text-slate-500">{data.qsa?.length} registros encontrados</p>
                   </div>
                   <button 
                     onClick={() => setIsQsaModalOpen(false)}
                     className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                   >
                     <X className="w-5 h-5 text-slate-500" />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                   <div className="grid gap-3">
                      {data.qsa?.map((socio, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                           <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0">
                                 <Users className="w-5 h-5 text-slate-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                 <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase text-sm">{socio.nome_socio}</h4>
                                 <div className="mt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                       <span className="text-slate-400 uppercase">Cargo/Qualificação:</span>
                                       <span className="text-slate-700 dark:text-slate-300">{socio.codigo_qualificacao_socio}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                       <span className="text-slate-400 uppercase">Entrada:</span>
                                       <span className="text-slate-700 dark:text-slate-300">{socio.data_entrada_sociedade}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-center">
                   <button 
                     onClick={() => setIsQsaModalOpen(false)}
                     className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold uppercase"
                   >
                     Fechar
                   </button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};
