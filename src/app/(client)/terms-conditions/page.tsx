"use client";

import StaticPage, { Section } from "@/components/StaticPage";
import { LangCode, useLang } from "@/i18n/I18nContext";

type C = { lastUpdated: string; sections: { title: string; body: string[] }[] };

const content: Record<LangCode, C> = {
  en: {
    lastUpdated: "Effective date: January 1, 2025",
    sections: [
      { title: "Acceptance of Terms", body: ["By accessing or using our platform, you agree to these Terms & Conditions. If you do not agree, please discontinue use of our services."] },
      { title: "Account Responsibility", body: ["You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.", "You must be at least 18 years old or have parental consent to use our services."] },
      { title: "Orders & Payments", body: ["All prices are displayed in the selected currency and are subject to change without notice.", "We reserve the right to cancel or refuse orders at our discretion, including cases of suspected fraud.", "Payment is charged at the time of checkout."] },
      { title: "Shipping & Returns", body: ["Estimated delivery times are provided at checkout and may vary depending on your location.", "Returns are accepted within 30 days of delivery for eligible items. Items must be unused and in original packaging.", "Refunds are processed within 7–10 business days after we receive the returned item."] },
      { title: "Intellectual Property", body: ["All content on this platform — including logos, images, text, and software — is owned by or licensed to Shopify and protected by applicable intellectual property laws.", "You may not reproduce, distribute, or create derivative works without our express written permission."] },
      { title: "Limitation of Liability", body: ["To the maximum extent permitted by law, Shopify is not liable for indirect, incidental, or consequential damages arising from your use of the platform."] },
      { title: "Governing Law", body: ["These terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles."] },
      { title: "Changes to Terms", body: ["We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms."] },
    ],
  },
  pt: {
    lastUpdated: "Data de vigência: 1 de janeiro de 2025",
    sections: [
      { title: "Aceitação dos Termos", body: ["Ao acessar ou usar nossa plataforma, você concorda com estes Termos e Condições. Se não concordar, interrompa o uso dos nossos serviços."] },
      { title: "Responsabilidade da Conta", body: ["Você é responsável pela confidencialidade das suas credenciais e por toda atividade na sua conta.", "Você deve ter pelo menos 18 anos ou consentimento dos pais para usar nossos serviços."] },
      { title: "Pedidos e Pagamentos", body: ["Os preços são exibidos na moeda selecionada e podem ser alterados sem aviso prévio.", "Reservamo-nos o direito de cancelar pedidos a nosso critério, incluindo casos de suspeita de fraude.", "O pagamento é cobrado no momento do checkout."] },
      { title: "Envio e Devoluções", body: ["Os prazos de entrega estimados são fornecidos no checkout e podem variar conforme sua localização.", "Devoluções são aceitas em até 30 dias após a entrega para itens elegíveis, sem uso e na embalagem original.", "Os reembolsos são processados em 7 a 10 dias úteis após o recebimento do item."] },
      { title: "Propriedade Intelectual", body: ["Todo o conteúdo da plataforma — incluindo logotipos, imagens, textos e software — é de propriedade da Shopify e protegido por leis de propriedade intelectual.", "Você não pode reproduzir, distribuir ou criar trabalhos derivados sem nossa permissão por escrito."] },
      { title: "Limitação de Responsabilidade", body: ["Na extensão máxima permitida por lei, a Shopify não é responsável por danos indiretos, incidentais ou consequenciais decorrentes do uso da plataforma."] },
      { title: "Lei Aplicável", body: ["Estes termos são regidos pelas leis do Estado de São Paulo, Brasil."] },
      { title: "Alterações nos Termos", body: ["Podemos atualizar estes termos a qualquer momento. O uso contínuo da plataforma após as alterações constitui aceitação dos termos revisados."] },
    ],
  },
  es: {
    lastUpdated: "Fecha de vigencia: 1 de enero de 2025",
    sections: [
      { title: "Aceptación de los Términos", body: ["Al acceder o utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo, deja de usar nuestros servicios."] },
      { title: "Responsabilidad de la Cuenta", body: ["Eres responsable de mantener la confidencialidad de tus credenciales y de toda la actividad bajo tu cuenta.", "Debes tener al menos 18 años o contar con el consentimiento de tus padres para usar nuestros servicios."] },
      { title: "Pedidos y Pagos", body: ["Los precios se muestran en la moneda seleccionada y pueden cambiar sin previo aviso.", "Nos reservamos el derecho de cancelar pedidos a nuestra discreción, incluidos casos de fraude sospechoso.", "El pago se cobra en el momento del checkout."] },
      { title: "Envíos y Devoluciones", body: ["Los tiempos de entrega estimados se proporcionan al finalizar la compra y pueden variar según tu ubicación.", "Se aceptan devoluciones dentro de los 30 días posteriores a la entrega para artículos elegibles, sin uso y en su embalaje original.", "Los reembolsos se procesan en 7 a 10 días hábiles."] },
      { title: "Propiedad Intelectual", body: ["Todo el contenido de la plataforma es propiedad de Shopify y está protegido por las leyes de propiedad intelectual aplicables.", "No puedes reproducir ni distribuir contenido sin nuestro permiso expreso por escrito."] },
      { title: "Limitación de Responsabilidad", body: ["En la medida máxima permitida por la ley, Shopify no es responsable de daños indirectos o consecuentes derivados del uso de la plataforma."] },
      { title: "Ley Aplicable", body: ["Estos términos se rigen por las leyes de la Ciudad de México, México."] },
      { title: "Cambios en los Términos", body: ["Podemos actualizar estos términos en cualquier momento. El uso continuado de la plataforma implica la aceptación de los términos revisados."] },
    ],
  },
  de: {
    lastUpdated: "Gültig ab: 1. Januar 2025",
    sections: [
      { title: "Annahme der Bedingungen", body: ["Durch die Nutzung unserer Plattform stimmen Sie diesen AGB zu. Bei Nichteinverständnis bitten wir Sie, unsere Dienste nicht zu nutzen."] },
      { title: "Kontoverantwortung", body: ["Sie sind für die Vertraulichkeit Ihrer Zugangsdaten und alle Aktivitäten unter Ihrem Konto verantwortlich.", "Sie müssen mindestens 18 Jahre alt sein, um unsere Dienste zu nutzen."] },
      { title: "Bestellungen und Zahlungen", body: ["Alle Preise sind in der gewählten Währung angegeben und können sich ohne Vorankündigung ändern.", "Wir behalten uns das Recht vor, Bestellungen nach unserem Ermessen zu stornieren.", "Die Zahlung erfolgt zum Zeitpunkt des Checkouts."] },
      { title: "Versand und Rückgabe", body: ["Geschätzte Lieferzeiten werden beim Checkout angegeben und können je nach Standort variieren.", "Rückgaben sind innerhalb von 30 Tagen nach Lieferung für berechtigte Artikel möglich.", "Rückerstattungen werden innerhalb von 7–10 Werktagen bearbeitet."] },
      { title: "Geistiges Eigentum", body: ["Alle Inhalte auf dieser Plattform sind Eigentum von Shopify und durch anwendbare Gesetze geschützt.", "Eine Vervielfältigung ohne ausdrückliche schriftliche Genehmigung ist nicht gestattet."] },
      { title: "Haftungsbeschränkung", body: ["Im gesetzlich zulässigen Umfang haftet Shopify nicht für indirekte oder Folgeschäden."] },
      { title: "Anwendbares Recht", body: ["Diese Bedingungen unterliegen dem Recht der Bundesrepublik Deutschland."] },
      { title: "Änderungen der Bedingungen", body: ["Wir können diese Bedingungen jederzeit aktualisieren. Die weitere Nutzung der Plattform gilt als Zustimmung zu den geänderten Bedingungen."] },
    ],
  },
  ja: {
    lastUpdated: "有効日：2025年1月1日",
    sections: [
      { title: "利用規約への同意", body: ["当プラットフォームを使用することにより、本利用規約に同意したものとみなされます。同意されない場合は、サービスのご利用をお控えください。"] },
      { title: "アカウントの責任", body: ["アカウントの認証情報の機密保持と、アカウント上のすべての活動に対してお客様が責任を負います。", "18歳以上または保護者の同意がある方のみご利用いただけます。"] },
      { title: "注文と支払い", body: ["価格は選択した通貨で表示され、予告なく変更される場合があります。", "不正行為が疑われる場合を含め、当社の裁量で注文をキャンセルする権利を留保します。", "支払いはチェックアウト時に請求されます。"] },
      { title: "配送と返品", body: ["配送予定時間はチェックアウト時に提供され、場所によって異なる場合があります。", "対象商品は配送後30日以内に、未使用かつ元の包装で返品を受け付けます。", "返金は商品受領後7〜10営業日以内に処理されます。"] },
      { title: "知的財産", body: ["このプラットフォーム上のすべてのコンテンツはShopifyの所有物であり、適用される知的財産法によって保護されています。", "書面による明示的な許可なしに複製・配布することはできません。"] },
      { title: "責任の制限", body: ["法律で許可される最大限の範囲で、Shopifyはプラットフォームの使用から生じる間接的・付随的な損害について責任を負いません。"] },
      { title: "準拠法", body: ["本規約は日本国法に準拠します。"] },
      { title: "規約の変更", body: ["規約はいつでも更新される場合があります。変更後も継続してプラットフォームを使用することは、改訂された規約への同意とみなされます。"] },
    ],
  },
};

export default function TermsPage() {
  const lang = useLang();
  const c = content[lang];
  return (
    <StaticPage titleKey="termsTitle">
      <p className="text-xs text-text-muted">{c.lastUpdated}</p>
      {c.sections.map((s) => (
        <Section key={s.title} title={s.title}>
          {s.body.map((p, i) => <p key={i}>{p}</p>)}
        </Section>
      ))}
    </StaticPage>
  );
}
