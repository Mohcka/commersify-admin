import { ModalProvider } from "./modal-provider";
import { NextAuthSessionProvider } from "./next-auth-session-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </NextAuthSessionProvider>
  );
}
