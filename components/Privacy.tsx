import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Políticas de Privacidade</h1>
        <p className="text-slate-500 dark:text-slate-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          A sua privacidade é importante para nós. É política do <strong>CNPJota</strong> respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site.
        </p>

        <h3>1. Coleta de Dados</h3>
        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. 
          No caso de consultas de CNPJ, os dados digitados são transmitidos para as APIs públicas parceiras (como BrasilAPI) e não são armazenados permanentemente em nossos servidores.
        </p>

        <h3>2. Uso de Dados</h3>
        <p>
          Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados (como logs temporários de acesso para segurança), 
          protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
        </p>

        <h3>3. Compartilhamento</h3>
        <p>
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
        </p>

        <h3>4. Links Externos</h3>
        <p>
          O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
        </p>

        <h3>5. Consentimento</h3>
        <p>
          O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
        </p>
      </div>
    </div>
  );
};