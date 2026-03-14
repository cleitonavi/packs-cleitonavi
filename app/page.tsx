'use client';

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
   Scroll-reveal hook
==================================*/
function useInView(threshold = 0.15) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
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
  'https://cleitonavi.com/wp-content/uploads/2025/09/thumb_preto_no_branco.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/12/Thumbnail-Case-FTR.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/07/thumb_yoka_club-1.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_rocketseat.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/projeto_thumbnail.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_xtent_group.webp',
];
const projectImagesBottom = [
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb-medsimple_1.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_capita_victor_g_lima.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_ia_para_devs.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_nlw_esports.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_csv-2.webp',
  'https://cleitonavi.com/wp-content/uploads/2024/03/thumb_smtc.webp',
];

const packages = [
  {
    name: 'Essencial',
    price: 'A partir de R$ 5.000',
    duration: 'Até 3 semanas',
    desc: 'A maestria da síntese: identidade forte, paleta, tipografia e os fundamentos visuais para você dominar o seu mercado.',
    features: [
      'Imersão e diagnóstico direto ao ponto',
      '2–3 rotas visuais com argumento e alma',
      'Lapidação até a versão definitiva',
      'Sistema de cores, tipografia e grid de uso',
      'Arquivos abertos e finais (AI, SVG, PNG, PDF)',
      'Kit essencial para redes sociais',
    ],
    notIncluded: [],
    highlight: false,
  },
  {
    name: 'Estratégico',
    price: 'A partir de R$ 12.000',
    duration: '3–5 semanas',
    desc: 'Para líderes que buscam um posicionamento inabalável e um sistema visual à prova do tempo.',
    features: [
      'Todo o escopo do pacote Essencial',
      'Mapeamento estratégico de mercado',
      'Definição de posicionamento e DNA da marca',
      'Ecossistema visual profundo (patterns, apoio)',
      'Deck de defesa da estratégia da marca',
      'Templates editáveis (Figma/Canva)',
      'Brandbook enxuto e prático',
    ],
    notIncluded: [],
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'Sob consulta',
    duration: '5–8 semanas',
    desc: 'A construção de um império: estratégia de ponta a ponta, pesquisa profunda e entregáveis de alto calibre.',
    features: [
      'Todo o arsenal do pacote Estratégico',
      'Workshop imersivo de descoberta',
      'Leitura de campo com sua audiência',
      'Arquitetura de marca e submarcas',
      'Motion design (logo animado) e mockups premium',
      'Brandbook completo',
      'Consultoria sênior na fase de implementação',
    ],
    notIncluded: [],
    highlight: false,
  },
];

