import type { Metadata } from "next"; import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: `RetainIQ uses automation and generative AI to give brands ownership over the
   design and performance of their Dynamic Product Ads and Email.`, icons: {
  icon: "https://avatars.githubusercontent.com/u/88148165" } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode
  }>) { return <html lang="en"><head><style dangerouslySetInnerHTML={{__html:
    `span.lmZlSR { background-color: unset; font-size: 14px; line-height: 20px;
  color: var(--fgColor-default, var(--color-fg-default, #e6edf3)); vertical-align: middle;

  border: 1px solid var(--control-borderColor-rest, var(--borderColor-default,
    var(--color-border-default, #30363d))); border-radius: 6px; outline: none;
  
  box-shadow: var(--shadow-inset, var(--color-primer-shadow-inset, 0 0 transparent));
  display: inline-flex; -webkit-box-align: stretch; align-items: stretch; min-height: 32px;
  overflow: hidden; min-width: 100px }`}}
></style></head>{children}</html> }