import {AllShortcutsEnabledProvider} from
  '@github-ui/code-view-shared/contexts/AllShortcutsEnabledContext'
// import {CodeViewBannersProvider} from '@github-ui/code-view-shared/contexts/CodeViewBannersContext'
import {FileQueryProvider} from '@github-ui/code-view-shared/contexts/FileQueryContext'
import {OpenPanelProvider} from '@github-ui/code-view-shared/contexts/OpenPanelContext'
// import {
//   // FileTreeControlProvider,
//   ReposFileTreePane
//   // , useTreePane
// } from '@github-ui/repos-file-tree-view'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import {Box, SplitPageLayout } from '@primer/react'
import React from 'react'
// import CodeViewHeader from '../components/headers/CodeViewHeader'

export default function CodeView(
) {
  const isEdit = 1,  isTreeExpanded = !0, treeRef = React.useRef<HTMLDivElement>(null),
    {codeCenterOption} = useCodeViewOptions(),
    // reposFileTreeId = 'repos-file-tree',
    openPanelRef = React.useRef<string | undefined>()
  return (
  // <h1 id="file-name-id-wide">.eslintrc.json</h1>
  <AllShortcutsEnabledProvider allShortcutsEnabled={!0
    // payload.allShortcutsEnabled
    }>
            {/* <FileTreeControlProvider> */}
              <div><FileQueryProvider><OpenPanelProvider
    // payload={payload}
    openPanelRef={openPanelRef}>
    <SplitPageLayout><Box ref={treeRef} tabIndex={0} sx={{width: ['100%', '100%', 'auto']}}>
    {/* <ReposFileTreePane
      id={reposFileTreeId}
      repo={repo}
      path={path}
      isFilePath={isBlob || isEdit || isDelete}
      refInfo={refInfo}
      collapseTree={collapseTree}
      showTree={isTreeExpanded}
      fileTree={fileTree}
      onItemSelected={onTreeItemSelected}
      processingTime={payload.fileTreeProcessingTime}
      treeToggleElement={treeToggleElement}
      treeToggleRef={treeToggleRef}
      searchBoxRef={searchBoxRef}
      foldersToFetch={payload.foldersToFetch}
      onFindFilesShortcut={onFindFilesShortcut}
      textAreaId={textAreaId}
      findFileWorkerPath={findFileWorkerPath}
      headerContent={
        <Box sx={{display: 'flex', width: '100%', mb: 3, alignItems: 'center'}}>
          {isTreeExpanded && treeToggleElement}
          <Heading as="h2" sx={{fontSize: 2, ml: 2}}>
            Files
          </Heading>
        </Box>
      }
    /> */}
  </Box><SplitPageLayout.Content as="div" padding="none"
                        width={codeCenterOption.enabled ? 'xlarge' : 'full'}
                        hidden={{narrow: isTreeExpanded}}
                        sx={{
                          marginRight: 'auto',
                          '@media print': {
                            display: 'flex !important',
                          },
                        }}
                      >
                        <Box sx={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexDirection: 'column',
                            pb: 6,
                            maxWidth: '100%',
                            mt: 0,
                          }}
                          // ref={setContentRef}
                          data-selector="repos-split-pane-content"
                          tabIndex={0}
                        >
                            {/* <CodeViewBannersProvider> */}
                              <Box
                                sx={{
                                  display: isEdit ? 'none' : 'inherit',
                                }}
                              >
                              <input name="q" type="text" role="combobox" placeholder="Search…"
                                  autoComplete="off" maxLength={240} className="s-input s-input__search js-search-field wmn1"
                                  aria-label="Search" aria-controls="top-search" data-controller="s-popover"
                                  data-action="focus->s-popover#show" data-s-popover-placement="bottom-start"
                              aria-expanded="false"/>
                              {/* <CodeViewHeader
                                  // payload={payload}
                                  showTree={!0
                                    // isTreeExpanded
                                  }/> */}
                               </Box>
                            {/* </CodeViewBannersProvider> */}
                        </Box>
                       </SplitPageLayout.Content>
  </SplitPageLayout></OpenPanelProvider>
  </FileQueryProvider></div>
            {/* </FileTreeControlProvider> */}
          </AllShortcutsEnabledProvider>
  ) }
try{ (CodeView as any).displayName ||= 'CodeView' } catch {}