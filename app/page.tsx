'use client';

import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

/* ícones svg locais */
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };
function svgProps(props: IconProps) {
  return { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", ...props } as const;
}
export function CheckIcon(props: IconProps) { return (<svg {...svgProps(props)}><path d="M20 6L9 17l-5-5" /></svg>); }
export function XIcon(props: IconProps) { return (<svg {...svgProps(props)}><path d="M18 6L6 18M6 6l12 12" /></svg>); }
export function ArrowRightIcon(props: IconProps) { return (<svg {...svgProps(props)}><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>); }
export function ClockIcon(props: IconProps) { return (<svg {...svgProps(props)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>); }
export function TargetIcon(props: IconProps) { return (<svg {...svgProps(props)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>); }
export function ZapIcon(props: IconProps) { return (<svg {...svgProps(props)}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>); }
export function AwardIcon(props: IconProps) { return (<svg {...svgProps(props)}><circle cx="12" cy="8" r="5" /><path d="M8.5 13L7 22l5-3 5 3-1.5-9" /></svg>); }

/* imagens do carrossel (coloque esses arquivos em /public/projetos/) */
const projectImagesTop = ["/projetos/cima-1.jpg","/projetos/cima-2.jpg","/projetos/cima-3.jpg","/projetos/cima-4.jpg","/projetos/cima-5.jpg"];
const projectImagesBottom = ["/projetos/baixo-1.jpg","/projetos/baixo-2.jpg","/projetos/baixo-3.jpg","/projetos/baixo-4.jpg","/projetos/baixo-5.jpg"];

/* pacotes */
const packages = [
  { name: "essencial",   price: "a partir de R$ 5.000", duration: "até 3 semanas",
    desc: "o essencial bem feito: logo completo, paleta, tipografia e arquivos prontos para usar.",
    features: ["briefing guiado e direcionamento","2–3 rotas de logo com narrativa","refinos até fechar a melhor versão","paleta, tipografia e variações de uso","arquivos finais (ai, svg, png, pdf)","kit social básico (perfis e covers)"],
    notIncluded: ["manual completo","pesquisa aprofundada"], highlight: false },
  { name: "estratégico", price: "a partir de R$ 12.000", duration: "3–5 semanas",
    desc: "para quem quer posicionamento claro e um sistema visual consistente em todos os pontos de contato.",
    features: ["tudo do essencial","pesquisa de mercado & concorrência","posicionamento e pilares de marca","sistema visual completo (cores, grids, patterns)","apresentação da marca (deck)","templates editáveis (figma/canva)","manual de uso (guia resumido)"],
    notIncluded: [], highlight: true },
  { name: "premium",     price: "sob consulta", duration: "5–8 semanas",
    desc: "branding de ponta a ponta: pesquisa profunda, arquitetura de marca e assets especiais.",
    features: ["tudo do estratégico","workshop de descoberta","pesquisa com audiência","arquitetura de marca e sub-marcas","motion (logo animado) e mockups premium","brand book completo","acompanhamento na implementação"],
    notIncluded: [], highlight: false },
];

/* tabela comparativa */
const compareRows = [
  { label: "preço",        agencies: "$5k - 30k+", freelancers: "variável",        cleiton: "fixo & transparente" },
  { label: "prazo",        agencies: "3–9 meses",   freelancers: "incertos",        cleiton: "2–6 semanas" },
  { label: "revisões",     agencies: "limitadas",   freelancers: "cobradas à parte", cleiton: "ilimitadas*" },
  { label: "designer",     agencies: "júnior/mid",  freelancers: "variável",        cleiton: "sênior dedicado" },
  { label: "processo",     agencies: "complexo",    freelancers: "informal",        cleiton: "estruturado & colaborativo" },
  { label: "comunicação",  agencies: "reuniões intermináveis", freelancers: "irregular", cleiton: "direta & consultiva" },
];

/* testes dev (não rodam em produção) */
function runDevTests() {
  try {
    const mustHave = ["essencial", "estratégico", "premium"];
    if (!mustHave.every((n) => packages.some((p) => p.name === n))) throw new Error("pacotes obrigatórios ausentes");
    const icons = [CheckIcon,XIcon,ArrowRightIcon,ClockIcon,TargetIcon,ZapIcon,AwardIcon];
    if (!icons.every((C) => React.isValidElement(<C />))) throw new Error("ícones locais inválidos");
    const prazoRow = compareRows.find((r) => /prazo/i.test(r.label));
    if (!prazoRow || !/2–6/.test(prazoRow.cleiton)) throw new Error("linha de prazo inválida");
    console.debug("[lp tests] ok");
  } catch (e) { console.error("[lp tests] falha:", e); }
}

/* tipos */
type FormState = { name: string; email: string; phone: string; company: string; pack: string; timeline: string; budget: string; vision: string; challenge: string; };

/* carrossel — duas linhas, loop infinito, drag acelera */
function CarouselProjetos() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const topRef = React.useRef<HTMLDivElement | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const posTop = React.useRef(0);
  const posBottom = React.useRef(0);
  const baseTop = React.useRef(-60);    // esquerda
  const baseBottom = React.useRef(-60); // esquerda (fila invertida pra parecer direita)
  const dragVel = React.useRef(0);
  const lastTime = React.useRef<number | null>(null);

  const loopWTopRef = React.useRef(0);
  const loopWBotRef = React.useRef(0);

  const measureLoopWidth = React.useCallback((track: HTMLDivElement, count: number) => {
    const first = track.querySelector<HTMLDivElement>(':scope > div');
    const itemW = first?.getBoundingClientRect().width ?? 320;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || '0') || 24;
    return count * itemW + (count - 1) * gap;
  }, []);

  React.useLayoutEffect(() => {
    if (topRef.current) loopWTopRef.current = measureLoopWidth(topRef.current, projectImagesTop.length);
    if (bottomRef.current) loopWBotRef.current = measureLoopWidth(bottomRef.current, projectImagesBottom.length);
  }, [measureLoopWidth]);

  React.useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (lastTime.current == null) lastTime.current = t;
      const dt = (t - lastTime.current) / 1000; lastTime.current = t;

      posTop.current    += (baseTop.current + dragVel.current) * dt;
      posBottom.current += (baseBottom.current + dragVel.current) * dt;

      const wrapNeg = (pos: number, w: number) => (pos <= -w ? pos + w : pos > 0 ? pos - w : pos);
      posTop.current    = wrapNeg(posTop.current,    loopWTopRef.current || 1);
      posBottom.current = wrapNeg(posBottom.current, loopWBotRef.current || 1);

      if (topRef.current)    topRef.current.style.transform = `translateX(${posTop.current}px)`;
      if (bottomRef.current) bottomRef.current.style.transform = `translateX(${posBottom.current}px)`;

      dragVel.current *= 0.92; if (Math.abs(dragVel.current) < 0.05) dragVel.current = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const state = React.useRef({ dragging: false, lastX: 0, lastT: 0 });
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = wrapRef.current; if (!el) return;
    el.setPointerCapture(e.pointerId); state.current.dragging = true;
    state.current.lastX = e.clientX; state.current.lastT = performance.now();
    el.classList.add("cursor-grabbing");
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!state.current.dragging) return;
    const now = performance.now(); const dx = e.clientX - state.current.lastX; const dt = (now - state.current.lastT)/1000;
    state.current.lastX = e.clientX; state.current.lastT = now;
    const boost = Math.max(-600, Math.min(600, dx / dt));
    dragVel.current = dragVel.current * 0.6 + boost * 0.4;
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = wrapRef.current; if (!el) return;
    state.current.dragging = false; el.releasePointerCapture(e.pointerId);
    el.classList.remove("cursor-grabbing");
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
      {/* topo — anda ← */}
      <div className="relative overflow-hidden rounded-2xl bg-card">
        <div ref={topRef} className="flex gap-6 will-change-transform py-4 px-2" style={{ transform: "translateX(0)" }}>
          {[...projectImagesTop, ...projectImagesTop].map((src, i) => (
            <div key={`t-${i}`} className="relative h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-background">
              <Image src={src} alt={`projeto ${i + 1}`} fill className="object-cover transition-transform duration-300 hover:scale-[1.03]" sizes="(max-width: 768px) 75vw, 320px" priority={i < 2} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent" />
      </div>

      {/* base — visualmente → (fila invertida; movimento real ←) */}
      <div className="relative overflow-hidden rounded-2xl bg-card">
        <div ref={bottomRef} className="flex flex-row-reverse gap-6 will-change-transform py-4 px-2" style={{ transform: "translateX(0)" }}>
          {[...projectImagesBottom, ...projectImagesBottom].map((src, i) => (
            <div key={`b-${i}`} className="relative h-56 w-[320px] shrink-0 overflow-hidden rounded-xl bg-background">
              <Image src={src} alt={`projeto ${i + 1}`} fill className="object-cover transition-transform duration-300 hover:scale-[1.03]" sizes="(max-width: 768px) 75vw, 320px" priority={i < 2} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent" />
      </div>
    </div>
  );
}

/* página */
export default function CleitonAviLanding() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>({ name:"", email:"", phone:"", company:"", pack:"", timeline:"", budget:"", vision:"", challenge:"" });

  const submit = () => {
    const required = ["name","email","phone","company","pack","timeline","budget","vision"] as const;
    const missing = (required as Array<keyof FormState>).filter((k) => !form[k]);
    if (missing.length) { alert("preencha os campos obrigatórios."); return; }
    console.log("form lp:", form);
    alert("recebi suas infos. retorno em até 24h úteis com próximos passos.");
    setOpen(false);
    setForm({ name:"", email:"", phone:"", company:"", pack:"", timeline:"", budget:"", vision:"", challenge:"" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30">
      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_40px_-10px] shadow-primary/40">
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden>
                <circle cx="20" cy="20" r="18" stroke="currentColor" className="opacity-25" />
                <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="currentColor" className="opacity-20" />
                <path d="M20 8L32 20L20 32L8 20L20 8Z" stroke="currentColor" className="opacity-40" />
              </svg>
            </div>
            <span className="text-lg font-medium tracking-tight">cleiton avi</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#processo" className="text-sm text-muted-foreground transition hover:text-foreground">processo</a>
            <a href="#projetos" className="text-sm text-muted-foreground transition hover:text-foreground">projetos</a>
            <a href="#pacotes" className="text-sm text-muted-foreground transition hover:text-foreground">pacotes</a>
            <a href="#comparativo" className="text-sm text-muted-foreground transition hover:text-foreground">comparativo</a>
          </div>
          <Button size="lg" onClick={() => setOpen(true)} className="rounded-md bg-foreground px-5 text-background hover:opacity-90">
            começar projeto <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* hero */}
      <section className="px-6 pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">
            <span>desde 2012 criando marcas que performam</span>
          </div>
          <h1 className="text-balance text-5xl leading-none tracking-tight sm:text-7xl md:text-8xl">
            design de marca
            <span className="block">sem surpresas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl b2 text-muted-foreground">
            pacotes claros, processo transparente e entrega garantida. sua identidade profissional pronta para elevar percepção, diferenciação e confiança.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="rounded-md bg-foreground px-6 text-background hover:opacity-90" onClick={() => setOpen(true)}>
              ver pacotes e iniciar <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-muted bg-transparent text-foreground hover:border-primary hover:text-primary hover:bg-card" onClick={() => document.getElementById("processo")?.scrollIntoView({ behavior: "smooth" })}>
              como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* benefícios */}
      <section className="border-y bg-card px-6 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: <ZapIcon className="h-8 w-8 text-primary" />, title: "velocidade real", desc: "de 2 a 8 semanas conforme o pacote. sem novela, sem atrasos." },
            { icon: <TargetIcon className="h-8 w-8 text-primary" />, title: "100% estratégico", desc: "cada decisão visual conecta com objetivo de negócio." },
            { icon: <AwardIcon className="h-8 w-8 text-primary" />, title: "qualidade sênior", desc: "desde 2012 em design. zero projetos reprovados." },
          ].map((b, i) => (
            <Card key={i} className="bg-background">
              <CardContent className="space-y-3 p-6">
                {b.icon}
                <h3 className="text-xl">{b.title}</h3>
                <p className="b3 text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* projetos */}
      <section id="projetos" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 h2">trabalhos selecionados</h2>
          <CarouselProjetos />
        </div>
      </section>

      {/* pacotes */}
      <section id="pacotes" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="h2">escolha o formato ideal</h2>
            <p className="mx-auto mt-3 max-w-2xl b3 text-muted-foreground">todos os pacotes seguem meu processo sênior, com alinhamento claro e garantia de satisfação.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative bg-card ${pkg.highlight ? "outline outline-1 outline-primary/60" : ""}`}>
                {pkg.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow-lg">mais escolhido</div>}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="mt-1 text-3xl">{pkg.price}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <ClockIcon className="h-3.5 w-3.5" /> {pkg.duration}
                  </div>
                  <p className="mt-3 b3 text-muted-foreground">{pkg.desc}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (<li key={f} className="flex gap-2 b3"><CheckIcon className="mt-0.5 h-4 w-4 text-primary" />{f}</li>))}
                  </ul>
                  {pkg.notIncluded.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      {pkg.notIncluded.map((n) => (<div key={n} className="flex gap-2 b3 text-muted-foreground"><XIcon className="mt-0.5 h-4 w-4" />{n}</div>))}
                    </div>
                  )}
                  <Button onClick={() => { setOpen(true); setForm((prev) => ({ ...prev, pack: pkg.name })); }} className={`mt-4 w-full ${pkg.highlight ? "bg-foreground text-background hover:opacity-90" : "bg-transparent text-foreground hover:bg-card border"}`}>
                    escolher {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* comparativo */}
      <section id="comparativo" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="h2">por que escolher pacotes fixos?</h2>
            <p className="mt-2 b3 text-muted-foreground">compare e veja a diferença</p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-card shadow-card">
            <table className="w-full border-collapse b3">
              <thead>
                <tr className="bg-accent text-foreground/90">
                  <th className="w-1/4 px-5 py-4 text-left font-medium">&nbsp;</th>
                  <th className="w-1/4 px-5 py-4 text-left font-medium text-muted-foreground">agências tradicionais</th>
                  <th className="w-1/4 px-5 py-4 text-left font-medium text-muted-foreground">freelancers</th>
                  <th className="w-1/4 px-5 py-4 text-left font-semibold bg-primary text-primary-foreground">cleiton avi</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, idx) => (
                  <tr key={r.label} className={idx % 2 === 0 ? "bg-background" : "bg-card"}>
                    <td className="px-5 py-4">{r.label}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.agencies}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.freelancers}</td>
                    <td className="px-5 py-4 font-medium text-primary">{r.cleiton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t px-5 py-3 text-center text-xs text-muted-foreground">*revisões ilimitadas no conceito escolhido durante a fase de desenvolvimento.</div>
          </div>
        </div>
      </section>

      {/* processo */}
      <section id="processo" className="border-y bg-card px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="h2">como funciona o processo</h2>
            <p className="mx-auto mt-3 max-w-2xl b3 text-muted-foreground">transparente, colaborativo e focado em resultado.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { step: "01", title: "briefing estratégico", dur: "1–2 dias", desc: "mergulho nos objetivos, público, contexto e restrições. é consultivo, não só um formulário." },
              { step: "02", title: "pesquisa e estratégia", dur: "3–5 dias", desc: "leitura de mercado e concorrência. definição de posicionamento antes de mover um pixel." },
              { step: "03", title: "rotas iniciais", dur: "5–7 dias", desc: "apresento 2–3 rotas com narrativas visuais distintas. escolhemos a direção." },
              { step: "04", title: "refino", dur: "5–10 dias", desc: "evoluímos juntos até a melhor versão. participação ativa em cada decisão." },
              { step: "05", title: "entrega e onboard", dur: "2–3 dias", desc: "arquivos, diretrizes e materiais organizados. explico como aplicar e manter a consistência." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 rounded-xl bg-background p-6">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">{s.step}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl">{s.title}</h3>
                    <span className="rounded-full border px-3 py-1 text-[11px] text-muted-foreground">{s.dur}</span>
                  </div>
                  <p className="mt-2 b3 text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta final */}
      <section className="relative px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(var(--card))_100%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-balance h3">pronto para elevar sua marca?</h3>
          <p className="mx-auto mt-3 max-w-2xl b3 text-muted-foreground">envie suas informações e eu retorno em até 24h úteis com os próximos passos.</p>
          <Button size="lg" className="mt-6 rounded-md bg-foreground px-6 text-background hover:opacity-90" onClick={() => setOpen(true)}>
            iniciar conversa <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* rodapé */}
      <footer className="border-t bg-background px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-2xl">cleiton avi</div>
          <p className="mt-1 b3 text-muted-foreground">designer de marcas • desde 2012</p>
          <p className="mt-1 text-xs text-muted-foreground">© {new Date().getFullYear()} cleiton avi. todos os direitos reservados.</p>
        </div>
      </footer>

      {/* formulário */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><span /></DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-card text-foreground sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">agendar conversa inicial</DialogTitle>
            <p className="mt-1 b3 text-muted-foreground">primeiro, me conte rapidamente sobre você e sua marca.</p>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div><Label htmlFor="name">nome*</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background focus-visible:ring-primary" /></div>
              <div><Label htmlFor="email">e-mail*</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background focus-visible:ring-primary" /></div>
              <div><Label htmlFor="phone">telefone / whatsapp*</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background focus-visible:ring-primary" /></div>
              <div><Label htmlFor="company">empresa / projeto*</Label><Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-background focus-visible:ring-primary" /></div>
            </div>

            <div>
              <Label>qual pacote te interessa?</Label>
              <RadioGroup value={form.pack} onValueChange={(v) => setForm({ ...form, pack: v })} className="mt-2 grid gap-2">
                {["essencial","estratégico","premium","ainda não sei"].map((opt) => (
                  <div key={opt} className="flex items-center gap-2 rounded-md border p-3">
                    <RadioGroupItem value={opt} id={`pack-${opt}`} className="text-primary" />
                    <Label htmlFor={`pack-${opt}`} className="cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="timeline">quando você quer lançar a nova marca?*</Label>
              <select id="timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="mt-2 w-full rounded-md border bg-background p-3 b3 outline-none focus:border-primary">
                <option value="">escolha…</option>
                <option value="ASAP">imediatamente (asap)</option>
                <option value="1–2 semanas">1–2 semanas</option>
                <option value="próximo mês">próximo mês</option>
                <option value="2–3 meses">2–3 meses</option>
                <option value="planejando">ainda planejando</option>
              </select>
            </div>

            <div>
              <Label>orçamento disponível*</Label>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["até R$ 7.000","R$ 7–12 mil","R$ 12–20 mil","acima de R$ 20 mil"].map((b) => (
                  <button key={b} onClick={() => setForm({ ...form, budget: b })} type="button"
                    className={`rounded-md border p-3 b3 transition ${form.budget === b ? "bg-foreground text-background" : "bg-transparent hover:bg-card"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="vision">qual visão você quer comunicar?*</Label>
              <Textarea id="vision" value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} className="mt-2 min-h-[120px] bg-background focus-visible:ring-primary" placeholder="valores, público e o que te torna diferente (2–3 frases)." />
            </div>

            <div>
              <Label htmlFor="challenge">maior desafio hoje <span className="text-muted-foreground">(opcional)</span></Label>
              <Textarea id="challenge" value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} className="mt-2 min-h-[100px] bg-background focus-visible:ring-primary" placeholder="ex.: não se diferencia, comunicação inconsistente, visual datado…" />
            </div>

            <Button size="lg" className="w-full rounded-full bg-foreground text-background hover:opacity-90" onClick={submit}>
              enviar e agendar
            </Button>
            <p className="-mt-2 text-center text-xs text-muted-foreground">retorno em até 24h úteis com os próximos passos.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* dev only */
function isDevEnv() {
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV && process.env.NODE_ENV !== "production") return true;
  if (typeof location !== "undefined" && /localhost|127\.0\.0\.1/.test(location.hostname)) return true;
  return false;
}
if (typeof window !== "undefined" && isDevEnv()) runDevTests();
