import type { Metadata } from "next"; import "./globals.css"

const title = 'Open in Drive', href = "https://nextjs-boilerplate-xi-sooty-98.vercel.app",
  description = `Link, to open a pdf in google drive without downloading, appears when the user`+
    ` inputs a pdf web link in mobile.`, site = 'Anurag Paul',
  image = "https://res.cloudinary.com/desijzgrw/image/upload/v1729082467/o_qxaivf.jpg",
  imalt = `UI of open a pdf in google drive without downloading appears when the user inputs
   a pdf web link in mobile`

export const metadata: Metadata = { title: title,
  description: description, icons: {
  icon: "https://avatars.githubusercontent.com/u/88148165" } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode
  }>) { return <html lang="en">
    <head>
      {/* <meta property="description" content={description}/> */}
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website"/><meta property="og:title" content={title}/>
      <meta property="og:url" content={href}/><meta property="og:image" content={image}/>
      <meta property="og:description" content={description}/>
      <meta property="og:site_name" content='Anurag'/>
      <meta property="og:image:height" content="274"/>
      <meta content="en_US" property="og:locale"/><meta property="og:image:width" content="503"/>
      <meta name="keywords" content=
        "Open, Drive, React, TypeScript, October 2024, Photos, Link, pdf, user input"/>
      <meta name="author" content={site}/>{/* <!-- Twitter --> */}
      <meta property="twitter:site" content={"@" + site}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      {/* <meta property="twitter:description" content={description}/> */}
      <meta property="twitter:image" content={image}/>
      <meta property="twitter:image:alt" content={imalt}/><link rel="canonical" href={href}/>
      <link rel="alternate" href={href + "/?language=hi-in"} hrefLang="hi-in"/>
      <link rel="alternate" href={href + "/?language=pt-br"} hrefLang="pt-br"/>
      <link rel="alternate" href={href + "/?language=de-de"} hrefLang="de-de"/>
      <link rel="alternate" href={href + "/?language=es-mx"} hrefLang="es-mx"/>
      <link rel="alternate" href={href + "/?language=es-es"} hrefLang="es-es"/>
      <link rel="alternate" href={href + "/?language=fr-fr"} hrefLang="fr-fr"/>
      <link rel="alternate" href={href + "/?language=fr-ca"} hrefLang="fr-ca"/>
      <link rel="alternate" href={href + "/?language=it-it"} hrefLang="it-it"/>
      <link rel="alternate" href={href} hrefLang="x-default"/>
      <link rel="icon" sizes="32x32" href=
        "https://res.cloudinary.com/desijzgrw/image/upload/v1729135928/32_ltbsvx.png"/>
      <link rel="apple-touch-icon" href={image}/>
      <link rel="shortcut icon" sizes="196x196" href=
        "https://res.cloudinary.com/desijzgrw/image/upload/v1729136339/196_kfrzfa.png"/>
      <noscript data-n-css="">You have disabled scripts in your browser!</noscript>
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
    }); */}{/* // configuration of the observer:
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