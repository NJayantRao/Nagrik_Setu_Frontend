function ComplaintsSkeleton() {
  return (
    <div className="h-12 sm:h-17 max-w-[90vw] sm:max-w-[85vw] rounded-2xl p-2 bg-white flex items-center relative shadow-lg">
      {/* Image */}
      <div className="skeleton h-8 sm:h-12 w-10 sm:w-15 rounded-lg"></div>

      {/* Text */}
      <div className="flex flex-col px-3 sm:px-5 gap-2">
        <div className="skeleton h-4 sm:h-5 w-[35vw] sm:w-[25vw] rounded-md"></div>
        <div className="skeleton h-3 sm:h-4 w-[28vw] sm:w-[20vw] rounded-md"></div>
      </div>

      {/* Status */}
      <div className="flex gap-3 items-center absolute right-5 sm:right-10 w-40">
        <div className="skeleton h-8 w-8 sm:h-10 sm:w-10 rounded-lg"></div>
        <div className="hidden sm:block skeleton h-5 w-20 rounded-md"></div>
      </div>
    </div>
  );
}

export default ComplaintsSkeleton;
