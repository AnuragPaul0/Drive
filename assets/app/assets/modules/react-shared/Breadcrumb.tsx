import {CopyToClipboardButton} from '@github-ui/copy-to-clipboard/Button'
import type {Repository} from '@github-ui/current-repository'
import {repositoryTreePath} from '@github-ui/paths'
import {Link} from '@github-ui/react-core/link'
import {ScreenReaderHeading} from '@github-ui/screen-reader-heading'
import {Box, Heading, Link as PrimerLink, Text} from '@primer/react'
// import {useMemo} from 'react'

const separatorCharacter = '/'
  // commitish: string

interface BreadcrumbProps { id?: string
  fileNameId?: string
  path: string
  repo: Repository
  isFolder: boolean
  fontSize?: number
  showCopyPathButton?: boolean
}

  // commitish,
export function Breadcrumb({
  id = 'breadcrumb',
  // fileNameId,
  path,
  repo,
  // isFolder,
  fontSize,
  showCopyPathButton,
}: BreadcrumbProps) {
  // const {fileName, segments} = useMemo(() => getPathSegmentData(path), [path])
  // const isRoot = !path

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
      <Box as="nav" data-testid="breadcrumbs" aria-labelledby={`${id}-heading`} id={id}
        sx={{maxWidth: '100%'}}>
        <ScreenReaderHeading id={`${id}-heading`} as="h2" text="Breadcrumbs" />

        <Box as="ol" sx={{maxWidth: '100%', listStyle: 'none', display: 'inline-block'}}>
          <Box as="li" sx={{display: 'inline-block', maxWidth: '100%'}}>
            {/* directoryName, */}
            <RepoLink repo={repo}
            // commitish={commitish}
            />
          </Box></Box>
      </Box>{showCopyPathButton && (
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

function RepoLink({repo
  // , commitish
}: {repo: Repository;
  // commitish: string
}) {
  return (
    <PrimerLink
      as={Link}
      sx={{fontWeight: 'bold'}}
      to={repositoryTreePath({repo
        // , commitish
        , action: 'tree'})}
      data-testid="breadcrumbs-repo-link"
      reloadDocument
    >
      {repo.name}
    </PrimerLink>
  )
}
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

// function getPathSegmentData(path: string) {
//   const segments = path.split(separatorCharacter)
//   const fileName = segments.pop()!

//   return {
//     fileName,
//     segments: segments.map((segment, i) => ({
//       directoryName: segment,
//       directoryPath: segments.slice(0, i + 1).join(separatorCharacter),
//     })),
//   }
// }

try{ (Breadcrumb as any).displayName ||= 'Breadcrumb' } catch {}
try{ (RepoLink as any).displayName ||= 'RepoLink' } catch {}
// try{ DirectoryLink.displayName ||= 'DirectoryLink' } catch {}
try{ (Separator as any).displayName ||= 'Separator' } catch {}
try{ (FileName as any).displayName ||= 'FileName' } catch {}