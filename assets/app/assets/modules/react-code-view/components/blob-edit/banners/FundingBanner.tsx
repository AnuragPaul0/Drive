import {Flash, Link} from '@primer/react'

export function FundingBanner({
  repositoryFundingLinksEnabled,
  editRepoPath,
  helpPath,
}: {
  repositoryFundingLinksEnabled: boolean
  editRepoPath: string
  helpPath: string
}) {
  return (
    <Flash sx={{mb: 3}}>
      <p>
        <code>.github/FUNDING.yml</code> shows the community how to support this project. Please see our{' '}
        <Link inline href={`${helpPath}/articles/displaying-a-sponsor-button-in-your-repository`}>
          repository funding links documentation
        </Link>
        {" for more information on formatting and what is and isn't allowed in this file."}
      </p>

      {!repositoryFundingLinksEnabled && (
        <p>
          Please note that funding links are currently <em>disabled</em> on this repository. Visit{' '}
          <Link inline href={editRepoPath}>
            repository settings
          </Link>
          {' to enable display of your funding links.'}
        </p>
      )}
    </Flash>
  )
}

try{ (FundingBanner as any).displayName ||= 'FundingBanner' } catch {}