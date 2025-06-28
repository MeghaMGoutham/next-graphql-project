import { Provider } from "@/components/ui/provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Next GraphQL Project",
  description: "Challenge Brief (v3.5)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}