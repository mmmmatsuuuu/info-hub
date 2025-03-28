'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button 
        onClick={() => reset()}
        className="bg-slate-100 text-slate-500 px-4 py-2 rounded"
      >
        再試行
      </button>
    </div>
  );
}