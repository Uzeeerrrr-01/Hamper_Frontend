"use client";
import PageTransition from "../../components/ui/PageTransition";

export default function CustomOrdersPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-serif text-primary mb-6">Custom Orders</h1>
        <p className="text-foreground/80 max-w-2xl font-light">
          This is a scaffolded page for Custom Orders. Content will be added here in the future.
        </p>
      </div>
    </PageTransition>
  );
}