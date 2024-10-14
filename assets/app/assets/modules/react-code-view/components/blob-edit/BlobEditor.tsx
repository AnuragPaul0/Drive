import {ThemeProvider, BaseStyles} from '@primer/react'
import useColorModes from './use-color-modes'
// import type {Repository} from '@github-ui/current-repository'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import type {WebCommitDialogState} from '@github-ui/web-commit-dialog'
import {Box, BranchName, Button, TextInput} from '@primer/react'
import type React from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'
// edit
import {
  // BlobEditHeader,
  BlobEditorTab} from './BlobEditHeader'

let fileContentChanged = false, fileName = ''

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor({
  // collapseTree,
  editInfo = {enableCommitButton: 1} }
) {
  // const {screenSize} = useScreenSize()
  // const isNarrow = screenSize <= ScreenSize.medium

  const [selectedTab, setSelectedTab] = useState<BlobEditorTab>(BlobEditorTab.Edit)
  const isPreview = selectedTab === BlobEditorTab.Preview
  const commitChangesRef = useRef<HTMLButtonElement>(null)
  const [webCommitDialogState, setWebCommitDialogState] = useState<WebCommitDialogState>('closed')
  const folderPath = 'drive.google.com/viewerng/viewer?embedded=true&url=',
    completeFilePath = `${folderPath}`
  // 1
  const contentChanged = fileContentChanged
  //  || editInfo.enableCommitButton 0
  const initialPath = completeFilePath, fileNameChanged = completeFilePath !== initialPath

  // This value has to live in a ref because it is used in a callback that is
  // passed to the code mirror editor. That callback will only be bound once,
  // so we need a constant reference to the value.
  const commitDisabledRef = useRef(false)
  // folderPath 0 || 0 || 1
  commitDisabledRef.current = !(contentChanged || fileNameChanged) || fileName.length === 0
  console.log({commitDisabledRef})
  // const {openPanel, setOpenPanel} = useOpenPanel()
  // const panelIsOpen = openPanel === 'edit'
  const {colorMode, dayScheme, nightScheme} = useColorModes()
  
  return ( <ThemeProvider colorMode={colorMode} dayScheme={dayScheme} nightScheme={nightScheme}
    preventSSRMismatch>
    <BaseStyles>
    {/* <> */}
      {/* <ScreenReaderHeading as="h1" text={screenReaderHeading} /> */}
      <Box
        sx={{display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', rowGap: 3,
          maxWidth: '100%'}}
      >
        <EditBreadcrumb foldrPath='drive.google.com/viewerng/viewer?embedded=true&url'/>
        <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
          <Button data-hotkey="Mod+s" disabled={commitDisabledRef.current}
            onClick={() => commitDisabledRef.current || setWebCommitDialogState('pending')}
            variant="primary" sx={{ml: 2}}
            ref={commitChangesRef}
          >Commit changes...
          </Button>
        </Box>
      </Box>
    {/* </> */}
    </BaseStyles>
  </ThemeProvider>
  )
}

function EditBreadcrumb({
  showTree =true,
  // treeToggleElement,
  foldrPath = '',
  repo= { isEmpty: !1,
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
  fileNam = '',
  nameInputRef = useRef<HTMLInputElement>(null),
  inputDisabled = !1,
}
) {
  const {codeCenterOption} = useCodeViewOptions(), initialFolderPath = foldrPath
  const showTreeToggle = !showTree && !repo.isEmpty && !codeCenterOption.enabled

  const initialFileName = fileNam
  // , [fileName, setFileName] = useState(initialFileName)
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
        const newFileName = pathParts
          // [pathParts.length - 2]
          + fileName

        // const partLength = pathParts[pathParts.length - 2]!.length
        event.preventDefault()
        
        // setFileName(newFileName)
        fileName = newFileName
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

        newFolderPath = `${value}`
      
      if (newFolderPath !== initialFolderPath || newFileName !== initialFileName) {
        setFolderPath(newFolderPath), fileContentChanged = !0, fileName = newFileName
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
        }}><Box sx={{display: 'flex', alignItems: 'center'}}>
          {/* <Separator /> */}
          <TextInput id='inp' aria-label="File name"
          aria-describedby="file-name-editor-breadcrumb" disabled={inputDisabled}
          onChange={onFileNameChange}
          // onKeyDown={onFileNameInputKeyPress}
          // value={fileName}
          // ref={nameInputRef}
          placeholder="Name your file..."
          sx={{ minWidth: '100px' }} block={undefined} contrast={undefined} monospace={undefined}
            width={undefined} maxWidth={undefined} minWidth={undefined} variant={undefined}
            size={undefined} validationStatus={undefined} as={'input'}/>
        </Box>
      </Box>
    </Box>
  )
}

try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}
try{ (EditBreadcrumb as any).displayName ||= 'EditBreadcrumb' } catch {}