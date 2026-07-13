import { Loader2 } from "lucide-react";

function Loading({
  text = "Loading...",
  fullScreen = false,
}) {
  const containerClass = fullScreen
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3">
        <Loader2
          size={40}
          className="animate-spin text-blue-600"
        />

        <p className="text-sm text-gray-600 font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Loading;