const compareRows = [
  { label: 'Preço', agencies: '$5k - 30k+', freelancers: 'Variável', cleiton: 'Fixo e transparente' },
  { label: 'Prazo', agencies: '3–9 meses', freelancers: 'Variável', cleiton: '2–6 semanas' },
  { label: 'Revisões', agencies: 'Limitadas', freelancers: 'Variáveis', cleiton: 'Ilimitadas na fase de desenvolvimento' },
  { label: 'Quem executa', agencies: 'Equipe mista', freelancers: 'Profissional único', cleiton: 'Sênior dedicado' },
  { label: 'Processo', agencies: 'Múltiplas etapas', freelancers: 'Adaptável', cleiton: 'Estruturado e colaborativo' },
  { label: 'Comunicação', agencies: 'Via atendimento', freelancers: 'Direta', cleiton: 'Direta e consultiva' },
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
  const baseTop = React.useRef(-38);
  const baseBottom = React.useRef(38);
  const dragVel = React.useRef(0);
  const lastTime = React.useRef<number | null>(null);

  const ITEM_W = 320;
  const GAP = 24;
  const TOP_COUNT = projectImagesTop.length;
  const BOT_COUNT = projectImagesBottom.length;
  const loopWTop = TOP_COUNT * ITEM_W + (TOP_COUNT - 1) * GAP;
  const loopWBot = BOT_COUNT * ITEM_W + (BOT_COUNT - 1) * GAP;

  React.useEffect(() => {
    posBottom.current = -loopWBot;
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
      className="space-y-4 select-none cursor-grab"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Cima */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]">
        <div ref={topRef} className="flex gap-6 will-change-transform py-4 px-2" style={{ transform: 'translateX(0)' }}>
          {[...projectImagesTop, ...projectImagesTop].map((src, i) => (
            <div key={`t-${i}`} className="h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Projeto ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
      </div>

      {/* Baixo */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A]">
        <div
          ref={bottomRef}
          className="flex gap-6 will-change-transform py-4 px-2"
          style={{ transform: 'translateX(0)' }}
        >
          {[...projectImagesBottom, ...projectImagesBottom].map((src, i) => (
            <div key={`b-${i}`} className="h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-[#111]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Projeto ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                loading="lazy"
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
  description: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
const EMPTY_FORM: FormState = { name: '', email: '', phone: '', company: '', pack: '', timeline: '', budget: '', description: '' };

export default function CleitonAviLanding() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const clearErr = (f: keyof FormState) => setErrors(prev => { const n = { ...prev }; delete n[f]; return n; });

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Informe seu nome.';
    if (!form.email.trim()) e.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido.';
    if (!form.phone.trim()) e.phone = 'Informe seu telefone ou WhatsApp.';
    if (!form.company.trim()) e.company = 'Informe a empresa ou projeto.';
    if (!form.pack) e.pack = 'Escolha um pacote para continuar.';
    if (!form.timeline) e.timeline = 'Selecione um prazo.';
    if (!form.budget) e.budget = 'Selecione uma faixa de investimento.';
    if (!form.description.trim()) e.description = 'Descreva seu projeto e objetivos.';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    console.log('Form LP Cleiton Avi:', form);
    setSubmitted(true);
  };

  const formatPhone = (value: string) => {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  function sentenceCase(input: string) {
    if (!input) return '';
    const s = input.trim();
    if (/^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(s)) {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    return s;
  }

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
            <a href="#processo" className="text-sm text-white/60 transition-colors duration-200 hover:text-white">Processo</a>
            <a href="#projetos" className="text-sm text-white/60 transition-colors duration-200 hover:text-white">Projetos</a>
            <a href="#pacotes" className="text-sm text-white/60 transition-colors duration-200 hover:text-white">Pacotes</a>
            <a href="#comparativo" className="text-sm text-white/60 transition-colors duration-200 hover:text-white">Comparativo</a>
          </div>
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="rounded-md bg-[#00CFAF] px-5 text-black hover:bg-[#00A289] uppercase tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_-4px] hover:shadow-[#00CFAF]/50"
          >
            Começar Projeto <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 pt-40 pb-28 md:pb-40 text-center overflow-hidden">
        {/* Glow radial de fundo */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-[#00CFAF]/8 blur-[120px]" />
          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-[#00CFAF]/5 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00CFAF]" />
              Desde 2012 construindo legado
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-balance text-5xl leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
              Design de marca
              <span className="block">com lastro</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-white/60 leading-relaxed">
              Desde 2012 construindo legado. Um processo direto e transparente para líderes que exigem
              uma marca à altura da sua entrega. Criada com intenção, feita para durar.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-md bg-[#00CFAF] px-6 text-black hover:bg-[#00A289] uppercase tracking-wide transition-all duration-200 hover:shadow-[0_0_24px_-4px] hover:shadow-[#00CFAF]/50 w-full sm:w-auto"
                onClick={() => setOpen(true)}
              >
                Ver Pacotes & Iniciar <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-md border-white/20 bg-transparent px-6 text-white hover:border-[#00CFAF]/60 hover:text-[#00CFAF] hover:bg-white/5 uppercase tracking-wide transition-all duration-200 w-full sm:w-auto"
                onClick={() => document.getElementById('processo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Como funciona
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-y border-white/5 bg-[#0D0D0D] px-6 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3 text-center">
          {[
            { icon: <ZapIcon className="mx-auto h-7 w-7 text-[#00CFAF]" />, title: 'A soberania do tempo', desc: 'De 2 a 8 semanas, conforme o escopo. Entregamos clareza, previsibilidade e agilidade do início ao fim do projeto.' },
            { icon: <TargetIcon className="mx-auto h-7 w-7 text-[#00CFAF]" />, title: 'A forma segue a alma', desc: 'Cada decisão visual nasce da sua essência e resolve um problema real do seu negócio. Traduzimos a sua verdade em uma marca inesquecível.' },
            { icon: <AwardIcon className="mx-auto h-7 w-7 text-[#00CFAF]" />, title: 'Maestria e síntese', desc: 'Desde 2012 na trincheira. Você investe na precisão de um designer sênior dedicado integralmente ao sucesso do seu projeto.' },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 100}>
              <Card className="border-white/8 bg-[#0A0A0A] hover:border-[#00CFAF]/25 transition-all duration-300 hover:shadow-[0_0_40px_-12px] hover:shadow-[#00CFAF]/20 h-full">
                <CardContent className="space-y-3 p-8">
                  <div className="mb-1">{b.icon}</div>
                  <h3 className="text-lg font-medium text-white">{b.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{b.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="px-6 py-28 text-center">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-3 text-4xl tracking-tight text-white sm:text-5xl">Trabalhos selecionados</h2>
            <p className="mb-12 text-sm text-white/50">Arraste para explorar</p>
          </Reveal>
          <CarouselProjetos />
        </div>
      </section>

      {/* PACOTES */}
      <section id="pacotes" className="px-6 py-28 text-center bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl tracking-tight text-white sm:text-5xl">O ponto de partida do seu legado</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 leading-relaxed">
                Todos os projetos têm a mesma profundidade estratégica. O que muda é o tamanho do ecossistema visual que vamos construir.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 text-left">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <Card className={`relative border h-full flex flex-col transition-all duration-300 ${pkg.highlight ? 'border-[#00CFAF]/50 hover:border-[#00CFAF]/80 hover:shadow-[0_0_50px_-12px] hover:shadow-[#00CFAF]/25' : 'border-white/8 hover:border-white/20 hover:shadow-[0_8px_40px_-12px] hover:shadow-black/60'} bg-[#0A0A0A]`}>
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00CFAF] px-3 py-1 text-[11px] font-medium text-black shadow-lg">
                      Mais escolhido
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                    <div className="mt-1 text-3xl font-light text-white">{pkg.price}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                      <ClockIcon className="h-3.5 w-3.5" /> {pkg.duration}
                    </div>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">{pkg.desc}</p>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1 flex flex-col">
                    <ul className="space-y-2.5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex gap-2.5 text-sm text-white/75">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#00CFAF]" />{f}
                        </li>
                      ))}
                    </ul>
                    {pkg.notIncluded.length > 0 && (
                      <div className="mt-4 border-t border-white/8 pt-4">
                        {pkg.notIncluded.map((n) => (
                          <div key={n} className="flex gap-2 text-sm text-white/35">
                            <XIcon className="mt-0.5 h-4 w-4 shrink-0" />{n}
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={() => { setOpen(true); setForm((prev) => ({ ...prev, pack: pkg.name })); }}
                      className={`mt-4 w-full uppercase tracking-wide transition-all duration-200 ${pkg.highlight ? 'bg-[#00CFAF] text-black hover:bg-[#00A289] hover:shadow-[0_0_20px_-4px] hover:shadow-[#00CFAF]/50' : 'bg-transparent text-white hover:bg-white/8 border border-white/20 hover:border-white/40'}`}
                    >
                      Escolher pacote {pkg.name}
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section id="comparativo" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-2 text-center text-4xl sm:text-5xl tracking-tight text-white">
              O jogo de longo prazo
            </h2>
            <p className="mb-12 text-center text-sm text-white/50">
              Entenda as diferenças estruturais do nosso modelo de trabalho.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0A0A0A]">
              <table className="w-full min-w-[580px] border-collapse text-[15px]">
                <thead>
                  <tr className="text-white/50 text-xs uppercase tracking-wider">
                    <th className="w-[22%] px-5 py-4 text-left font-medium bg-[#111111]">&nbsp;</th>
                    <th className="w-[26%] px-5 py-4 text-left font-medium bg-[#111111]">Agências tradicionais</th>
                    <th className="w-[26%] px-5 py-4 text-left font-medium bg-[#111111]">Freelancers independentes</th>
                    <th className="w-[26%] px-5 py-4 text-left font-semibold bg-[#111111] text-[#00CFAF]">Cleiton Avi (Sênior)</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r, idx) => {
                    const rowBg = idx % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#0D0D0D]';
                    return (
                      <tr key={r.label} className={`${rowBg} transition-colors duration-150 hover:bg-[#141414]`}>
                        <td className="px-5 py-4 font-semibold text-white/80 border-l-2 border-[#00CFAF]/40">
                          {sentenceCase(r.label)}
                        </td>
                        <td className="px-5 py-4 text-white/40">{sentenceCase(String(r.agencies))}</td>
                        <td className="px-5 py-4 text-white/40">{sentenceCase(String(r.freelancers))}</td>
                        <td className="px-5 py-4 font-medium text-[#00CFAF]">{sentenceCase(String(r.cleiton))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="border-t border-white/8 px-5 py-3 text-center text-xs text-white/30">
                *Revisões ilimitadas no conceito escolhido durante a fase de desenvolvimento.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="border-y border-white/5 bg-[#0D0D0D] px-6 py-28 text-center">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl tracking-tight text-white sm:text-5xl">Um processo transparente</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 leading-relaxed">
                Um método visceral, focado em extrair a sua verdade e transformá-la em design com lastro.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 text-left max-w-3xl mx-auto">
            {[
              { step: '01', title: 'A escavação', dur: '1–2 dias', desc: 'Mergulho profundo nos objetivos, público, contexto e diferenciais do seu negócio.' },
              { step: '02', title: 'O diagnóstico', dur: '3–5 dias', desc: 'Leitura de mercado e definição clara do seu posicionamento estratégico.' },
              { step: '03', title: 'A forma ganha alma', dur: '5–7 dias', desc: 'Apresentação de 2 a 3 rotas visuais com argumentos e narrativas distintas.' },
              { step: '04', title: 'A lapidação', dur: '5–10 dias', desc: 'Refinamento colaborativo e focado até alcançarmos a versão definitiva.' },
              { step: '05', title: 'O legado em suas mãos', dur: '2–3 dias', desc: 'Entrega de arquivos organizados, diretrizes e materiais prontos para o mercado.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="flex items-start gap-5 rounded-xl border border-white/8 bg-[#0A0A0A] p-6 hover:border-white/15 transition-all duration-300 group">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#00CFAF]/10 border border-[#00CFAF]/30 text-[#00CFAF] text-sm font-medium group-hover:bg-[#00CFAF] group-hover:text-black transition-all duration-300">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-medium text-white">{s.title}</h3>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50 shrink-0">{s.dur}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative px-6 py-32 text-center overflow-hidden">
        {/* Fundo com gradiente + glow */}
        <div className="absolute inset-0 -z-10 bg-[#0A0A0A]" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#00CFAF]/6 blur-[100px]" />
        </div>
        {/* Linha decorativa superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64 bg-gradient-to-r from-transparent via-[#00CFAF]/40 to-transparent" />

        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#00CFAF]/20 bg-[#00CFAF]/5 px-4 py-2 text-xs uppercase tracking-widest text-[#00CFAF]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00CFAF]" />
              Vamos trabalhar juntos
            </div>
            <h3 className="text-balance text-4xl tracking-tight text-white sm:text-5xl">
              Sua marca está pronta para durar?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 leading-relaxed">
              Me envie as informações do seu negócio e eu retorno em até 24h úteis com o nosso plano de ação.
            </p>
            <Button
              size="lg"
              className="mt-8 rounded-md bg-[#00CFAF] px-8 text-black hover:bg-[#00A289] uppercase tracking-wide transition-all duration-200 hover:shadow-[0_0_32px_-4px] hover:shadow-[#00CFAF]/50"
              onClick={() => setOpen(true)}
            >
              Iniciar conversa <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-white/8 bg-[#0A0A0A] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#00CFAF] to-[#00A289]">
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden>
                <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="#fff" fillOpacity=".9" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium">Cleiton Avi</div>
              <div className="text-xs text-white/40">Build to last</div>
              <div className="text-xs text-white/30">Estratégia · Design · Legado</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {['Processo', 'Projetos', 'Pacotes', 'Comparativo'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Copy */}
          <div className="text-right">
            <p className="text-xs text-white/30">© 2026 Cleiton Avi | Brand designer</p>
            <p className="text-xs text-white/20 mt-0.5">Rio do Sul, SC Brazil</p>
          </div>
        </div>
      </footer>

      {/* FORMULÁRIO */}
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setSubmitted(false); setErrors({}); } }}>
        <DialogTrigger asChild><span /></DialogTrigger>
        <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0A0A0A] text-white sm:max-w-lg">

          {submitted ? (
            /* ── SUCESSO ── */
            <div className="flex flex-col items-center gap-6 py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#00CFAF]/10 border border-[#00CFAF]/30">
                <CheckIcon className="h-8 w-8 text-[#00CFAF]" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-medium text-white">Mensagem recebida.</DialogTitle>
                <p className="text-sm text-white/55 mx-auto max-w-[280px] leading-relaxed">
                  Vou analisar as informações do seu projeto e retorno em até 24h úteis com o plano de ação.
                </p>
              </div>
              <div className="w-full border-t border-white/8 pt-6 space-y-3">
                <p className="text-xs text-white/35">Enquanto isso, conheça o processo de trabalho.</p>
                <Button
                  size="lg"
                  className="w-full rounded-md border border-white/20 bg-transparent text-white hover:bg-white/5 uppercase tracking-wide"
                  onClick={() => { setOpen(false); setSubmitted(false); setTimeout(() => document.getElementById('processo')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
                >
                  Ver processo
                </Button>
                <button
                  className="w-full text-xs text-white/30 hover:text-white/60 transition-colors duration-150 py-1"
                  onClick={() => { setOpen(false); setSubmitted(false); }}
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : (
            /* ── FORMULÁRIO ── */
            <>
              <DialogHeader>
                <div className="mx-auto mb-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wide text-white/60">
                  Desde 2012 construindo legado
                </div>
                <DialogTitle className="text-2xl text-white text-center">Agendar conversa inicial</DialogTitle>
                <p className="mt-1 text-sm text-white/55 text-center">
                  Primeiro, me conte rapidamente sobre você e sua marca.
                </p>
              </DialogHeader>

              <div className="space-y-6">
                {/* Dados pessoais */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Nome*</Label>
                    <Input
                      id="name" value={form.name} autoComplete="name"
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); clearErr('name'); }}
                      className={`mt-1 bg-transparent focus-visible:ring-[#00CFAF] ${errors.name ? 'border-red-500/60 focus-visible:ring-red-500/40' : 'border-white/15'}`}
                    />
                    {errors.name && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail*</Label>
                    <Input
                      id="email" type="email" value={form.email} autoComplete="email"
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); clearErr('email'); }}
                      className={`mt-1 bg-transparent focus-visible:ring-[#00CFAF] ${errors.email ? 'border-red-500/60 focus-visible:ring-red-500/40' : 'border-white/15'}`}
                    />
                    {errors.email && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp*</Label>
                    <Input
                      id="phone" type="tel" inputMode="numeric" value={form.phone}
                      autoComplete="tel" placeholder="(47) 99999-9999"
                      onChange={(e) => { setForm({ ...form, phone: formatPhone(e.target.value) }); clearErr('phone'); }}
                      className={`mt-1 bg-transparent focus-visible:ring-[#00CFAF] ${errors.phone ? 'border-red-500/60 focus-visible:ring-red-500/40' : 'border-white/15'}`}
                    />
                    {errors.phone && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company">Nome da empresa*</Label>
                    <Input
                      id="company" value={form.company} autoComplete="organization"
                      onChange={(e) => { setForm({ ...form, company: e.target.value }); clearErr('company'); }}
                      className={`mt-1 bg-transparent focus-visible:ring-[#00CFAF] ${errors.company ? 'border-red-500/60 focus-visible:ring-red-500/40' : 'border-white/15'}`}
                    />
                    {errors.company && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.company}</p>}
                  </div>
                </div>

                {/* Pacote */}
                <div>
                  <Label>Qual pacote te interessa?*</Label>
                  {errors.pack && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.pack}</p>}
                  <RadioGroup
                    value={form.pack}
                    onValueChange={(v) => { setForm({ ...form, pack: v }); clearErr('pack'); }}
                    className="mt-2 grid gap-2"
                  >
                    {['Essencial', 'Estratégico', 'Premium', 'Ainda não sei'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => { setForm({ ...form, pack: opt }); clearErr('pack'); }}
                        className={`flex cursor-pointer items-center gap-3 rounded-md border p-3.5 transition-all duration-200 ${
                          form.pack === opt
                            ? 'border-[#00CFAF] bg-[#00CFAF]/10 shadow-[0_0_0_1px_rgba(0,207,175,0.15)]'
                            : 'border-white/12 hover:border-white/25'
                        }`}
                      >
                        <RadioGroupItem value={opt} id={`pack-${opt}`} className="shrink-0 text-[#00CFAF]" />
                        <Label
                          htmlFor={`pack-${opt}`}
                          className={`cursor-pointer text-sm leading-none ${form.pack === opt ? 'font-medium text-white' : 'text-white/65'}`}
                        >
                          {opt}
                        </Label>
                        {form.pack === opt && <CheckIcon className="ml-auto h-4 w-4 shrink-0 text-[#00CFAF]" />}
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Prazo */}
                <div>
                  <Label htmlFor="timeline">Quando você quer lançar a nova marca?*</Label>
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => { setForm({ ...form, timeline: e.target.value }); clearErr('timeline'); }}
                    className={`mt-2 w-full rounded-md border bg-[#111111] p-3 text-sm text-white outline-none transition-colors duration-150 focus:border-[#00CFAF] ${errors.timeline ? 'border-red-500/60' : 'border-white/15'}`}
                  >
                    <option value="">Escolha…</option>
                    <option value="ASAP">Imediatamente (ASAP)</option>
                    <option value="1–2 semanas">1–2 semanas</option>
                    <option value="Próximo mês">Próximo mês</option>
                    <option value="2–3 meses">2–3 meses</option>
                    <option value="Planejando">Ainda planejando</option>
                  </select>
                  {errors.timeline && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.timeline}</p>}
                </div>

                {/* Orçamento */}
                <div>
                  <Label>Faixa de investimento*</Label>
                  {errors.budget && <p className="mt-1 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.budget}</p>}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {['Até R$ 7.000', 'R$ 7–12 mil', 'R$ 12–20 mil', 'Acima de R$ 20 mil'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => { setForm({ ...form, budget: b }); clearErr('budget'); }}
                        className={`relative rounded-md border p-3 text-left text-sm font-medium transition-all duration-200 ${
                          form.budget === b
                            ? 'border-[#00CFAF] bg-[#00CFAF]/10 text-white shadow-[0_0_0_1px_rgba(0,207,175,0.15)]'
                            : 'border-white/12 bg-transparent text-white/60 hover:border-white/25 hover:text-white/85'
                        }`}
                      >
                        {b}
                        {form.budget === b && <CheckIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00CFAF]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descrição única */}
                <div>
                  <Label htmlFor="description">Conte sobre o seu projeto e objetivos*</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => { setForm({ ...form, description: e.target.value }); clearErr('description'); }}
                    className={`mt-2 min-h-[160px] bg-transparent focus-visible:ring-[#00CFAF] ${errors.description ? 'border-red-500/60 focus-visible:ring-red-500/40' : 'border-white/15'}`}
                    placeholder="Descreva o que você quer comunicar, quem é o seu público, o que te diferencia no mercado — e qual o maior desafio que quer resolver com a marca."
                  />
                  {errors.description && <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400"><XIcon className="h-3 w-3 shrink-0" />{errors.description}</p>}
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-md bg-[#00CFAF] text-black hover:bg-[#00A289] uppercase tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_-4px] hover:shadow-[#00CFAF]/40"
                  onClick={submit}
                >
                  Enviar e agendar <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
                <p className="-mt-2 text-center text-xs text-white/40">Retorno em até 24h úteis com os próximos passos.</p>
              </div>
            </>
          )}

        </DialogContent>
      </Dialog>
    </div>
  );
}
