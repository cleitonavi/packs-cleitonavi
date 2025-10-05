'use client';

import React from "react";
// Removed external UI animation & icon libs to avoid sandbox import errors.
// Replaced framer-motion with CSS hover transitions and lucide-react with local SVG icons.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

/**
 * Cleiton Avi — Landing Page (single-file)
 * Stack: React + Tailwind + shadcn/ui (no external icons/motion)
 * Notes:
 * - Visual conforme guidelines: fundo #0A0A0A, acentos teal (#2DD4BF / #14B8A6), títulos em branco.
 * - Removido framer-motion e lucide-react para compatibilidade com sandbox.
 * - Testes de dev executam apenas em ambiente de desenvolvimento (sem imports condicionais inválidos).
 */

// ----------------------------
// Local SVG Icons (lucide-like)
// ----------------------------

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

function svgProps(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  } as const;
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
export function XIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
export function ClockIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
export function TargetIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}
export function ZapIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}
export function AwardIcon(props: IconProps) {
  return (
    <svg {...svgProps(props)}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 13L7 22l5-3 5 3-1.5-9" />
    </svg>
  );
}

// --- Dados ---
const projects = [
  {
    title: "Rocketseat",
    tag: "TECH EDUCATION",
    desc: "Identidade e direções visuais para maior plataforma de educação em programação da América Latina",
    color: "#14B8A6",
  },
  {
    title: "IA Para Devs",
    tag: "ONLINE EVENT",
    desc: "Branding de evento com foco em IA para +10k devs",
    color: "#2DD4BF",
  },
  {
    title: "XTENT Group",
    tag: "CLOUD / AI / CYBER",
    desc: "Sistema visual para grupo multi‑cloud e segurança",
    color: "#22D3EE",
  },
  {
    title: "Beep e‑wallet",
    tag: "FINTECH",
    desc: "Identidade visual para app financeiro",
    color: "#67E8F9",
  },
];

const packages = [
  {
    name: "Essencial",
    price: "a partir de R$ 5.000",
    duration: "até 3 semanas",
    desc: "O essencial bem feito: logo completo, paleta, tipografia e arquivos prontos para usar.",
    features: [
      "Briefing guiado e direcionamento",
      "2–3 rotas de logo com narrativa",
      "Refinos até fechar a melhor versão",
      "Paleta, tipografia e variações de uso",
      "Arquivos finais (AI, SVG, PNG, PDF)",
      "Kit social básico (perfis e covers)",
    ],
    notIncluded: ["Manual completo", "Pesquisa aprofundada"],
    highlight: false,
  },
  {
    name: "Estratégico",
    price: "a partir de R$ 12.000",
    duration: "3–5 semanas",
    desc: "Para quem quer posicionamento claro e um sistema visual consistente em todos os pontos de contato.",
    features: [
      "Tudo do Essencial",
      "Pesquisa de mercado & concorrência",
      "Posicionamento e pilares de marca",
      "Sistema visual completo (cores, grids, patterns)",
      "Apresentação da marca (deck)",
      "Templates editáveis (Figma/Canva)",
      "Manual de uso (guia resumido)",
    ],
    notIncluded: [],
    highlight: true,
  },
  {
    name: "Premium",
    price: "sob consulta",
    duration: "5–8 semanas",
    desc: "Branding de ponta a ponta: pesquisa profunda, arquitetura de marca e assets especiais.",
    features: [
      "Tudo do Estratégico",
      "Workshop de descoberta",
      "Pesquisa com audiência",
      "Arquitetura de marca e sub‑marcas",
      "Motion (logo animado) e mockups premium",
      "Brand book completo",
      "Acompanhamento na implementação",
    ],
    notIncluded: [],
    highlight: false,
  },
];

// Tabela comparativa (Agências x Freelancers x Cleiton Avi)
const compareRows = [
  { label: "Preço", agencies: "$5k - 30k+", freelancers: "Variável", cleiton: "Fixo & transparente" },
  { label: "Prazo", agencies: "3–9 meses", freelancers: "Incertos", cleiton: "2–6 semanas" },
  { label: "Revisões", agencies: "Limitadas", freelancers: "Cobradas à parte", cleiton: "Ilimitadas*" },
  { label: "Designer", agencies: "Júnior/Mid", freelancers: "Variável", cleiton: "Sênior dedicado" },
  { label: "Processo", agencies: "Complexo", freelancers: "Informal", cleiton: "Estruturado & colaborativo" },
  { label: "Comunicação", agencies: "Reuniões intermináveis", freelancers: "Irregular", cleiton: "Direta & consultiva" },
];

