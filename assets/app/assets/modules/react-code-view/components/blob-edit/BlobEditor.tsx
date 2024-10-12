// import {
  // useFilesPageInfo,
  // useReposAppPayload} from '@github-ui/code-view-shared/contexts/FilesPageInfoContext'
// import {useOpenPanel} from '@github-ui/code-view-shared/contexts/OpenPanelContext'
// import {useShortcut} from '@github-ui/code-view-shared/hooks/shortcuts'
// import {useUrlCreator} from '@github-ui/code-view-shared/hooks/use-url-creator'
// import {linkButtonSx} from '@github-ui/code-view-shared/utilities/styles'
// import type {CodeMirrorSpacingOptions, CollapseTreeFunction, EditInfo,
//     WebCommitInfo} from '@github-ui/code-view-types'
// import type {CopilotInfo} from '@github-ui/copilot-common-types'
import type {Repository} from '@github-ui/current-repository'
// import {branchPath} from '@github-ui/paths'
// import {Link} from '@github-ui/react-core/link'
// import type {RefInfo} from '@github-ui/repos-types' ua
// import {ScreenReaderHeading} from '@github-ui/screen-reader-heading'
// import {ScreenSize, useScreenSize} from '@github-ui/screen-size'
// import type {BypassMetadata} from '@github-ui/secret-scanning'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import type {WebCommitDialogState} from '@github-ui/web-commit-dialog'
import {Box, BranchName, Button, TextInput} from '@primer/react'
import type React from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'

// import {Breadcrumb, Separator} from '../../../react-shared/Breadcrumb'
// import {usePrompt} from '../../hooks/UsePrompt'
// import {Panel} from '../Panel'
// import {BlobEditorBanners} from './banners/BlobEditorBanners'
// edit
import {
  // BlobEditHeader,
  BlobEditorTab} from './BlobEditHeader'
