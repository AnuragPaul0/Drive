import type { Metadata } from "next"; import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: `RetainIQ uses automation and generative AI to give brands ownership over the
   design and performance of their Dynamic Product Ads and Email.`, icons: {
  icon: "https://avatars.githubusercontent.com/u/88148165" } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode
  }>) { return <html lang="en">
    {/* <head>;console.log(document, document.querySelector('#left'));
(()=>{console.log(document.querySelector('#left'));
document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')})();
</head> */}
<script dangerouslySetInnerHTML={{__html:
`document.onreadystatechange = () => { console.log(document.readyState);
// debugger;
document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')
}`}}>
</script>{children}</html> }