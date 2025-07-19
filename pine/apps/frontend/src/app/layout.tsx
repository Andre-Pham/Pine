import { Toaster } from '@/components/ui';
import './global.css';
import Providers from './providers';

export const metadata = {
  title: 'TODO',
  description: 'TODO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
