'use client'
import localFont from "next/font/local"; import '@github/clipboard-copy-element'
import {CopyToClipboardButton} from '@github-ui/copy-to-clipboard/Button'
import type {Repository} from '@github-ui/current-repository'
// import {repositoryTreePath} from '@github-ui/paths'// @ts-ignore
// import {Link} from '@github-ui/react-core/link', Link as PrimerLink
import {ScreenReaderHeading} from '@github-ui/screen-reader-heading'
import {Box, Heading, Text} from '@primer/react'
import {useMemo} from 'react'

const geistSans = localFont ( { src: "./fonts/GeistVF.woff", variable: "--font-geist-sans",
weight: "100 900" } )

const geistMono = localFont( { src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono",
weight: "100 900" } ), separatorCharacter = '/'

// , copied = 0
// let p = 0;
  // repo,
  // commitish,
interface BreadcrumbProps {
  id?: string
  fileNameId?: string
  commitish: string
  path: string
  repo: Repository
  isFolder: boolean
  fontSize?: number
  showCopyPathButton?: boolean
}

export function Breadcrumb({
  id = 'breadcrumb',
  fileNameId,
  path,
  isFolder,
  fontSize,
  showCopyPathButton,
}: BreadcrumbProps) {
  const {fileName, segments} = useMemo(() => getPathSegmentData(path), [path])
  const isRoot = !path

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        fontSize: fontSize ?? 2,
        minWidth: 0,
        flexShrink: 1,
        flexWrap: 'wrap',
        maxWidth: '100%',
        alignItems: 'center',
      }}
    >
      <Box as="nav" data-testid="breadcrumbs" aria-labelledby={`${id}-heading`} id={id} sx={{maxWidth: '100%'}}>
        <ScreenReaderHeading id={`${id}-heading`} as="h2" text="Breadcrumbs" />

        <Box as="ol" sx={{maxWidth: '100%', listStyle: 'none', display: 'inline-block'}}>
          <Box as="li" sx={{display: 'inline-block', maxWidth: '100%'}}>
             {/* <RepoLink repo={repo} commitish={commitish} />*/}
          </Box>
          {segments.map(({directoryPath}) => (
            <Box as="li" sx={{display: 'inline-block', maxWidth: '100%'}} key={directoryPath}>
              <Separator fontSize={fontSize} />
              {/* {directoryName ? (directoryName, 
                <DirectoryLink path={directoryPath} directoryName={directoryName} repo={repo} commitish={commitish} />
              ) : null} */}
            </Box>
          ))}
        </Box>
      </Box>
      {fileName && (
        <Box data-testid="breadcrumbs-filename" sx={{display: 'inline-block', maxWidth: '100%'}} key={fileName}>
          <Separator fontSize={fontSize} />

          <FileName value={fileName} id={fileNameId} fontSize={fontSize} />

          {!isRoot && isFolder && <Separator />}
        </Box>
      )}
      {showCopyPathButton && (
        <CopyToClipboardButton
          ariaLabel="Copy path"
          textToCopy={path}
          tooltipProps={{direction: 'nw'}}
          size="small"
          hasPortalTooltip={true}
          className="ml-2"
        />
      )}
    </Box>
  )
}

// function RepoLink({repo, commitish}: {repo: Repository; commitish: string}) {
//   return (
//     <PrimerLink
//       as={Link}
//       sx={{fontWeight: 'bold'}}
//       to={repositoryTreePath({repo, commitish, action: 'tree'})}
//       data-testid="breadcrumbs-repo-link"
//       reloadDocument
//     >
//       {repo.name}
//     </PrimerLink>
//   )
// }

// interface DirectoryLinkProps {
//   commitish: string
//   directoryName: string
//   path: string
//   repo: Repository
// }

// function DirectoryLink({directoryName, path, repo, commitish}: DirectoryLinkProps) {
//   return (
//     <PrimerLink as={Link} to={repositoryTreePath({repo, commitish, path, action: 'tree'})} sx={{fontWeight: 400}}>
//       {directoryName}
//     </PrimerLink>
//   )
// }

