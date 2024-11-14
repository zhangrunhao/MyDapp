export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>MyDapp</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
