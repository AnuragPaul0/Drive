import {useReposAppPayload} from '@github-ui/code-view-shared/contexts/FilesPageInfoContext'
import type {EditInfo, WebCommitInfo} from '@github-ui/code-view-types'
import {useCurrentRepository} from '@github-ui/current-repository'
import type {BypassMetadata} from '@github-ui/secret-scanning'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

// import {SecretDetectedDialogBlob} from '../../../../secret-scanning/components/allow-secret/SecretDetectedDialogBlob'
// import {CitationFileBanner} from './CitationFileBanner' req
// import {CustomSlashCommandsBanner} from './CustomSlashCommandsBanner' nr
import {EditingForkBanner} from './EditingForkBanner'
// import {FundingBanner} from './FundingBanner' small
// import {IssueTemplateConfigBanner, IssueTemplateLegacyBanner, IssueTemplateValidBanner} from './IssueTemplateBanners'
// import {LeadingOrTrailingWhitespaceBanner} from './LeadingOrTrailingWhitespaceBanner'
// import {MixedLineEndingsBanner} from './MixedLineEndingsBanner' octi
// import {OrgMemberProfileReadmeBanner, OrgProfileReadmeBanner, ProfileReadmeBanner} from './ReadmeCalloutBanners'
// import {TranscodingBanner} from './TranscodingBanner'

const queryClient = new QueryClient()

export function BlobEditorBanners({
  content,
  editInfo,
  webCommitInfo,
  filePath,
  fileName,
  hasLeadingOrTrailingWhitespaceInPath,
  isIssueTemplate,
  isLegacyIssueTemplate,
  secretDetected,
  secretBypassMetadata,
  onSetContent,
}: {
  content: string
  editInfo: EditInfo
  webCommitInfo: WebCommitInfo
  fileName: string
  filePath: string
  hasLeadingOrTrailingWhitespaceInPath: boolean
  isIssueTemplate: boolean
  isLegacyIssueTemplate: boolean
  secretDetected: boolean
  secretBypassMetadata?: BypassMetadata
  onSetContent: (content: string) => void
}) {
  const repo = useCurrentRepository()
  const {helpUrl} = useReposAppPayload()

  const banners = editInfo.banners

  const showFundingBanner = banners.sponsorsEnabled && fileName.match(/^funding\.yml$/i)

  const showIssueTemplateConfigBanner = filePath.match(/^(\.github\/ISSUE_TEMPLATE\/config($|\.(yml|yaml)$))/)

  const citationRegex = new RegExp('^CITATION.cff$', 'i')
  const showCitationBanner = citationRegex.test(filePath)

  const readmeRegex = new RegExp('^README.md$', 'i')
  const profileReadmeRegex = new RegExp('^profile/README.md$', 'i')

  const showCustomSlashCommandsBanner =
    editInfo.customSlashCommandsEnabled && filePath.match(/^(\.github\/commands\/.+\.(yaml|yml))/i)

  const showProfileReadmeCallout = banners.profileReadmeCalloutEnabled && readmeRegex.test(fileName)
  const showOrgProfileReadmeCallout = banners.orgProfileReadmeCalloutEnabled && profileReadmeRegex.test(filePath)
  const showOrgMemberProfileReadmeCallout =
    banners.orgMemberProfileReadmeCalloutEnabled && profileReadmeRegex.test(filePath)

  return (
    <>
      {showIssueTemplateConfigBanner && <IssueTemplateConfigBanner helpUrl={editInfo.helpUrl} />}
      {isIssueTemplate ? (
        <IssueTemplateValidBanner helpUrl={editInfo.helpUrl} filePath={filePath} />
      ) : isLegacyIssueTemplate ? (
        <IssueTemplateLegacyBanner helpUrl={editInfo.helpUrl} />
      ) : null}

      {showProfileReadmeCallout && <ProfileReadmeBanner name={repo.name} owner={repo.ownerLogin} />}
      {showOrgProfileReadmeCallout && <OrgProfileReadmeBanner name={repo.name} owner={repo.ownerLogin} />}
      {showOrgMemberProfileReadmeCallout && <OrgMemberProfileReadmeBanner name={repo.name} owner={repo.ownerLogin} />}
      
      {hasLeadingOrTrailingWhitespaceInPath && <LeadingOrTrailingWhitespaceBanner />}
    </>
  )
}

try{ BlobEditorBanners.displayName ||= 'BlobEditorBanners' } catch {}