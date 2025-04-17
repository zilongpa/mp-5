import { AppBar, Toolbar, Typography } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              CS391 URL Shortener
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
