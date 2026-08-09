import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useAdminState } from '../context/AdminStateContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useAdminState();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';
          const isError = toast.type === 'error';

          let Icon = Info;
          let bgColor = 'bg-white';
          let textColor = 'text-[#1D2A72]';
          let iconColor = 'text-[#5A67F2]';
          let borderColor = 'border-[#5A67F2]/20';

          if (isSuccess) {
            Icon = CheckCircle;
            iconColor = 'text-[#35C76F]';
            borderColor = 'border-[#35C76F]/20';
          } else if (isWarning) {
            Icon = AlertTriangle;
            iconColor = 'text-amber-500';
            borderColor = 'border-amber-500/20';
          } else if (isError) {
            Icon = AlertCircle;
            iconColor = 'text-red-500';
            borderColor = 'border-red-500/20';
          }

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              className={`pointer-events-auto flex items-center gap-3 p-4 rounded-[16px] bg-white border ${borderColor} shadow-[0_8px_30px_rgb(0,0,0,0.06)]`}
            >
              <div className={`${iconColor} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`flex-1 text-sm font-medium ${textColor}`}>
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