// import {ReactCodeMirror as CodeMirror} from './CodeMirror/CodeMirror' upload
import {EditIssues} from './EditIssues'
// import {EditorPreview} from './EditorPreview' nr
// import {WorkflowEditor} from './Editors/WorkflowEditor' uv
// import {getEditorEnablements, getEditorExtensions} from './hooks/use-editors'
// import {
//   BlobEditSidePanel,
//   blobEditSidePanelEnabled,
//   type BlobEditSidePanelEnabledProps,
// } from './Panels/BlobEditSidePanel'
// import {normalizeRelativePathChange} from './utilities/relative-path-helper'
// import WebCommitDialog from './WebCommitDialog' nr

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor({
  // collapseTree,
  editInfo = {enableCommitButton: 1},
  repo = { isEmpty: !1,
    id: 0,
    name: '',
    ownerLogin: '',
    defaultBranch: '',
    createdAt: '',
    currentUserCanPush: false,
    isFork: false,
    ownerAvatar: '',
    public: false,
    private: false,
    isOrgOwned: false },
  showTree=true,
  // treeToggleElement,
  // webCommitInfo,
  // copilotInfo,
}
// : {
  // collapseTree: CollapseTreeFunction
  // editInfo: {enableCommitButton: number}
  // EditInfo
  // repo: Repository
  // showTree: boolean
  // treeToggleElement: JSX.Element
  // webCommitInfo: WebCommitInfo
  // copilotInfo?: CopilotInfo
// }
) {
  // const {helpUrl} = useReposAppPayload()
  // const {getUrl} = useUrlCreator()
  // const {refInfo, path} = useFilesPageInfo()
  // const payloadFileContents = editInfo.content ?? ''
  // const [initialFileContent, setInitialFileContent] = useState<string>(payloadFileContents)
  const [fileName, setFileName] = useState(
    // editInfo.fileName.split('/').pop() ??
    '')

  // we're using a ref to track the contents without triggering re-renders
  // const fileContentsRef = useRef<string>(initialFileContent)
  // const updatedFileContent = fileContentsRef.current

  // useEffect(() => {
  //   // keep the ref in sync if a user sets content from a banner or template
  //   fileContentsRef.current = initialFileContent
  // }, [initialFileContent])

  const [fileContentChanged, setFileContentChanged] = useState(false)

  // const onCodeMirrorChange = useCallback(
  //   (value: string) => {
  //     fileContentsRef.current = value
  //     if (payloadFileContents !== value) {
  //       setFileContentChanged(true)
  //     }
  //   },
  //   [payloadFileContents],
  // )

  let initialPath = 'drive.google.com/viewerng/viewer?embedded=true&url='
  // path

  const [folderPath, setFolderPath] = useState(() => {
    const initialFolders = initialPath
      // .split('/')
      // .slice(0, !fileName ? undefined : -1)
      // .join('/')
    return initialFolders
    //  ? `${initialFolders}/` : ''
  })

  // const {screenSize} = useScreenSize()

  // const isNarrow = screenSize <= ScreenSize.medium

  const [selectedTab, setSelectedTab] = useState<BlobEditorTab>(BlobEditorTab.Edit)
  // const isEdit = selectedTab === BlobEditorTab.Edit
  const isPreview = selectedTab === BlobEditorTab.Preview

  const nameInputRef = useRef<HTMLInputElement>(null)
  const commitChangesRef = useRef<HTMLButtonElement>(null)

  const [webCommitDialogState, setWebCommitDialogState] = useState<WebCommitDialogState>('closed')

  // const onFileNameChange = useCallback((newFileName: string, newFolderPath: string) => {
  //   // changing file name to/from markdown can cause the editor to re-render
  //   // copy the ref value into the react state so folks dont lose their work
  //   // setInitialFileContent(fileContentsRef.current)

  //   // setFileName(newFileName)
  //   // setFolderPath(newFolderPath)
  // }, [])

  const completeFilePath = `${folderPath}`

  const contentChanged = fileContentChanged || editInfo.enableCommitButton

  const fileNameChanged = completeFilePath !== initialPath

  // This value has to live in a ref because it is used in a callback that is
  // passed to the code mirror editor. That callback will only be bound once,
  // so we need a constant reference to the value.
  const commitDisabledRef = useRef(false)
  commitDisabledRef.current = !(contentChanged || fileNameChanged) || fileName.length === 0
  
  // const {openPanel, setOpenPanel} = useOpenPanel()

  // const panelIsOpen = openPanel === 'edit'

  return (
    <>
      {/* <ScreenReaderHeading as="h1" text={screenReaderHeading} /> */}
      <Box
        sx={{display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', rowGap: 3,
          maxWidth: '100%'}}
      >
        <EditBreadcrumb
          showTree={showTree}
          // treeToggleElement={treeToggleElement}
          folderPath={folderPath}
          repo={repo}
          // refInfo={refInfo}
          // onChange={onFileNameChange}
          fileName={fileName}
          nameInputRef={nameInputRef}
          inputDisabled={isPreview}
        />
        <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
          {/* <Button as={Link} to={getUrl({action: isNewFile ? 'tree' : 'blob'})} sx={{linkButtonSx}}>
            Cancel changes
          </Button> */}

          <Button
            data-hotkey="Mod+s"
            disabled={commitDisabledRef.current}
            onClick={() => commitDisabledRef.current || setWebCommitDialogState('pending')}
            variant="primary"
            sx={{ml: 2}}
            ref={commitChangesRef}
          >
            Commit changes...
          </Button>
        </Box>
      </Box>
    </>
  )
}

