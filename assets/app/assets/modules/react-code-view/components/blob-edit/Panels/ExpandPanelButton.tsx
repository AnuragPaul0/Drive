import {ExpandButton} from '@github-ui/code-view-shared/components/ExpandButton'
import React from 'react'

interface ExpandPanelButtonProps {
  expanded?: boolean
  onToggleExpanded: () => void
  sx?: Record<string, unknown>
  ariaControls: string
}

export const ExpandPanelButton = React.forwardRef(
  (
    {expanded, onToggleExpanded, sx, ariaControls}: ExpandPanelButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => (
    <ExpandButton
      expanded={expanded}
      alignment="right"
      ariaLabel={expanded ? 'Collapse help panel' : 'Expand help panel'}
      ariaControls={ariaControls}
      tooltipDirection="nw"
      testid="help-panel-button"
      ref={ref}
      onToggleExpanded={onToggleExpanded}
      sx={sx}
    />
  ),
)

ExpandPanelButton.displayName = 'ExpandPanelButton'