
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
      className="group relative block w-full overflow-hidden rounded-2xl border border-lime-400 bg-gradient-to-br from-lime-400 via-lime-500 to-emerald-600 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 md:min-h-[320px]"
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex flex-[1.2] flex-col justify-center p-6 md:p-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black text-lime-400 uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> Oferta Exclusiva Ton
            </span>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 md:text-5xl uppercase tracking-tighter leading-[0.85] mb-4">
            As Melhores Taxas <br />
            <span className="text-white drop-shadow-sm">Para Seu Negócio</span>
          </h2>
          
          <p className="mb-8 max-w-md text-sm font-bold text-slate-900 md:text-lg leading-tight opacity-90">
            Aumente suas vendas com a tecnologia Ton. 
            Sem aluguel e com garantia vitalícia inclusa para sua tranquilidade!
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-14 items-center justify-center rounded-full bg-slate-900 px-10 text-base font-black text-white shadow-2xl transition-all group-hover:scale-105 active:scale-95 text-center uppercase tracking-tighter">
              Peça já sua maquininha <ArrowRight className="ml-2 h-5 w-5 text-lime-400" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center bg-black/5 p-6 md:p-10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0 border-t border-white/10 md:border-t-0 md:border-l">
          <div className="grid grid-cols-1 gap-3">
            {TON_BENEFITS.slice(0, 3).map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-white/20 p-4 backdrop-blur-md border border-white/30 shadow-sm transition-transform group-hover:translate-x-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lime-400 shadow-lg">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase leading-none mb-1">{benefit.title}</h4>
                  <p className="text-xs font-bold text-slate-900/70 leading-tight">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreditCard className="absolute -bottom-10 -right-10 h-64 w-64 text-slate-900/5 -rotate-12 pointer-events-none" />
    </a>
  );
};

const SMBHomeBanner: React.FC = () => {
  return (
    <a 
      href={SMB_STORE_DATA.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-700 bg-[#1c222a] shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 md:min-h-[320px]"
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex flex-[1.2] flex-col justify-center p-6 md:p-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#7cb50a] px-3 py-1 text-[10px] font-black text-[#1c222a] uppercase tracking-widest">
              SMB Store
            </span>
          </div>
          
          <h2 className="text-3xl font-black text-white md:text-5xl uppercase tracking-tighter leading-[0.85] mb-4">
            {SMB_STORE_DATA.headline} <br />
            <span className="text-[#7cb50a]">Controle Seu Negócio</span>
          </h2>
          
          <p className="mb-8 max-w-md text-sm font-bold text-slate-400 md:text-lg leading-tight">
            {SMB_STORE_DATA.desc} Mais de 30 mil empreendedores já confiam na nossa tecnologia.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-14 items-center justify-center rounded-full bg-[#7cb50a] px-10 text-base font-black text-[#1c222a] shadow-2xl transition-all group-hover:scale-105 active:scale-95 text-center uppercase tracking-tighter">
              {SMB_STORE_DATA.cta} <MousePointerClick className="ml-2 h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center bg-white/5 p-6 md:p-10 backdrop-blur-sm border-t border-white/10 md:border-t-0 md:border-l border-slate-800">
          <div className="grid grid-cols-1 gap-3">
            {SMB_STORE_DATA.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-white/5 p-4 border border-white/10 shadow-sm transition-transform group-hover:translate-x-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7cb50a] text-[#1c222a] shadow-lg">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase leading-none mb-1">Benefício SMB</h4>
                  <p className="text-xs font-bold text-slate-400 leading-tight">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LayoutDashboard className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 -rotate-12 pointer-events-none" />
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
    <div className="space-y-8 w-full mx-auto pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Consulta CNPJ</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Consulte dados públicos de empresas brasileiras em tempo real.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={cnpjInput}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm pl-9 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-slate-200 dark:border-slate-800 dark:bg-slate-950"
              />
            </div>
            <button 
              type="submit"
              disabled={loading || cnpjInput.replace(/\D/g, '').length < 14}
              className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Consultar'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        {!data && (
          <div className="grid grid-cols-1 gap-6">
            <HomePromoBanner />
            <SMBHomeBanner />
          </div>
        )}
      </div>

      {data && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-8">
          <CompanyDetails data={data} />
        </div>
      )}
    </div>
  );
};
