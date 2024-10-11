import {useFilesPageInfo, useReposAppPayload} from '@github-ui/code-view-shared/contexts/FilesPageInfoContext'
import {useOpenPanel} from '@github-ui/code-view-shared/contexts/OpenPanelContext'
import {useShortcut} from '@github-ui/code-view-shared/hooks/shortcuts'
// import {useUrlCreator} from '@github-ui/code-view-shared/hooks/use-url-creator'
import {linkButtonSx} from '@github-ui/code-view-shared/utilities/styles'
import type {CodeMirrorSpacingOptions, CollapseTreeFunction, EditInfo,
    WebCommitInfo} from '@github-ui/code-view-types'
// import type {CopilotInfo} from '@github-ui/copilot-common-types'
import type {Repository} from '@github-ui/current-repository'
// import {branchPath} from '@github-ui/paths'
import {Link} from '@github-ui/react-core/link'
// import type {RefInfo} from '@github-ui/repos-types' ua
import {ScreenReaderHeading} from '@github-ui/screen-reader-heading'
import {ScreenSize, useScreenSize} from '@github-ui/screen-size'
import type {BypassMetadata} from '@github-ui/secret-scanning'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import type {WebCommitDialogState} from '@github-ui/web-commit-dialog'
import {Box, BranchName, Button, TextInput} from '@primer/react'
import type React from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'

