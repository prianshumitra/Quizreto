import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`animate-pulse bg-[#E7DBCC]/60 rounded-xl ${className}`} />;
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E7DBCC] shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="pt-4 flex justify-between items-center border-t border-[#E7DBCC]/50">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
};
