"use client";

import StaticPage, { Highlight, Section } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";

type Content = { highlight: string; sections: { title: string; body: string[] }[] };

const content: Record<LangCode, Content> = {
  en: {
    highlight: "Our mission is to make quality products accessible to everyone, everywhere — with a seamless shopping experience and genuine care for our customers.",
    sections: [
      { title: "Who We Are", body: ["Shopify is a global e-commerce platform founded with a single purpose: to connect people with the products they love at prices they deserve.", "We partner with top brands and independent sellers to offer a curated selection across electronics, fashion, home goods, and much more."] },
      { title: "Our Values", body: ["Transparency — clear pricing, no hidden fees.", "Sustainability — we prioritize eco-friendly packaging and ethical supply chains.", "Customer First — every decision we make starts with: does this make our customers' lives easier?"] },
      { title: "Our Team", body: ["We are a passionate team of engineers, designers, and retail experts spread across the globe, united by the belief that great shopping should be simple, fast, and fun."] },
      { title: "Our History", body: ["Founded in 2020 as a small startup with 50 products, we now serve millions of customers in over 30 countries with a catalog of 10,000+ items and growing."] },
    ],
  },
  pt: {
    highlight: "Nossa missão é tornar produtos de qualidade acessíveis para todos, em qualquer lugar — com uma experiência de compra fluida e cuidado genuíno com nossos clientes.",
    sections: [
      { title: "Quem Somos", body: ["A Shopify é uma plataforma global de e-commerce fundada com um único propósito: conectar pessoas aos produtos que amam a preços que merecem.", "Trabalhamos com grandes marcas e vendedores independentes para oferecer uma seleção cuidadosa em eletrônicos, moda, artigos para casa e muito mais."] },
      { title: "Nossos Valores", body: ["Transparência — preços claros, sem taxas ocultas.", "Sustentabilidade — priorizamos embalagens ecológicas e cadeias de fornecimento éticas.", "Cliente em Primeiro Lugar — cada decisão começa com: isso facilita a vida dos nossos clientes?"] },
      { title: "Nossa Equipe", body: ["Somos uma equipe apaixonada de engenheiros, designers e especialistas em varejo espalhados pelo mundo, unidos pela crença de que comprar bem deve ser simples, rápido e divertido."] },
      { title: "Nossa História", body: ["Fundada em 2020 com 50 produtos, hoje atendemos milhões de clientes em mais de 30 países com um catálogo de mais de 10.000 itens."] },
    ],
  },
  es: {
    highlight: "Nuestra misión es hacer que los productos de calidad sean accesibles para todos, en cualquier lugar, con una experiencia de compra fluida.",
    sections: [
      { title: "Quiénes Somos", body: ["Shopify es una plataforma global de comercio electrónico fundada para conectar a las personas con los productos que aman a precios que merecen.", "Trabajamos con grandes marcas y vendedores independientes en electrónica, moda, artículos para el hogar y más."] },
      { title: "Nuestros Valores", body: ["Transparencia — precios claros, sin tarifas ocultas.", "Sostenibilidad — embalajes ecológicos y cadenas de suministro éticas.", "El Cliente Primero — cada decisión busca facilitar la vida de nuestros clientes."] },
      { title: "Nuestro Equipo", body: ["Somos un equipo apasionado distribuido por todo el mundo, unidos por la creencia de que comprar debe ser simple, rápido y divertido."] },
      { title: "Nuestra Historia", body: ["Fundada en 2020 con 50 productos, hoy servimos a millones de clientes en más de 30 países con más de 10.000 artículos."] },
    ],
  },
  de: {
    highlight: "Unsere Mission ist es, hochwertige Produkte für alle überall zugänglich zu machen — mit einem nahtlosen Einkaufserlebnis.",
    sections: [
      { title: "Wer wir sind", body: ["Shopify ist eine globale E-Commerce-Plattform, die Menschen mit Produkten verbindet, die sie lieben, zu Preisen, die sie verdienen."] },
      { title: "Unsere Werte", body: ["Transparenz — klare Preise, keine versteckten Gebühren.", "Nachhaltigkeit — umweltfreundliche Verpackungen und ethische Lieferketten.", "Kunde zuerst — jede Entscheidung fragt: Macht das das Leben unserer Kunden einfacher?"] },
      { title: "Unser Team", body: ["Ein leidenschaftliches globales Team aus Ingenieuren, Designern und Einzelhandelsexperten."] },
      { title: "Unsere Geschichte", body: ["Gegründet 2020 mit 50 Produkten, heute Millionen von Kunden in über 30 Ländern."] },
    ],
  },
  ja: {
    highlight: "私たちのミッションは、高品質な商品をすべての人に、どこにいても手の届く価格で届けることです。",
    sections: [
      { title: "私たちについて", body: ["Shopifyは、人々が愛する商品を適切な価格で提供するために設立されたグローバルなEコマースプラットフォームです。"] },
      { title: "私たちの価値観", body: ["透明性 — 明確な価格、隠れた手数料なし。", "持続可能性 — 環境に配慮した梱包と倫理的なサプライチェーン。", "顧客優先 — お客様の生活を豊かにすることが出発点。"] },
      { title: "私たちのチーム", body: ["世界中に広がるエンジニア、デザイナー、小売専門家からなる情熱的なチームです。"] },
      { title: "私たちの歴史", body: ["2020年に50商品で創業し、現在は30カ国以上で何百万ものお客様にサービスを提供しています。"] },
    ],
  },
};

export default function AboutPage() {
  const lang = useLang();
  const c = content[lang];
  return (
    <StaticPage titleKey="aboutTitle">
      <Highlight>{c.highlight}</Highlight>
      {c.sections.map((s) => (
        <Section key={s.title} title={s.title}>
          {s.body.map((p, i) => <p key={i}>{p}</p>)}
        </Section>
      ))}
    </StaticPage>
  );
}
