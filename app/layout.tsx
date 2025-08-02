import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FormDataProvider } from "@/contexts/form-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PDF Generator App",
  description: "Generate and download PDFs from form data"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FormDataProvider>{children}</FormDataProvider>
      </body>
    </html>
  )
}