export function Separator({fontSize}: {fontSize?: number}) {
  return (
    <Text sx={{px: 1, fontWeight: 400, color: 'fg.muted', fontSize: fontSize ?? 2}} aria-hidden="true">
      /
    </Text>
  )
}

function FileName({value, id, fontSize}: {value: string; id?: string; fontSize?: number}) {
  return (
    <Heading
      as="h1"
      tabIndex={-1}
      sx={{fontWeight: 600, display: 'inline-block', maxWidth: '100%', fontSize: fontSize ?? 2}}
      id={id}
    >
      {value}
    </Heading>
  )
}

function getPathSegmentData(path: string) {
  const segments = path.split(separatorCharacter)
  const fileName = segments.pop()!

  return {
    fileName,
    segments: segments.map((segment, i) => ({
      directoryName: segment,
      directoryPath: segments.slice(0, i + 1).join(separatorCharacter),
    })),
  }
}

export default function Home() {
  return <body aria-describedby=":Rdd9lab:"
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <input name="q" type="text" role="combobox" placeholder="Search…"
        autoComplete="off" maxLength={240} className="s-input s-input__search js-search-field wmn1"
        aria-label="Search" aria-controls="top-search" data-controller="s-popover"
        data-action="focus->s-popover#show" data-s-popover-placement="bottom-start"
    aria-expanded="false"/>
    {/* <span data-view-component="true">
      <clipboard-copy id="clipboard-button" aria-label="Copy" type="button" value="Text to copy"
        data-view-component="true" class="Button--secondary Button--medium Button">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
          data-view-component="true" class="octicon octicon-copy">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
        <svg style={{display: 'none'}} aria-hidden="true" height="16" viewBox="0 0 16 16"
          version="1.1" width="16" data-view-component="true" class=
            "octicon octicon-check color-fg-success">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
        </svg>
      </clipboard-copy>
      <div aria-live="polite" aria-atomic="true" class="sr-only" data-clipboard-copy-feedback></div>
    </span><tool-tip id="tooltip-47ec3eb3-b354-45e8-87b5-43045b55d353" for="clipboard-button"
      popover="manual" data-direction="s" data-type="description" data-view-component="true"
    class="sr-only position-absolute">Copy some text</tool-tip> */}
{/* <button data-component="IconButton" onMouseEnter={ () => {p = 1} }
      onMouseLeave={ () => {p=0} }
      onClick={ () => {
        // Get the text field
        var copyText = document.querySelector('[name=q]') as HTMLInputElement

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
        // Copy the text inside the text field
        navigator.clipboard.writeText('https://drive.google.com/viewerng/viewer?embedded=true&url=' +
        copyText.value);

        // Alert the copied text
      copied = 1; setTimeout(() => {copied = 0}, 1000) } } type="button" aria-label="Copy path"
      tabIndex={0}
      className={"types__StyledButton-sc-ws60qy-0 hQsKGs prc-Button-IconButton-szpyj" +
        copied ? 'color-fg-success' : ''
      }
      data-loading="false" data-no-visuals="true" data-size="small"
      aria-describedby=":R1td9lab:-loading-announcement">
        <svg aria-hidden="true" focusable="false" className="octicon octicon-copy"
          viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            { copied ? <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z">
            </path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z">
    </path> : null }
    </svg></button> */}
    {/* <script> */}
      {/* //   s = screen, d = 'https://drive.google.com/viewerng/viewer?embedded=true&url='
        // l = location,
      //   , l = a.length, p = ['AvailableChoicesN.pdf', 'N.pdf']
      //       document.body.style.zoom = "80%"
      //       a[i].href = d + a[i].href
      //       a[i].textContent = a[i].href */}
    {/* </script> */}
    {/* <div id="__primerPortalRoot__"><div id='rel'>
      <span role="tooltip" aria-label="Copy path" data-visible-text="Copy path"
        aria-hidden="true" id=":Rdd9lab:"
        className={ "ControlledTooltip__TooltipBase-sc-9d998f82-0 eAydfi tooltipped-nw" +
        p ? 'tooltipped-open' : '' }
></span>
</div></div> */}
</body> }