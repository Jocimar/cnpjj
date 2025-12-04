import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Termos de Uso</h1>
        <p className="text-slate-500 dark:text-slate-400">Vigência a partir de: {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>1. Aceitação dos Termos</h3>
        <p>
          Ao acessar ao site <strong>CNPJota</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
        </p>

        <h3>2. Uso de Licença</h3>
        <p>
          É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site CNPJota, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
        </p>
        <ul>
          <li>Modificar ou copiar os materiais;</li>
          <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial) sem autorização;</li>
          <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site CNPJota;</li>
          <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
        </ul>

        <h3>3. Isenção de Responsabilidade</h3>
        <p>
          Os materiais no site da CNPJota são fornecidos 'como estão'. CNPJota não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
        </p>
        <p>
          Além disso, o CNPJota não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site. Os dados de CNPJ são provenientes de fontes públicas e podem conter defasagens.
        </p>

        <h3>4. Limitações</h3>
        <p>
          Em nenhum caso o CNPJota ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em CNPJota.
        </p>
      </div>
    </div>
  );
};