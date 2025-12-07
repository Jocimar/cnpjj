import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export const Status: React.FC = () => {
  const [status, setStatus] = useState<'ok' | 'issues' | 'loading'>('loading');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('https://brasilapi.com.br/api/status/v1/services');
        if (response.ok) {
          setStatus('ok');
        } else {
          setStatus('issues');
        }
      } catch (e) {
        setStatus('issues');
      }
    };
    checkStatus();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Status do Serviço</h1>
        <p className="text-slate-500 dark:text-slate-400">Monitoramento em tempo real das nossas APIs.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-sm">
        {status === 'loading' ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 mb-4"></div>
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        ) : status === 'ok' ? (
          <>
            <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Todos os sistemas operacionais</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Nenhuma instabilidade detectada na comunicação com a Receita Federal e BrasilAPI.
            </p>
          </>
        ) : (
          <>
            <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Instabilidade Detectada</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Alguns serviços podem apresentar lentidão devido à alta demanda ou manutenção nas fontes oficiais.
            </p>
          </>
        )}
      </div>
    </div>
  );
};