function EditBreadcrumb({
  showTree,
  // treeToggleElement,
  folderPath: initialFolderPath,
  repo,
  // refInfo,
  // onChange,
  fileName: initialFileName,
  nameInputRef,
  inputDisabled,
}: {
  showTree: boolean
  // treeToggleElement: React.ReactNode
  folderPath: string
  repo: Repository
  // refInfo: RefInfo
  // onChange: (fileName: string, folderPath: string) => void
  fileName: string
  nameInputRef: React.RefObject<HTMLInputElement>
  inputDisabled: boolean
}) {
  const {codeCenterOption} = useCodeViewOptions()
  const showTreeToggle = !showTree && !repo.isEmpty && !codeCenterOption.enabled

  const [fileName, setFileName] = useState(initialFileName)
  const [folderPath, setFolderPath] = useState(initialFolderPath)

  const onFileNameInputKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        // eslint-disable-next-line @github-ui/ui-commands/no-manual-shortcut-logic
        event.key === 'Backspace' &&
        folderPath.length > 0 &&
        nameInputRef.current?.selectionStart === 0 &&
        nameInputRef.current?.selectionEnd === 0
      ) {
        const pathParts = folderPath
        // .split('/')
        // const unchangedPathParts = pathParts.slice(0, -2)

        // const newFolderPath = unchangedPathParts.length ? `${unchangedPathParts.join('/')}/` : ''
        const newFileName = pathParts
          // [pathParts.length - 2]
          + fileName

        // const partLength = pathParts[pathParts.length - 2]!.length
        event.preventDefault()
        // window.requestAnimationFrame(() => {
        //   nameInputRef.current?.setSelectionRange(partLength, partLength)
        // })

        setFileName(newFileName)
        // setFolderPath(newFolderPath)
        // we dont need to call onChange
        // onFileNameInputKeyPress triggers first and then onFileNameChange
        // onFileNameChange always fires the onChange when needed
      }
    },
    [fileName, folderPath, nameInputRef],
  )

  const onFileNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      let newFileName = fileName
      let newFolderPath = folderPath

      // if (value.includes('/')) {
      //   const pathParts = value.split('/')

      //   if (value.endsWith('/')) {
          // newFileName = ''${folderPath}
          newFolderPath = `${value}`
        // } else {
        //   newFileName = pathParts[pathParts.length - 1] ?? ''
        //   newFolderPath = `${folderPath}${pathParts.slice(0, -1).join('/')}/`

        //   if (pathParts.length > 1) {
        //     window.requestAnimationFrame(() => {
        //       nameInputRef.current?.setSelectionRange(0, 0)
        //     })
        //   }
        // }
      // } else {
      //   newFileName = value
      // }

      // newFolderPath = normalizeRelativePathChange(newFolderPath)

      if (newFolderPath !== initialFolderPath || newFileName !== initialFileName) {
        setFolderPath(newFolderPath)
        // setFileName(newFileName)
        // onChange(newFileName, newFolderPath)
      }
    },
    [
      // onChange,
      fileName, folderPath, initialFileName, initialFolderPath, nameInputRef],
  )

  return (
    <Box sx={{display: 'flex', alignSelf: 'self-start', alignItems: 'center', flex: 1, pr: 3,
      maxWidth: '100%'}}>
      {/* {showTreeToggle && <Box sx={{mr: 2}}>{treeToggleElement}</Box>} */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          flexWrap: 'wrap',
          maxWidth: showTreeToggle ? 'calc(100% - 75px)' : '100%',
        }}
      ><Box sx={{display: 'flex', alignItems: 'center'}}>
          {/* <Separator /> */}
          <TextInput
            aria-label="File name"
            aria-describedby="file-name-editor-breadcrumb"
            disabled={inputDisabled}
            onChange={onFileNameChange}
            onKeyDown={onFileNameInputKeyPress}
            value={fileName}
            ref={nameInputRef}
            placeholder="Name your file..."
            sx={{ minWidth: '100px' }}/>
          <Box sx={{flexShrink: 0, px: 1}}>in</Box>
        </Box>
      </Box>
    </Box>
  )
}

try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}
try{ (EditBreadcrumb as any).displayName ||= 'EditBreadcrumb' } catch {}