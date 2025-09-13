"use client";

export default function LoadingScreen({
  message = "Processing...",
}: {
  message?: string;
}) {
  return (
    <div className="absolute left-0 top-0 flex flex-col items-center justify-center w-full h-full bg-base-100 text-base-content z-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-primary mb-6"></div>

      {/* Message */}
      <p className="text-xl font-medium text-center">{message}</p>
    </div>
  );
}
