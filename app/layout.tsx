import type { Metadata } from 'next';
import './globals.css';
import { cookies } from 'next/headers';
import { UserAuthInit } from './components/UserAuthInit';
// import { Provider } from './components/Provider';
import { refreshUser } from '@/assets/utils/api';

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

  if (token) {
    user = await refreshUser(token);
  }

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
      <body className="text-white-primary bg-black-primary font-display scroll-smooth text-xs font-medium md:text-sm">
        {/* <Provider> */}
        <UserAuthInit user={user} />
        {header}
        <main>{children}</main>
        {/* </Provider> */}
      </body>
    </html>
  );
}
