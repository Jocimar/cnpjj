
import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, ArrowRight, CreditCard, Sparkles, LayoutDashboard, MousePointerClick, CheckCircle2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyByCnpj } from '../services/api';
import { CompanyData } from '../types';
import { CompanyDetails } from './CompanyDetails';
import { AFFILIATE_LINK, TON_BENEFITS, MACHINE_MODELS_DATA, SMB_STORE_DATA } from '../constants';

const HomePromoBanner: React.FC = () => {
  return (
    <a 
      href={AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-lime-400 bg-gradient-to-br from-lime-400 via-lime-500 to-emerald-600 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 aspect-square md:aspect-auto lg:aspect-square min-h-[400px]"
    >
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8 lg:p-10">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black text-lime-400 uppercase tracking-widest shadow-lg">
            <Sparkles className="h-3 w-3" /> Oferta Exclusiva Ton
          </span>
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none mb-4">
          As Melhores Taxas <br />
          <span className="text-white drop-shadow-sm">Para Seu Negócio</span>
        </h2>
        
        <p className="mb-6 text-xs md:text-sm font-bold text-slate-900 leading-tight opacity-90 max-w-[240px]">
          Aumente suas vendas com a tecnologia Ton. Sem aluguel e com garantia vitalícia inclusa.
        </p>

        <div className="mt-auto space-y-3">
          <div className="grid gap-2">
            {TON_BENEFITS.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/20 p-2.5 backdrop-blur-md border border-white/30">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lime-400 shadow-sm">
                  <benefit.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{benefit.title}</span>
              </div>
            ))}
          </div>

          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white shadow-2xl transition-all group-hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
            Pedir Maquininha <ArrowRight className="ml-2 h-4 w-4 text-lime-400" />
          </div>
        </div>
      </div>
      <CreditCard className="absolute -bottom-4 -right-4 h-40 w-40 text-slate-900/10 -rotate-12 pointer-events-none" />
    </a>
  );
};

const SMBHomeBanner: React.FC = () => {
  return (
    <a 
      href={SMB_STORE_DATA.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#1c222a] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 aspect-square md:aspect-auto lg:aspect-square min-h-[400px]"
    >
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8 lg:p-10">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#7cb50a] px-3 py-1 text-[10px] font-black text-[#1c222a] uppercase tracking-widest shadow-lg">
            SMB Store
          </span>
        </div>
        
        <h2 className="text-2xl font-black text-white md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none mb-4">
          {SMB_STORE_DATA.headline} <br />
          <span className="text-[#7cb50a]">Gestão Simples</span>
        </h2>
        
        <p className="mb-6 text-xs md:text-sm font-bold text-slate-400 leading-tight max-w-[240px]">
          O sistema leve para seu caixa não travar. Controle tudo no balcão de forma simples.
        </p>

        <div className="mt-auto space-y-3">
          <div className="grid gap-2">
            {SMB_STORE_DATA.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 border border-white/10">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7cb50a] text-[#1c222a] shadow-sm">
                  <benefit.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-tight">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#7cb50a] text-xs font-black text-[#1c222a] shadow-2xl transition-all group-hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
            {SMB_STORE_DATA.cta} <MousePointerClick className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
      <LayoutDashboard className="absolute -bottom-4 -right-4 h-40 w-40 text-white/5 -rotate-12 pointer-events-none" />
    </a>
  );
};

export const CnpjSearch: React.FC = () => {
  const { cnpj: cnpjParam } = useParams();
  const navigate = useNavigate();
  
  const [cnpjInput, setCnpjInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompanyData | null>(null);

  useEffect(() => {
    if (!data) {
      document.title = "CNPJJ - Consulta CNPJ Grátis e Dados de Empresas";
    }
  }, [data]);

  const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpjInput(formatCnpj(e.target.value));
  };

  const performSearch = async (cnpjToSearch: string) => {
    const cleanCnpj = cnpjToSearch.replace(/[^\d]/g, '');
    
    if (cleanCnpj.length !== 14) {
      setError('CNPJ inválido. Digite os 14 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    
    setCnpjInput(formatCnpj(cleanCnpj));

    try {
      const result = await fetchCompanyByCnpj(cleanCnpj);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cnpjParam) {
      const cleanParam = cnpjParam.replace(/[^\d]/g, '');
      if (cleanParam.length === 14) {
        if (!data || data.cnpj.replace(/[^\d]/g, '') !== cleanParam) {
           performSearch(cleanParam);
        }
      }
    } else {
      setData(null);
      setCnpjInput('');
      setError(null);
    }
  }, [cnpjParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCnpj = cnpjInput.replace(/[^\d]/g, '');
    
    if (cleanCnpj.length === 14) {
      navigate(`/${cleanCnpj}`);
    } else {
      setError('CNPJ inválido. Digite os 14 dígitos.');
    }
  };

  return (
    <div className="space-y-6 w-full mx-auto pb-12 max-w-6xl animate-in fade-in duration-700">
      {!data && (
        <div className="text-center space-y-3 py-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            Consulta de CNPJ
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto">
            Acesse dados atualizados da Receita Federal e Simples Nacional de forma gratuita e instantânea.
          </p>
        </div>
      )}

      <div className="space-y-4 w-full max-w-6xl mx-auto">
        <div className="relative group">
          {/* Decorative Background for Search area */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white dark:bg-slate-900 p-2 md:p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-[0_15px_40px_rgba(8,_112,_184,_0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  value={cnpjInput}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0000-00"
                  className="w-full h-14 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-lg font-semibold pl-12 placeholder:text-slate-400 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all dark:text-white"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || cnpjInput.replace(/\D/g, '').length < 14}
                className="h-14 px-8 md:px-12 py-2 inline-flex items-center justify-center rounded-xl text-lg font-black uppercase tracking-widest ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_8px_20px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? <Loader2 className="animate-spin h-6 w-6" /> : 'Consultar'}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="mx-auto max-w-2xl animate-in zoom-in-95 duration-300">
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3 shadow-sm">
              <div className="h-7 w-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                <AlertCircle className="h-4 w-4" />
              </div>
              {error}
            </div>
          </div>
        )}
      </div>

      {data && (
        <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 space-y-8 w-full mx-auto">
          <CompanyDetails data={data} />
        </div>
      )}

      {!data && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 w-full">
          <HomePromoBanner />
          <SMBHomeBanner />
        </div>
      )}
    </div>
  );
};
