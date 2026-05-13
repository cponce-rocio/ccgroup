import React, { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 animate-fade-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-500 border ${
        isSuccess
          ? 'bg-white border-green-200 text-green-800 hover:shadow-xl'
          : 'bg-white border-red-200 text-red-800 hover:shadow-xl'
      } transition-shadow duration-300`}>
        {isSuccess
          ? <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          : <XCircle size={18} className="text-red-500 flex-shrink-0" />
        }
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
