import { ReactNode } from "react";
import logoUrl from "@assets/logo_transparent.png";

export function CustomerLayout({ children, hideLogo = false }: { children: ReactNode, hideLogo?: boolean }) {
  return (
    <div className="h-screen w-full bg-[#F5E6D3] relative overflow-hidden flex flex-col items-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-100/50 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md z-10 flex flex-col h-full overflow-hidden">
        {/* Logo Header */}
        {!hideLogo && (
          <div className="flex flex-col items-center mb-6 mt-4 flex-shrink-0">
            <div className="w-32 transition-transform duration-300">
              <img 
                src={logoUrl} 
                alt="Made in 2020 Logo" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {children}
        </div>

        {/* Footer (only if logo shown) */}
        {!hideLogo && (
          <p className="text-center text-stone-400 font-bold text-[10px] py-4 uppercase tracking-widest opacity-60 flex-shrink-0">
            &copy; {new Date().getFullYear()} Cafe 2020. Powered by ReserveGo
          </p>
        )}
      </div>
    </div>
  );
}
