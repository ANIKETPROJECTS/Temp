import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQueueStatus } from "@/hooks/use-queue";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Loader2, Share2, Navigation, Check } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import logoUrl from "@assets/logo_transparent.png";

export default function QueueStatus() {
  const [, params] = useRoute("/queue/:id");
  const [, setLocation] = useLocation();
  const id = parseInt(params?.id || "0");
  
  const { data: queue, isLoading, error } = useQueueStatus(id);

  useEffect(() => {
    if (!queue) return;
    if (queue.status === "called") {
      setLocation(`/queue/${id}/accept`);
    } else if (queue.status === "completed") {
      setLocation(`/queue/${id}/confirmed`);
    } else if (queue.status === "expired" || queue.status === "cancelled") {
      setLocation(`/queue/${id}/expired`);
    }
  }, [queue, id, setLocation]);

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="flex flex-col items-center justify-center py-12 text-stone-400">
          <Loader2 className="w-12 h-12 animate-spin mb-4 text-orange-500" />
          <p>Finding your booking...</p>
        </div>
      </CustomerLayout>
    );
  }

  if (error || !queue) {
    return (
      <CustomerLayout>
        <div className="text-center py-8">
          <h2 className="text-xl font-bold text-red-500 mb-2">Booking Not Found</h2>
          <p className="text-stone-500">Could not find queue entry #{id}.</p>
          <a href="/" className="inline-block mt-4 text-orange-500 font-medium hover:underline">Return Home</a>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout hideLogo>
      <div className="flex flex-col items-center w-full h-full max-h-[85vh] overflow-hidden">
        {/* Our Brand Logo at top */}
        <div className="w-24 mb-4 flex-shrink-0">
          <img src={logoUrl} alt="Cafe 2020" className="w-full h-auto object-contain" />
        </div>

        {/* Success Icon & Heading */}
        <div className="flex flex-col items-center mb-4 flex-shrink-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#86C37A] text-white w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm"
          >
            <Check className="w-7 h-7 stroke-[3]" />
          </motion.div>
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">Queued!</h2>
          <p className="text-[10px] font-bold text-stone-500 mt-1 uppercase text-center px-4 leading-tight">
            Restaurant Timings: 10:30 am to 10:30 pm (Monday to Sunday)
          </p>
        </div>

        {/* Queue Number */}
        <div className="text-center mb-6 flex-shrink-0">
          <span className="text-stone-900 font-bold text-xs block mb-1">Your queue number is</span>
          <h1 className="text-6xl font-black text-stone-900 tracking-tighter">
            # {queue.queueNumber}
          </h1>
        </div>

        {/* Compact Side-by-Side Cards */}
        <div className="grid grid-cols-2 gap-3 w-full mb-4 flex-shrink-0">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100 flex flex-col items-center justify-center">
            <span className="text-stone-500 font-bold text-[10px] uppercase mb-1">Booking for</span>
            <span className="text-[#F39C12] text-2xl font-black">{queue.numberOfPeople}</span>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center">
            <span className="text-stone-500 font-bold text-[10px] uppercase mb-1">Date & Time</span>
            <span className="text-[#F39C12] text-sm font-black leading-tight">
              {format(new Date(queue.createdAt!), 'dd MMM, hh:mm a')}
            </span>
          </div>
        </div>

        {/* Name & Leave Queue */}
        <div className="flex flex-col items-center mb-6 flex-shrink-0">
          <p className="text-stone-500 font-bold text-[10px] mb-3 uppercase">Name: {queue.name}</p>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white text-stone-900 border-stone-200 font-black px-6 h-10 rounded-lg shadow-sm hover:bg-stone-50 uppercase tracking-wide text-xs"
          >
            Leave Queue
          </Button>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 flex h-14 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
          <button className="flex-1 flex items-center justify-center gap-2 font-black text-stone-800 border-r border-stone-100 hover:bg-stone-50 transition-colors uppercase tracking-tight text-sm">
            <Share2 className="w-4 h-4" />
            Share with Friends
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 font-black text-white bg-[#FF9933] hover:bg-[#e68a2e] transition-colors uppercase tracking-tight text-sm">
            <Navigation className="w-4 h-4" />
            Get Direction
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
}
