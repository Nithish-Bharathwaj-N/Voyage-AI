export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center space-y-4">
      <div className="flex space-x-2 justify-center items-center">
        <span className="sr-only">Loading workspace...</span>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse font-sans">
        Assembling VoyageAI Workspace...
      </p>
    </div>
  );
}
