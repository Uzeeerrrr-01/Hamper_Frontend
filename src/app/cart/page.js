"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/PageHeader';
import { PRODUCTS } from '@/lib/dummy-data';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[1], quantity: 2 }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0; // Flat dummy shipping
  const total = subtotal + shipping;

  return (
    <main className="bg-background min-h-screen">
      <PageHeader title="Your Cart" subtitle="Review your selected luxury items." />

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-serif text-primary mb-6">Your cart is empty</h2>
              <Link href="/shop">
                <Button className="rounded-full px-8 uppercase tracking-widest text-xs h-14">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Items List */}
              <div className="w-full lg:w-2/3">
                <div className="hidden md:grid grid-cols-6 gap-4 mb-6 pb-4 border-b border-border text-sm uppercase tracking-widest text-muted">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>

                <div className="space-y-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center pb-8 border-b border-border/50">
                      
                      <div className="col-span-3 flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-card shrink-0">
                          <Image src={item.img} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-primary">{item.name}</h3>
                          <p className="text-sm text-muted mb-2">{item.category}</p>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="md:text-center text-muted font-light hidden md:block">
                        ${item.price}
                      </div>

                      <div className="flex items-center justify-center border border-border rounded-full p-1 w-max mx-auto">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-primary hover:bg-primary/5 rounded-full"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center font-serif text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-primary hover:bg-primary/5 rounded-full"><Plus className="w-3 h-3" /></button>
                      </div>

                      <div className="md:text-right font-medium text-primary text-lg hidden md:block">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-card rounded-[2rem] p-10 shadow-sm border border-border/50 sticky top-32">
                  <h3 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">Order Summary</h3>
                  
                  <div className="space-y-4 text-sm font-light text-muted mb-8">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Estimate</span>
                      <span className="text-foreground">${shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-border pt-6 mb-10">
                    <span className="font-serif text-xl text-primary">Total</span>
                    <span className="font-serif text-2xl text-primary">${total.toFixed(2)}</span>
                  </div>

                  <div className="mb-8">
                     <p className="text-xs uppercase tracking-widest text-muted mb-3">Gift Card or Discount Code</p>
                     <div className="flex gap-2">
                       <input type="text" className="w-full border border-border rounded-full px-4 py-2 bg-background focus:outline-none focus:border-primary text-sm" placeholder="Enter code" />
                       <Button variant="outline" className="rounded-full px-6">Apply</Button>
                     </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full rounded-full h-14 uppercase tracking-widest text-xs gap-3">
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </main>
  );
}