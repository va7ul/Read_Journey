import { cookies } from 'next/headers';
import './globals.css';

import { refreshUser } from '@/assets/api';

import { Provider } from './components/Provider';
import { UserAuthInit } from './components/UserAuthInit';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read Journey',
  description: 'An application for reading books',
};

export default async function RootLayout({
  header,
  children,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user = null;
  let isError = false;

  if (token) {
    try {
      user = await refreshUser(token);
    } catch (error) {
      console.error(error);
      isError = true;
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/x-icon" href="favicon_light.ico" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/x-icon" href="favicon_dark.ico" media="(prefers-color-scheme: light)" />
      </head>
      <body className="text-white-primary bg-black-primary font-display scroll-smooth text-xs font-medium md:text-sm">
        <Provider>
          <UserAuthInit user={user} isError={isError} />
          {header}
          <main>
            <h1 className="hidden">Read journey</h1>
            {children}
          </main>
          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  );
}
