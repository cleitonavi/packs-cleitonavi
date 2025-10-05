'use client';

import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

/* ================================
   Ícones SVG locais (simples)
==================================*/
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };
const base = (p: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...p,
});
function CheckIcon(p: IconProps) { return (<svg {...base(p)}><path d="M20 6 9 17 4 12"/></svg>); }
function XIcon(p: IconProps) { return (<svg {...base(p)}><path d="M18 6 6 18M6 6l12 12"/></svg>); }
function ArrowRightIcon(p: IconProps) {
  return (<svg {...base(p)}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>);
}
function ClockIcon(p: IconProps) { return (<svg {...base(p)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>); }
function TargetIcon(p: IconProps) { return (<svg {...base(p)}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>); }
function ZapIcon(p: IconProps) { return (<svg {...base(p)}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>); }
function AwardIcon(p: IconProps) { return (<svg {...base(p)}><circle cx="12" cy="8" r="5"/><path d="M8.5 13 7 22l5-3 5 3-1.5-9"/></svg>); }

/* ================================
   Dados
==================================*/
const projectImagesTop = [
  '/projetos/cima-1.jpg',
  '/projetos/cima-2.jpg',
  '/projetos/cima-3.jpg',
  '/projetos/cima-4.jpg',
  '/projetos/cima-5.jpg',
];
const projectImagesBottom = [
  '/projetos/baixo-1.jpg',
  '/projetos/baixo-2.jpg',
  '/projetos/baixo-3.jpg',
  '/projetos/baixo-4.jpg',
  '/projetos/baixo-5.jpg',
];

const packages = [
  {
    name: 'Essencial',
    price: 'A partir de R$ 5.000',
    duration: 'Até 3 semanas',
    desc: 'O essencial bem feito: logo completo, paleta, tipografia e arquivos prontos para usar.',
    features: [
      'Briefing guiado e direcionamento',
      '2–3 rotas de logo com narrativa',
      'Refinos até fechar a melhor versão',
      'Paleta, tipografia e variações de uso',
      'Arquivos finais (AI, SVG, PNG, PDF)',
      'Kit social básico (perfis e covers)',
    ],
    notIncluded: ['Manual completo', 'Pesquisa aprofundada'],
    highlight: false,
  },
  {
    name: 'Estratégico',
    price: 'A partir de R$ 12.000',
    duration: '3–5 semanas',
    desc: 'Para quem quer posicionamento claro e um sistema visual consistente.',
    features: [
      'Tudo do Essencial',
      'Pesquisa de mercado & concorrência',
      'Posicionamento e pilares de marca',
      'Sistema visual completo (cores, grids, patterns)',
      'Apresentação da marca (deck)',
      'Templates editáveis (Figma/Canva)',
      'Manual de uso (guia resumido)',
    ],
    notIncluded: [],
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Sob consulta',
    duration: '5–8 semanas',
    desc: 'Branding de ponta a ponta: pesquisa profunda, arquitetura de marca e assets especiais.',
    features: [
      'Tudo do Estratégico',
      'Workshop de descoberta',
      'Pesquisa com audiência',
      'Arquitetura de marca e sub-marcas',
      'Motion (logo animado) e mockups premium',
      'Brand book completo',
      'Acompanhamento na implementação',
    ],
    notIncluded: [],
    highlight: false,
  },
];

const compareRows = [
  { label: 'Preço', agencies: '$5k - 30k+', freelancers: 'Variável', cleiton: 'Fixo & transparente' },
  { label: 'Prazo', agencies: '3–9 meses', freelancers: 'Incertos', cleiton: '2–6 semanas' },
  { label: 'Revisões', agencies: 'Limitadas', freelancers: 'Cobradas à parte', cleiton: 'Ilimitadas*' },
  { label: 'Designer', agencies: 'Júnior/Mid', freelancers: 'Variável', cleiton: 'Sênior dedicado' },
  { label: 'Processo', agencies: 'Complexo', freelancers: 'Informal', cleiton: 'Estruturado & colaborativo' },
  { label: 'Comunicação', agencies: 'Reuniões intermináveis', freelancers: 'Irregular', cleiton: 'Direta & consultiva' },
];

/* ================================
   Carousel de Projetos (duas linhas)
==================================*/
function CarouselProjetos() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const topRef = React.useRef<HTMLDivElement | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const posTop = React.useRef(0);
  const posBottom = React.useRef(0);
  const baseTop = React.useRef(-60);     // ←
  const baseBottom = React.useRef(-60);  // também ← (usamos fila invertida para parecer →)
  const dragVel = React.useRef(0);
  const lastTime = React.useRef<number | null>(null);

  const ITEM_W = 320;
  const GAP = 24;
  const TOP_COUNT = projectImagesTop.length;
  const BOT_COUNT = projectImagesBottom.length;
  const loopWTop = TOP_COUNT * ITEM_W + (TOP_COUNT - 1) * GAP;
  const loopWBot = BOT_COUNT * ITEM_W + (BOT_COUNT - 1) * GAP;

  React.useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (lastTime.current == null) lastTime.current = t;
      const dt = (t - lastTime.current) / 1000;
      lastTime.current = t;

      posTop.current += (baseTop.current + dragVel.current) * dt;
      posBottom.current += (baseBottom.current + dragVel.current) * dt;

      const wrapNeg = (pos: number, w: number) => (pos <= -w ? pos + w : pos > 0 ? pos - w : pos);
      posTop.current = wrapNeg(posTop.current, loopWTop);
      posBottom.current = wrapNeg(posBottom.current, loopWBot);

      if (topRef.current) topRef.current.style.transform = `translateX(${posTop.current}px)`;
      if (bottomRef.current) bottomRef.current.style.transform = `translateX(${posBottom.current}px)`;

      dragVel.current *= 0.92;
      if (Math.abs(dragVel.current) < 0.05) dragVel.current = 0;

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [loopWTop, loopWBot]);

  const state = React.useRef({ dragging: false, lastX: 0, lastT: 0 });
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    wrapRef.current?.setPointerCapture(e.pointerId);
    state.current.dragging = true;
    state.current.lastX = e.clientX;
    state.current.lastT = performance.now();
    wrapRef.current?.classList.add('cursor-grabbing');
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!state.current.dragging) return;
    const now = performance.now();
    const dx = e.clientX - state.current.lastX;
    const dt = (now - state.current.lastT) / 1000;
    state.current.lastX = e.clientX;
    state.current.lastT = now;
    const boost = Math.max(-600, Math.min(600, dx / dt));
    dragVel.current = dragVel.current * 0.6 + boost * 0.4;
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    state.current.dragging = false;
    wrapRef.current?.releasePointerCapture(e.pointerId);
    wrapRef.current?.classList.remove('cursor-grabbing');
  };

  return (
    <div
      ref={wrapRef}
      className="space-y-4 select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Cima (visual ←) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]">
        <div ref={topRef} className="flex gap-6 will-change-transform py-4 px-2" style={{ transform: 'translateX(0)' }}>
          {[...projectImagesTop, ...projectImagesTop].map((src, i) => (
            <div key={`t-${i}`} className="relative h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-[#111]">
              <Image
                src={src}
                alt={`Projeto ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(max-width: 768px) 75vw, 320px"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>

      {/* Baixo (usamos flex-row-reverse para parecer →) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]">
        <div
          ref={bottomRef}
          className="flex flex-row-reverse gap-6 will-change-transform py-4 px-2"
          style={{ transform: 'translateX(0)' }}
        >
          {[...projectImagesBottom, ...projectImagesBottom].map((src, i) => (
            <div key={`b-${i}`} className="relative h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-[#111]">
              <Image
                src={src}
                alt={`Projeto ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                sizes="(max-width: 768px) 75vw, 320px"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>
    </div>
  );
}

/* ================================
   Página
==================================*/
type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  pack: string;
  timeline: string;
  budget: string;
  vision: string;
  challenge: string;
};

export default function CleitonAviLanding() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>({
    name: '', email: '', phone: '', company: '',
    pack: '', timeline: '', budget: '', vision: '', challenge: '',
  });

  const submit = () => {
    const required = ['name', 'email', 'phone', 'company', 'pack', 'timeline', 'budget', 'vision'] as const;
    const missing = (required as Array<keyof FormState>).filter((k) => !form[k]);
    if (missing.length) { alert('Preencha os campos obrigatórios.'); return; }
    console.log('Form LP Cleiton Avi:', form);
    alert('Recebi suas infos. Vou responder em até 24h úteis com os próximos passos.');
    setOpen(false);
    setForm({ name: '', email: '', phone: '', company: '', pack: '', timeline: '', budget: '', vision: '', challenge: '' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#00CFAF]/30 selection:text-white">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#00CFAF] to-[#00A289] shadow-[0_0_40px_-10px] shadow-[#00CFAF]/40">
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden>
                <circle cx="20" cy="20" r="18" stroke="#fff" strokeOpacity=".25" />
                <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#fff" fillOpacity=".12" />
                <path d="M20 8L32 20L20 32L8 20L20 8Z" stroke="#fff" strokeOpacity=".4" />
              </svg>
            </div>
            <span className="text-lg font-medium tracking-tight">Cleiton Avi</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#processo" className="text-sm text-white/70 transition hover:text-white">Processo</a>
            <a href="#projetos" className="text-sm text-white/70 transition hover:text-white">Projetos</a>
            <a href="#pacotes" className="text-sm text-white/70 transition hover:text-white">Pacotes</a>
            <a href="#comparativo" className="text-sm text-white/70 transition hover:text-white">Comparativo</a>
          </div>
          {/* CTA com alto contraste (turquesa) */}
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="rounded-md bg-[#00CFAF] px-5 text-black hover:bg-[#00A289] uppercase tracking-wide"
          >
            Começar Projeto <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-40 pb-24 md:pb-36 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/70">
            <span>Desde 2012 Criando Marcas Que Performam</span>
          </div>
          <h1 className="text-balance text-5xl leading-none tracking-tight text-white sm:text-7xl md:text-8xl capitalize">
            Design de marca
            <span className="block">Sem surpresas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-white/70 capitalize">
            Pacotes claros, processo transparente e entrega garantida. Sua identidade profissional pronta
            para elevar percepção, diferenciação e confiança.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="rounded-md bg-[#00CFAF] px-6 text-black hover:bg-[#00A289] uppercase tracking-wide"
              onClick={() => setOpen(true)}
            >
              Ver Pacotes & Iniciar <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:border-[#00CFAF] hover:text-[#00CFAF] hover:bg-white/5 uppercase tracking-wide"
              onClick={() => document.getElementById('processo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Como Funciona
            </Button>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-y border-white/5 bg-[#111111] px-6 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 text-center">
          {[
            { icon: <ZapIcon className="mx-auto h-8 w-8 text-[#00CFAF]" />, title: 'Velocidade Real', desc: 'De 2 a 8 semanas conforme o pacote. Sem novela, sem atrasos.' },
            { icon: <TargetIcon className="mx-auto h-8 w-8 text-[#00CFAF]" />, title: '100% Estratégico', desc: 'Cada decisão visual conecta com objetivo de negócio.' },
            { icon: <AwardIcon className="mx-auto h-8 w-8 text-[#00CFAF]" />, title: 'Qualidade Sênior', desc: 'Desde 2012 em design. Zero projetos reprovados.' },
          ].map((b, i) => (
            <Card key={i} className="border-white/10 bg-[#0A0A0A]">
              <CardContent className="space-y-3 p-6">
                {b.icon}
                <h3 className="text-xl text-white capitalize">{b.title}</h3>
                <p className="text-sm text-white/70 capitalize">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="px-6 py-24 text-center">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-4xl tracking-tight text-white sm:text-5xl capitalize">Trabalhos Selecionados</h2>
          <CarouselProjetos />
        </div>
      </section>

      {/* PACOTES */}
      <section id="pacotes" className="px-6 py-24 text-center">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl capitalize">Escolha O Formato Ideal</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 capitalize">
              Todos os pacotes seguem meu processo sênior, com alinhamento claro e garantia de satisfação.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-left">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative border ${pkg.highlight ? 'border-[#00CFAF]/60' : 'border-white/10'} bg-[#111111]`}>
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00CFAF] px-3 py-1 text-[11px] font-medium text-black shadow-lg">
                    Mais escolhido
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-white capitalize">{pkg.name}</CardTitle>
                  <div className="mt-1 text-3xl text-white capitalize">{pkg.price}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                    <ClockIcon className="h-3.5 w-3.5" /> {pkg.duration}
                  </div>
                  <p className="mt-3 text-sm text-white/70">{pkg.desc}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-white/80"><CheckIcon className="mt-0.5 h-4 w-4 text-[#00CFAF]" />{f}</li>
                    ))}
                  </ul>
                  {pkg.notIncluded.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      {pkg.notIncluded.map((n) => (
                        <div key={n} className="flex gap-2 text-sm text-white/50"><XIcon className="mt-0.5 h-4 w-4" />{n}</div>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={() => { setOpen(true); setForm((prev) => ({ ...prev, pack: pkg.name })); }}
                    className={`mt-4 w-full uppercase tracking-wide ${pkg.highlight ? 'bg-[#00CFAF] text-black hover:bg-[#00A289]' : 'bg-transparent text-white hover:bg-white/5 border border-white/30'}`}
                  >
                    Escolher {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
<section id="comparativo" className="px-6 py-24">
  <div className="mx-auto max-w-7xl">
    {/* títulos centralizados + sentence case apenas no primeiro caractere */}
    <h2 className="mb-2 text-center text-4xl sm:text-5xl tracking-tight text-white">
      Por que escolher pacotes fixos?
    </h2>
    <p className="mb-10 text-center text-sm text-white/70">
      Compare e veja a diferença
    </p>

    {/* helper sentence-case: só a primeira letra vira maiúscula; se começar com número, mantém */}
    {/*
      Coloquei dentro do JSX para ficar 100% colável. Se preferir,
      extraia para o topo do arquivo.
    */}
    {(() => {
      function sentenceCase(input: string) {
        if (!input) return "";
        const s = input.trim();
        // se começa com letra, sobe só a primeira e baixa o resto
        if (/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(s)) {
          return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        }
        // se começa com número/símbolo, retorna do jeito que está
        return s;
      }

      return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A1116]">
          <table className="w-full border-collapse text-[15px]">
            <thead>
              <tr className="text-white/80">
                <th className="w-[22%] px-5 py-4 text-left font-medium bg-[#0D1419]">
                  &nbsp;
                </th>
                <th className="w-[26%] px-5 py-4 text-left font-medium bg-[#0D1419]">
                  {sentenceCase("agências tradicionais")}
                </th>
                <th className="w-[26%] px-5 py-4 text-left font-medium bg-[#0D1419]">
                  {sentenceCase("freelancers")}
                </th>
                <th className="w-[26%] px-5 py-4 text-left font-semibold bg-[#14B8A6] text-black">
                  {sentenceCase("cleiton avi")}
                </th>
              </tr>
            </thead>

            <tbody>
              {compareRows.map((r, idx) => {
                const rowBg = idx % 2 === 0 ? "bg-[#0A1318]" : "bg-[#0C151B]";
                return (
                  <tr key={r.label} className={rowBg}>
                    {/* 1ª coluna — destaque extra */}
                    <td className="px-5 py-4 font-semibold text-white/90 bg-[#0D1419] border-l-4 border-[#14B8A6]">
                      {sentenceCase(r.label)}
                    </td>

                    {/* Demais colunas */}
                    <td className="px-5 py-4 text-white/75">
                      {sentenceCase(String(r.agencies))}
                    </td>
                    <td className="px-5 py-4 text-white/75">
                      {sentenceCase(String(r.freelancers))}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#2DD4BF]">
                      {/* mantém “2–6 semanas”, “R$” etc se começarem com número/símbolo */}
                      {sentenceCase(String(r.cleiton))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="border-t border-white/10 px-5 py-3 text-center text-xs text-white/55">
            *Revisões ilimitadas no conceito escolhido durante a fase de desenvolvimento.
          </div>
        </div>
      );
    })()}
  </div>
</section>


      {/* PROCESSO */}
      <section id="processo" className="border-y border-white/5 bg-[#111111] px-6 py-24 text-center">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl capitalize">Como funciona o processo</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 capitalize">Transparente, colaborativo e focado em resultado.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 text-left">
            {[
              { step: '01', title: 'Briefing Estratégico', dur: '1–2 dias', desc: 'Mergulho nos objetivos, público, contexto e restrições.' },
              { step: '02', title: 'Pesquisa & Estratégia', dur: '3–5 dias', desc: 'Leitura de mercado e concorrência. Definição de posicionamento.' },
              { step: '03', title: 'Rotas Iniciais', dur: '5–7 dias', desc: 'Apresento 2–3 rotas com narrativas visuais distintas.' },
              { step: '04', title: 'Refino', dur: '5–10 dias', desc: 'Evoluímos juntos até a melhor versão.' },
              { step: '05', title: 'Entrega & Onboard', dur: '2–3 dias', desc: 'Arquivos, diretrizes e materiais organizados.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#0A0A0A] p-6">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#00CFAF] text-black">{s.step}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl text-white capitalize">{s.title}</h3>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70">{s.dur}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0A1A1A_0%,#1A3A3A_100%)]" />
        <div className="mx-auto max-w-4xl">
          <h3 className="text-balance text-4xl tracking-tight text-white sm:text-5xl capitalize">Pronto Para Elevar Sua Marca?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 capitalize">
            Envie suas informações e eu retorno em até 24h úteis com os próximos passos.
          </p>
          <Button
            size="lg"
            className="mt-6 rounded-md bg-[#00CFAF] px-6 text-black hover:bg-[#00A289] uppercase tracking-wide"
            onClick={() => setOpen(true)}
          >
            Iniciar Conversa <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t-2 border-[#00CFAF] bg-[#0A0A0A] px-6 py-10 text-white text-center">
        <div className="mx-auto max-w-7xl">
          <div className="text-2xl">Cleiton Avi</div>
          <p className="mt-1 text-sm/relaxed opacity-80">Designer de Marcas • Desde 2012</p>
          <p className="mt-1 text-xs opacity-70">© {new Date().getFullYear()} Cleiton Avi. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* FORMULÁRIO + OVERLAY COM BLUR/DARK */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><span /></DialogTrigger>

        {/* Overlay personalizado */}
        <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0A0A0A] text-white sm:max-w-lg">
          <DialogHeader>
            <div className="mx-auto mb-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wide text-white/70">
              Desde 2012 Criando Marcas Que Performam
            </div>
            <DialogTitle className="text-2xl text-white text-center capitalize">Agendar Conversa Inicial</DialogTitle>
            <p className="mt-1 text-sm text-white/70 text-center">
              Primeiro, me conte rapidamente sobre você e sua marca.
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nome*</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#00CFAF]" />
              </div>
              <div>
                <Label htmlFor="email">E-mail*</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#00CFAF]" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone / WhatsApp*</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#00CFAF]" />
              </div>
              <div>
                <Label htmlFor="company">Empresa / Projeto*</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#00CFAF]" />
              </div>
            </div>

            <div>
              <Label>Qual pacote te interessa?</Label>
              <RadioGroup value={form.pack} onValueChange={(v) => setForm({ ...form, pack: v })} className="mt-2 grid gap-2">
                {['Essencial', 'Estratégico', 'Premium', 'Ainda não sei'].map((opt) => (
                  <div key={opt} className="flex items-center gap-2 rounded-md border border-white/15 p-3">
                    <RadioGroupItem value={opt} id={`pack-${opt}`} className="text-[#00CFAF]" />
                    <Label htmlFor={`pack-${opt}`} className="cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="timeline">Quando você quer lançar a nova marca?*</Label>
              <select
                id="timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="mt-2 w-full rounded-md border border-white/15 bg-[#111111] p-3 text-sm outline-none focus:border-[#00CFAF]"
              >
                <option value="">Escolha…</option>
                <option value="ASAP">Imediatamente (ASAP)</option>
                <option value="1–2 semanas">1–2 semanas</option>
                <option value="Próximo mês">Próximo mês</option>
                <option value="2–3 meses">2–3 meses</option>
                <option value="Planejando">Ainda planejando</option>
              </select>
            </div>

            <div>
              <Label>Orçamento disponível*</Label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {['Até R$ 7.000', 'R$ 7–12 mil', 'R$ 12–20 mil', 'Acima de R$ 20 mil'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    type="button"
                    className={`rounded-md border p-3 text-sm transition ${form.budget === b ? 'border-white bg-white text-black' : 'border-white/15 bg-transparent text-white hover:bg-white/5'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="vision">Qual visão você quer comunicar?*</Label>
              <Textarea
                id="vision"
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="mt-2 min-h-[120px] border-white/15 bg-transparent focus-visible:ring-[#00CFAF]"
                placeholder="Valores, público e o que te torna diferente (2–3 frases)."
              />
            </div>

            <div>
              <Label htmlFor="challenge">Maior desafio hoje <span className="text-white/50">(opcional)</span></Label>
              <Textarea
                id="challenge"
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                className="mt-2 min-h-[100px] border-white/15 bg-transparent focus-visible:ring-[#00CFAF]"
                placeholder="Ex.: não se diferencia, comunicação inconsistente, visual datado…"
              />
            </div>

            <Button size="lg" className="w-full rounded-full bg-[#00CFAF] text-black hover:bg-[#00A289] uppercase tracking-wide" onClick={submit}>
              Enviar E Agendar
            </Button>
            <p className="-mt-2 text-center text-xs text-white/60">Retorno em até 24h úteis com os próximos passos.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
