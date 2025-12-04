import React from 'react';
import { ArrowRight, ShieldAlert, FileSearch, TrendingUp } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  setView: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 pt-16 pb-32">
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 transform">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl filter" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl filter" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          <span className="block">A Verdade na Era da</span>
          <span className="block text-indigo-500">Desinformação</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          O DRM Verify usa IA avançada e verificação em tempo real para detectar fake news, inconsistências e manipulação em seu conteúdo. Feito para jornalistas e criadores modernos.
        </p>
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          <button
            onClick={() => setView(AppView.ANALYZER)}
            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:scale-105 sm:w-auto"
          >
            Começar Verificação <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700 backdrop-blur-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Detecção de Fake News</h3>
            <p className="mt-2 text-slate-400">Sinalize instantaneamente alegações potencialmente falsas verificadas com dados de pesquisa em tempo real.</p>
          </div>
          <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700 backdrop-blur-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Pontuação de Confiabilidade</h3>
            <p className="mt-2 text-slate-400">Obtenha uma pontuação quantitativa de 0-100 sobre a confiabilidade do texto.</p>
          </div>
          <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700 backdrop-blur-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
              <FileSearch className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Relatórios Acionáveis</h3>
            <p className="mt-2 text-slate-400">Detalhamento de segmentos específicos com sugestões de melhoria.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;