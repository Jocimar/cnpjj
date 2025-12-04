import React, { useState } from 'react';
import { MOCK_CODE_EXAMPLE, MOCK_JSON_RESPONSE } from '../constants';
import { Copy, Check } from 'lucide-react';

export const Documentation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl text-slate-900 dark:text-white">
          API Pública
        </h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          Bem-vindo(a) à nossa interface de exploração da API de CNPJ. Nosso objetivo é facilitar o acesso automatizado às informações públicas disponíveis sobre empresas brasileiras.
        </p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          Esta ferramenta utiliza endpoints públicos (como BrasilAPI) para demonstração. É ideal para validação de cadastros, enriquecimento de dados e análises rápidas.
        </p>
      </div>

      <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Funcionalidades</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Receita Federal", desc: "Dados cadastrais, situação, endereço e CNAEs." },
            { title: "Simples Nacional", desc: "Indicador de opção e datas." },
            { title: "Sócios (QSA)", desc: "Quadro de sócios e administradores." },
            { title: "CNAEs Secundários", desc: "Lista completa de atividades." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Exemplo de Uso</h2>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          Realize uma consulta GET simples passando apenas o CNPJ.
        </p>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-50 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-slate-900">
            <span className="text-xs font-mono text-slate-400">BASH</span>
            <button 
              onClick={() => handleCopy(MOCK_CODE_EXAMPLE)}
              className="p-1.5 hover:bg-slate-800 rounded-md transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono"><code>{MOCK_CODE_EXAMPLE}</code></pre>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight">Resposta (JSON)</h3>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-50 overflow-hidden">
           <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 bg-slate-900">
            <span className="text-xs font-mono text-slate-400">JSON</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-green-400"><code>{MOCK_JSON_RESPONSE}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};
