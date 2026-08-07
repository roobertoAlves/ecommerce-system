"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrency } from "@/context/CurrencyContext";
import type { SupportedCurrency } from "../../actions/currency";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export interface LocalAddress {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  default?: boolean;
}

// ---------------------------------------------------------------------------
// Per-currency postal lookup config
// ---------------------------------------------------------------------------
interface PostalConfig {
  /** ISO 3166-1 alpha-2 country code used by Zippopotam.us */
  countryCode: string;
  /** Max length of the raw postal code (digits + letters) */
  maxLength: number;
  /** Strip non-alphanumeric before sending to API */
  stripChars: RegExp;
  /** Minimum length needed to trigger the lookup */
  triggerLength: number;
  /** Whether to use ViaCEP instead of Zippopotam (BR only) */
  useViaCep?: boolean;
  /** Whether automatic lookup is not supported — user must fill manually */
  manualOnly?: boolean;
}

const POSTAL_CONFIGS: Record<SupportedCurrency, PostalConfig> = {
  brl: { countryCode: "BR", maxLength: 8,  stripChars: /\D/g,          triggerLength: 8,  useViaCep: true },
  usd: { countryCode: "US", maxLength: 5,  stripChars: /\D/g,          triggerLength: 5  },
  gbp: { countryCode: "GB", maxLength: 7,  stripChars: /[^A-Z0-9]/gi,  triggerLength: 5  },
  eur: { countryCode: "DE", maxLength: 5,  stripChars: /\D/g,          triggerLength: 5  },
  cad: { countryCode: "CA", maxLength: 6,  stripChars: /[^A-Z0-9]/gi,  triggerLength: 6  },
  aud: { countryCode: "AU", maxLength: 4,  stripChars: /\D/g,          triggerLength: 4  },
  jpy: { countryCode: "JP", maxLength: 7,  stripChars: /\D/g,          triggerLength: 7  },
  mxn: { countryCode: "MX", maxLength: 5,  stripChars: /\D/g,          triggerLength: 5, manualOnly: true },
};

// ---------------------------------------------------------------------------
// Lookup functions
// ---------------------------------------------------------------------------
interface NormalizedAddress { street: string; city: string; state: string }

async function lookupViaCep(zip: string): Promise<NormalizedAddress | null> {
  const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
  const data = await res.json();
  if (data.erro) return null;
  return {
    street: [data.logradouro, data.bairro].filter(Boolean).join(", "),
    city: data.localidade,
    state: data.uf,
  };
}

async function lookupZippopotam(countryCode: string, zip: string): Promise<NormalizedAddress | null> {
  const res = await fetch(`https://api.zippopotam.us/${countryCode}/${encodeURIComponent(zip)}`);
  if (!res.ok) return null;
  const data = await res.json();
  const place = data.places?.[0];
  if (!place) return null;
  return {
    street: "",
    city: place["place name"] ?? "",
    state: place["state abbreviation"] ?? place["state"] ?? "",
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const emptyForm = { name: "", zip: "", address: "", number: "", complement: "", city: "", state: "" };

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (address: LocalAddress) => Promise<void>;
}

export default function AddressModal({ open, onClose, onSave }: Props) {
  const t = useTranslations("addressModal");
  const { currency } = useCurrency();
  const config = POSTAL_CONFIGS[currency];

  const [form, setForm] = useState(emptyForm);
  const [loadingZip, setLoadingZip] = useState(false);
  const [zipError, setZipError] = useState("");
  const [saving, setSaving] = useState(false);
  const zipRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setZipError("");
      setTimeout(() => zipRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  const set = (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(config.stripChars, "").slice(0, config.maxLength).toUpperCase();
    setForm((prev) => ({ ...prev, zip: raw }));
    setZipError("");
    if (!config.manualOnly && raw.length >= config.triggerLength) {
      fetchPostal(raw);
    }
  };

  const fetchPostal = async (zip: string) => {
    setLoadingZip(true);
    setZipError("");
    try {
      const result = config.useViaCep
        ? await lookupViaCep(zip)
        : await lookupZippopotam(config.countryCode, zip);

      if (!result) {
        setZipError(t("postalCodeNotFound"));
        setForm((prev) => ({ ...prev, address: "", city: "", state: "" }));
      } else {
        setForm((prev) => ({
          ...prev,
          address: result.street || prev.address,
          city: result.city,
          state: result.state,
        }));
      }
    } catch {
      setZipError(t("postalCodeError"));
    } finally {
      setLoadingZip(false);
    }
  };

  const isValid =
    form.name.trim().length > 0 &&
    form.zip.length >= config.triggerLength &&
    form.address.trim().length > 0 &&
    form.number.trim().length > 0 &&
    form.city.trim().length > 0 &&
    form.state.trim().length > 0;

  const handleSave = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    try {
      const fullAddress = `${form.address}, ${form.number}${form.complement ? ` - ${form.complement}` : ""}`;
      await onSave({
        _id: `local-${crypto.randomUUID()}`,
        name: form.name.trim(),
        zip: form.zip,
        address: fullAddress,
        city: form.city,
        state: form.state,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">{t("title")}</h2>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manual-only hint */}
        {config.manualOnly && (
          <p className="text-xs text-text-muted bg-bg-secondary border border-border rounded-lg px-3 py-2">
            {t("manualHint")}
          </p>
        )}

        {/* Postal code */}
        <div className="space-y-1.5">
          <Label htmlFor="zip" className="text-text-primary">{t("postalCode")}</Label>
          <div className="relative">
            <Input
              id="zip"
              ref={zipRef}
              placeholder={t("postalCodePlaceholder")}
              value={form.zip}
              onChange={handleZipChange}
              maxLength={config.maxLength}
              className="pr-10 uppercase"
              disabled={config.manualOnly}
            />
            {!config.manualOnly && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                {loadingZip ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </div>
            )}
          </div>
          {zipError && <p className="text-xs text-danger">{zipError}</p>}
          {!config.manualOnly && (
            <p className="text-xs text-text-muted">{t("postalCodeHint")}</p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-1.5">
          <Label htmlFor="address" className="text-text-primary">{t("street")}</Label>
          <Input id="address" placeholder={t("streetPlaceholder")} value={form.address} onChange={set("address")} />
        </div>

        {/* Number + complement */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="number" className="text-text-primary">
              {t("number")} <span className="text-danger">{t("required")}</span>
            </Label>
            <Input id="number" placeholder={t("numberPlaceholder")} value={form.number} onChange={set("number")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="complement" className="text-text-primary">{t("complement")}</Label>
            <Input id="complement" placeholder={t("complementPlaceholder")} value={form.complement} onChange={set("complement")} />
          </div>
        </div>

        {/* City + state */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="city" className="text-text-primary">{t("city")}</Label>
            <Input id="city" value={form.city} onChange={set("city")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="state" className="text-text-primary">{t("state")}</Label>
            <Input id="state" value={form.state} onChange={set("state")} maxLength={5} className="uppercase" />
          </div>
        </div>

        {/* Recipient */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-text-primary">
            {t("recipient")} <span className="text-danger">{t("required")}</span>
          </Label>
          <Input id="name" placeholder={t("recipientPlaceholder")} value={form.name} onChange={set("name")} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={saving}>
            {t("cancel")}
          </Button>
          <Button className="flex-1" disabled={!isValid || saving} onClick={handleSave}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