// --- Pequena bateria de testes (dev only, não quebra a UI) ---
function runDevTests() {
  try {
    // Teste 1: pacotes obrigatórios presentes
    const mustHave = ["Essencial", "Estratégico", "Premium"];
    const namesOk = mustHave.every((n) => packages.some((p) => p.name === n));
    if (!namesOk) throw new Error("Pacotes obrigatórios ausentes");

    // Teste 2: garantir existência de caracteres acentuados nos dados
    const hasAccents = packages.some((p) => /[^\u0000-\u007f]/.test(Object.values(p).join(" ")));
    if (!hasAccents) throw new Error("Dados sem caracteres acentuados — verifique encoding/escapes");

    // Teste 3: ícones locais definidos (existem e são funções)
    const iconFns = [CheckIcon, XIcon, ArrowRightIcon, ClockIcon, TargetIcon, ZapIcon, AwardIcon];
    const iconsOk = iconFns.every((fn) => typeof fn === "function");
    if (!iconsOk) throw new Error("Ícones locais não definidos corretamente");

    // Teste 4: existe ao menos 4 projetos para slider
    if (!Array.isArray(projects) || projects.length < 4) throw new Error("Poucos projetos definidos");

    // Teste 5: cada ícone gera um ReactElement válido
    const elOk = iconFns.every((C) => React.isValidElement(<C />));
    if (!elOk) throw new Error("Algum ícone não renderiza como React element");

    // Teste 6: somente um pacote destacado no máximo
    const highlightCount = packages.filter((p) => p.highlight).length;
    if (highlightCount > 1) throw new Error("Mais de um pacote com highlight");

    // Testes novos (comparativo)
    // T7: existe tabela com 6+ linhas
    if (!Array.isArray(compareRows) || compareRows.length < 6) throw new Error("Tabela comparativa incompleta");
    // T8: a coluna Cleiton deve conter valores não vazios e o prazo conter '2–6'
    const allCleitonOk = compareRows.every((r) => typeof r.cleiton === "string" && r.cleiton.length > 0);
    if (!allCleitonOk) throw new Error("Coluna 'Cleiton Avi' incompleta");
    const prazoRow = compareRows.find((r) => /Prazo/i.test(r.label));
    if (!prazoRow || !/2–6/.test(prazoRow.cleiton)) throw new Error("Prazo esperado '2–6 semanas' não encontrado");

    // eslint-disable-next-line no-console
    console.debug("[LP Tests] OK");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[LP Tests] Falha:", e);
  }
}

