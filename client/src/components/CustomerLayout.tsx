import { ReactNode } from "react";
import { Coffee } from "lucide-react";

export function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-[#F5E6D3] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-100/50 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md z-10 h-full flex flex-col py-8 overflow-hidden">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-6 flex-shrink-0">
          <div className="bg-[#FFCC00] p-4 rounded-xl shadow-lg border-4 border-white mb-4 rotate-3 transform hover:rotate-0 transition-transform duration-300">
            <h1 className="text-2xl font-black text-black tracking-tight font-display uppercase flex items-center gap-2">
              <Coffee className="w-6 h-6" />
              Cafe 2020
            </h1>
          </div>
          <p className="text-stone-600 font-bold tracking-widest text-xs uppercase opacity-80">Queue Management</p>
        </div>

        {/* Main Content Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl ring-1 ring-black/5 overflow-y-auto no-scrollbar flex-1 mb-24">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-stone-400 font-bold text-[10px] mt-4 uppercase tracking-widest opacity-60 flex-shrink-0">
          &copy; {new Date().getFullYear()} Cafe 2020. Powered by ReserveGo
        </p>
      </div>
    </div>
  );
}
