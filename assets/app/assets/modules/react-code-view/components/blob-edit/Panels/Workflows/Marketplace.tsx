import {Box, Spinner} from '@primer/react'

interface WorkflowMarketplaceProps {
  src?: string
}

export function WorkflowMarketplace({src}: WorkflowMarketplaceProps) {
  import('../../../../../github/editor/actions-sidebar')

  return (
    <Box sx={{px: 3, pt: 3, pb: 0}}>
      <remote-input
        param="query"
        src={src}
        aria-owns="js-workflow-editor-sidebar-content"
        class="mb-3 position-relative js-remoteinput"
      >
        <input
          type="text"
          form="marketplace-search"
          className="form-control input-block input-contrast"
          placeholder="Search Marketplace for Actions"
          aria-label="Search Marketplace for Actions"
        />
      </remote-input>
      <div id="js-workflow-editor-sidebar-content">
        <include-fragment src={src}>
          <Spinner sx={{my: 3, mx: 'auto', display: 'block'}} />
        </include-fragment>
      </div>
    </Box>
  )
}

try{ WorkflowMarketplace.displayName ||= 'WorkflowMarketplace' } catch {}