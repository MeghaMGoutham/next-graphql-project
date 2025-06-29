'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset} style={{ marginTop: '1rem' }}>
        Try again
      </button>
    </div>
  );
}
