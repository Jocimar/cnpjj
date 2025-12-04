import React from 'react';
import { ShieldCheck, Zap, Database } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Sobre o CNPJota
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Simplificando o acesso à informação pública empresarial no Brasil com transparência e tecnologia.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Rapidez e Eficiência</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Nossa plataforma foi desenhada para entregar resultados instantâneos, permitindo que você valide cadastros e obtenha informações cruciais em segundos.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
            <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Dados Públicos</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Utilizamos fontes oficiais e APIs abertas (como BrasilAPI) para garantir que você tenha acesso aos dados cadastrais disponíveis na Receita Federal.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Privacidade em Foco</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Não armazenamos histórico das suas consultas. O CNPJota atua como uma interface de visualização, respeitando a sua privacidade e a segurança dos dados.
          </p>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none pt-8 border-t border-slate-200 dark:border-slate-800">
        <h3>Nossa Missão</h3>
        <p>
          Acreditamos que o acesso facilitado a dados públicos é um pilar fundamental para o ambiente de negócios no Brasil. 
          Seja para análise de crédito, prospecção de vendas ou simples verificação cadastral, o <strong>CNPJota</strong> 
          está aqui para remover barreiras burocráticas.
        </p>
      </div>
    </div>
  );
};