import {Breadcrumb, Separator} from '../../../react-shared/Breadcrumb'
import {usePrompt} from '../../hooks/UsePrompt'
import {Panel} from '../Panel'
import {BlobEditorBanners} from './banners/BlobEditorBanners'
import {BlobEditHeader, BlobEditorTab} from './BlobEditHeader'
import {ReactCodeMirror as CodeMirror} from './CodeMirror/CodeMirror'
import {EditIssues} from './EditIssues'
import {EditorPreview} from './EditorPreview'
import {WorkflowEditor} from './Editors/WorkflowEditor'
import {getEditorEnablements, getEditorExtensions} from './hooks/use-editors'
import {
  BlobEditSidePanel,
  blobEditSidePanelEnabled,
  type BlobEditSidePanelEnabledProps,
} from './Panels/BlobEditSidePanel'
import {normalizeRelativePathChange} from './utilities/relative-path-helper'
import WebCommitDialog from './WebCommitDialog'

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor({
  collapseTree,
  editInfo,
  repo,
  showTree,
  treeToggleElement,
  webCommitInfo,
  copilotInfo,
}: {
  collapseTree: CollapseTreeFunction
  editInfo: EditInfo
  repo: Repository
  showTree: boolean
  treeToggleElement: JSX.Element
  webCommitInfo: WebCommitInfo
  copilotInfo?: CopilotInfo
}) {
  const {helpUrl} = useReposAppPayload()
  const {getUrl} = useUrlCreator()
  const {refInfo, path} = useFilesPageInfo()
  const payloadFileContents = editInfo.content ?? ''
  const [initialFileContent, setInitialFileContent] = useState<string>(payloadFileContents)
  const [fileName, setFileName] = useState(editInfo.fileName.split('/').pop() ?? '')

  // we're using a ref to track the contents without triggering re-renders
  const fileContentsRef = useRef<string>(initialFileContent)
  const updatedFileContent = fileContentsRef.current

  useEffect(() => {
    // keep the ref in sync if a user sets content from a banner or template
    fileContentsRef.current = initialFileContent
  }, [initialFileContent])

  const [fileContentChanged, setFileContentChanged] = useState(false)

  const onCodeMirrorChange = useCallback(
    (value: string) => {
      fileContentsRef.current = value
      if (payloadFileContents !== value) {
        setFileContentChanged(true)
      }
    },
    [payloadFileContents],
  )

  const isNewFile = editInfo.isNewFile

  let initialPath = path

  if (isNewFile && editInfo.fileName) {
    if (initialPath) {
      initialPath += `/${editInfo.fileName}`
    } else {
      initialPath = editInfo.fileName
    }
  }

  const [folderPath, setFolderPath] = useState(() => {
    const initialFolders = initialPath
      .split('/')
      .slice(0, !fileName ? undefined : -1)
      .join('/')
    return initialFolders ? `${initialFolders}/` : ''
  })

  const initialFolderPath = useRef(folderPath)

  const [hasLeadingOrTrailingWhitespaceInPath, setHasLeadingOrTrailingWhitespaceInPath] = useState(false)
  useEffect(() => {
    if (folderPath !== initialFolderPath.current) {
      setHasLeadingOrTrailingWhitespaceInPath(folderPath.split('/').some(folder => folder.trim() !== folder))
    }
  }, [folderPath])

  const {screenSize} = useScreenSize()

  const isNarrow = screenSize <= ScreenSize.medium

  const [selectedTab, setSelectedTab] = useState<BlobEditorTab>(BlobEditorTab.Edit)
  const isEdit = selectedTab === BlobEditorTab.Edit
  const isPreview = selectedTab === BlobEditorTab.Preview
  const {selectEditTabShortcut} = useShortcut()

  const [codeMirrorSpacingOptions, setCodeMirrorSpacingOptions] = useState<CodeMirrorSpacingOptions>({
    lineWrapping: editInfo.codeMirror?.lineWrapping,
    indentMode: editInfo.codeMirror?.indentMode,
    indentSize: editInfo.codeMirror?.indentSize,
  })

  const [secretDetected, setSecretDetected] = useState(false)
  const [secretBypassMetadata, setSecretBypassMetadata] = useState<BypassMetadata>()

  const completeFilePath = `${folderPath}${fileName}`

  const nameInputRef = useRef<HTMLInputElement>(null)
  const commitChangesRef = useRef<HTMLButtonElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const focusCodeMirrorOnNextRender = useRef<boolean>(false)

  const [webCommitDialogState, setWebCommitDialogState] = useState<WebCommitDialogState>('closed')

  const onFileNameChange = useCallback((newFileName: string, newFolderPath: string) => {
    // changing file name to/from markdown can cause the editor to re-render
    // copy the ref value into the react state so folks dont lose their work
    setInitialFileContent(fileContentsRef.current)

    setFileName(newFileName)
    setFolderPath(newFolderPath)
  }, [])

  const contentChanged = fileContentChanged || editInfo.enableCommitButton

  const fileNameChanged = completeFilePath !== initialPath

  // This value has to live in a ref because it is used in a callback that is
  // passed to the code mirror editor. That callback will only be bound once,
  // so we need a constant reference to the value.
  const commitDisabledRef = useRef(false)
  commitDisabledRef.current = !(contentChanged || fileNameChanged) || fileName.length === 0

  let placeholderMessage = `Update ${fileName}`

  if (isNewFile) {
    placeholderMessage = `Create ${fileName}`
  } else if (fileNameChanged) {
    let messageAction
    if (contentChanged) {
      messageAction = 'Update and rename'
    } else {
      messageAction = 'Rename'
    }

    if (folderPath.split('/').length !== initialPath.split('/').length) {
      placeholderMessage = `${messageAction} ${initialPath} to ${folderPath}${fileName}`
    } else {
      placeholderMessage = `${messageAction} ${editInfo.fileName} to ${fileName}`
    }
  }

  usePrompt(
    'You have unsaved changes. Do you want to discard them?',
    (contentChanged || fileNameChanged) && webCommitDialogState !== 'saved',
  )

  const fileExtension = fileName.includes('.') ? `.${fileName.split('.').pop()}` : undefined

  const isRichtextRenderable = !!fileExtension && editInfo.renderableExtensions.includes(fileExtension)

  const [showMarkdownDiff, setShowMarkdownDiff] = useState(isNewFile)

  const enabledEditors = getEditorEnablements(editInfo.editors, completeFilePath)
  const {workflowEditorEnabled, devContainerEditorEnabled, dependabotEditorEnabled} = enabledEditors

  const editorExtensions = getEditorExtensions(editInfo.editors, completeFilePath)

  const isDiscussionTemplate =
    completeFilePath.startsWith('.github/DISCUSSION_TEMPLATE/') && /\.(yml|yaml)$/i.test(fileName)

  const isIssueTemplate =
    completeFilePath.startsWith('.github/ISSUE_TEMPLATE/') && /^((?!config).+\.(md|yml|yaml))$/i.test(fileName)

  const isIssueForm =
    completeFilePath.startsWith('.github/ISSUE_TEMPLATE/') && /^((?!config).+\.(yml|yaml))$/i.test(fileName)

  const isLegacyIssueTemplate = /^(\.github\/)?issue(_|-)template\.md$/i.test(completeFilePath)

  // a lot of these are being reused between here and banners - need to look into cleaning this up soon
  const sidePanelEnabledProps: BlobEditSidePanelEnabledProps = {
    workflowEditorEnabled,
    devContainerEditorEnabled,
    isIssueForm,
    isIssueTemplate: isIssueTemplate || isLegacyIssueTemplate,
    isDiscussionTemplate,
  }

  const panelIsEnabled = blobEditSidePanelEnabled(sidePanelEnabledProps) && !editInfo.isOnboardingGuidance
  const {openPanel, setOpenPanel} = useOpenPanel()

  const panelIsOpen = openPanel === 'edit'

  useEffect(() => {
    if (panelIsEnabled && !isNarrow) {
      setOpenPanel('edit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelIsEnabled, setOpenPanel])

  // If we lose the proper path, we need to close the panel or else it will just be blank
  // But don't open the panel automatically if they gain the proper path
  useEffect(() => {
    if (panelIsOpen && !panelIsEnabled) {
      setOpenPanel(undefined)
    }
  }, [panelIsEnabled, panelIsOpen, setOpenPanel])

  // set focus to name input box on page load if it is a new file
  useEffect(() => {
    if (isNewFile) {
      nameInputRef?.current?.focus()
    }
  }, [isNewFile])

  // hide the tree if we're on an empty repo
  useEffect(() => {
    if (repo.isEmpty) {
      collapseTree()
    }
  }, [collapseTree, repo.isEmpty])

  if (webCommitInfo.shouldFork || webCommitInfo.shouldUpdate || webCommitInfo.lockedOnMigration) {
    return (
      <>
        {!isNewFile && (
          <EditBreadcrumb
            showTree={showTree}
            treeToggleElement={treeToggleElement}
            folderPath={folderPath}
            repo={repo}
            refInfo={refInfo}
            onChange={onFileNameChange}
            fileName={fileName}
            nameInputRef={nameInputRef}
            inputDisabled={true}
          />
        )}
        <EditIssues binary={false} helpUrl={helpUrl} webCommitInfo={webCommitInfo} />
      </>
    )
  }

  let screenReaderHeading

  if (isNewFile) {
    screenReaderHeading = 'Creating a new'
  } else {
    screenReaderHeading = 'Editing'
  }

  let generic = false

  if (workflowEditorEnabled) {
    screenReaderHeading += ' workflow file'
  } else if (dependabotEditorEnabled) {
    screenReaderHeading += ' dependabot file'
  } else if (devContainerEditorEnabled) {
    screenReaderHeading += ' devcontainer file'
  } else if (isIssueTemplate) {
    screenReaderHeading += ' issue template file'
  } else if (isDiscussionTemplate) {
    screenReaderHeading += ' discussion template file'
  } else {
    generic = true
  }

  screenReaderHeading += ` ${isNewFile ? (generic ? 'file' : '') : ` ${fileName}`} in ${repo.name}`

  return (
    <>
      <ScreenReaderHeading as="h1" text={screenReaderHeading} />

      {workflowEditorEnabled && (
        <WorkflowEditor
          helpUrl={helpUrl}
          isEnterprise={editInfo.editors.isEnterprise}
          repositoryActionsEnabled={editInfo.editors.repositoryActionsEnabled}
          repositoryActionsReadinessPath={editInfo.editors.repositoryActionsReadinessPath}
        />
      )}

      <BlobEditorBanners
        content={updatedFileContent}
        editInfo={editInfo}
        webCommitInfo={webCommitInfo}
        fileName={fileName}
        filePath={completeFilePath}
        hasLeadingOrTrailingWhitespaceInPath={hasLeadingOrTrailingWhitespaceInPath}
        isIssueTemplate={isIssueTemplate}
        isLegacyIssueTemplate={isLegacyIssueTemplate}
        secretDetected={secretDetected}
        secretBypassMetadata={secretBypassMetadata}
        onSetContent={setInitialFileContent}
      />

      <Box
        sx={{display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', rowGap: 3, maxWidth: '100%'}}
      >
        <EditBreadcrumb
          showTree={showTree}
          treeToggleElement={treeToggleElement}
          folderPath={folderPath}
          repo={repo}
          refInfo={refInfo}
          onChange={onFileNameChange}
          fileName={fileName}
          nameInputRef={nameInputRef}
          inputDisabled={isPreview}
        />
        <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
          <Button as={Link} to={getUrl({action: isNewFile ? 'tree' : 'blob'})} sx={{linkButtonSx}}>
            Cancel changes
          </Button>

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
      {!editInfo.binary ? (
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 3, marginTop: 3}}>
          <Panel
            sx={{
              display: 'flex',
              isolation: 'isolate',
              maxWidth: panelIsOpen && !isNarrow ? '70%' : '100%',
              overflowY: 'none',
              contain: 'none',
              zIndex: 1,
              flex: 1,
            }}
          >
            <BlobEditHeader
              codeMirrorSpacingOptions={codeMirrorSpacingOptions}
              editInfo={editInfo}
              fileName={fileName}
              isRichtextRenderable={isRichtextRenderable}
              onTabChange={setSelectedTab}
              panelIsEnabled={panelIsEnabled}
              panelIsOpen={panelIsOpen}
              selectedTab={selectedTab}
              setCodeMirrorSpacingOptions={setCodeMirrorSpacingOptions}
              setOpenPanel={setOpenPanel}
              setShowMarkdownDiff={setShowMarkdownDiff}
              setUpdatedFileContent={setInitialFileContent}
              showMarkdownDiff={showMarkdownDiff}
              copilotInfo={copilotInfo}
            />
            <>
              <Box
                sx={{display: isEdit ? 'flex' : 'none', isolation: 'isolate', minHeight: 0, flexDirection: 'column'}}
                className="react-code-view-edit"
              >
                <CodeMirror
                  fileName={fileName}
                  value={initialFileContent}
                  spacingOptions={codeMirrorSpacingOptions}
                  onChange={onCodeMirrorChange}
                  extensions={editorExtensions}
                  onPreview={() => {
                    setSelectedTab(BlobEditorTab.Preview)
                    // Safari keeps codemirror focused even when display is set to none
                    window.requestAnimationFrame(() => {
                      previewContainerRef.current?.focus()
                    })
                  }}
                  focusOnNextRender={focusCodeMirrorOnNextRender}
                  // We need this in addition to the data-hotkey on the commit button because the editor
                  // swallows the Ctrl+S events for some reason. So in order to handle hotkeys both
                  // inside and outside the editor, we need both triggers.
                  onSave={() => commitDisabledRef.current || setWebCommitDialogState('pending')}
                  repositoryId={repo.id}
                  uploadPolicyPath={editInfo.uploadPolicyPath}
                  uploadExtensions={editInfo.uploadExtensions}
                  markdownDocsUrl={editInfo.markdownDocsUrl}
                />
              </Box>
              {isPreview && (
                <Box
                  ref={previewContainerRef}
                  tabIndex={-1}
                  sx={{outline: 'none', isolation: 'isolate', minHeight: 0, overflowY: 'auto'}}
                >
                  <button
                    hidden={true}
                    data-hotkey={selectEditTabShortcut.hotkey}
                    onClick={() => {
                      // Set focus to codemirror
                      focusCodeMirrorOnNextRender.current = true
                      setSelectedTab(BlobEditorTab.Edit)
                    }}
                  />
                  <EditorPreview
                    editInfo={editInfo}
                    fileContent={updatedFileContent}
                    fileName={fileName}
                    refInfo={refInfo}
                    showMarkdownDiff={showMarkdownDiff}
                    isRichtextRenderable={isRichtextRenderable}
                  />
                </Box>
              )}
            </>
          </Panel>
          {panelIsOpen && (
            <BlobEditSidePanel
              id={blobEditSidePanelId}
              isEnterprise={editInfo.editors.isEnterprise}
              isProxima={editInfo.editors.isProxima}
              enabledProps={sidePanelEnabledProps}
              isNarrow={isNarrow}
              onClosePanel={() => setOpenPanel(undefined)}
            />
          )}
        </Box>
      ) : (
        <EditIssues binary={true} helpUrl={helpUrl} webCommitInfo={webCommitInfo} />
      )}
      {webCommitDialogState === 'pending' || webCommitDialogState === 'saving' ? (
        <WebCommitDialog
          content={updatedFileContent}
          contentChanged={contentChanged}
          fileName={completeFilePath}
          isDelete={false}
          isNewFile={isNewFile}
          helpUrl={helpUrl}
          oldPath={initialPath}
          ownerName={repo.ownerLogin}
          placeholderMessage={placeholderMessage}
          refName={refInfo.name}
          returnFocusRef={commitChangesRef}
          dialogState={webCommitDialogState}
          setDialogState={(state: WebCommitDialogState) => {
            setWebCommitDialogState(state)

            if (state === 'closed' || state === 'saved') {
              window.requestAnimationFrame(() => {
                if (commitChangesRef.current) {
                  commitChangesRef.current.focus()
                }
              })
            }
          }}
          webCommitInfo={webCommitInfo}
          setSecretDetected={setSecretDetected}
          setSecretBypassMetadata={setSecretBypassMetadata}
        />
      ) : null}
    </>
  )
}

function EditBreadcrumb({
  showTree,
  treeToggleElement,
  folderPath: initialFolderPath,
  repo,
  refInfo,
  onChange,
  fileName: initialFileName,
  nameInputRef,
  inputDisabled,
}: {
  showTree: boolean
  treeToggleElement: React.ReactNode
  folderPath: string
  repo: Repository
  refInfo: RefInfo
  onChange: (fileName: string, folderPath: string) => void
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
        const pathParts = folderPath.split('/')
        const unchangedPathParts = pathParts.slice(0, -2)

        const newFolderPath = unchangedPathParts.length ? `${unchangedPathParts.join('/')}/` : ''
        const newFileName = pathParts[pathParts.length - 2] + fileName

        const partLength = pathParts[pathParts.length - 2]!.length
        event.preventDefault()
        window.requestAnimationFrame(() => {
          nameInputRef.current?.setSelectionRange(partLength, partLength)
        })

        setFileName(newFileName)
        setFolderPath(newFolderPath)
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

      if (value.includes('/')) {
        const pathParts = value.split('/')

        if (value.endsWith('/')) {
          newFileName = ''
          newFolderPath = `${folderPath}${value}`
        } else {
          newFileName = pathParts[pathParts.length - 1] ?? ''
          newFolderPath = `${folderPath}${pathParts.slice(0, -1).join('/')}/`

          if (pathParts.length > 1) {
            window.requestAnimationFrame(() => {
              nameInputRef.current?.setSelectionRange(0, 0)
            })
          }
        }
      } else {
        newFileName = value
      }

      newFolderPath = normalizeRelativePathChange(newFolderPath)

      if (newFolderPath !== initialFolderPath || newFileName !== initialFileName) {
        setFolderPath(newFolderPath)
        setFileName(newFileName)
        onChange(newFileName, newFolderPath)
      }
    },
    [onChange, fileName, folderPath, initialFileName, initialFolderPath, nameInputRef],
  )

  return (
    <Box sx={{display: 'flex', alignSelf: 'self-start', alignItems: 'center', flex: 1, pr: 3, maxWidth: '100%'}}>
      {showTreeToggle && <Box sx={{mr: 2}}>{treeToggleElement}</Box>}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          flexWrap: 'wrap',
          maxWidth: showTreeToggle ? 'calc(100% - 75px)' : '100%',
        }}
      >
        <Breadcrumb
          id="file-name-editor-breadcrumb"
          path={folderPath}
          repo={repo}
          commitish={refInfo.name}
          isFolder={false}
        />
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Separator />
          <TextInput
            aria-label="File name"
            aria-describedby="file-name-editor-breadcrumb"
            disabled={inputDisabled}
            onChange={onFileNameChange}
            onKeyDown={onFileNameInputKeyPress}
            value={fileName}
            ref={nameInputRef}
            placeholder="Name your file..."
            sx={{minWidth: '100px'}}
          />
          <Box sx={{flexShrink: 0, px: 1}}>in</Box>
          <BranchName href={branchPath({owner: repo.ownerLogin, repo: repo.name, branch: refInfo.name})}>
            {refInfo.name}
          </BranchName>
        </Box>
      </Box>
    </Box>
  )
}

try{ BlobEditor.displayName ||= 'BlobEditor' } catch {}
try{ EditBreadcrumb.displayName ||= 'EditBreadcrumb' } catch {}