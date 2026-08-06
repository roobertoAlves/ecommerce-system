"use client";

import StaticPage, { Highlight, Section } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";
import Link from "next/link";
import { BookOpen, HeadphonesIcon, MessageCircle, RotateCcw, ShoppingBag, Truck } from "lucide-react";

type C = {
  highlight: string;
  cards: { icon: string; title: string; desc: string; href: string }[];
  sections: { title: string; body: string[] }[];
};

const content: Record<LangCode, C> = {
  en: {
    highlight: "Welcome to the Help Center. Find quick answers, guides, and support resources below.",
    cards: [
      { icon: "truck", title: "Track My Order", desc: "Check your shipment status and estimated delivery.", href: "/orders" },
      { icon: "rotate", title: "Returns & Refunds", desc: "Start a return or check the status of your refund.", href: "/orders" },
      { icon: "shopping", title: "My Orders", desc: "View all your past and current orders.", href: "/orders" },
      { icon: "book", title: "FAQ", desc: "Browse frequently asked questions.", href: "/faq" },
      { icon: "headphones", title: "Contact Support", desc: "Get in touch with our support team.", href: "/contact" },
      { icon: "chat", title: "Privacy Policy", desc: "Learn how we handle your data.", href: "/privacy-policy" },
    ],
    sections: [
      { title: "Account Issues", body: ["Forgot your password? Use the 'Forgot Password' link on the login page.", "To update your email or personal details, go to your account settings.", "If you suspect unauthorized access, contact support immediately at support@shopify.com."] },
      { title: "Payment Issues", body: ["If your payment was declined, check your card details or try a different payment method.", "Duplicate charges are automatically reversed within 3–5 business days.", "For invoice requests, navigate to your Orders page and click 'Download Invoice'."] },
      { title: "Technical Issues", body: ["Clear your browser cache and cookies if you experience display problems.", "Make sure you are using an up-to-date browser (Chrome, Firefox, Edge, Safari).", "For persistent issues, contact us at support@shopify.com with your browser and device information."] },
    ],
  },
  pt: {
    highlight: "Bem-vindo à Central de Ajuda. Encontre respostas rápidas, guias e recursos de suporte abaixo.",
    cards: [
      { icon: "truck", title: "Rastrear Pedido", desc: "Verifique o status do envio e a estimativa de entrega.", href: "/orders" },
      { icon: "rotate", title: "Devoluções e Reembolsos", desc: "Inicie uma devolução ou verifique o status do seu reembolso.", href: "/orders" },
      { icon: "shopping", title: "Meus Pedidos", desc: "Veja todos os seus pedidos anteriores e atuais.", href: "/orders" },
      { icon: "book", title: "Perguntas Frequentes", desc: "Navegue pelas perguntas frequentes.", href: "/faq" },
      { icon: "headphones", title: "Contatar Suporte", desc: "Entre em contato com nossa equipe de suporte.", href: "/contact" },
      { icon: "chat", title: "Política de Privacidade", desc: "Saiba como tratamos seus dados.", href: "/privacy-policy" },
    ],
    sections: [
      { title: "Problemas com a Conta", body: ["Esqueceu a senha? Use o link 'Esqueci minha senha' na página de login.", "Para atualizar e-mail ou dados pessoais, acesse as configurações da conta.", "Se suspeitar de acesso não autorizado, contate o suporte imediatamente."] },
      { title: "Problemas com Pagamento", body: ["Se o pagamento foi recusado, verifique os dados do cartão ou tente outro método.", "Cobranças duplicadas são revertidas automaticamente em 3 a 5 dias úteis.", "Para solicitar faturas, acesse a página de Pedidos e clique em 'Baixar Fatura'."] },
      { title: "Problemas Técnicos", body: ["Limpe o cache e os cookies do navegador se tiver problemas de exibição.", "Use um navegador atualizado (Chrome, Firefox, Edge, Safari).", "Para problemas persistentes, envie um e-mail para suporte@shopify.com com informações do dispositivo e navegador."] },
    ],
  },
  es: {
    highlight: "Bienvenido al Centro de Ayuda. Encuentra respuestas rápidas, guías y recursos de soporte.",
    cards: [
      { icon: "truck", title: "Rastrear Pedido", desc: "Verifica el estado de tu envío y la entrega estimada.", href: "/orders" },
      { icon: "rotate", title: "Devoluciones y Reembolsos", desc: "Inicia una devolución o consulta el estado de tu reembolso.", href: "/orders" },
      { icon: "shopping", title: "Mis Pedidos", desc: "Ver todos tus pedidos pasados y actuales.", href: "/orders" },
      { icon: "book", title: "Preguntas Frecuentes", desc: "Consulta las preguntas frecuentes.", href: "/faq" },
      { icon: "headphones", title: "Contactar Soporte", desc: "Comunícate con nuestro equipo de soporte.", href: "/contact" },
      { icon: "chat", title: "Política de Privacidad", desc: "Aprende cómo manejamos tus datos.", href: "/privacy-policy" },
    ],
    sections: [
      { title: "Problemas con la Cuenta", body: ["¿Olvidaste tu contraseña? Usa el enlace 'Olvidé mi contraseña' en la página de inicio de sesión.", "Para actualizar tu correo o datos personales, ve a la configuración de tu cuenta.", "Si sospechas acceso no autorizado, contacta al soporte de inmediato."] },
      { title: "Problemas de Pago", body: ["Si tu pago fue rechazado, verifica los datos de tu tarjeta o prueba otro método.", "Los cargos duplicados se revierten automáticamente en 3–5 días hábiles.", "Para solicitar facturas, ve a la página de Pedidos y haz clic en 'Descargar Factura'."] },
      { title: "Problemas Técnicos", body: ["Limpia la caché y las cookies si experimentas problemas de visualización.", "Usa un navegador actualizado (Chrome, Firefox, Edge, Safari).", "Para problemas persistentes, escríbenos con información de tu dispositivo y navegador."] },
    ],
  },
  de: {
    highlight: "Willkommen im Hilfezentrum. Finden Sie schnelle Antworten, Anleitungen und Support-Ressourcen.",
    cards: [
      { icon: "truck", title: "Bestellung verfolgen", desc: "Überprüfen Sie den Versandstatus und die geschätzte Lieferung.", href: "/orders" },
      { icon: "rotate", title: "Rücksendungen & Rückerstattungen", desc: "Starten Sie eine Rücksendung oder prüfen Sie den Status Ihrer Rückerstattung.", href: "/orders" },
      { icon: "shopping", title: "Meine Bestellungen", desc: "Alle vergangenen und aktuellen Bestellungen anzeigen.", href: "/orders" },
      { icon: "book", title: "FAQ", desc: "Häufig gestellte Fragen durchsuchen.", href: "/faq" },
      { icon: "headphones", title: "Support kontaktieren", desc: "Kontaktieren Sie unser Support-Team.", href: "/contact" },
      { icon: "chat", title: "Datenschutzerklärung", desc: "Erfahren Sie, wie wir Ihre Daten verarbeiten.", href: "/privacy-policy" },
    ],
    sections: [
      { title: "Kontoprobleme", body: ["Passwort vergessen? Nutzen Sie den 'Passwort vergessen'-Link auf der Anmeldeseite.", "Zum Aktualisieren von E-Mail oder persönlichen Daten besuchen Sie Ihre Kontoeinstellungen.", "Bei Verdacht auf unbefugten Zugriff kontaktieren Sie sofort den Support."] },
      { title: "Zahlungsprobleme", body: ["Bei abgelehnten Zahlungen überprüfen Sie Ihre Kartendetails oder probieren Sie eine andere Zahlungsmethode.", "Doppelte Abbuchungen werden automatisch innerhalb von 3–5 Werktagen zurückgebucht.", "Für Rechnungsanfragen gehen Sie zur Bestellseite und klicken Sie auf 'Rechnung herunterladen'."] },
      { title: "Technische Probleme", body: ["Leeren Sie Browser-Cache und Cookies bei Anzeigeproblemen.", "Verwenden Sie einen aktuellen Browser (Chrome, Firefox, Edge, Safari).", "Bei anhaltenden Problemen kontaktieren Sie uns mit Browser- und Geräteinformationen."] },
    ],
  },
  ja: {
    highlight: "ヘルプセンターへようこそ。よくある質問、ガイド、サポートリソースを以下でご確認ください。",
    cards: [
      { icon: "truck", title: "注文の追跡", desc: "配送状況と配達予定を確認する。", href: "/orders" },
      { icon: "rotate", title: "返品・返金", desc: "返品を開始するか、返金状況を確認する。", href: "/orders" },
      { icon: "shopping", title: "注文履歴", desc: "過去と現在のすべての注文を表示する。", href: "/orders" },
      { icon: "book", title: "よくある質問", desc: "よくある質問を参照する。", href: "/faq" },
      { icon: "headphones", title: "サポートに連絡", desc: "サポートチームに問い合わせる。", href: "/contact" },
      { icon: "chat", title: "プライバシーポリシー", desc: "データの取り扱いについて確認する。", href: "/privacy-policy" },
    ],
    sections: [
      { title: "アカウントの問題", body: ["パスワードをお忘れの場合は、ログインページの「パスワードを忘れた」リンクをご使用ください。", "メールアドレスや個人情報を更新するには、アカウント設定にアクセスしてください。", "不正アクセスが疑われる場合は、すぐにサポートにご連絡ください。"] },
      { title: "支払いの問題", body: ["支払いが却下された場合は、カード情報を確認するか別の支払い方法をお試しください。", "重複請求は3〜5営業日以内に自動的に返金されます。", "請求書のリクエストは注文ページから「請求書をダウンロード」をクリックしてください。"] },
      { title: "技術的な問題", body: ["表示の問題がある場合は、ブラウザのキャッシュとCookieをクリアしてください。", "最新のブラウザ（Chrome、Firefox、Edge、Safari）をご使用ください。", "問題が解決しない場合は、ブラウザとデバイス情報を添えてご連絡ください。"] },
    ],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  truck: <Truck className="w-6 h-6" />,
  rotate: <RotateCcw className="w-6 h-6" />,
  shopping: <ShoppingBag className="w-6 h-6" />,
  book: <BookOpen className="w-6 h-6" />,
  headphones: <HeadphonesIcon className="w-6 h-6" />,
  chat: <MessageCircle className="w-6 h-6" />,
};

export default function HelpPage() {
  const lang = useLang();
  const c = content[lang];
  return (
    <StaticPage titleKey="helpTitle">
      <Highlight>{c.highlight}</Highlight>

      {/* Quick action cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {c.cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="flex flex-col gap-3 p-5 bg-surface border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors group"
          >
            <span className="text-primary group-hover:scale-110 transition-transform w-fit">
              {iconMap[card.icon]}
            </span>
            <div>
              <p className="font-semibold text-sm text-text-primary">{card.title}</p>
              <p className="text-xs text-text-muted mt-0.5">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {c.sections.map((s) => (
        <Section key={s.title} title={s.title}>
          {s.body.map((p, i) => <p key={i}>{p}</p>)}
        </Section>
      ))}
    </StaticPage>
  );
}
