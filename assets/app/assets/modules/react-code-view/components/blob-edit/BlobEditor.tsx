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

let fileContentChanged = false, fileName = '', contentChanged = fileContentChanged,
  folderPath = 'drive.google.com/viewerng/viewer?embedded=true&url=',
  completeFilePath = `${folderPath}`, initialPath = completeFilePath,
  fileNameChanged = completeFilePath !== initialPath, count = !0
  // commitDisabledRef = !(contentChanged || fileNameChanged) || fileName.length === 0

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor({
  // collapseTree, editInfo = {enableCommitButton: 1}
  }
) {
  // const {screenSize} = useScreenSize()
  // const isNarrow = screenSize <= ScreenSize.medium
  // const [count, setCount] = useState(!0);
  const [selectedTab, setSelectedTab] = useState<BlobEditorTab>(BlobEditorTab.Edit)
  const isPreview = selectedTab === BlobEditorTab.Preview
  const commitChangesRef = useRef<HTMLButtonElement>(null)
  const [webCommitDialogState, setWebCommitDialogState] = useState<WebCommitDialogState>('closed')
  // 1
  //  || editInfo.enableCommitButton 0
  // This value has to live in a ref because it is used in a callback that is
  // passed to the code mirror editor. That callback will only be bound once,
  // so we need a constant reference to the value.
  // const commitDisabledRef = useRef(false)
  // folderPath 0 || 0 || 1
  // commitDisabledRef.current = !(contentChanged || fileNameChanged) || fileName.length === 0
  // console.log({commitDisabledRef})
  console.log(1)
  // const {openPanel, setOpenPanel} = useOpenPanel()
  // const panelIsOpen = openPanel === 'edit'
  const {colorMode, dayScheme, nightScheme} = useColorModes()
  

  try{ (EditBreadcrumb as any).displayName ||= 'EditBreadcrumb' } catch {}
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
          // console.log({contentChanged, fileNameChanged, fileName})
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
          setFolderPath(newFolderPath), fileContentChanged = !0, contentChanged = fileContentChanged,
            fileName = value, count = !value.length
            // , commitDisabledRef.current = !()
            // setCount(!value.length)
          // setFileName(newFileName)
          // onChange(newFileName, newFolderPath)
          console.log({contentChanged, fileNameChanged, fileName
            // , commitDisabledRef
          })
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
              aria-describedby="file-name-editor-breadcrumb"
              disabled={inputDisabled}
              onChange={onFileNameChange}
              // onKeyDown={onFileNameInputKeyPress}fileName
              value={firstName}
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
  function handleFirstNameChange(e: any) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: any) {
    setLastName(e.target.value);
  }

// mmitDisabledRef.current || 
  return ( <ThemeProvider colorMode={colorMode} dayScheme={dayScheme} nightScheme={nightScheme}
    preventSSRMismatch>
    <BaseStyles>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        {/* <input
          value={firstName}
          onChange={handleFirstNameChange}
        /> */}
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{firstName}</b>
      </p><Box
        sx={{display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', rowGap: 3,
          maxWidth: '100%'}}
      >
         <EditBreadcrumb foldrPath='drive.google.com/viewerng/viewer?embedded=true&url'/>
         <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
           <Button data-hotkey="Mod+s" disabled={!firstName.length}
//             onClick={() => setWebCommitDialogState('pending')}
            variant="primary" sx={{ml: 2}}
             // ref={commitChangesRef}count
          >Commit changes...
          </Button>
        </Box>
      </Box></BaseStyles>
  </ThemeProvider>
  )
}


try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}