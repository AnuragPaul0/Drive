import { Box } from '@primer/react'
import {ReposHeaderBreadcrumb} from './ReposHeaderBreadcrumb'

export default function CodeViewHeader(
  {
  // payload,
  showTree
}: {
  // payload: FilePagePayload
  showTree: boolean
}
) {
  // const {codeCenterOption} = useCodeViewOptions()

  return <Box className="container" sx={{width: '100%'}}>
      <div className="px-3 pt-3 pb-0" id="StickyHeader">
        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column', width: '100%'}}>
          <Box sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 2}}>
            {!showTree ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  minWidth: 0,
                }}
                className="react-code-view-header-wrap--narrow"
              >
                {/* <Box
                  sx={{
                    display: 'block',
                    '@media screen and (min-width: 1360px)': {
                      display: codeCenterOption.enabled ? 'none' : 'block',
                    },
                    mr: 2,
                  }}
                >
                  {treeToggleElement}
                </Box> */}
                {/* <div className="react-code-view-header-mb--narrow mr-2">
                  <ReposHeaderRefSelector
                    buttonClassName="ref-selector-class"
                    idEnding="repos-header-ref-selector-wide"
                  />
                </div> */}
                <Box
                  sx={{alignSelf: 'center', display: 'flex', px: 2, minWidth: 0}}
                  className="react-code-view-header-mb--narrow"
                >
                  <ReposHeaderBreadcrumb
                    id="repos-header-breadcrumb"
                    fileNameId="file-name-id"
                    showCopyPathButton={true}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  alignSelf: 'center',
                  display: 'flex',
                  pr: 2,
                  minWidth: 0,
                }}
              >
                <ReposHeaderBreadcrumb
                  id="repos-header-breadcrumb--wide"
                  fileNameId="file-name-id-wide"
                  showCopyPathButton={true}
                />
              </Box>
            )}
          </Box>
        </Box>
      </div>
</Box> }

// function PageActions({
//   payload,
//   onFindFilesShortcut,
//   narrow,
//   showTree,
//   validCodeNav,
// }: {
//   payload: FilePagePayload
//   onFindFilesShortcut?: () => void
//   narrow: boolean
//   showTree: boolean
//   validCodeNav: boolean
// }) {
//   const onCopy = useCopyRawBlobContents()
//   const {findFileWorkerPath, githubDevUrl} = useReposAppPayload()
//   const {refInfo} = useFilesPageInfo()
//   const {openWithGitHubDevShortcut, openWithGitHubDevInNewWindowShortcut} = useShortcut()
//   const inputRef = useRef<HTMLInputElement>(null)

//   const goToFileInput = !showTree && (
//     <div>
//       <FileResultsList
//         commitOid={refInfo.currentOid}
//         findFileWorkerPath={findFileWorkerPath}
//         searchBoxRef={inputRef}
//         config={{useOverlay: true}}
//         sx={{mr: 1, ml: 1}}
//       />
//       <FindFilesShortcut inputRef={inputRef} onFindFilesShortcut={onFindFilesShortcut} textAreaId={textAreaId} />
//     </div>
//   )

//   return (
//     <Box sx={{minHeight: '32px', display: 'flex', alignItems: 'start'}}>
//       <div className="d-flex gap-2">
//         {isBlobPayload(payload) && (
//           <CurrentBlobProvider blob={payload.blob}>
//             {!narrow && (
//               <>
//                 <ViewRunsButton />
//                 {goToFileInput}
//               </>
//             )}
//             <NavigationMenu
//               onCopy={onCopy}
//               narrow={narrow}
//               validCodeNav={validCodeNav}
//               copilotAccessAllowed={payload.copilotAccessAllowed ?? false}
//             />
//           </CurrentBlobProvider>
//         )}
//         {isTreePayload(payload) && (
//           <>
//             <ScreenReaderHeading as="h2" text="Directory actions" />
//             {!narrow && (
//               <>
//                 {goToFileInput}
//                 <AddFileDropdownButton />
//               </>
//             )}
//             <TreeOverflowMenu narrow={narrow} />
//             <PrimerLink
//               className="js-github-dev-shortcut d-none"
//               data-hotkey={openWithGitHubDevShortcut.hotkey}
//               href={githubDevUrl}
//             />
//             <PrimerLink
//               className="js-github-dev-new-tab-shortcut d-none"
//               data-hotkey={openWithGitHubDevInNewWindowShortcut.hotkey}
//               href={githubDevUrl}
//               target="_blank"
//             />
//           </>
//         )}
//         {isDeletePayload(payload) && (
//           <DeleteHeaderButtons webCommitInfo={payload.webCommitInfo} isBlob={payload.deleteInfo.isBlob} />
//         )}
//       </div>
//     </Box>
//   )
// }

// function TreeOverflowMenu({narrow}: {narrow?: boolean}) {
//   const {refInfo, path} = useFilesPageInfo()
//   const repo = useCurrentRepository()
//   const {sendRepoClickEvent} = useReposAnalytics()
//   const {addToast} = useToastContext()
//   const {createPermalink} = useUrlCreator()
//   const {copyFilePathShortcut, copyPermalinkShortcut} = useShortcut()
//   const {codeCenterOption} = useCodeViewOptions()
//   const moreOptionsButtonRef = useRef(null)
//   const [updateMessage, clearMessage, portalTooltip] = useAlertTooltip(
//     'raw-copy-message-tooltip',
//     moreOptionsButtonRef,
//     {direction: 'nw'},
//   )

