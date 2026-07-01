"use client";
import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";

export default function RolesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Roles Management</h1>
          <p className="text-foreground/60 text-sm">Manage and organize your roles from here.</p>
        </div>
        <button className="bg-primary text-secondary px-6 py-3 rounded-xl uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors flex items-center shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-secondary/20 overflow-hidden">
        <div className="p-6 border-b border-secondary/20 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text"
              placeholder="Search roles..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-background/50 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-primary/10 hover:bg-primary/5 transition-colors text-sm font-medium text-foreground/80">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/10 text-primary/80 uppercase tracking-widest text-[10px] font-semibold border-b border-secondary/20">
                <th className="p-6 whitespace-nowrap">ID</th>
                <th className="p-6 whitespace-nowrap">Name</th>
                <th className="p-6 whitespace-nowrap">Status</th>
                <th className="p-6 whitespace-nowrap">Date Added</th>
                <th className="p-6 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">
              <tr className="hover:bg-secondary/5 transition-colors">
                <td className="p-6 text-sm text-foreground/60">#1001</td>
                <td className="p-6 text-sm font-medium text-primary">Sample Roles</td>
                <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span></td>
                <td className="p-6 text-sm text-foreground/60">Oct 24, 2026</td>
                <td className="p-6 text-right space-x-3">
                  <button className="text-accent hover:text-primary transition-colors text-sm font-medium">Edit</button>
                  <button className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-secondary/20 flex justify-between items-center text-sm text-foreground/60">
          <span>Showing 1 to 10 of 42 results</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-primary/10 rounded-lg hover:bg-primary/5 disabled:opacity-50">Prev</button>
            <button className="px-4 py-2 border border-primary/10 rounded-lg hover:bg-primary/5">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}