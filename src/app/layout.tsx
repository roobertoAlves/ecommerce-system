const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="jet-brains-mono antialiased"> {children} </body>
    </html>
  );
};

export default RootLayout;
