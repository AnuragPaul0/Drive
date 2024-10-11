import type {CodeMirrorSpacingOptions, EditInfo, PanelType} from '@github-ui/code-view-types'
// import type {CopilotInfo} from '@github-ui/copilot-common-types'
// import {CopilotPopover} from '@github-ui/copilot-popover'
// import {Box, Checkbox, FormControl, SegmentedControl} from '@primer/react'
// import {useMemo} from 'react'

// import {blobEditSidePanelId} from './BlobEditor'
// import {CodeMirrorSpacingControls} from './CodeMirror/CodeMirrorSpacingControls'
import {ExpandPanelButton} from './Panels/ExpandPanelButton'
// import CodeOfConductSelector from './templates/CodeOfConductSelector'
// import {GitIgnoreTemplateSelector} from './templates/GitIgnoreTemplateSelector'
// import LicenseSelector from './templates/LicenseSelector'

export enum BlobEditorTab {
  Edit = 0,
  Preview = 1,
}

export interface BlobEditHeaderProps {
  codeMirrorSpacingOptions: CodeMirrorSpacingOptions
  editInfo: EditInfo
  fileName: string
  isRichtextRenderable: boolean
  onTabChange: (index: number) => void
  panelIsEnabled: boolean
  panelIsOpen: boolean
  selectedTab: BlobEditorTab
  setCodeMirrorSpacingOptions: (options: CodeMirrorSpacingOptions) => void
  setOpenPanel: (panelType: PanelType | undefined) => void
  setShowMarkdownDiff: (show: boolean) => void
  setUpdatedFileContent: (content: string) => void
  showMarkdownDiff: boolean
  codeMirrorSpacingControls?: JSX.Element
//   copilotInfo?: CopilotInfo
}

export function BlobEditHeader({
  codeMirrorSpacingOptions,
  editInfo,
  fileName,
  isRichtextRenderable,
  onTabChange,
  panelIsEnabled,
  panelIsOpen,
  selectedTab,
  setCodeMirrorSpacingOptions,
  setOpenPanel,
  setShowMarkdownDiff,
  setUpdatedFileContent,
  showMarkdownDiff,
  // copilotInfo,
}: BlobEditHeaderProps) {
  const isNewFile = editInfo.isNewFile
  const isEditing = selectedTab === BlobEditorTab.Edit
  const isPreviewing = selectedTab === BlobEditorTab.Preview

  const showLicensePicker =
    editInfo.pickers.licensePickerAvailable && /^(licen[sc]e|copying)(-)?(-\D+)?($|\..)/i.test(fileName)

  const showCodeOfConductPicker =
    editInfo.pickers.codeOfConductPickerAvailable && /^(code.?of.?conduct|coc)($|\..)/i.test(fileName)

  const showGitIgnoreTemplateSelector = fileName === '.gitignore'
  const showSpacingControls = editInfo.codeMirror?.showFileActions && isEditing
  const showMarkdownDiffPreview = isRichtextRenderable && isPreviewing && !isNewFile

  let marginRightOffset = 8 // right padding

  if (panelIsEnabled) {
    marginRightOffset = marginRightOffset + 37 // icon (32px) + flex gap (4px) + border (1px)
  }

  const panelToggleElement = useMemo(() => {
    if (!panelIsEnabled) {
      return undefined
    }

    return (
      <ExpandPanelButton
        ariaControls={blobEditSidePanelId}
        expanded={panelIsOpen}
        onToggleExpanded={() => setOpenPanel(panelIsOpen ? undefined : 'edit')}
      />
    )
  }, [panelIsEnabled, panelIsOpen, setOpenPanel])

  return (
    <Box
      sx={{
        backgroundColor: 'canvas.subtle',
        borderBottom: '1px solid',
        borderColor: 'border.default',
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        gap: 2,
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <SegmentedControl
          sx={{fontSize: 1, minHeight: '30px'}}
          size="small"
          aria-label="Edit mode"
          onChange={onTabChange}
        >
          <SegmentedControl.Button selected={isEditing}>Edit</SegmentedControl.Button>
          <SegmentedControl.Button selected={isPreviewing}>Preview</SegmentedControl.Button>
        </SegmentedControl>

        <Box
          sx={{
            display: ['flex', 'none'],
            justifyContent: 'stretch',
            flexGrow: 1,
            borderTop: '1px solid',
            borderColor: 'border.default',
            width: '100%',
            ml: -2,
            mr: `-${marginRightOffset}px`,
          }}
        />

        {isEditing && (
          <>
            {showGitIgnoreTemplateSelector && (
              <GitIgnoreTemplateSelector
                onTemplateSelect={setUpdatedFileContent}
                sx={{
                  minHeight: '30px',
                  width: ['100%', 'auto'],
                  '> span[data-component=buttonContent]': {justifyContent: ['start', 'center']},
                }}
              />
            )}

            {showLicensePicker && (
              <LicenseSelector url={editInfo.pickers.licenseToolPath} sx={{width: ['100%', 'auto']}} />
            )}

            {showCodeOfConductPicker && (
              <CodeOfConductSelector url={editInfo.pickers.codeOfConductToolPath} sx={{width: ['100%', 'auto']}} />
            )}
          </>
        )}

        <CopilotPopover copilotInfo={copilotInfo} view={'edit'} />

        <Box sx={{display: ['none', 'flex'], flexGrow: 1}} />

        <Box sx={{justifySelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 2, width: ['100%', 'auto']}}>
          {showMarkdownDiffPreview && (
            <Box sx={{alignSelf: 'center', justifySelf: 'flex-end', display: 'flex'}}>
              <FormControl>
                <Checkbox checked={showMarkdownDiff} onChange={() => setShowMarkdownDiff(!showMarkdownDiff)} />
                <FormControl.Label sx={{fontWeight: 'normal'}}>Show Diff</FormControl.Label>
              </FormControl>
            </Box>
          )}

          {showSpacingControls && (
            <CodeMirrorSpacingControls
              options={codeMirrorSpacingOptions}
              onChange={setCodeMirrorSpacingOptions}
              sx={{display: 'flex', width: ['100%', 'auto']}}
              formControlSx={{display: ['grid', 'flex'], width: ['100%', 'auto']}}
            />
          )}
        </Box>
      </Box>

      {panelToggleElement}
    </Box>
  )
}

try{ BlobEditHeader.displayName ||= 'BlobEditHeader' } catch {}