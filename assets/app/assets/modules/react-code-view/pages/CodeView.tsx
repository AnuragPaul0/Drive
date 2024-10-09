import {CodeViewBannersProvider} from '@github-ui/code-view-shared/contexts/CodeViewBannersContext'
import {useCodeViewOptions} from '@github-ui/use-code-view-options'
import {Box,
  // Heading,
  SplitPageLayout
} from '@primer/react'
import React, {
  // lazy, Suspense, useCallback, useEffect,
  useState} from 'react'
import CodeViewHeader from '../components/headers/CodeViewHeader'

export default function CodeView(
) {
  const isEdit = 1
  // const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null)
  const isTreeExpanded = !0
  const {codeCenterOption} = useCodeViewOptions()
  return <SplitPageLayout>
                      <SplitPageLayout.Content
                        as="div"
                        padding="none"
                        width={codeCenterOption.enabled ? 'xlarge' : 'full'}
                        hidden={{narrow: isTreeExpanded}}
                        sx={{
                          marginRight: 'auto',
                          '@media print': {
                            display: 'flex !important',
                          },
                        }}
                      >
                        <Box
                          sx={{
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
                            <CodeViewBannersProvider>
                              <Box
                                sx={{
                                  display: isEdit ? 'none' : 'inherit',
                                }}
                              >
                                <CodeViewHeader
                                  // payload={payload}
                                  showTree={!0
                                    // isTreeExpanded
                                  }
                                  // treeToggleElement={treeToggleElement}
                                  // validCodeNav={validCodeNav}
                                  // onFindFilesShortcut={onFindFilesShortcut}
                                />
                               </Box>
                            </CodeViewBannersProvider>
                        </Box>
                       </SplitPageLayout.Content>
                    </SplitPageLayout> }
try{ (CodeView as any).displayName ||= 'CodeView' } catch {}