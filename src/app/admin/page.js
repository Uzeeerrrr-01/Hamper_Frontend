"use client";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

const salesData = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 139 },
  { name: 'Mar', revenue: 2000, orders: 980 },
  { name: 'Apr', revenue: 2780, orders: 390 },
  { name: 'May', revenue: 1890, orders: 480 },
  { name: 'Jun', revenue: 2390, orders: 380 },
  { name: 'Jul', revenue: 3490, orders: 430 },
];

export default function AdminDashboard() {
  const kpis = [
    { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, trend: "+20.1% from last month" },
    { title: "Active Orders", value: "356", icon: ShoppingBag, trend: "+12.5% from last month" },
    { title: "Total Customers", value: "2,304", icon: Users, trend: "+4.3% from last month" },
    { title: "Conversion Rate", value: "3.24%", icon: TrendingUp, trend: "+1.2% from last month" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-serif text-primary mb-2">Welcome Back, Eleanor.</h1>
        <p className="text-foreground/60 text-sm">Here is what's happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-card p-6 rounded-[2rem] shadow-sm border border-secondary/20 hover:border-primary/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xs font-medium text-foreground/60 uppercase tracking-widest">{kpi.title}</h3>
              <div className="p-2 bg-secondary/30 rounded-xl text-primary">
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-serif text-primary">{kpi.value}</span>
            </div>
            <p className="text-xs text-accent font-medium tracking-wide">{kpi.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20">
          <h3 className="text-lg font-serif text-primary mb-8">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFD8E0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8a7780', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8a7780', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#FCFAF8', borderRadius: '12px', border: '1px solid #EFD8E0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#5B1F3A', fontWeight: 600, fontFamily: 'serif' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#5B1F3A" strokeWidth={3} dot={{r: 4, fill: '#5B1F3A', strokeWidth: 2, stroke: '#FCFAF8'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20">
          <h3 className="text-lg font-serif text-primary mb-8">Orders Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFD8E0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8a7780', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8a7780', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  cursor={{fill: '#EFD8E0', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#FCFAF8', borderRadius: '12px', border: '1px solid #EFD8E0' }}
                />
                <Bar dataKey="orders" fill="#C6A26B" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-secondary/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-serif text-primary">Recent Activity Logs</h3>
          <button className="text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { action: "New Order #ORD-1002", time: "2 hours ago", status: "Payment Completed" },
            { action: "Product 'Blush Romance' updated", time: "5 hours ago", status: "Stock Adjusted" },
            { action: "New custom quote request", time: "1 day ago", status: "Pending Review" },
          ].map((log, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-background rounded-2xl border border-primary/5 hover:border-primary/10 transition-colors">
              <div className="flex flex-col mb-2 sm:mb-0">
                <span className="font-medium text-sm text-foreground">{log.action}</span>
                <span className="text-[11px] uppercase tracking-wider text-foreground/50 mt-1">{log.time}</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest px-4 py-2 bg-secondary/30 text-primary rounded-full font-semibold">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
