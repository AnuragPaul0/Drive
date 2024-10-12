// import {useCodeViewAddQueuedBanner} from '@github-ui/code-view-shared/contexts/CodeViewBannersContext'
import type {SaveResponse, SaveResponseErrorDetails, WebCommitInfo} from '@github-ui/code-view-types'
import {useFileTreeControlContext} from '@github-ui/repos-file-tree-view'
import type {BypassMetadata} from '@github-ui/secret-scanning'
// import {useCSRFToken} from '@github-ui/use-csrf-token'
// import {resetMemoizeFetchJSON} from '@github-ui/use-latest-commit'
// import {useNavigate} from '@github-ui/use-navigate'
// import {verifiedFetch} from '@github-ui/verified-fetch'
import {WebCommitDialog as CommitDialog, type WebCommitDialogState} from '@github-ui/web-commit-dialog'
import React, {useEffect} from 'react'

// import {pollUntilCommitHasQuorum} from './utilities/fetch-is-commit-available'

interface ISaveBlobData {
  message: string
  placeholder_message: string
  description: string
  author_email?: string
  'commit-choice'?: string
  target_branch?: string
  quick_pull: string
  guidance_task: string
  commit: string
  same_repo?: number
  pr: string
}

interface IEditSaveBlobData extends ISaveBlobData {
  content_changed: boolean
  filename: string
  new_filename: string
  value: string
}

interface IDeleteSaveBlobData extends ISaveBlobData {
  _method: string
}

// states and transitions:
// closed
//  -> pending
// pending
//  -> closed
//  -> saving
// saving
//  -> saved
//  -> pending
//  -> closed

