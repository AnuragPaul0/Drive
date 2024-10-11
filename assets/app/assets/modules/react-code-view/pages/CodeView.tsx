import {AllShortcutsEnabledProvider} from
  '@github-ui/code-view-shared/contexts/AllShortcutsEnabledContext'
// import {CodeViewBannersProvider} from '@github-ui/code-view-shared/contexts/CodeViewBannersContext'
import {FileQueryProvider} from '@github-ui/code-view-shared/contexts/FileQueryContext'
import {OpenPanelProvider} from '@github-ui/code-view-shared/contexts/OpenPanelContext'
import {useCurrentRepository} from '@github-ui/current-repository'
import {
  // FileTreeControlProvider,
// nc b
   ReposFileTreePane
  // , useTreePane
} from '@github-ui/repos-file-tree-view'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import {Box, Heading, SplitPageLayout } from '@primer/react'
import React from 'react'
// import CodeViewHeader from '../components/headers/CodeViewHeader'

export default function CodeView(
) {
  const repo = useCurrentRepository(), isEdit = !1, isBlob = isEdit, isDelete =  isEdit,
    treeRef = React.useRef<HTMLDivElement>(null),
    {codeCenterOption} = useCodeViewOptions(),
    reposFileTreeId = 'repos-file-tree',
    openPanelRef = React.useRef<string | undefined>(), isTreeExpanded = !0

  return (
  // <h1 id="file-name-id-wide">.eslintrc.json</h1>
  <AllShortcutsEnabledProvider allShortcutsEnabled={!0
    // payload.allShortcutsEnabled
    }>
            {/* <FileTreeControlProvider> */}
      <div>
        {/* <FileQueryProvider><OpenPanelProvider */}
    {/* // payload={payload} */}
      {/* openPanelRef={openPanelRef}> */}
      <SplitPageLayout>
        
        <SplitPageLayout.Header>
          <Placeholder label="Header" height={100} />
        </SplitPageLayout.Header>
        <SplitPageLayout.Pane position="start">
          <Placeholder label="Pane" height={400} />
        </SplitPageLayout.Pane>
        <SplitPageLayout.Content>
          <Placeholder label="Content" height={600} />
        </SplitPageLayout.Content>
        <SplitPageLayout.Footer>
          <Placeholder label="Footer" height={100} />
        </SplitPageLayout.Footer>
      </SplitPageLayout>
      {/* </OpenPanelProvider>
      </FileQueryProvider> */}
      </div>
            {/* </FileTreeControlProvider> */}
  </AllShortcutsEnabledProvider>
  ) }

  const Placeholder: React.FC<
  React.PropsWithChildren<{
    id?: string | undefined
    width?: number | string
    height: number | string
    label?: string
  }>
> = ({width, height, id, label}) => {
  return (
    <Box
      id={id}
      sx={{
        width: width ?? '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        bg: 'canvas.inset',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.subtle',
      }}
    >
      {label}
    </Box>
  )
}
try{ (CodeView as any).displayName ||= 'CodeView' } catch {}