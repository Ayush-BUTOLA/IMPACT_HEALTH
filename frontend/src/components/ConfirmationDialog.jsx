import React from 'react';
import Modal from './Modal';
import { AlertCircle } from 'lucide-react';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger" // danger | warning | info
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const btnColors = {
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-red-100",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100",
    info: "bg-[#1D2A72] hover:bg-[#1D2A72]/95 text-white shadow-[#1D2A72]/10"
  };

  const iconColors = {
    danger: "text-red-500 bg-red-50 border-red-100",
    warning: "text-amber-500 bg-amber-50 border-amber-100",
    info: "text-[#5A67F2] bg-[#5A67F2]/5 border-[#5A67F2]/10"
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 mb-4 ${iconColors[variant]}`}>
          <AlertCircle className="w-7 h-7" />
        </div>
        <p className="text-sm text-slate-500 font-medium mb-6 max-w-sm">
          {message}
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-[14px] hover:bg-slate-50 transition cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition cursor-pointer shadow-lg ${btnColors[variant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
