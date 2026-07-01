"use client";
import React, { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Accordion from '@/components/ui/Accordion';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFetch } from '@/hooks/useFetch';
import { cmsService } from '@/services/cmsService';
import { FAQS } from '@/lib/dummy-data';

export default function FAQPage() {
  const { data: cmsData, loading, error } = useFetch(() => cmsService.getFaq());
  const [activeTab, setActiveTab] = useState("Shopping");

  const rawFaqs = cmsData?.faqs || cmsData?.data || (Array.isArray(cmsData) ? cmsData : null);
  const allFaqs = rawFaqs?.length > 0 ? rawFaqs : FAQS;
  const tabs = [...new Set(allFaqs.map(f => f.category))];
  const filteredFaqs = allFaqs.filter(faq => faq.category === activeTab);

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our products, ordering process, and policies."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
            </div>
          ) : error ? (
            <ErrorState message="Failed to load FAQs. Showing default answers." />
          ) : (
            <>
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-16" role="tablist" aria-label="FAQ Categories">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`faq-panel-${tab}`}
                    className={`px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-card text-muted hover:text-primary hover:bg-primary/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Accordion */}
              <div
                id={`faq-panel-${activeTab}`}
                role="tabpanel"
                aria-label={`${activeTab} FAQs`}
              >
                {filteredFaqs.length === 0 ? (
                  <EmptyState title="No FAQs in this category" description="Please check another category or contact us." />
                ) : (
                  <Accordion items={filteredFaqs} />
                )}
              </div>
            </>
          )}

          {/* Contact CTA */}
          <div className="mt-24 text-center bg-card p-12 rounded-[3rem] border border-border/50">
            <h2 className="text-3xl font-serif text-primary mb-4">Still have questions?</h2>
            <p className="text-muted font-light mb-8 max-w-lg mx-auto">If you couldn't find the answer to your question, our concierge team is always here to help.</p>
            <a
              href="/contact"
              className="inline-block bg-primary text-primary-foreground px-10 py-5 rounded-full uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Contact our support team"
            >
              Contact Support
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}