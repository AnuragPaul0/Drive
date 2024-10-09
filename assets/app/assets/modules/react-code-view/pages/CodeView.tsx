import React
// , {lazy, Suspense, useCallback, useEffect, useState}
from 'react'
import CodeViewHeader from '../components/headers/CodeViewHeader'

export default function CodeView(
// {
// initialPayload
// }: {
  // initialPayload?: FilePagePayload
// }
) {
//   const payload = useFilePagePayload(initialPayload)
//   const repo = useCurrentRepository()
//   const {findFileWorkerPath} = useReposAppPayload()
//   const {path} = payload
//   const refInfo = useCanonicalObject(payload.refInfo)
//   const isEdit = isEditPayload(payload)
//   const isBlob = isBlobPayload(payload)
//   const isBlame = isBlamePayload(payload)
//   const isDelete = isDeletePayload(payload)
//   const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)
//   const deferredMetadata = useLoadDeferredMetadata(repo, refInfo, path, payload.error?.httpStatus === 404)
//   const deferredAST = useLoadDeferredAST(
//     repo,
//     refInfo,
//     path,
//     payload.error?.httpStatus === 404,
//     isBlob || isBlame ? payload.blob.rawLines?.length ?? 100000 : 100000,
//   )
//   const treeRef = React.useRef<HTMLDivElement>(null)
//   // when user presses cmd+f6 this controls whether we focus the tree or the content
//   const contentFocused = React.useRef(false)
//   const textAreaFocused = React.useRef(false)
//   // when we focus the content we can try to return focus to the element which previously had it
//   const contentFocusTarget = React.useRef<HTMLElement | null>(null)
//   // when we focus the tree we can try to return focus to the element which previously had it
//   const treeFocusTarget = React.useRef<HTMLElement | null>(null)
//   const reposFileTreeId = 'repos-file-tree'
//   const openPanelRef = React.useRef<string | undefined>()

//   const [searchTerm, setSearchTerm] = useState('')

//   const {toggleFocusedPaneShortcut} = useShortcut()
//   function toggleFocus() {
//     const symbolsPaneElement = document.getElementById(symbolsHeaderId)
//     const textAreaElement = document.getElementById(textAreaId)
//     if (document.activeElement?.id === textAreaId) {
//       textAreaFocused.current = true
//     }
//     // the user may have moved focus from where we last put it
//     if (contentRef?.contains(document.activeElement) && !textAreaFocused.current) {
//       //the content (but not the text area) is focused
//       contentFocused.current = true
//     } else if (treeRef.current?.contains(document.activeElement)) {
//       contentFocused.current = false
//     }
//     if (!contentFocused.current && !textAreaFocused.current) {
//       // focus the text area
//       const focusTarget = textAreaElement || contentRef
//       treeFocusTarget.current = treeRef.current?.contains(document.activeElement)
//         ? (document.activeElement as HTMLElement)
//         : null
//       contentFocused.current = false
//       focusTarget?.focus()
//     } else if (textAreaFocused.current) {
//       //focus the content
//       const focusTarget = contentFocusTarget.current || symbolsPaneElement || contentRef
//       contentFocused.current = true
//       textAreaFocused.current = false
//       focusTarget?.focus()
//     } else {
//       // focus the tree
//       const focusTarget = treeFocusTarget.current || treeRef.current
//       contentFocusTarget.current = contentRef?.contains(document.activeElement)
//         ? (document.activeElement as HTMLElement)
//         : null
//       contentFocused.current = false
//       textAreaFocused.current = false
//       focusTarget?.focus()
//     }
//   }

//   // While this component is mounted, disable user automatic user content scrolling
//   // based on the URL hash. This scrolling is handled by the individual components
//   // that require it.
//   useDisableUserContentScrolling()

//   // While this component is mounted, hide the standard footer. The reason we
//   // must do this in javascript is because the footer is retained across Turbo
//   // navigations, so if we omit it in the controller, it may still be present
//   // under some circumstances.
//   useHideFooter(true)

//   const fileTree = React.useMemo(
//     () => extractFileTree(payload),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [payload.path, payload.refInfo.currentOid],
//   )

//   const updatePanelExpandPreferences = useUpdatePanelExpandPreferences()

//   const updateTreeExpandedPreference = useCallback(
//     (isTreeExpanded: boolean) => {
//       updatePanelExpandPreferences(isTreeExpanded, null, null)
//     },
//     [updatePanelExpandPreferences],
//   )
//   const {isTreeExpanded, collapseTree, expandTree, treeToggleElement, treeToggleRef, searchBoxRef} = useTreePane(
//     reposFileTreeId,
//     openPanelRef,
//     payload.treeExpanded,
//     textAreaId,
//     updateTreeExpandedPreference,
//   )

//   // When a tree item is selected, collapse the tree if the screen is small
//   const onTreeItemSelected = useCallback(() => {
//     if (window.innerWidth < ScreenSize.large) {
//       collapseTree({focus: null})
//     }
//   }, [collapseTree])

//   const [validCodeNav, setValidCodeNav] = useState(true)

//   useEffect(() => {
//     // scroll to top of code nav on file change if not going to a specific line and already scrolled down
//     if (!window.location.hash && window.scrollY > 0) {
//       const codeViewHeader = document.querySelector('#StickyHeader') as HTMLElement
//       if (codeViewHeader) {
//         codeViewHeader.style.position = 'relative'
//         codeViewHeader.scrollIntoView()
//         codeViewHeader.style.position = 'sticky'
//       }
//     }
//   }, [payload.path])

//   const {codeCenterOption} = useCodeViewOptions()

//   const onFindFilesShortcut = React.useCallback(() => {
//     if (window.innerWidth < ScreenSize.large) {
//       expandTree({focus: 'search'})
//     }
//   }, [expandTree])

//   let action: FilesPageAction

//   if (isEdit) {
//     if (payload.editInfo.isNewFile) {
//       action = 'new'
//     } else {
//       action = 'edit'
//     }
//   } else if (isBlame) {
//     action = 'blame'
//   } else if (isBlob) {
//     action = 'blob'
//   } else {
//     action = 'tree'
//   }
  return (
//     <DeferredMetadataProvider {...deferredMetadata}>
//       <DeferredASTProvider {...deferredAST}>
//         <FilesPageInfoProvider
//           refInfo={refInfo}
//           path={path}
//           action={action}
//           copilotAccessAllowed={payload.copilotAccessAllowed ?? false}
//         >
//           <AllShortcutsEnabledProvider allShortcutsEnabled={payload.allShortcutsEnabled}>
//             <FileTreeControlProvider>
//               <PermalinkShortcut />
//               <div>
//                 <FileQueryProvider>
//                   <OpenPanelProvider payload={payload} openPanelRef={openPanelRef}>
//                     <SplitPageLayout>
//                       <Box ref={treeRef} tabIndex={0} sx={{width: ['100%', '100%', 'auto']}}>
//                         <ReposFileTreePane
//                           id={reposFileTreeId}
//                           repo={repo}
//                           path={path}
//                           isFilePath={isBlob || isEdit || isDelete}
//                           refInfo={refInfo}
//                           collapseTree={collapseTree}
//                           showTree={isTreeExpanded}
//                           fileTree={fileTree}
//                           onItemSelected={onTreeItemSelected}
//                           processingTime={payload.fileTreeProcessingTime}
//                           treeToggleElement={treeToggleElement}
//                           treeToggleRef={treeToggleRef}
//                           searchBoxRef={searchBoxRef}
//                           foldersToFetch={payload.foldersToFetch}
//                           onFindFilesShortcut={onFindFilesShortcut}
//                           textAreaId={textAreaId}
//                           findFileWorkerPath={findFileWorkerPath}
//                           headerContent={
//                             <Box sx={{display: 'flex', width: '100%', mb: 3, alignItems: 'center'}}>
//                               {isTreeExpanded && treeToggleElement}
//                               <Heading as="h2" sx={{fontSize: 2, ml: 2}}>
//                                 Files
//                               </Heading>
//                             </Box>
//                           }
//                         />
//                       </Box>
//                       <SplitPageLayout.Content
//                         as="div"
//                         padding="none"
//                         width={codeCenterOption.enabled ? 'xlarge' : 'full'}
//                         hidden={{narrow: isTreeExpanded}}
//                         sx={{
//                           marginRight: 'auto',
//                           '@media print': {
//                             display: 'flex !important',
//                           },
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             marginLeft: 'auto',
//                             marginRight: 'auto',
//                             flexDirection: 'column',
//                             pb: 6,
//                             maxWidth: '100%',
//                             mt: 0,
//                           }}
//                           ref={setContentRef}
//                           data-selector="repos-split-pane-content"
//                           tabIndex={0}
//                         >
//                           <FindInFileOpenProvider
//                             searchTerm={searchTerm}
//                             setSearchTerm={setSearchTerm}
//                             isBlame={isBlame}
//                           >
//                             <CodeViewBannersProvider>
//                               <Box
//                                 sx={{
//                                   display: isEdit ? 'none' : 'inherit',
//                                 }}
//                               >
                                <CodeViewHeader
                                  // payload={payload}
                                  showTree={!0
                                    // isTreeExpanded
                                  }
                                  // treeToggleElement={treeToggleElement}
                                  // validCodeNav={validCodeNav}
                                  // onFindFilesShortcut={onFindFilesShortcut}
                                />
//                               </Box>
//                               {payload.error ? (
//                                 <CodeViewError {...payload.error} />
//                               ) : (
//                                 <>
//                                   <Box
//                                     className="react-code-view-bottom-padding"
//                                     sx={{
//                                       mx: 3,
//                                     }}
//                                   >
//                                     <CodeViewBanners payload={payload} />
//                                   </Box>
//                                   <Box
//                                     sx={{
//                                       mx: 3,
//                                     }}
//                                   >
//                                     {isTreePayload(payload) ? (
//                                       <FileTreeViewContent
//                                         tree={payload.tree}
//                                         showTree={isTreeExpanded}
//                                         treeToggleElement={treeToggleElement}
//                                       />
//                                     ) : isEditPayload(payload) ? (
//                                       <Suspense fallback={<LoadingFallback />}>
//                                         <BlobEditor
//                                           collapseTree={collapseTree}
//                                           editInfo={payload.editInfo}
//                                           repo={payload.repo}
//                                           showTree={isTreeExpanded}
//                                           treeToggleElement={treeToggleElement}
//                                           // we need a key so that edit -> new soft nav does a fresh initial render
//                                           key={`${payload.path}_${payload.editInfo.fileName}_${payload.editInfo.isNewFile}`}
//                                           webCommitInfo={payload.webCommitInfo}
//                                           copilotInfo={payload.copilotInfo}
//                                         />
//                                       </Suspense>
//                                     ) : isBlob ? (
//                                       <BlobViewContent
//                                         blame={payload.blame}
//                                         blob={payload.blob}
//                                         symbolsExpanded={payload.symbolsExpanded}
//                                         searchTerm={searchTerm}
//                                         setSearchTerm={setSearchTerm}
//                                         setValidCodeNav={setValidCodeNav}
//                                         showTree={isTreeExpanded}
//                                         treeToggleElement={treeToggleElement}
//                                         validCodeNav={validCodeNav}
//                                         copilotInfo={payload.copilotInfo}
//                                       />
//                                     ) : isDelete ? (
//                                       <DeleteViewContent
//                                         deleteInfo={payload.deleteInfo}
//                                         webCommitInfo={payload.webCommitInfo}
//                                       />
//                                     ) : null}
//                                   </Box>
//                                 </>
//                               )}
//                             </CodeViewBannersProvider>
//                           </FindInFileOpenProvider>
//                         </Box>
//                       </SplitPageLayout.Content>
//                     </SplitPageLayout>
//                   </OpenPanelProvider>
//                 </FileQueryProvider>
//                 <ScrollMarksContainer />
//                 {/* TODO: make this focus on the cursor instead of just the blob as a whole */}
//                 <DuplicateOnKeydownButton
//                   buttonFocusId={textAreaId}
//                   buttonHotkey={toggleFocusedPaneShortcut.hotkey}
//                   onButtonClick={() => toggleFocus()}
//                 />
//               </div>
//             </FileTreeControlProvider>
//           </AllShortcutsEnabledProvider>
//         </FilesPageInfoProvider>
//       </DeferredASTProvider>
//     </DeferredMetadataProvider>
  )
}

// function PermalinkShortcut() {
//   // const urlCreator = useUrlCreator()
//   const {permalinkShortcut} = useShortcut()
//   if (urlCreator.isCurrentPagePermalink()) {
//     return (
//       <DuplicateOnKeydownButton
//         buttonFocusId={textAreaId}
//         buttonHotkey={permalinkShortcut.hotkey}
//         buttonTestLabel={'header-permalink-button'}
//         onlyAddHotkeyScopeButton={true}
//         onButtonClick={() => {
//           //no-op so that the user isn't moved to the bottom of the page while the text area has focus
//         }}
//       />
//     )
//   }

//   return (
//     <DuplicateOnKeydownButton
//       buttonFocusId={textAreaId}
//       buttonHotkey={permalinkShortcut.hotkey}
//       buttonTestLabel={'header-permalink-button'}
//       onButtonClick={() => {
//         // const permalink = urlCreator.createPermalink()
//         if (window.location.href.indexOf(permalink) < 0) {
//           window.history.pushState(null, document.title, permalink)
//         }
//       }}
//     />
//   )
// }

// try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}
try{ (CodeView as any).displayName ||= 'CodeView' } catch {}
// try{ (PermalinkShortcut as any).displayName ||= 'PermalinkShortcut' } catch {}