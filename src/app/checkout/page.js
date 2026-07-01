"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CreditCard, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/dummy-data';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = [
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[1], quantity: 2 }
  ];
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    router.push('/order-success');
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-primary mb-4">Checkout</h1>
          <p className="text-muted font-light flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> Secure SSL Encrypted Payment
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column - Forms */}
          <div className="w-full lg:w-3/5 space-y-12">
            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-12">
              
              {/* Shipping Address */}
              <section>
                <h2 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">First Name</label>
                    <input required type="text" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Last Name</label>
                    <input required type="text" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Email Address</label>
                    <input required type="email" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Address Line 1</label>
                    <input required type="text" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">City</label>
                    <input required type="text" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted">Postal Code</label>
                    <input required type="text" className="w-full border border-border rounded-xl px-4 py-3 bg-card focus:outline-none focus:border-primary transition-colors text-sm" />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="text-2xl font-serif text-primary mb-6 border-b border-border pb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className={`block border rounded-2xl p-6 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-primary focus:ring-primary" />
                        <span className="font-medium text-foreground">Credit Card</span>
                      </div>
                      <CreditCard className="w-6 h-6 text-muted" />
                    </div>
                    {paymentMethod === 'card' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="pt-6 mt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted">CVC</label>
                          <input type="text" placeholder="123" className="w-full border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary text-sm" />
                        </div>
                      </motion.div>
                    )}
                  </label>

                  <label className={`block border rounded-2xl p-6 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="text-primary focus:ring-primary" />
                        <span className="font-medium text-foreground">PayPal</span>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-card rounded-[2rem] p-10 shadow-sm border border-border/50 sticky top-32">
              <h3 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">Order Summary</h3>
              
              <div className="space-y-6 mb-8 border-b border-border pb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-primary text-sm">{item.name}</span>
                      <span className="text-xs text-muted">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-sm font-light">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 text-sm font-light text-muted mb-8">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-border pt-6 mb-10">
                <span className="font-serif text-xl text-primary">Total</span>
                <span className="font-serif text-3xl text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-xl text-xs text-primary/80 mb-6">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#C6A26B]" />
                  <p>By placing your order, you agree to our Terms & Conditions and Privacy Policy.</p>
                </div>
                <Button type="submit" form="checkout-form" className="w-full rounded-full h-14 uppercase tracking-widest text-xs gap-3 shadow-lg hover:shadow-xl transition-all">
                  Place Order <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}