//   return (
//     <>
//       {/* Copy link and permalink shortcut */}
//       {copyFilePathShortcut.hotkey && (
//         <DuplicateOnKeydownButton
//           buttonFocusId={textAreaId}
//           buttonHotkey={copyFilePathShortcut.hotkey}
//           onButtonClick={() => {
//             copyText(path)
//             // eslint-disable-next-line @github-ui/dotcom-primer/toast-migration
//             addToast({
//               type: 'success',
//               message: 'Path copied!',
//             })
//           }}
//         />
//       )}
//       {copyPermalinkShortcut.hotkey && (
//         <DuplicateOnKeydownButton
//           buttonFocusId={textAreaId}
//           buttonHotkey={copyPermalinkShortcut.hotkey}
//           onButtonClick={() => {
//             copyText(createPermalink({absolute: true}))
//             // eslint-disable-next-line @github-ui/dotcom-primer/toast-migration
//             addToast({
//               type: 'success',
//               message: 'Permalink copied!',
//             })
//           }}
//         />
//       )}
//       <ScreenReaderHeading as="h2" text="More options" />
//       {portalTooltip}
//       <ActionMenu
//         onOpenChange={open => open && sendRepoClickEvent('MORE_OPTIONS_DROPDOWN')}
//         anchorRef={moreOptionsButtonRef}
//       >
//         <ActionMenu.Anchor>
//           {/* eslint-disable-next-line primer-react/a11y-remove-disable-tooltip */}
//           <IconButton
//             unsafeDisableTooltip={true}
//             icon={KebabHorizontalIcon}
//             aria-label="More options"
//             size="medium"
//             sx={{color: 'fg.muted'}}
//             title="More options"
//             data-testid="tree-overflow-menu-anchor"
//             onBlur={clearMessage}
//           />
//         </ActionMenu.Anchor>

//         <ActionMenu.Overlay width="small">
//           <ActionList>
//             {narrow && refInfo.canEdit && (
//               <>
//                 <ActionList.LinkItem
//                   as={Link}
//                   onClick={() => sendRepoClickEvent('NEW_FILE_BUTTON')}
//                   to={repositoryTreePath({repo, path, commitish: refInfo.name, action: 'new'})}
//                 >
//                   <ActionList.LeadingVisual>
//                     <PlusIcon />
//                   </ActionList.LeadingVisual>
//                   Create new file
//                 </ActionList.LinkItem>
//                 <ActionList.LinkItem
//                   onClick={() => sendRepoClickEvent('UPLOAD_FILES_BUTTON')}
//                   href={repositoryTreePath({repo, path, commitish: refInfo.name, action: 'upload'})}
//                 >
//                   <ActionList.LeadingVisual>
//                     <UploadIcon />
//                   </ActionList.LeadingVisual>
//                   Upload files
//                 </ActionList.LinkItem>
//                 <ActionList.Divider />
//               </>
//             )}
//             <CopyPathsActionItems path={path} updateTooltipMessage={updateMessage} />
//             {refInfo.canEdit && <ActionList.Divider />}
//             <DeleteDirectoryItem />
//             <ActionList.Divider />
//             <ActionList.Group>
//               <ActionList.GroupHeading>View options</ActionList.GroupHeading>
//               <OptionsElement option={codeCenterOption} />
//             </ActionList.Group>
//           </ActionList>
//         </ActionMenu.Overlay>
//       </ActionMenu>
//     </>
//   )
// }

// export function CopyPathsActionItems({
//   path,
//   updateTooltipMessage,
// }: {
//   path: string
//   updateTooltipMessage: (message: string) => void
// }) {
//   const {copyFilePathShortcut} = useShortcut()
//   const {copyPermalinkShortcut} = useShortcut()
//   // const {sendRepoClickEvent} = useReposAnalytics()
//   // const {createPermalink} = useUrlCreator()
//   return (
//     <>
//       <ActionList.Item
//         onSelect={() => {
//           // sendRepoClickEvent('MORE_OPTIONS_DROPDOWN.COPY_PATH')
//           copyText(path)
//           updateTooltipMessage('Path copied!')
//         }}
//       >
//         Copy path
//         {copyFilePathShortcut.hotkey && (
//           <ActionList.TrailingVisual aria-hidden="true">
//             <KeyboardVisual shortcut={copyFilePathShortcut} />
//           </ActionList.TrailingVisual>
//         )}
//       </ActionList.Item>
//       <ActionList.Item
//         onSelect={() => {
//           // sendRepoClickEvent('MORE_OPTIONS_DROPDOWN.COPY_PERMALINK')
//           // copyText(createPermalink({absolute: true}))
//           updateTooltipMessage('Permalink copied!')
//         }}
//       >
//         Copy permalink
//         {copyPermalinkShortcut.hotkey && (
//           <ActionList.TrailingVisual aria-hidden="true">
//             <KeyboardVisual shortcut={copyPermalinkShortcut} />
//           </ActionList.TrailingVisual>
//         )}
//       </ActionList.Item>
//     </>
//   )
// }

// function ViewRunsButton() {
//   const redirectUrl = useWorkflowRedirectUrl()

//   if (!redirectUrl) {
//     return null
//   }

//   return (
//     <Button as={Link} to={redirectUrl}>
//       View Runs
//     </Button>
//   )
// }

try{ (CodeViewHeader as any).displayName ||= 'CodeViewHeader' } catch {}
// try{ PageActions.displayName ||= 'PageActions' } catch {}
// try{ TreeOverflowMenu.displayName ||= 'TreeOverflowMenu' } catch {}
// try{ (CopyPathsActionItems as any).displayName ||= 'CopyPathsActionItems' } catch {}
// try{ ViewRunsButton.displayName ||= 'ViewRunsButton' } catch {}