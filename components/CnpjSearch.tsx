import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, ChevronDown, ChevronUp, MapPin, Building2 } from 'lucide-react';
import { fetchCompanyByCnpj } from '../services/api';
import { CompanyData } from '../types';
import { CompanyDetails } from './CompanyDetails';

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

// Helper to generate generic neighbor CNPJs for demo purposes
// In a real app, this would come from a "Nearby" API endpoint
const generateNeighbors = (baseCnpj: string) => {
  const clean = baseCnpj.replace(/\D/g, '');
  const baseNum = parseInt(clean.substring(0, 8)); // Use root for variation
  
  const neighbors = [];
  for (let i = 1; i <= 5; i++) {
    // Simply incrementing the root number to simulate other companies
    // Note: This generates invalid check digits but serves for UI demonstration
    const nextRoot = (baseNum + i).toString().padStart(8, '0');
    const suffix = '0001';
    const digits = '00'; // Placeholder check digits
    
    neighbors.push({
      cnpj: `${nextRoot.substring(0, 2)}.${nextRoot.substring(2, 5)}.${nextRoot.substring(5, 8)}/${suffix}-${digits}`,
      name: `EMPRESA EXEMPLO ${i} LTDA`
    });
  }
  return neighbors;
};

export const CnpjSearch: React.FC = () => {
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
    if (cnpjToSearch.length < 14) {
      setError('CNPJ inválido. Digite os 14 dígitos.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    
    // Update input if searched programmatically
    setCnpjInput(formatCnpj(cnpjToSearch));

    try {
      const result = await fetchCompanyByCnpj(cnpjToSearch);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(cnpjInput);
  };

  const neighbors = data ? generateNeighbors(data.cnpj) : [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
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

          {/* FAQ Section */}
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

          {/* Other Companies Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Outras empresas
            </h2>
            <div className="grid gap-2">
              {neighbors.map((neighbor, idx) => (
                <button
                  key={idx}
                  onClick={() => performSearch(neighbor.cnpj)}
                  className="w-full text-left p-4 rounded-lg bg-[#1e40af] hover:bg-[#1e3a8a] text-white transition-colors shadow-sm flex items-center justify-between group"
                >
                  <span className="font-medium truncate mr-4">
                    {neighbor.cnpj} {neighbor.name} - {neighbor.cnpj}
                  </span>
                  <Search className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
