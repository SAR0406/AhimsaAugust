import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FlowerShowerProvider } from '@/components/flower-shower-provider';
import { ThemeProvider } from '@/components/theme-provider';
import '@/lib/firebase';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background text-foreground font-body antialiased", 
        playfair.variable, 
        ptSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FlowerShowerProvider />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main 
              className="flex-grow container py-6 md:py-10 relative z-10"
            >
                {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
