import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyByCnpj } from '../services/api';
import { CompanyData } from '../types';
import { CompanyDetails } from './CompanyDetails';

export const CnpjSearch: React.FC = () => {
  const { cnpj: cnpjParam } = useParams();
  const navigate = useNavigate();
  
  const [cnpjInput, setCnpjInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompanyData | null>(null);

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
    
    // Update input field visual state
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

  // Effect to handle URL params changes
  useEffect(() => {
    if (cnpjParam) {
      const cleanParam = cnpjParam.replace(/[^\d]/g, '');
      if (cleanParam.length === 14) {
        // Only search if it's different from what we're currently showing to avoid loops
        if (!data || data.cnpj.replace(/[^\d]/g, '') !== cleanParam) {
           performSearch(cleanParam);
        }
      }
    } else {
      // Reset if navigating back to home root (e.g. clicking Logo)
      // We always clear data and input to ensure a fresh search state
      setData(null);
      setCnpjInput('');
      setError(null);
    }
  }, [cnpjParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCnpj = cnpjInput.replace(/[^\d]/g, '');
    
    if (cleanCnpj.length === 14) {
      // Update URL, this will trigger the useEffect to search
      navigate(`/${cleanCnpj}`);
    } else {
      setError('CNPJ inválido. Digite os 14 dígitos.');
    }
  };

  return (
    // Removed max-w-4xl to allow full width alignment with footer
    <div className="space-y-8 w-full mx-auto pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Consulta CNPJ</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Consulte dados públicos de empresas brasileiras em tempo real.
        </p>
      </div>

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

      {data && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 space-y-8">
          <CompanyDetails data={data} />
        </div>
      )}
    </div>
  );
};
