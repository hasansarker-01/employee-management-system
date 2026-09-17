function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>

        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>

        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">{text}</p>
    </div>
  );
}

export default Loader;
