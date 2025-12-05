import React, { useState, useEffect } from 'react';
import { CompanyData } from '../types';
import { MapPin, Users, Building2, RefreshCw, Calculator, UserCheck, CheckSquare, ExternalLink, ChevronDown, ChevronUp, AlertCircle, ScrollText } from 'lucide-react';

interface CompanyDetailsProps {
  data: CompanyData;
}

// Helper component for AdSense units to handle initialization per unit
const AdUnit = (props: any) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return <ins className="adsbygoogle" {...props} />;
};

// Reusable Responsive Ad Component
const ResponsiveAd = ({ isMobile }: { isMobile: boolean }) => (
  <div className="flex justify-center w-full py-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 min-h-[100px]">
    {!isMobile ? (
      <div>
        {/* cnpjj 728x90 */}
        <AdUnit 
          style={{ display: 'inline-block', width: '728px', height: '90px' }} 
          data-ad-client="ca-pub-2924325515288163" 
          data-ad-slot="9170752312" 
        />
      </div>
    ) : (
      <div className="w-full aspect-square overflow-hidden px-4">
        {/* cnpjj 1200x1200 */}
        <AdUnit 
          style={{ display: 'block' }} 
          data-ad-client="ca-pub-2924325515288163" 
          data-ad-slot="3437696444" 
          data-ad-format="auto" 
          data-full-width-responsive="true" 
        />
      </div>
    )}
  </div>
);

