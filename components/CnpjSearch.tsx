
import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, ArrowRight, CreditCard, CheckCircle2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyByCnpj } from '../services/api';
import { CompanyData } from '../types';
import { CompanyDetails } from './CompanyDetails';
import { PAGBANK_AFFILIATE_LINK, PAGBANK_BENEFITS, MACHINE_MODELS } from '../constants';

const HomePromoBanner: React.FC = () => {
  return (
    <a 
      href={PAGBANK_AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-xl border border-yellow-400 bg-gradient-to-br from-yellow-400 via-yellow-400 to-yellow-500 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 md:min-h-[300px]"
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* Left Side: Text & Headline */}
        <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:p-10">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest">Oferta PagBank</span>
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest border-l border-slate-900/20 pl-2">Melhor Maquininha</span>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 md:text-4xl uppercase tracking-tighter leading-[0.9] mb-4">
            A Solução Completa <br /> para seu Negócio
          </h2>
          
          <p className="mb-6 max-w-md text-sm font-bold text-slate-800 md:text-base leading-snug">
            Moderninha ou Minizinha: a máquina ideal com as melhores vantagens do mercado.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-black text-white shadow-xl transition-all group-hover:scale-105 active:scale-95">
              Ver Ofertas <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Right Side: Benefits Grid */}
        <div className="relative z-10 flex flex-1 flex-col justify-center bg-white/10 p-6 md:p-8 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAGBANK_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-white/40 p-3 md:bg-white/30 backdrop-blur-md border border-white/20 shadow-sm transition-transform group-hover:scale-[1.02]">
                <div className="mt-0.5 rounded-full bg-slate-900 p-1">
                  <benefit.icon className="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase leading-none mb-1">{benefit.title}</h4>
                  <p className="text-[10px] font-bold text-slate-800 leading-tight">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Models list tag cloud style */}
          <div className="mt-6 flex flex-wrap gap-2">
            {MACHINE_MODELS.slice(0, 4).map((model, i) => (
              <span key={i} className="text-[9px] font-black text-slate-900/60 uppercase tracking-tight">
                • {model}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Icons Background */}
      <CreditCard className="absolute -bottom-8 -left-8 h-48 w-48 text-slate-900/5 rotate-12 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
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

        {/* Promo Banner under Search Box */}
        {!data && <HomePromoBanner />}
      </div>

      {data && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-8">
          <CompanyDetails data={data} />
        </div>
      )}
    </div>
  );
};
