import {useFilesPageInfo} from '@github-ui/code-view-shared/contexts/FilesPageInfoContext'
import {useCurrentRepository} from '@github-ui/current-repository'
import {Breadcrumb} from '../../../react-shared/Breadcrumb'

export function ReposHeaderBreadcrumb({
  fileNameId = 'file-name-id',
  id,
  fontSize,
  showCopyPathButton,
}: {
  fileNameId?: string
  id?: string
  fontSize?: number
  showCopyPathButton?: boolean
}) {
  const repo = useCurrentRepository()
  const {
    // refInfo,
    path, action} = useFilesPageInfo()

  return (
    <>
      <Breadcrumb
        path={path}
        repo={repo}
        // commitish={refInfo.name}
        isFolder={action === 'tree'}
        fileNameId={fileNameId}
        id={id}
        fontSize={fontSize}
        showCopyPathButton={showCopyPathButton && path !== '' && path !== '/'}
      />
    </>
  )
}

try{ (ReposHeaderBreadcrumb as any).displayName ||= 'ReposHeaderBreadcrumb' } catch {}