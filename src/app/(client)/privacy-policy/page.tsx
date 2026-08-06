"use client";

import StaticPage, { Section } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";

type C = { lastUpdated: string; sections: { title: string; body: string[] }[] };

const content: Record<LangCode, C> = {
  en: {
    lastUpdated: "Last updated: January 1, 2025",
    sections: [
      { title: "Information We Collect", body: ["We collect information you provide directly, such as name, email address, shipping address, and payment details when you create an account or place an order.", "We also collect usage data including pages visited, products viewed, search queries, and device/browser information to improve our services."] },
      { title: "How We Use Your Information", body: ["To process and fulfil your orders, send order confirmations and shipping updates.", "To personalise your shopping experience and show relevant product recommendations.", "To send promotional emails if you have opted in — you can unsubscribe at any time.", "To detect and prevent fraud, abuse, and other harmful activity."] },
      { title: "Data Sharing", body: ["We do not sell your personal data to third parties.", "We share data with trusted service providers (payment processors, logistics partners, analytics providers) solely to operate our platform.", "We may disclose data if required by law or to protect our legal rights."] },
      { title: "Cookies", body: ["We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyse site traffic. You can manage cookie preferences through your browser settings."] },
      { title: "Data Retention", body: ["We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time."] },
      { title: "Your Rights", body: ["Depending on your location, you may have rights to access, correct, port, or delete your personal data. Contact us at privacy@shopify.com to exercise these rights."] },
      { title: "Contact", body: ["For privacy-related questions, email us at privacy@shopify.com."] },
    ],
  },
  pt: {
    lastUpdated: "Última atualização: 1 de janeiro de 2025",
    sections: [
      { title: "Informações que Coletamos", body: ["Coletamos informações que você fornece diretamente, como nome, e-mail, endereço de entrega e dados de pagamento ao criar uma conta ou realizar um pedido.", "Também coletamos dados de uso, como páginas visitadas, produtos visualizados e informações do dispositivo."] },
      { title: "Como Usamos suas Informações", body: ["Para processar seus pedidos e enviar confirmações e atualizações de entrega.", "Para personalizar sua experiência de compra.", "Para enviar e-mails promocionais, se você optou por recebê-los — você pode cancelar a qualquer momento.", "Para detectar e prevenir fraudes e atividades prejudiciais."] },
      { title: "Compartilhamento de Dados", body: ["Não vendemos seus dados pessoais a terceiros.", "Compartilhamos dados com provedores de serviços confiáveis apenas para operar nossa plataforma.", "Podemos divulgar dados quando exigido por lei."] },
      { title: "Cookies", body: ["Usamos cookies para melhorar sua experiência, lembrar suas preferências e analisar o tráfego. Você pode gerenciar as preferências de cookies nas configurações do seu navegador."] },
      { title: "Retenção de Dados", body: ["Mantemos seus dados enquanto sua conta estiver ativa. Você pode solicitar a exclusão a qualquer momento."] },
      { title: "Seus Direitos", body: ["Dependendo da sua localização, você pode ter direitos de acesso, correção, portabilidade ou exclusão dos seus dados. Entre em contato: privacidade@shopify.com."] },
      { title: "Contato", body: ["Para questões de privacidade, envie um e-mail para privacidade@shopify.com."] },
    ],
  },
  es: {
    lastUpdated: "Última actualización: 1 de enero de 2025",
    sections: [
      { title: "Información que Recopilamos", body: ["Recopilamos la información que proporcionas directamente, como nombre, correo, dirección de envío y datos de pago al crear una cuenta o realizar un pedido.", "También recopilamos datos de uso como páginas visitadas y productos vistos."] },
      { title: "Cómo Usamos tu Información", body: ["Para procesar pedidos y enviar confirmaciones y actualizaciones de envío.", "Para personalizar tu experiencia de compra.", "Para enviar correos promocionales si lo autorizaste — puedes cancelar en cualquier momento.", "Para detectar y prevenir fraudes."] },
      { title: "Compartir Datos", body: ["No vendemos tus datos personales a terceros.", "Compartimos datos con proveedores de confianza únicamente para operar nuestra plataforma.", "Podemos divulgar datos cuando lo exija la ley."] },
      { title: "Cookies", body: ["Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes administrar las preferencias en la configuración de tu navegador."] },
      { title: "Retención de Datos", body: ["Conservamos tus datos mientras tu cuenta esté activa. Puedes solicitar la eliminación en cualquier momento."] },
      { title: "Tus Derechos", body: ["Según tu ubicación, puedes tener derechos de acceso, corrección o eliminación de tus datos. Contáctanos: privacidad@shopify.com."] },
      { title: "Contacto", body: ["Para preguntas de privacidad, escríbenos a privacidad@shopify.com."] },
    ],
  },
  de: {
    lastUpdated: "Zuletzt aktualisiert: 1. Januar 2025",
    sections: [
      { title: "Daten, die wir erheben", body: ["Wir erheben Daten, die Sie direkt angeben, wie Name, E-Mail, Lieferadresse und Zahlungsdaten bei Kontoerstellung oder Bestellung.", "Wir erheben auch Nutzungsdaten wie besuchte Seiten und Geräteinformationen."] },
      { title: "Verwendung Ihrer Daten", body: ["Zur Auftragsabwicklung und Versandbenachrichtigungen.", "Zur Personalisierung Ihres Einkaufserlebnisses.", "Für Werbe-E-Mails, wenn Sie zugestimmt haben — Abmeldung jederzeit möglich.", "Zur Betrugserkennung und -prävention."] },
      { title: "Datenweitergabe", body: ["Wir verkaufen Ihre Daten nicht an Dritte.", "Wir teilen Daten mit vertrauenswürdigen Dienstleistern nur zum Betrieb unserer Plattform.", "Wir können Daten offenlegen, wenn gesetzlich vorgeschrieben."] },
      { title: "Cookies", body: ["Wir verwenden Cookies zur Verbesserung Ihrer Erfahrung und Analyse des Datenverkehrs. Sie können Cookie-Einstellungen in Ihrem Browser verwalten."] },
      { title: "Datenspeicherung", body: ["Wir speichern Ihre Daten, solange Ihr Konto aktiv ist. Sie können jederzeit die Löschung beantragen."] },
      { title: "Ihre Rechte", body: ["Sie haben das Recht auf Zugang, Berichtigung oder Löschung Ihrer Daten. Kontakt: datenschutz@shopify.com."] },
      { title: "Kontakt", body: ["Für datenschutzbezogene Fragen: datenschutz@shopify.com."] },
    ],
  },
  ja: {
    lastUpdated: "最終更新日：2025年1月1日",
    sections: [
      { title: "収集する情報", body: ["アカウント作成や注文時に提供される名前、メール、配送先、支払い情報を収集します。", "また、訪問ページや閲覧商品などの利用データも収集します。"] },
      { title: "情報の利用方法", body: ["注文処理と配送通知のため。", "ショッピング体験のパーソナライズのため。", "同意した場合のプロモーションメール送信のため（いつでも解除可能）。", "不正行為の検出・防止のため。"] },
      { title: "データの共有", body: ["個人データを第三者に販売しません。", "プラットフォーム運営のために信頼できるサービスプロバイダーとデータを共有します。", "法律で求められる場合にデータを開示することがあります。"] },
      { title: "クッキー", body: ["利用体験の向上とトラフィック分析のためにクッキーを使用します。ブラウザの設定で管理できます。"] },
      { title: "データの保持", body: ["アカウントが有効な間、データを保持します。削除はいつでも申請できます。"] },
      { title: "あなたの権利", body: ["所在地に応じて、データへのアクセス・修正・削除の権利があります。privacy@shopify.comまでご連絡ください。"] },
      { title: "お問い合わせ", body: ["プライバシーに関するお問い合わせ：privacy@shopify.com"] },
    ],
  },
};

export default function PrivacyPage() {
  const lang = useLang();
  const c = content[lang];
  return (
    <StaticPage titleKey="privacyTitle">
      <p className="text-xs text-text-muted">{c.lastUpdated}</p>
      {c.sections.map((s) => (
        <Section key={s.title} title={s.title}>
          {s.body.map((p, i) => <p key={i}>{p}</p>)}
        </Section>
      ))}
    </StaticPage>
  );
}
