"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/PageHeader';
import { contactService } from '@/services/contactService';

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await contactService.submit({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch for custom inquiries, support, or just to say hello."
      />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">

          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="bg-card p-10 md:p-14 rounded-[3rem] shadow-xl border border-border/50"
            >
              <h2 className="text-3xl font-serif text-primary mb-8">Send a Message</h2>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-primary mb-3">Message Sent!</h3>
                  <p className="text-muted font-light mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <Button onClick={() => setStatus('idle')} variant="outline" className="rounded-full px-8 h-12 uppercase tracking-widest text-xs border-primary text-primary">
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-muted">First Name</label>
                      <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-muted">Last Name</label>
                      <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted">Email Address</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors text-sm text-primary">
                      <option>General Inquiry</option>
                      <option>Custom Order Request</option>
                      <option>Order Support</option>
                      <option>Press & Partnerships</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted">Message</label>
                    <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors text-sm resize-none"></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-full h-14 uppercase tracking-widest text-xs shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>
                    ) : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Details & Map */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card p-10 md:p-14 rounded-[3rem] shadow-xl border border-border/50 h-full flex flex-col justify-between space-y-12"
            >
              <div>
                <h2 className="text-3xl font-serif text-primary mb-8">Get In Touch</h2>
                <address className="not-italic space-y-6">
                  <div className="flex items-start gap-4 text-foreground/80 font-light">
                    <MapPin className="w-6 h-6 text-[#C6A26B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-primary mb-1">Our Boutique</p>
                      <p>123 Luxury Avenue, Suite 400<br />New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-foreground/80 font-light">
                    <Phone className="w-6 h-6 text-[#C6A26B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-primary mb-1">Phone</p>
                      <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-foreground/80 font-light">
                    <Mail className="w-6 h-6 text-[#C6A26B] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-primary mb-1">Email</p>
                      <a href="mailto:hello@thehamperhouse.com" className="hover:text-primary transition-colors">hello@thehamperhouse.com</a>
                    </div>
                  </div>
                </address>
              </div>

              {/* Map Placeholder */}
              <div
                className="w-full h-64 rounded-3xl overflow-hidden bg-background border border-border/50 flex items-center justify-center relative shadow-inner"
                role="img"
                aria-label="Map showing boutique location in New York"
              >
                <div className="absolute inset-0 bg-secondary/10" />
                <div className="relative z-10 flex flex-col items-center text-primary/60">
                  <MapPin className="w-10 h-10 mb-2" aria-hidden="true" />
                  <p className="font-serif">123 Luxury Avenue, New York</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}