export default function CleitonAviLanding() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    pack: "",
    timeline: "",
    budget: "",
    vision: "",
    challenge: "",
  });

  const submit = () => {
    const required = ["name", "email", "phone", "company", "pack", "timeline", "budget", "vision"];
    const missing = required.filter((k) => !(form as any)[k]);
    if (missing.length) {
      alert("Preencha os campos obrigatórios.");
      return;
    }
    console.log("Form LP Cleiton Avi:", form);
    alert("Recebi suas infos. Vou responder em até 24h úteis com os próximos passos.");
    setOpen(false);
    setForm({ name: "", email: "", phone: "", company: "", pack: "", timeline: "", budget: "", vision: "", challenge: "" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#2DD4BF]/30 selection:text-white">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#2DD4BF] shadow-[0_0_40px_-10px] shadow-[#2DD4BF]/40">
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
          <Button size="lg" onClick={() => setOpen(true)} className="rounded-md bg-white px-5 text-black hover:bg-white/90 uppercase tracking-wide">
            Começar projeto <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-white/70">
            <span>Desde 2012 criando marcas que performam</span>
          </div>
          <h1 className="text-balance text-5xl leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            Design de marca
            <span className="block text-white">sem surpresas</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-white/70">
            {"Pacotes claros, processo transparente e entrega garantida. Sua identidade profissional pronta para elevar percepção, diferenciação e confiança."}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="rounded-md bg-white px-6 text-black hover:bg-white/90 uppercase tracking-wide" onClick={() => setOpen(true)}>
              Ver pacotes & iniciar <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:border-[#2DD4BF] hover:text-[#2DD4BF] hover:bg-white/5 uppercase tracking-wide"
              onClick={() => {
                document.getElementById("processo")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Como funciona
            </Button>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="border-y border-white/5 bg-[#111111] px-6 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: <ZapIcon className="h-8 w-8 text-[#2DD4BF]" />, title: "Velocidade real", desc: "De 2 a 8 semanas conforme o pacote. Sem novela, sem atrasos." },
            { icon: <TargetIcon className="h-8 w-8 text-[#2DD4BF]" />, title: "100% estratégico", desc: "Cada decisão visual conecta com objetivo de negócio." },
            { icon: <AwardIcon className="h-8 w-8 text-[#2DD4BF]" />, title: "Qualidade sênior", desc: "Desde 2012 em design. Zero projetos reprovados." },
          ].map((b, i) => (
            <Card key={i} className="border-white/10 bg-[#0A0A0A]">
              <CardContent className="space-y-3 p-6">
                {b.icon}
                <h3 className="text-xl text-white">{b.title}</h3>
                <p className="text-sm text-white/70">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl">Trabalhos selecionados</h2>
            <p className="mt-2 text-sm text-white/70">Marcas que ajudei a transformar</p>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[...projects, ...projects].map((p, i) => (
                <div
                  key={i}
                  className="group min-w-[320px] max-w-[320px] rounded-xl border border-white/10 bg-[#0A0A0A] transition-transform duration-200 hover:-translate-y-1.5"
                >
                  <div className="relative h-44 w-full overflow-hidden rounded-t-xl" style={{ background: "#D1D5DB" }}>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="h-24 w-24 rounded-full opacity-20" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)` }} />
                    </div>
                  </div>
                  <div className="space-y-2 p-5">
                    <span className="inline-flex rounded-full border border-white/15 px-2.5 py-1 text-[10px] tracking-wider text-white/70 uppercase">{p.tag}</span>
                    <h3 className="text-xl text-white">{p.title}</h3>
                    <p className="text-sm text-white/70">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
          </div>
        </div>
      </section>

      {/* PACOTES */}
      <section id="pacotes" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl">Escolha o formato ideal</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">{"Todos os pacotes seguem meu processo sênior, com alinhamento claro e garantia de satisfação."}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative border ${pkg.highlight ? "border-[#2DD4BF]/60" : "border-white/10"} bg-[#111111]`}>
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2DD4BF] px-3 py-1 text-[11px] font-medium text-black shadow-lg">Mais escolhido</div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                  <div className="mt-1 text-3xl text-white">{pkg.price}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                    <ClockIcon className="h-3.5 w-3.5" /> {pkg.duration}
                  </div>
                  <p className="mt-3 text-sm text-white/70">{pkg.desc}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-white/80"><CheckIcon className="mt-0.5 h-4 w-4 text-[#2DD4BF]" />{f}</li>
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
                    onClick={() => {
                      setOpen(true);
                      setForm((prev) => ({ ...prev, pack: pkg.name }));
                    }}
                    className={`mt-4 w-full uppercase tracking-wide ${pkg.highlight ? "bg-white text-black hover:bg-white/90" : "bg-transparent text-white hover:bg-white/5 border border-white/30"}`}
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
          <div className="mb-10 text-center">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl">Por que escolher pacotes fixos?</h2>
            <p className="mt-2 text-sm text-white/70">Compare e veja a diferença</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F14]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0E1620] text-white/80">
                  <th className="w-1/4 px-5 py-4 text-left font-medium">&nbsp;</th>
                  <th className="w-1/4 px-5 py-4 text-left font-medium text-white/70">Agências tradicionais</th>
                  <th className="w-1/4 px-5 py-4 text-left font-medium text-white/70">Freelancers</th>
                  <th className="w-1/4 px-5 py-4 text-left font-semibold bg-[#14B8A6] text-black">Cleiton Avi</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, idx) => (
                  <tr key={r.label} className={idx % 2 === 0 ? "bg-[#0A1118]" : "bg-[#0C121A]"}>
                    <td className="px-5 py-4 text-white/80">{r.label}</td>
                    <td className="px-5 py-4 text-white/70">{r.agencies}</td>
                    <td className="px-5 py-4 text-white/70">{r.freelancers}</td>
                    <td className="px-5 py-4 font-medium text-[#2DD4BF]">{r.cleiton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-white/10 px-5 py-3 text-center text-xs text-white/50">*Revisões ilimitadas no conceito escolhido durante a fase de desenvolvimento.</div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="border-y border-white/5 bg-[#111111] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl tracking-tight text-white sm:text-5xl">Como funciona o processo</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">Transparente, colaborativo e focado em resultado.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { step: "01", title: "Briefing estratégico", dur: "1–2 dias", desc: "Mergulho nos objetivos, público, contexto e restrições. É consultivo, não só um formulário." },
              { step: "02", title: "Pesquisa & estratégia", dur: "3–5 dias", desc: "Leitura de mercado e concorrência. Definição de posicionamento antes de mover um pixel." },
              { step: "03", title: "Rotas iniciais", dur: "5–7 dias", desc: "Apresento 2–3 rotas com narrativas visuais distintas. Escolhemos a direção." },
              { step: "04", title: "Refino", dur: "5–10 dias", desc: "Evoluímos juntos até a melhor versão. Participação ativa em cada decisão." },
              { step: "05", title: "Entrega & onboard", dur: "2–3 dias", desc: "Arquivos, diretrizes e materiais organizados. Explico como aplicar e manter a consistência." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#0A0A0A] p-6">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2DD4BF] text-black">{s.step}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl text-white">{s.title}</h3>
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
      <section className="relative px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0A1A1A_0%,#1A3A3A_100%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-balance text-4xl tracking-tight text-white sm:text-5xl">Pronto para elevar sua marca?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">{"Envie suas informações e eu retorno em até 24h úteis com os próximos passos."}</p>
          <Button size="lg" className="mt-6 rounded-md bg-white px-6 text-black hover:bg-white/90 uppercase tracking-wide" onClick={() => setOpen(true)}>
            Iniciar conversa <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t-2 border-[#00FFD1] bg-[#0A0A0A] px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-2xl">Cleiton Avi</div>
          <p className="mt-1 text-sm/relaxed opacity-80">{"Designer de Marcas • desde 2012"}</p>
          <p className="mt-1 text-xs opacity-70">© {new Date().getFullYear()} Cleiton Avi. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* FORMULÁRIO */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0A0A0A] text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Agendar conversa inicial</DialogTitle>
            <p className="mt-1 text-sm text-white/70">{"Primeiro, me conte rapidamente sobre você e sua marca."}</p>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nome*</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]" />
              </div>
              <div>
                <Label htmlFor="email">E-mail*</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone / WhatsApp*</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]" />
              </div>
              <div>
                <Label htmlFor="company">Empresa / Projeto*</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]" />
              </div>
            </div>

            <div>
              <Label>Qual pacote te interessa?</Label>
              <RadioGroup value={form.pack} onValueChange={(v) => setForm({ ...form, pack: v })} className="mt-2 grid gap-2">
                {["Essencial", "Estratégico", "Premium", "Ainda não sei"].map((opt) => (
                  <div key={opt} className="flex items-center gap-2 rounded-md border border-white/15 p-3">
                    <RadioGroupItem value={opt} id={`pack-${opt}`} className="text-[#2DD4BF]" />
                    <Label htmlFor={`pack-${opt}`} className="cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="timeline">{"Quando você quer lançar a nova marca?*"}</Label>
              <select
                id="timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="mt-2 w-full rounded-md border border-white/15 bg-[#111111] p-3 text-sm outline-none focus:border-[#2DD4BF]"
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
                {["Até R$ 7.000", "R$ 7–12 mil", "R$ 12–20 mil", "Acima de R$ 20 mil"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    type="button"
                    className={`rounded-md border p-3 text-sm transition ${form.budget === b ? "border-white bg-white text-black" : "border-white/15 bg-transparent text-white hover:bg-white/5"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="vision">{"Qual visão você quer comunicar?*"}</Label>
              <Textarea
                id="vision"
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="mt-2 min-h-[120px] border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]"
                placeholder={"Valores, público e o que te torna diferente (2–3 frases)."}
              />
            </div>

            <div>
              <Label htmlFor="challenge">Maior desafio hoje <span className="text-white/50">(opcional)</span></Label>
              <Textarea
                id="challenge"
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                className="mt-2 min-h-[100px] border-white/15 bg-transparent focus-visible:ring-[#2DD4BF]"
                placeholder={"Ex.: não se diferencia, comunicação inconsistente, visual datado…"}
              />
            </div>

            <Button size="lg" className="w-full rounded-full bg-white text-black hover:bg-white/90 uppercase tracking-wide" onClick={submit}>
              Enviar e agendar
            </Button>
            <p className="-mt-2 text-center text-xs text-white/60">{"Retorno em até 24h úteis com os próximos passos."}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Executa os testes apenas em ambientes de desenvolvimento (sem ruído em produção)
function isDevEnv() {
  // Node/Next
  // @ts-ignore
  if (typeof process !== "undefined" && process?.env?.NODE_ENV && process.env.NODE_ENV !== "production") return true;
  // Heurística de localhost no browser
  if (typeof location !== "undefined" && /localhost|127\.0\.0\.1/.test(location.hostname)) return true;
  return false;
}

if (typeof window !== "undefined" && isDevEnv()) runDevTests();
