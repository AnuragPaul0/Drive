'use client'
// import localFont from "next/font/local"
// import CodeView from '@g-assets/modules/react-code-view/pages/CodeView'
import BlobEditor from '@g-assets/modules/react-code-view/components/blob-edit/BlobEditor'
import {
  // Box, Heading
  // , SplitPageLayout
} from '@primer/react'
// import {Placeholder} from '../Placeholder'
// import '@github/clipboard-copy-element'

// const geistSans = localFont ( { src: "./fonts/GeistVF.woff", variable: "--font-geist-sans",
// weight: "100 900" } )

// const geistMono = localFont( { src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono",
// weight: "100 900" } )

// let p = 0 , copied = 0 
// ${geistSans.variable} ${geistMono.variable} className="kowOcT"
export default function Home() { return <body className={`antialiased`}><main>
  {/* <div className="split left sl"></div> */}
  {/* <div id='ml' className="split right sm"> */}
    {/* <div className="centered"> */}
      <BlobEditor/>
      {/* </div> */}
  {/* </div> */}
  {/* <div className="split left sr"></div> */}
  {/* <SplitPageLayout>
  <SplitPageLayout.Header>
    <Placeholder label="Header" height={100} />
  </SplitPageLayout.Header>
  <SplitPageLayout.Pane position="start">
    <Placeholder label="Pane" height={400} />
  </SplitPageLayout.Pane>
  <SplitPageLayout.Content>
    <Placeholder label="Content" height={600} />
  </SplitPageLayout.Content>
  <SplitPageLayout.Footer>
    <Placeholder label="Footer" height={100} />
  </SplitPageLayout.Footer>
  </SplitPageLayout> */}
  {/* <CodeView/> */}
</main></body> }