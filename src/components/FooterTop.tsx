"use client";

import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const FooterTop = () => {
  const t = useTranslations("footer");

  const items = [
    { key: "visit" as const, descKey: "visitDesc" as const, Icon: MapPin },
    { key: "call" as const, descKey: null, Icon: Phone, desc: "+55 11 99999-9999" },
    { key: "hours" as const, descKey: "hoursDesc" as const, Icon: Clock },
    { key: "emailUs" as const, descKey: null, Icon: Mail, desc: "contact@shopify.com" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-b border-border py-2">
      {items.map(({ key, descKey, Icon, desc }) => (
        <div
          key={key}
          className="flex items-center gap-3 group hover:bg-bg-secondary p-4 rounded-xl transition-colors duration-300"
        >
          <Icon className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors shrink-0" />
          <div>
            <h3 className="font-semibold text-text-primary text-sm group-hover:text-primary transition-colors font-poppins">
              {t(key)}
            </h3>
            <p className="text-text-muted text-xs mt-0.5 font-poppins">
              {descKey ? t(descKey) : desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
