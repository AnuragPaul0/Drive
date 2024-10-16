import type { Metadata } from "next"; import "./globals.css"

const title = 'Open in Drive', href = "https://nextjs-boilerplate-xi-sooty-98.vercel.app",
  description = `Link  to open a pdf appears when the user inputs a pdf link.`

export const metadata: Metadata = { title: title,
  description: description, icons: {
  icon: "https://avatars.githubusercontent.com/u/88148165" } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode
  }>) { return <html lang="en"><head> {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:type" content="website"/>
    <meta property="og:title" content={title}/>
    <meta property="og:description" content={description}/>
    {/* <!-- Twitter --> */}
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content={title}/>
    <meta name="twitter:description" content={description}/>
    <link rel="canonical" href={href}/>
    <meta property="og:url" content={href}/>
    {/* console.log(document, document.querySelector('#left'));
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
    }); */}

    {/* // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
    document.querySelector('#left').classList.add(innerWidth < innerHeight ? "mob" : 'desk')})(); */}
    </head>
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