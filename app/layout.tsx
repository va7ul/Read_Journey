import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Read Journey',
  description: 'An application for reading books',
};

export default function RootLayout({
  header,
  children,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/x-icon"
          href="favicon_light.ico"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="favicon_dark.ico"
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body className="text-white-primary bg-black-primary font-display scroll-smooth text-xs leading-[18px] font-medium">
        {header}
        <main>{children}</main>
      </body>
    </html>
  );
}
