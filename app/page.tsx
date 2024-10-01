import localFont from "next/font/local"

const geistSans = localFont ( { src: "./fonts/GeistVF.woff", variable: "--font-geist-sans",
weight: "100 900" } )
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono",
weight: "100 900" } )

export default function Home() {
  return <body aria-describedby=":Rdd9lab:"
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <input name="q" type="text" role="combobox" placeholder="Search…" value=""
        autoComplete="off" maxLength={240} className="s-input s-input__search js-search-field wmn1"
        aria-label="Search" aria-controls="top-search" data-controller="s-popover"
        data-action="focus->s-popover#show" data-s-popover-placement="bottom-start"
    aria-expanded="false"/>
    <button data-component="IconButton" type="button" aria-label="Copy path" tabIndex={0}
      className="types__StyledButton-sc-ws60qy-0 hQsKGs prc-Button-IconButton-szpyj"
      data-loading="false" data-no-visuals="true" data-size="small"
      aria-describedby=":R1td9lab:-loading-announcement">
          <svg aria-hidden="true" focusable="false" className="octicon octicon-copy"
                viewBox="0 0 16 16" width="16" height="16" fill="currentColor"
                style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z">
                    </path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
    </path></svg></button>

    <script> console.clear(); ta = "table[class='", t1 = ta+"1']"
  //   s = screen, d = 'https://drive.google.com/viewerng/viewer?embedded=true&url='
    // l = location,
  //   , l = a.length, p = ['AvailableChoicesN.pdf', 'N.pdf']
  //       a[i].href = m + p[i]
  //       a[i].textContent = a[i].href
  //       document.body.style.zoom = "80%"
  //       a[i].href = d + a[i].href
  //       a[i].textContent = a[i].href
    </script><div id="__primerPortalRoot__" style="position: absolute; top: 0px; left: 0px;">
    <div style="position: relative; z-index: 1;">
        <span role="tooltip" aria-label="Copy path" data-visible-text="Copy path"
            aria-hidden="true" id=":Rdd9lab:"
            className="ControlledTooltip__TooltipBase-sc-9d998f82-0 eAydfi tooltipped-nw"
style="position: absolute; left: 441.453px; top: 122px"></span></div></div></body> }
