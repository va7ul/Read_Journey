'use client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.error(error.message);
  return (
    <html>
      <body>
        <h2>Something does wrong! 😢 Try again!</h2>
      </body>
    </html>
  );
}
