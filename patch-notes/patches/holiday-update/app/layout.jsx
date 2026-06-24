import './globals.css';

export const metadata = {
  title: 'Event Wakacyjny | Monastyr2',
  description: 'Letnie wydarzenie Monastyr2 startuje 01.07.2026 o godzinie 18:00.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
