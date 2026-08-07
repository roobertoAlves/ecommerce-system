"use client";

import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const FooterTop = () => {
  const t = useTranslations("footer");

  const items = [
    { key: "visit" as const,   descKey: "visitDesc" as const, Icon: MapPin,  href: null,                              desc: null },
    { key: "hours" as const,   descKey: "hoursDesc" as const, Icon: Clock,   href: null,                              desc: null },
    { key: "call" as const,    descKey: null,                 Icon: Phone,   href: "tel:+5511964914751",              desc: "(11) 96491-4751" },
    { key: "emailUs" as const, descKey: null,                 Icon: Mail,    href: "mailto:jbetodamasceno@gmail.com", desc: "jbetodamasceno@gmail.com" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-b border-border py-2">
      {items.map(({ key, descKey, Icon, href, desc }) => {
        const inner = (
          <div
            className="flex items-center gap-3 group hover:bg-bg-secondary p-4 rounded-xl transition-colors duration-300 w-full"
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
        );

        return href ? (
          <Link key={key} href={href} className="block">
            {inner}
          </Link>
        ) : (
          <div key={key}>{inner}</div>
        );
      })}
    </div>
  );
};

export default FooterTop;
