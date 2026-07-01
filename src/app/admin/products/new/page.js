"use client";
import { useState } from "react";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    isFeatured: false,
    isActive: true
  });
  
  // Fake category data for now
  const categories = [
    { id: "cat1", name: "Gift Hampers" },
    { id: "cat2", name: "Bouquets" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, upload images to Cloudinary first, get URLs, then post to API
      console.log("Submitting:", formData);
      await new Promise(r => setTimeout(r, 1000)); // Simulating network request
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-secondary/20 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 border border-secondary rounded-full hover:bg-secondary/30 transition-colors text-primary">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-primary mb-1">Add New Product</h1>
            <p className="text-foreground/60 text-sm">Create a new luxury offering.</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-secondary px-8 py-3 rounded-xl uppercase tracking-[0.2em] text-xs font-medium hover:bg-primary/90 transition-all flex items-center shadow-md hover:shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20 space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-secondary/20 pb-4">Basic Information</h3>
            
            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Product Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. The Royal Treatment Hamper"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Description</label>
              <textarea 
                rows="6"
                required 
                className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm resize-none transition-all"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the luxury contents..."
              ></textarea>
            </div>
          </div>

          <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20 space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-secondary/20 pb-4">Media Gallery (Cloudinary)</h3>
            <div className="border-2 border-dashed border-primary/20 rounded-[1.5rem] p-12 text-center hover:bg-secondary/10 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] bg-background/30">
              <Upload className="w-10 h-10 text-accent mb-4" />
              <p className="text-sm text-foreground/80 font-medium mb-1">Drag and drop images here</p>
              <p className="text-xs text-foreground/50">High-resolution PNG, JPG up to 5MB</p>
              <button type="button" className="mt-6 px-6 py-2 border border-primary/20 rounded-full text-xs uppercase tracking-widest text-primary font-medium hover:bg-primary/5 transition-colors">
                Browse Files
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20 space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-secondary/20 pb-4">Organization</h3>
            
            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Category</label>
              <select 
                className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm appearance-none transition-all"
                value={formData.categoryId}
                onChange={e => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="pt-4 border-t border-secondary/20">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-primary/20 text-primary focus:ring-primary accent-primary"
                  checked={formData.isActive}
                  onChange={e => setFormData({...formData, isActive: e.target.checked})}
                />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">Active (Visible on site)</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-primary/20 text-primary focus:ring-primary accent-primary"
                  checked={formData.isFeatured}
                  onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">Featured Product</span>
              </label>
            </div>
          </div>

          <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20 space-y-6">
            <h3 className="text-lg font-serif text-primary border-b border-secondary/20 pb-4">Pricing & Inventory</h3>
            
            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Price (USD)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/50 font-medium">$</span>
                <input 
                  type="number" 
                  required 
                  className="w-full pl-10 pr-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm transition-all"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-2 uppercase tracking-wider">Stock Quantity</label>
              <input 
                type="number" 
                required 
                className="w-full px-5 py-4 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm transition-all"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: e.target.value})}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
