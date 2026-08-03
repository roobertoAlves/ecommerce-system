"use client";

import { useUser } from "@clerk/nextjs";
import { CheckCircle2, Home, Package, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useStore from "../../../../store";

const SuccessPage = () => {
  const { user } = useUser();
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (session_id) resetCart();
  }, [resetCart, session_id]);

  return (
    <div className="min-h-[80vh] bg-bg flex items-center justify-center px-4 py-12">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-surface border border-border rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary-light rounded-t-3xl" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 18 }}
          className="mx-auto mb-6 relative w-24 h-24"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ delay: 0.5, duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
            className="absolute inset-0 rounded-full bg-success/30"
          />
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success/20 to-primary/20 border-2 border-success/40 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-success" strokeWidth={1.5} />
          </div>
        </motion.div>

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: (i - 1) * 60, y: -40 - i * 10 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.8 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>
        ))}

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
        >
          Order Confirmed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-text-muted text-sm mb-6"
        >
          {user?.firstName ? `Thank you, ${user.firstName}! 🎉` : "Thank you for your purchase! 🎉"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-bg-secondary border border-border rounded-xl p-4 mb-8 text-left space-y-3"
        >
          <p className="text-sm text-text-muted leading-relaxed">
            We&apos;re processing your order and will ship it soon. A confirmation email will be sent to your inbox shortly.
          </p>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Order Number</span>
            <span className="text-sm font-bold text-primary font-mono tracking-wider">
              {orderNumber ?? "—"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary-dark transition-colors duration-200 shadow-md shadow-primary/20"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-bg-secondary text-text-primary border border-border hover:bg-primary/10 hover:border-primary/40 transition-colors duration-200"
          >
            <Package className="w-4 h-4" /> My Orders
          </Link>
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-accent text-white hover:bg-primary transition-colors duration-200 shadow-md shadow-accent/20"
          >
            <ShoppingBag className="w-4 h-4" /> Keep Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
