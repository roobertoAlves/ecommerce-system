"use client";

import StaticPage, { Highlight } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = { q: string; a: string };
type C = { highlight: string; faqs: FAQ[] };

const content: Record<LangCode, C> = {
  en: {
    highlight: "Can't find what you're looking for? Contact our support team at support@shopify.com.",
    faqs: [
      { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also view order status in your Orders page when logged in." },
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, and regional payment methods depending on your selected currency and region." },
      { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and changes may not be possible. Contact support immediately if needed." },
      { q: "How long does shipping take?", a: "Standard shipping takes 5–10 business days. Express shipping (2–3 days) and overnight options are available at checkout for eligible regions." },
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for most items. Products must be unused, in original packaging. See our Terms & Conditions for full details." },
      { q: "How do I request a refund?", a: "Start a return from your Orders page, or email support@shopify.com. Refunds are processed within 7–10 business days after we receive the item." },
      { q: "Is my payment information secure?", a: "Yes. All payments are processed through Stripe, which is PCI DSS Level 1 certified. We never store your full card details." },
      { q: "Do you ship internationally?", a: "Yes, we ship to over 30 countries. Shipping costs and estimated delivery times are shown at checkout based on your location." },
    ],
  },
  pt: {
    highlight: "Não encontrou o que procura? Entre em contato com nosso suporte: suporte@shopify.com.",
    faqs: [
      { q: "Como acompanho meu pedido?", a: "Após o envio, você receberá um número de rastreamento por e-mail. Também é possível ver o status na página de Pedidos quando estiver logado." },
      { q: "Quais formas de pagamento são aceitas?", a: "Aceitamos Visa, Mastercard, American Express, PayPal, boleto bancário e PIX (para Brasil)." },
      { q: "Posso alterar ou cancelar meu pedido?", a: "Pedidos podem ser alterados ou cancelados em até 1 hora após a realização. Após isso, entre em contato com o suporte imediatamente." },
      { q: "Qual o prazo de entrega?", a: "A entrega padrão leva de 5 a 10 dias úteis. Opções expressas estão disponíveis no checkout para regiões elegíveis." },
      { q: "Qual é a política de devolução?", a: "Aceitamos devoluções em até 30 dias após a entrega para a maioria dos itens, sem uso e na embalagem original." },
      { q: "Como solicitar um reembolso?", a: "Inicie uma devolução na página de Pedidos ou envie um e-mail para suporte@shopify.com. Os reembolsos são processados em 7 a 10 dias úteis." },
      { q: "Meus dados de pagamento estão seguros?", a: "Sim. Todos os pagamentos são processados pela Stripe, certificada PCI DSS Nível 1. Não armazenamos seus dados completos de cartão." },
      { q: "Vocês enviam para o exterior?", a: "Sim, enviamos para mais de 30 países. Os custos de envio são exibidos no checkout com base na sua localização." },
    ],
  },
  es: {
    highlight: "¿No encontraste lo que buscas? Contáctanos en soporte@shopify.com.",
    faqs: [
      { q: "¿Cómo rastro mi pedido?", a: "Una vez enviado tu pedido, recibirás un número de seguimiento por correo. También puedes ver el estado en tu página de Pedidos al iniciar sesión." },
      { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos Visa, Mastercard, American Express, PayPal y métodos de pago regionales según tu moneda y región seleccionadas." },
      { q: "¿Puedo cambiar o cancelar mi pedido?", a: "Los pedidos pueden modificarse o cancelarse dentro de 1 hora de realización. Después, comunícate con el soporte de inmediato." },
      { q: "¿Cuánto tarda el envío?", a: "El envío estándar tarda de 5 a 10 días hábiles. Hay opciones express disponibles en el checkout para regiones elegibles." },
      { q: "¿Cuál es su política de devoluciones?", a: "Aceptamos devoluciones dentro de los 30 días posteriores a la entrega para la mayoría de artículos, sin uso y en su embalaje original." },
      { q: "¿Cómo solicito un reembolso?", a: "Inicia una devolución desde tu página de Pedidos o escríbenos a soporte@shopify.com. Los reembolsos se procesan en 7–10 días hábiles." },
      { q: "¿Es segura mi información de pago?", a: "Sí. Todos los pagos se procesan a través de Stripe, certificada PCI DSS Nivel 1. Nunca almacenamos los datos completos de tu tarjeta." },
      { q: "¿Envían internacionalmente?", a: "Sí, enviamos a más de 30 países. Los costos de envío se muestran en el checkout según tu ubicación." },
    ],
  },
  de: {
    highlight: "Haben Sie nicht gefunden, was Sie suchen? Kontaktieren Sie uns: support@shopify.com.",
    faqs: [
      { q: "Wie verfolge ich meine Bestellung?", a: "Nach dem Versand erhalten Sie eine Sendungsverfolgungsnummer per E-Mail. Sie können den Bestellstatus auch auf Ihrer Bestellungsseite einsehen." },
      { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Wir akzeptieren Visa, Mastercard, American Express, PayPal und regionale Zahlungsmethoden je nach ausgewählter Währung und Region." },
      { q: "Kann ich meine Bestellung ändern oder stornieren?", a: "Bestellungen können innerhalb von 1 Stunde nach der Aufgabe geändert oder storniert werden. Danach wenden Sie sich sofort an den Support." },
      { q: "Wie lange dauert der Versand?", a: "Der Standardversand dauert 5–10 Werktage. Expressoptionen sind beim Checkout für berechtigte Regionen verfügbar." },
      { q: "Wie lautet Ihre Rückgaberichtlinie?", a: "Wir akzeptieren Rücksendungen innerhalb von 30 Tagen nach Lieferung für die meisten Artikel, unbenutzt und in Originalverpackung." },
      { q: "Wie beantrage ich eine Rückerstattung?", a: "Starten Sie eine Rücksendung auf Ihrer Bestellungsseite oder senden Sie eine E-Mail an support@shopify.com. Rückerstattungen werden innerhalb von 7–10 Werktagen bearbeitet." },
      { q: "Sind meine Zahlungsdaten sicher?", a: "Ja. Alle Zahlungen werden über Stripe abgewickelt, das PCI DSS Level 1 zertifiziert ist. Wir speichern keine vollständigen Kartendaten." },
      { q: "Versenden Sie international?", a: "Ja, wir versenden in über 30 Länder. Versandkosten werden beim Checkout basierend auf Ihrem Standort angezeigt." },
    ],
  },
  ja: {
    highlight: "お探しのものが見つかりませんでしたか？サポートチームにご連絡ください：support@shopify.com",
    faqs: [
      { q: "注文の追跡方法は？", a: "発送後、メールで追跡番号をお送りします。ログイン時に注文ページからも注文状況を確認できます。" },
      { q: "使用できる支払い方法は？", a: "Visa、Mastercard、American Express、PayPalおよび選択した通貨・地域に応じた地域決済方法に対応しています。" },
      { q: "注文の変更・キャンセルはできますか？", a: "注文後1時間以内であれば変更・キャンセルが可能です。それ以降はすぐにサポートまでご連絡ください。" },
      { q: "配送にかかる時間は？", a: "通常配送は5〜10営業日かかります。対象地域にはエクスプレス配送オプションもございます。" },
      { q: "返品ポリシーは？", a: "ほとんどの商品について、配送後30日以内であれば未使用・元の包装での返品を受け付けています。" },
      { q: "返金の申請方法は？", a: "注文ページから返品を開始するか、support@shopify.comまでメールでお問い合わせください。返金は商品受領後7〜10営業日以内に処理されます。" },
      { q: "支払い情報は安全ですか？", a: "はい。すべての支払いはPCI DSS レベル1認定のStripeを通じて処理されます。カード情報の完全なデータは保存しません。" },
      { q: "海外発送は対応していますか？", a: "はい、30カ国以上に発送しています。送料はお客様の所在地に基づいてチェックアウト時に表示されます。" },
    ],
  },
};

function FAQItem({ q, a }: FAQ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-text-primary hover:bg-bg-secondary transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed border-t border-border pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const lang = useLang();
  const c = content[lang];
  return (
    <StaticPage titleKey="faqTitle">
      <Highlight>{c.highlight}</Highlight>
      <div className="space-y-3">
        {c.faqs.map((item) => (
          <FAQItem key={item.q} {...item} />
        ))}
      </div>
    </StaticPage>
  );
}