const CopyableValue: React.FC<{ value: string | number | null | undefined; className?: string; label?: string }> = ({ value, className, label }) => {
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
        <span className={`truncate ${hasValue ? 'border-b border-dashed border-slate-300 dark:border-slate-700 group-hover:border-emerald-500' : ''} pb-0.5 select-none`}>
            {displayValue}
        </span>
      </div>
      {/* Tooltip */}
      {hasValue && (
        <div className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 
          text-xs font-medium text-white rounded bg-slate-800 shadow-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50
          ${copied ? 'bg-emerald-600' : 'bg-slate-800'}
        `}>
          {copied ? 'Copiado!' : 'Clique para copiar'}
          {/* Triangle Arrow */}
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

// Simplified Row Item for the new layout
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

// Helper component for FAQ Items
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
        <div className="pb-4 px-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track window resize to toggle between mobile and desktop ads
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

      {/* 2. Ad Space */}
      <ResponsiveAd isMobile={isMobile} />

      {/* 3. Header (Registration & Location) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dados Cadastrais */}
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

          {/* Localização */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-fit">
             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Localização</h3>
             </div>

             <div className="flex flex-col gap-1">
                 <DataRow label="Data Abertura" value={formatDate(data.data_inicio_atividade)} />
                 <DataRow label="Logradouro" value={`${data.descricao_tipo_de_logradouro} ${data.logradouro}`} />
                 <DataRow label="Número" value={data.numero} />
                 <DataRow label="Complemento" value={data.complemento} />
                 <DataRow label="Bairro" value={data.bairro} />
                 <DataRow label="Município / UF" value={`${data.municipio} / ${data.uf}`} />
                 <DataRow label="CEP" value={data.cep} />
             </div>
          </div>
      </div>

      {/* 4. Ad Space */}
      <ResponsiveAd isMobile={isMobile} />

      {/* 5. Atividades Econômicas */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Atividades Econômicas</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividade Principal</h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 mr-2">{data.cnae_fiscal}</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{data.cnae_fiscal_descricao}</span>
            </div>
          </div>
          
          {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-900 dark:text-white">Atividades Secundárias</h3>
                <span className="bg-slate-100 dark:bg-slate-800 text-xs px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400">{data.cnaes_secundarios.length}</span>
              </div>
              <div className="grid gap-2">
                {data.cnaes_secundarios.map((cnae) => (
                  <div key={cnae.codigo} className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg flex items-start">
                    <span className="font-mono text-xs text-slate-500 mr-3 mt-0.5">{cnae.codigo}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{cnae.descricao}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Ad Space */}
      <ResponsiveAd isMobile={isMobile} />

      {/* 7. Regime Tributário */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-slate-900 dark:text-white">Regime Tributário</h3>
          </div>
          
          <div className="space-y-4">
             {data.opcao_pelo_simples ? (
               <>
                 <div className="flex items-start gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Simples Nacional
                      </p>
                      {data.data_opcao_pelo_simples && (
                        <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_simples)}</p>
                      )}
                    </div>
                 </div>
                 {data.opcao_pelo_mei && (
                   <div className="flex items-start gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          MEI (Microempreendedor)
                        </p>
                        {data.data_opcao_pelo_mei && (
                          <p className="text-xs text-slate-500">Desde {formatDate(data.data_opcao_pelo_mei)}</p>
                        )}
                      </div>
                   </div>
                 )}
               </>
             ) : (
               <div className="flex items-start gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Lucro Real ou Presumido
                    </p>
                    <p className="text-xs text-slate-500">Não optante pelo Simples Nacional</p>
                  </div>
               </div>
             )}

             <div className="flex items-start gap-3 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                <div>
                   <p className="text-sm font-medium text-slate-900 dark:text-white">
                     {data.descricao_porte}
                   </p>
                </div>
             </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
             Atualizado via Simples Nacional
          </div>
       </div>

      {/* 8. Ad Space */}
      <ResponsiveAd isMobile={isMobile} />

      {/* 9. Inscrições Estaduais (Temporarily Disabled) */}
      {/* 
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
         <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Inscrições Estaduais</h3>
         <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-400">
                  <p className="mb-2">
                      Para consultar a situação fiscal detalhada e o histórico completo, acesse o <strong>Cadastro Centralizado de Contribuintes (CCC)</strong>.
                  </p>
                  <a 
                      href="https://dfe-portal.svrs.rs.gov.br/NFE/CCC" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold underline hover:text-amber-900 dark:hover:text-amber-300"
                  >
                      Consultar no Portal CCC <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
            </div>

            {data.inscricoes_estaduais && data.inscricoes_estaduais.length > 0 ? (
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-4 py-3 font-medium">UF</th>
                          <th className="px-4 py-3 font-medium">Número</th>
                          <th className="px-4 py-3 font-medium">Situação IE</th>
                          <th className="px-4 py-3 font-medium">Situação CNPJ</th>
                          <th className="px-4 py-3 font-medium">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.inscricoes_estaduais.map((ie, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                              <td className="px-4 py-3">{ie.uf || ie.uf_ie}</td>
                              <td className="px-4 py-3">
                                <CopyableValue value={ie.ie || ie.numero} className="font-mono" />
                              </td>
                              <td className="px-4 py-3">
                                {ie.situacao_ie ? (
                                   <Badge color={ie.situacao_ie === 'HABILITADO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                      {ie.situacao_ie}
                                   </Badge>
                                ) : (
                                    <Badge color={ie.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {ie.ativo ? 'Habilitada' : 'Não Habilitada'}
                                    </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-slate-500">{ie.situacao_cnpj || '-'}</td>
                              <td className="px-4 py-3 text-slate-500">{formatDate(ie.data_situacao_uf || ie.atualizado_em)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500 py-4">
                  <ScrollText className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-medium">Nenhuma Inscrição Estadual vinculada diretamente ao cadastro federal.</p>
                  <p className="text-sm mt-1">Utilize o link acima para consultar diretamente na SEFAZ.</p>
              </div>
            )}
         </div>
      </div>
      */}

      {/* 10. Ad Space (Temporarily Disabled) */}
      {/* 
      <ResponsiveAd isMobile={isMobile} />
      */}

      {/* 11. SUFRAMA (Temporarily Disabled) */}
      {/* 
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Inscrição SUFRAMA</h3>
        <div className="text-center py-4">
          {data.numero_inscricao_suframa ? (
              <div className="p-4 bg-slate-50 border rounded-lg inline-block">
                  <p className="text-sm text-slate-500 mb-1">Número de Inscrição</p>
                  <CopyableValue value={data.numero_inscricao_suframa} className="text-lg font-mono font-semibold" />
              </div>
          ) : (
              <div className="flex flex-col items-center text-slate-500">
                <Building2 className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-medium">Não inscrito na SUFRAMA</p>
              </div>
          )}
        </div>
      </div>
      */}

      {/* 12. Ad Space (Temporarily Disabled) */}
      {/* 
      <ResponsiveAd isMobile={isMobile} />
      */}

      {/* 13. Sócios e Administradores */}
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

       {/* 14. Ad Space */}
       <ResponsiveAd isMobile={isMobile} />

       {/* 15. FAQ Section */}
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
            <FaqItem 
              question={`Qual é o telefone da empresa ${data.razao_social}?`}
              answer={`O telefone cadastrado é ${data.ddd_telefone_1 ? `(${data.ddd_telefone_1})` : 'não informado'}.`}
            />
          </div>
       </div>

       {/* 16. Ad Space (Final) */}
       <ResponsiveAd isMobile={isMobile} />
    </div>
  );
};