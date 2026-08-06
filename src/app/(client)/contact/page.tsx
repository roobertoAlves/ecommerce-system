"use client";

import StaticPage, { Highlight, Section } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

type C = { highlight: string; form: { name: string; email: string; subject: string; message: string; send: string; sending: string; success: string }; sections: { title: string; body: string[] }[] };

const content: Record<LangCode, C> = {
  en: {
    highlight: "Have a question or need help? Our support team is available Monday–Friday, 9 AM–6 PM (EST). We typically respond within 24 hours.",
    form: { name: "Full Name", email: "Email Address", subject: "Subject", message: "Your message...", send: "Send Message", sending: "Sending...", success: "Message sent! We'll get back to you soon." },
    sections: [
      { title: "Email", body: ["support@shopify.com", "For order issues, please include your order number."] },
      { title: "Phone", body: ["+1 (800) 123-4567", "Available Mon–Fri, 9 AM–6 PM EST"] },
      { title: "Address", body: ["123 Commerce Street", "New York, NY 10001, USA"] },
    ],
  },
  pt: {
    highlight: "Tem alguma dúvida ou precisa de ajuda? Nossa equipe de suporte está disponível de segunda a sexta, das 9h às 18h. Respondemos em até 24 horas.",
    form: { name: "Nome Completo", email: "Endereço de E-mail", subject: "Assunto", message: "Sua mensagem...", send: "Enviar Mensagem", sending: "Enviando...", success: "Mensagem enviada! Retornaremos em breve." },
    sections: [
      { title: "E-mail", body: ["suporte@shopify.com", "Para problemas com pedidos, inclua o número do pedido."] },
      { title: "Telefone", body: ["+55 (11) 9999-9999", "Disponível seg–sex, 9h–18h"] },
      { title: "Endereço", body: ["Av. Paulista, 1000", "São Paulo, SP 01310-100, Brasil"] },
    ],
  },
  es: {
    highlight: "¿Tienes alguna pregunta o necesitas ayuda? Nuestro equipo de soporte está disponible de lunes a viernes, de 9 AM a 6 PM. Respondemos en menos de 24 horas.",
    form: { name: "Nombre Completo", email: "Correo Electrónico", subject: "Asunto", message: "Tu mensaje...", send: "Enviar Mensaje", sending: "Enviando...", success: "¡Mensaje enviado! Te responderemos pronto." },
    sections: [
      { title: "Correo", body: ["soporte@shopify.com", "Para problemas con pedidos, incluye tu número de pedido."] },
      { title: "Teléfono", body: ["+52 (55) 1234-5678", "Disponible lun–vie, 9 AM–6 PM"] },
      { title: "Dirección", body: ["Av. Insurgentes Sur 1000", "Ciudad de México, CDMX, México"] },
    ],
  },
  de: {
    highlight: "Haben Sie eine Frage oder brauchen Sie Hilfe? Unser Support-Team ist montags bis freitags von 9 bis 18 Uhr erreichbar. Wir antworten in der Regel innerhalb von 24 Stunden.",
    form: { name: "Vollständiger Name", email: "E-Mail-Adresse", subject: "Betreff", message: "Ihre Nachricht...", send: "Nachricht senden", sending: "Wird gesendet...", success: "Nachricht gesendet! Wir melden uns bald." },
    sections: [
      { title: "E-Mail", body: ["support@shopify.com", "Bitte geben Sie bei Bestellproblemen Ihre Bestellnummer an."] },
      { title: "Telefon", body: ["+49 30 1234567", "Verfügbar Mo–Fr, 9–18 Uhr"] },
      { title: "Adresse", body: ["Unter den Linden 1", "10117 Berlin, Deutschland"] },
    ],
  },
  ja: {
    highlight: "ご質問やサポートが必要な場合は、月曜から金曜の午前9時から午後6時まで対応しております。通常24時間以内にご返信します。",
    form: { name: "フルネーム", email: "メールアドレス", subject: "件名", message: "メッセージ...", send: "送信する", sending: "送信中...", success: "メッセージを送信しました！まもなくご連絡します。" },
    sections: [
      { title: "メール", body: ["support@shopify.com", "注文に関する問題は注文番号をご記入ください。"] },
      { title: "電話", body: ["+81 3-1234-5678", "月〜金 9:00〜18:00"] },
      { title: "住所", body: ["東京都千代田区丸の内1-1-1", "〒100-0005"] },
    ],
  },
};

export default function ContactPage() {
  const lang = useLang();
  const c = content[lang];
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(c.form.success);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <StaticPage titleKey="contactTitle">
      <Highlight>{c.highlight}</Highlight>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact form */}
        <section className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input placeholder={c.form.name} required />
            <Input type="email" placeholder={c.form.email} required />
            <Input placeholder={c.form.subject} required />
            <textarea
              placeholder={c.form.message}
              rows={5}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? c.form.sending : c.form.send}
            </Button>
          </form>
        </section>

        {/* Contact info */}
        <div className="space-y-5">
          {c.sections.map((s) => (
            <Section key={s.title} title={s.title}>
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </Section>
          ))}
        </div>
      </div>
    </StaticPage>
  );
}
