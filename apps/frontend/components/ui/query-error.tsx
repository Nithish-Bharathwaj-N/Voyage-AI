import * as React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface QueryErrorProps {
  message?: string;
  error?: Error | unknown;
  onRetry?: () => void;
}

export function QueryError({ message, error, onRetry }: QueryErrorProps) {
  const getErrorMessage = () => {
    if (message) return message;
    if (error instanceof Error) return error.message;
    if (error && typeof error === 'object' && 'message' in error) {
      return (error as any).message;
    }
    return 'An unexpected API connectivity error occurred. Please verify your connection.';
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50/50 border border-red-100 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-red-100 text-red-650 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-extrabold text-sm text-slate-900 font-display">
          Network Connectivity Error
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {getErrorMessage()}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-100 hover:bg-red-200:bg-red-900/30 text-red-750 rounded-xl text-xs font-bold transition-all cursor-pointer border border-red-200/50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
