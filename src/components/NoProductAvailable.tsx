import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-bg-secondary rounded-lg w-full mt-10",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-text-muted"
      >
        <h2 className="text-2xl font-bold text-text-primary">
          No Products Available
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-text-muted"
      >
        We&apos;re sorry, but there are no products matching on{" "}
        <span className="font-semibold text-text-primary">{selectedTab}</span>{" "}
        criteria at the moment.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-primary"
      >
        <Loader2 className="w-5 h-6 animate-spin" />
        <span>We&apos;re restocking shortly.</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-text-muted"
      >
        Please check back later or explore our other product categories.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
