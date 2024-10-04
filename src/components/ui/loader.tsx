export const Loader = () => (
  <div
    className={
      "h-min-80 absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center"
    }
  >
    <div
      className="text-blue-600 inline-block size-10 animate-spin rounded-full border-[3px] border-gray-300 border-t-transparent dark:text-blue-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