export default function WebCommitDialog(props: {
  content?: string
  contentChanged?: boolean
  fileName?: string
  isDelete: boolean
  isNewFile: boolean
  helpUrl: string
  oldPath?: string
  ownerName: string
  placeholderMessage: string
  refName: string
  returnFocusRef: React.RefObject<HTMLElement>
  webCommitInfo: WebCommitInfo
  dialogState: WebCommitDialogState
  setDialogState: (state: WebCommitDialogState) => void
  setSecretDetected?: (secretDetected: boolean) => void
  setSecretBypassMetadata?: (bypassMetadata: BypassMetadata) => void
}) {
  const {
    content,
    contentChanged,
    fileName,
    isDelete,
    isNewFile,
    oldPath,
    ownerName,
    placeholderMessage,
    refName,
    webCommitInfo,
    setDialogState,
    setSecretDetected,
    setSecretBypassMetadata,
  } = props

  const {
    authorEmails,
    canCommitStatus,
    commitOid,
    defaultEmail,
    defaultNewBranchName,
    forkedRepo,
    guidanceTask,
    pr,
    repoHeadEmpty,
    saveUrl,
  } = webCommitInfo
  // const savingToken = useCSRFToken(saveUrl, isDelete ? 'delete' : 'post')
  // const navigate = useNavigate()

  const [message, setMessage] = React.useState(placeholderMessage)
  const [description, setDescription] = React.useState('')
  const [isQuickPull, setIsQuickPull] = React.useState(canCommitStatus !== 'allowed' || !!forkedRepo)
  const [prTargetBranch, setPRTargetBranch] = React.useState(defaultNewBranchName)
  const [authorEmail, setAuthorEmail] = React.useState(authorEmails.length ? defaultEmail : undefined)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorDetails, setErrorDetails] = React.useState<SaveResponseErrorDetails>()
  const {refreshTree} = useFileTreeControlContext()
  // const addQueuedBanner = useCodeViewAddQueuedBanner()

  const commitMessageInputRef = React.useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (commitMessageInputRef.current) {
      commitMessageInputRef.current.focus()
    }
  }, [])

  const quickPullChoice = !forkedRepo && !repoHeadEmpty

  const onSave = async () => {
    setDialogState('saving')

    // TODO: Guidance task
    const quickPullBase = forkedRepo ? `${ownerName}:${refName}` : refName

    const sharedData: ISaveBlobData = {
      message,
      // eslint-disable-next-line camelcase
      placeholder_message: placeholderMessage,
      description,
      // eslint-disable-next-line camelcase
      author_email: authorEmail ?? undefined,
      'commit-choice': quickPullChoice ? (isQuickPull ? 'quick-pull' : 'direct') : undefined,
      // eslint-disable-next-line camelcase
      target_branch: quickPullChoice ? (isQuickPull ? prTargetBranch : refName) : undefined,
      // eslint-disable-next-line camelcase
      quick_pull: isQuickPull ? quickPullBase : '',
      // eslint-disable-next-line camelcase
      guidance_task: guidanceTask ?? '',
      commit: commitOid,
      // eslint-disable-next-line camelcase
      same_repo: !forkedRepo && !repoHeadEmpty ? 1 : undefined,
      pr: pr ?? '',
    }

    let data: ISaveBlobData

    if (isDelete) {
      data = {...sharedData, _method: 'delete'} as IDeleteSaveBlobData
    } else {
      data = {
        ...sharedData,
        // eslint-disable-next-line camelcase
        content_changed: contentChanged,
        filename: isNewFile ? fileName : oldPath,
        // eslint-disable-next-line camelcase
        new_filename: fileName,
        value: content,
      } as IEditSaveBlobData
    }

    const formData = new FormData()
    for (const [key, dataValue] of Object.entries(data)) {
      if (dataValue !== undefined) {
        formData.set(key, dataValue)
      }
    }

    // eslint-disable-next-line github/authenticity-token
    // formData.append('authenticity_token', savingToken ?? '')

    // try {
    //   const result = await verifiedFetch(saveUrl, {
    //     method: 'post',
    //     body: formData,
    //     headers: {Accept: 'application/json'},
    //   })

    //   const json: SaveResponse = await result.json()

    //   if (json.data.commitQuorumPollPath) {
    //     await pollUntilCommitHasQuorum(json.data.commitQuorumPollPath)
    //   }

    //   // on a successful save, we are redirected to either back to the blob, back the PR, or to a quick pull PR
    //   if (json.data.redirect) {
    //     const redirectUrl = json.data.redirect
    //     const url = redirectUrl.startsWith(window.location.origin)
    //       ? redirectUrl.replace(window.location.origin, '')
    //       : redirectUrl

    //     // Reset the latest commit cache so that the next time the user navigates to the blob, they see the latest commit
    //     resetMemoizeFetchJSON()

    //     // Refresh the file tree if the file name changed.
    //     if (refreshTree?.current !== undefined) {
    //       refreshTree.current = true
    //     }

    //     if (json.data.message) {
    //       addQueuedBanner({message: json.data.message, variant: 'default'})
    //     }

    //     setDialogState('saved')

    //     // sometimes react will not have updated the dialog state before the redirect happens
    //     // so we need to wait a bit for the state to update before redirecting
    //     setTimeout(() => {
    //       navigate(url)
    //     }, 50)

    //     return
    //   } else if (json.data.error && json.data.secretBypassMetadata) {
    //     setSecretDetected && setSecretDetected(true)
    //     setSecretBypassMetadata?.(json.data.secretBypassMetadata)
    //     setDialogState('closed')
    //   } else if (json.data.error) {
    //     setDialogState('pending')
    //     setErrorMessage(json.data.error)
    //     if (json.data.error_details) {
    //       setErrorDetails(json.data.error_details)
    //     }
    //   } else {
    //     setErrorMessage('File could not be edited')
    //     setDialogState('pending')
    //   }
    // } catch (e) {
    //   setErrorMessage('File could not be edited')
    //   setDialogState('pending')
    // }
  }

  // remove nulls from author emails

  // Use the danger button type if a user has to bypass rules to commit

  return (
    <CommitDialog
      onSave={onSave}
      {...{
        message,
        setMessage,
        description,
        setDescription,
        isQuickPull,
        setIsQuickPull,
        prTargetBranch,
        setPRTargetBranch,
        setAuthorEmail,
        errorMessage,
        errorDetails,
      }}
      {...props}
    />
  )
}

try{ (WebCommitDialog as any).displayName ||= 'WebCommitDialog' } catch {}