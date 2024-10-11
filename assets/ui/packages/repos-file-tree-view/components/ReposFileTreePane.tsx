// main button
// import {ReposHeaderRefSelector} from '@github-ui/code-view-shared/components/ReposHeaderRefSelector'

import {useFileQueryContext} from '@github-ui/code-view-shared/contexts/FileQueryContext'
import {useOpenPanel} from '@github-ui/code-view-shared/contexts/OpenPanelContext'
import {ScreenSize , useScreenSize} from '@github-ui/screen-size'
import type {Repository} from '@github-ui/current-repository'

// import {useClientValue} from '@github-ui/use-client-value'
// import {verifiedFetchJSON} from '@github-ui/verified-fetch' nr

import {scrollIntoView} from '@primer/behaviors'
import {Box
  // , IconButton
  // , Overlay
  , SplitPageLayout
} from '@primer/react'
import type {BetterSystemStyleObject} from '@primer/react/lib-esm/sx'
import React from 'react'

export const TreeOverlayBreakpoint = ScreenSize.xxxlarge

export function ReposFileTreePane({
  showTree,
  id,
  headerSx,
  paneContentsSx,
  headerContent,
  showRefSelectorRow = true,
  paneResizable = true
}: {
  showTree: boolean
  repo: Repository
  isFilePath: boolean
  id: string
  headerSx?: BetterSystemStyleObject
  paneContentsSx?: BetterSystemStyleObject
  headerContent?: JSX.Element
  showRefSelectorRow?: boolean
  paneResizable?: boolean
}) {

  const {openPanel} = useOpenPanel()
  const scrollingRef = React.useRef<HTMLDivElement | null>(null)
  // t
  const selectedElement = React.useRef<HTMLElement | null>(null)
  const {query} = useFileQueryContext()
  const [isSSR] = [0]
  // useClientValue(() => false, true, [])

  React.useEffect(() => {
    if (!showTree || !(!query || window.innerWidth >= ScreenSize.large)) {
      selectedElement.current = null
    }
  }, [showTree, query])

  const focusActiveItem = React.useCallback(
    (selectedItemElement: HTMLElement | null) => {
      if (
        showTree &&
        (!query || window.innerWidth >= ScreenSize.large) &&
        scrollingRef.current &&
        selectedItemElement
      ) {
        // On becoming visible, the tree should scroll to the selected item
        // Simulate "block: center" mode by adding an endMargin and startMargin of half the window height
        scrollIntoView(selectedItemElement, scrollingRef.current, {
          endMargin: window.innerHeight / 2,
          startMargin: window.innerHeight / 2,
          behavior: 'auto',
        })
      }
    },
    [query, showTree],
  )

  const setScrollingRef = React.useCallback(
    (element: HTMLDivElement) => {
      scrollingRef.current = element
      const screenWidth = window.innerWidth
      // When the tree is a pane, focus after the scrollable container renders.
      if (screenWidth >= TreeOverlayBreakpoint) {
        focusActiveItem(selectedElement.current)
      }
    },
    [focusActiveItem],
  )

  const {screenSize} = useScreenSize()
  const showTreeOverlay =
    !isSSR &&
    ((openPanel && screenSize < TreeOverlayBreakpoint) || screenSize < ScreenSize.xlarge) &&
    screenSize >= ScreenSize.large

  /* on the server during SSR, the expanded value will purely be whatever their saved
  setting is, which might be expanded. On mobile widths we don't ever default to
  having the tree expanded, so on the server we need to just hard code it to
  show the regular not expanded version of everything*/
  const paneContents = (
    <Box
      id={id}
      sx={{
        maxHeight: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '@media screen and (max-width: 768px)': isSSR ? {display: 'none'} : undefined,
        '@media screen and (min-width: 768px)': {
          maxHeight: '100vh',
          height: '100vh',
        },
        ...paneContentsSx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          pb: 2,
          pt: 3,
          ...headerSx,
        }}
      >
        {headerContent}
        {showRefSelectorRow && (
          <Box sx={{mx: 4, display: 'flex', width: '100%'}}>
            <Box sx={{flexGrow: 1}}>
              {/* <ReposHeaderRefSelector ddn btn
                buttonClassName="react-repos-tree-pane-ref-selector width-full ref-selector-class"
                allowResizing={true}
              /> */}
            </Box>
            <Box
              sx={{
                ml: 2,
                whiteSpace: 'nowrap',
                '&:hover button:not(:hover)': {
                  borderLeftColor: 'var(--button-default-borderColor-hover, var(--color-btn-hover-border))',
                },
              }}
            >
              {/* <SearchButton
                sx={refInfo.canEdit ? {borderTopLeftRadius: 0, borderBottomLeftRadius: 0} : undefined}
                onClick={exitOverlay}
                textAreaId={textAreaId}
              /> */}
            </Box>
          </Box>
        )}
      </Box>
      <TreeBorder scrollingRef={scrollingRef} />
      <Box
        ref={setScrollingRef}
        sx={{
          flexGrow: 1,
          maxHeight: '100% !important',
          overflowY: 'auto',
          '@media screen and (max-width: 768px)': isSSR ? {display: 'none'} : undefined,
          scrollbarGutter: 'stable',
        }}
      ></Box>
    </Box>
  )

  const hidePaneSx =
    showTreeOverlay || openPanel
      ? {
          // 1349 is TreeOverlayBreakpoint - 1
          '@media print, screen and (max-width: 1349px) and (min-width: 768px)': {
            display: 'none',
          },
        }
      : {
          '@media print, screen and (max-width: 1011px) and (min-width: 768px)': {
            display: 'none',
          },
        }

  return (
  // <p>Hello.</p>
  
  //   // <FileTreeContext.Provider value={fileTreeContextValue}>
  //     // {/* Render the TreeView in a portal that can be moved to different containers without rerendering */}
      <SplitPageLayout.Pane
        position="start"
        sticky
        sx={{
          minWidth: 0,
          // ...displayNoneSx,
          flexDirection: ['column', 'column', 'inherit'],
          '@media screen and (min-width: 768px)': {
            height: '100vh',
            maxHeight: '100vh !important',
          },
          ...hidePaneSx,
          // ...paneSx,
        }}
        padding="none"
        width="large"
        resizable={paneResizable ? true : false}
        widthStorageKey="codeView.tree-pane-width"
        divider={{regular: 'none', narrow: 'none'}}
      >
        <p>Hello.</p>
      </SplitPageLayout.Pane>
  //   // </FileTreeContext.Provider>
  )
}

function TreeBorder({scrollingRef}: {scrollingRef: React.RefObject<HTMLDivElement>}) {
  const [visible, setVisible] = React.useState(scrollingRef.current && scrollingRef.current.scrollTop > 0)

  React.useEffect(() => {
    if (scrollingRef.current) {
      const scrollElement = scrollingRef.current
      const scrollHandler = () => {
        if (scrollElement && scrollElement.scrollTop > 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
      // eslint-disable-next-line github/prefer-observers
      scrollElement.addEventListener('scroll', scrollHandler)
      return () => {
        scrollElement.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [scrollingRef])

  return visible ? (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border.default',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
      }}
    />
  ) : null
}

try{ (TreeBorder as any).displayName ||= 'TreeBorder' } catch {}