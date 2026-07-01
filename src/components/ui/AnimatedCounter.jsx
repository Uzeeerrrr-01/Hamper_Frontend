"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedCounter({ target, suffix = "", title }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center p-8 bg-card rounded-[2rem] shadow-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-4xl md:text-5xl font-serif text-primary mb-2">
          {count}{suffix}
        </h4>
        <p className="text-foreground text-sm uppercase tracking-widest">{title}</p>
      </motion.div>
    </div>
  );
}
