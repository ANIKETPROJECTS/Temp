import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQueueStatus } from "@/hooks/use-queue";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Users, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function QueueStatus() {
  const [, params] = useRoute("/queue/:id");
  const [, setLocation] = useLocation();
  const id = parseInt(params?.id || "0");
  
  const { data: queue, isLoading, error } = useQueueStatus(id);

  // Auto-redirect based on status
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
    <CustomerLayout>
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <h2 className="text-4xl font-black text-stone-800 tracking-tight">Queued!</h2>
        
        <p className="text-stone-800 text-[10px] font-bold opacity-70 uppercase tracking-widest">
          Restaurant Timings: 10:30 am to 10:30 pm (Monday to Sunday)
        </p>

        <div className="py-2">
          <span className="text-stone-800 font-bold text-sm block mb-1">Your queue number is</span>
          <h1 className="text-7xl font-black text-stone-800 tracking-tighter">
            # {queue.queueNumber}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col items-center justify-center min-h-[120px]">
            <span className="text-stone-800 font-bold text-sm mb-2 opacity-60">Booking for</span>
            <span className="text-orange-500 text-4xl font-black">{queue.numberOfPeople}</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex flex-col items-center justify-center min-h-[120px]">
            <span className="text-stone-800 font-bold text-sm mb-2 opacity-60">Date & Time</span>
            <span className="text-orange-500 text-lg font-black leading-tight">
              {format(new Date(queue.createdAt!), 'dd MMM, hh:mm a')}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-stone-400 font-bold text-sm mb-4">Name: {queue.name}</p>
          <Button 
            variant="outline" 
            className="bg-white text-stone-800 border-stone-200 font-black px-8 h-12 rounded-xl shadow-sm hover:bg-stone-50 uppercase tracking-wide"
            onClick={() => {/* Add leave queue logic if needed */}}
          >
            Leave Queue
          </Button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex border-t border-stone-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button className="flex-1 h-16 flex items-center justify-center gap-2 font-black text-stone-800 border-r border-stone-200 hover:bg-stone-50 transition-colors uppercase tracking-tight text-lg">
            Share with Friends
          </button>
          <button className="flex-1 h-16 flex items-center justify-center gap-2 font-black text-white bg-[#FF9933] hover:bg-[#e68a2e] transition-colors uppercase tracking-tight text-lg">
            Get Direction
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
}
