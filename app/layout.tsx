import type { Metadata } from "next"; import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: `RetainIQ uses automation and generative AI to give brands ownership over the
   design and performance of their Dynamic Product Ads and Email.`, icons: {
  icon: "https://avatars.githubusercontent.com/u/88148165" } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode
  }>) { return <html lang="en">
    {/* <head>
</head> */}
<script dangerouslySetInnerHTML={{__html:
`/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
function waitForElement(querySelector, timeout){
  return new Promise((resolve, reject)=>{
    var timer = false;
    if(document.querySelector(querySelector)) return resolve();
    const observer = new MutationObserver(()=>{
      if(document.querySelector(querySelector)){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}

waitForElement("#left", 3000).then(function(){
    alert("element is loaded.. do stuff");
}).catch(()=>{
    alert("element did not load in 3 seconds");
});console.log(document, document.querySelector('#left'));
(()=>{console.log(document.querySelector('#left'));
document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')})();`}}>
</script>{children}</html> }