import { ReactNode } from "react";
import logoUrl from "@assets/logo_transparent.png";

export function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5E6D3] relative overflow-x-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-100/50 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md z-10 flex flex-col py-4 md:py-6 lg:py-8 h-full max-h-screen">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-6 md:mb-8 flex-shrink-0">
          <div className="w-40 md:w-48 transition-transform duration-300">
            <img 
              src={logoUrl} 
              alt="Made in 2020 Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl ring-1 ring-black/5 mb-8 md:mb-16 flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-stone-400 font-bold text-[10px] mt-2 md:mt-4 uppercase tracking-widest opacity-60 flex-shrink-0">
          &copy; {new Date().getFullYear()} Cafe 2020. Powered by ReserveGo
        </p>
      </div>
    </div>
  );
}
