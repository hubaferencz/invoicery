import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INVOICERY",
  description: "INVOICERY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased  bg-primary-800`}
        suppressHydrationWarning={true}
      >
        {children}
        <Script id="freshchat-init" strategy="lazyOnload">
          {`
          function initFreshChat() {
            window.fcWidget.init({
              token: "77890fad-de08-4c19-8896-231e5a444ca3",
              host: "https://frilansfinans-org.freshchat.com",
              widgetUuid: "276d73ed-db71-4ffb-814b-a9ca258ac2c4"
            });
          }

          function initialize(i, t) {
            var e;
            if (i.getElementById(t)) {
              initFreshChat();
            } else {
              e = i.createElement("script");
              e.id = t;
              e.async = true;
              e.src = "https://frilansfinans-org.freshchat.com/js/widget.js";
              e.onload = initFreshChat;
              i.head.appendChild(e);
            }
          }

          function initiateCall() {
            initialize(document, "Freshchat-js-sdk");
          }

          if (window.addEventListener) {
            window.addEventListener("load", initiateCall, false);
          } else if (window.attachEvent) {
            window.attachEvent("onload", initiateCall);
          }
        `}
        </Script>
      </body>
    </html>
  );
}
