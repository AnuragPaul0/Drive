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
document.onreadystatechange = () => { console.log(document.readyState);
// debugger;
document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')
}.nodeNameinnerHTML += "Change Detected<br>";// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
    document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')
        console.log(mutation.type);
    });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }

// pass in the target node, as well as the observer options
observer.observe(target, config);
document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')})();
</head> */}
{/* <script dangerouslySetInnerHTML={{__html:
`target = document.querySelector('#left');

var observer = new MutationObserver(function (m) { ad = m[0].addedNodes[0]
  if (ad.id === "left")
    {console.log(m); ad.classList.add(innerWidth < innerHeight ? "mob" : 'desk')
        // Later, you can stop observing
observer.disconnect()}
})

observer.observe(document.body, {childList: true})`}}>
</script> */}
{children}</html> }