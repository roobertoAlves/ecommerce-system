import { FishIcon, HomeIcon, LifeBuoyIcon, SearchXIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Logo */}
        <Logo />

        {/* Icon + 404 */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <span className="text-[9rem] font-black leading-none tracking-tighter text-bg-secondary select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background rounded-full p-3 shadow-lg border border-border">
                <SearchXIcon size={52} strokeWidth={1.5} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-widest text-text-primary uppercase">
            Sorry
          </h1>
          <p className="text-sm font-bold tracking-[0.25em] text-primary uppercase">
            Page Not Found
          </p>
          <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-muted tracking-widest uppercase">error 404</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-btn-primary text-white text-sm font-semibold hover:bg-btn-primary-hover transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <HomeIcon size={16} />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border text-text-primary text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300"
          >
            <SearchXIcon size={16} />
            Browse Shop
          </Link>
        </div>

        {/* Help links */}
        <div className="flex items-center justify-center gap-1 text-xs text-text-muted flex-wrap">
          <LifeBuoyIcon size={13} />
          <span>Need help?</span>
          <Link href="/help" className="text-primary hover:text-primary-dark font-medium transition-colors duration-300">
            Visit our Help Center
          </Link>
          <span>or</span>
          <Link href="/contact" className="text-primary hover:text-primary-dark font-medium transition-colors duration-300">
            Contact us
          </Link>
        </div>

        {/* Decorative fish */}
        <div className="flex items-center justify-center gap-6 opacity-20 pt-2">
          <FishIcon size={18} className="text-accent -scale-x-100" />
          <FishIcon size={12} className="text-secondary" />
          <FishIcon size={22} className="text-primary -scale-x-100" />
          <FishIcon size={14} className="text-accent" />
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
