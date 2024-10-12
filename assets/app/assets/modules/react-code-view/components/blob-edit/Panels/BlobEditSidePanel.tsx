import {AlertFillIcon, XIcon} from '@primer/octicons-react'
import {Box, IconButton, Spinner, Text, UnderlineNav} from '@primer/react'
// import {Octicon} from '@primer/react/deprecated'
import {Dialog} from '@primer/react/experimental'
import {useState} from 'react'

import {useStickyHeaderSx} from '../../../hooks/use-sticky-observer'
import {Panel} from '../../Panel'
// import {useSidePanelMetadata} from '../hooks/use-side-panel-metadata'
// import {DevContainerDocumentation} from './DevContainer/Documentation'
// import {DevContainerMarketplace} from './DevContainer/Marketplace'
// import {ServerSideDocumentation} from './ServerSideDocumentation'
// import {WorkflowMarketplace} from './Workflows/Marketplace' nv

export interface BlobEditSidePanelEnabledProps {
  workflowEditorEnabled: boolean
  devContainerEditorEnabled: boolean
  isIssueTemplate: boolean
  isIssueForm: boolean
  isDiscussionTemplate: boolean
}

interface BlobEditSidePanelProps {
  enabledProps: BlobEditSidePanelEnabledProps
  isEnterprise: boolean
  isProxima: boolean
  isNarrow: boolean
  onClosePanel: () => void
  id: string
}

export function blobEditSidePanelEnabled(enabledProps: BlobEditSidePanelEnabledProps) {
  return (
    enabledProps.workflowEditorEnabled ||
    enabledProps.devContainerEditorEnabled ||
    enabledProps.isIssueTemplate ||
    enabledProps.isIssueForm ||
    enabledProps.isDiscussionTemplate
  )
}

function SidePanelErrorMessage() {
  return (
    <Text sx={{color: 'attention.fg', p: 3}} data-testid="side-panel-error-message">
      &nbsp;Cannot retrieve help documentation at this time.
    </Text>
  )
}

function SidePanelLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        p: 3,
        justifyContent: 'center',
      }}
    >
      <Spinner size="small" />
    </Box>
  )
}

export function BlobEditSidePanel(props: BlobEditSidePanelProps) {
  const {isProxima, isNarrow, ...innerProps} = props

  return (
    <>
      {!isNarrow && <BlobEditSidePanelContent isProxima={isProxima} isNarrow={isNarrow} {...innerProps} />}
      {isNarrow && (
        <Dialog
          onClose={() => innerProps.onClosePanel()}
          renderHeader={() => null}
          renderBody={() => BlobEditSidePanelContent({isProxima, isNarrow, ...innerProps})}
        />
      )}
    </>
  )
}

function BlobEditSidePanelContent({
  enabledProps,
  isEnterprise,
  isNarrow,
  isProxima,
  onClosePanel,
  id,
}: BlobEditSidePanelProps) {
  let marketplaceComponent = null
  let documentationComponent = null

  // const [metadata, loading, error] = useSidePanelMetadata()

  // switch (true) {
  //   case enabledProps.workflowEditorEnabled:
  //     marketplaceComponent = <WorkflowMarketplace src={metadata?.marketplaceUrls?.workflow} />
  //     documentationComponent = <ServerSideDocumentation documentation={metadata?.docsHtml?.workflow} />
  //     break
  //   case enabledProps.devContainerEditorEnabled:
  //     marketplaceComponent = <DevContainerMarketplace src={metadata?.marketplaceUrls?.devcontainers} />
  //     documentationComponent = <DevContainerDocumentation />
  //     break
  //   case enabledProps.isIssueForm:
  //     documentationComponent = <ServerSideDocumentation documentation={metadata?.docsHtml?.issueForm} />
  //     break
  //   case enabledProps.isIssueTemplate:
  //     documentationComponent = <ServerSideDocumentation documentation={metadata?.docsHtml?.issueTemplate} />
  //     break
  //   case enabledProps.isDiscussionTemplate:
  //     documentationComponent = <ServerSideDocumentation documentation={metadata?.docsHtml?.discussionTemplate} />
  //     break
  // }

  const widthSx = isNarrow ? {} : {width: '33%', maxHeight: '77vh', maxWidth: 460, minWidth: 320}
  const stickySx = useStickyHeaderSx()
  const showMarketplace = !!marketplaceComponent && !isEnterprise && !isProxima
  const [selectedTab, setSelectedTab] = useState<'marketplace' | 'documentation'>(
    showMarketplace ? 'marketplace' : 'documentation',
  )

  return (
    <Panel
      sx={{height: 'fit-content', overflow: 'auto', ...widthSx, ...stickySx}}
      data-testid="editor-side-panel"
      id={id}
    >
      {/* {isNarrow && (
        // eslint-disable-next-line primer-react/a11y-remove-disable-tooltip
        <IconButton
          unsafeDisableTooltip={true}
          aria-label="Close help panel"
          data-hotkey="Escape"
          icon={XIcon}
          sx={{
            position: 'absolute',
            order: 3,
            top: 2,
            right: 2,
            color: 'fg.default',
          }}
          onClick={() => onClosePanel()}
          variant="invisible"
        />
      )} */}

      {error ? (
        <SidePanelErrorMessage />
      ) : loading ? (
        <SidePanelLoading />
      ) : metadata ? (
        <>
          {showMarketplace && (
            <UnderlineNav aria-label="Help Panel">
              <UnderlineNav.Item
                sx={{paddingY: '10px', '&:hover': {textDecoration: 'none'}}}
                {...(selectedTab === 'marketplace' && {'aria-current': true})}
                onSelect={e => {
                  setSelectedTab('marketplace')
                  e.preventDefault()
                }}
              >
                Marketplace
              </UnderlineNav.Item>
              <UnderlineNav.Item
                sx={{paddingY: '10px', '&:hover': {textDecoration: 'none'}}}
                {...(selectedTab === 'documentation' && {'aria-current': true})}
                onSelect={e => {
                  setSelectedTab('documentation')
                  e.preventDefault()
                }}
              >
                Documentation
              </UnderlineNav.Item>
            </UnderlineNav>
          )}

          {selectedTab === 'marketplace' && marketplaceComponent}
          {selectedTab === 'documentation' && documentationComponent}
        </>
      ) : null}
    </Panel>
  )
}

try{ SidePanelErrorMessage.displayName ||= 'SidePanelErrorMessage' } catch {}
try{ SidePanelLoading.displayName ||= 'SidePanelLoading' } catch {}
try{ BlobEditSidePanel.displayName ||= 'BlobEditSidePanel' } catch {}
try{ BlobEditSidePanelContent.displayName ||= 'BlobEditSidePanelContent' } catch {}