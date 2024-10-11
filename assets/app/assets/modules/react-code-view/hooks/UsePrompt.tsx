// react-router-dom v6 removed useBlocker() due to edge case downsides
// https://github.com/remix-run/react-router/releases/tag/v6.0.0-beta.7
// more deets about why: https://github.com/remix-run/history/issues/690
// this restores that feature since we don't care about the edge cases

import type {Blocker, GitHubBrowserHistory, Transition} from '@github-ui/react-core/create-browser-history'
import {SOFT_NAV_STATE} from '@github-ui/soft-nav/states'
import {type ContextType, useCallback, useContext, useEffect, useRef} from 'react'
import {type Navigator as BaseNavigator, UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom'

interface Navigator extends BaseNavigator {
  block: GitHubBrowserHistory['block']
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & {navigator: Navigator}

// rmorse gist: https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743
// lower level history library example, helpful for seeing use of confirmation flow inside useBlocker:https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md

// approach below copied and tweaked from github issue:
// https://github.com/remix-run/react-router/issues/8139#issuecomment-1023105785
function useBlocker(blocker: Blocker, message: string, when = true) {
  const {navigator} = useContext(NavigationContext) as NavigationContextWithBlock

  //main tweak required to OP was wrapping unblock in ref so we're only pushing one blocker on the stack for this when expression (i.e. not for every render)
  const refUnBlock = useRef<() => void>()

  // navigator.block uses addEventListener("beforeunload") but this is not checkable by Turbo,
  // so we also set window.onbeforeunload to make Turbo aware of the block
  const previousBeforeUnloadHandlerRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    function cleanup() {
      refUnBlock.current?.()
      refUnBlock.current = undefined

      window.onbeforeunload = previousBeforeUnloadHandlerRef.current
      previousBeforeUnloadHandlerRef.current = null
    }

    if (!when) {
      cleanup()
      return
    }

    if (!refUnBlock.current) {
      // This shouldn't happen:
      if (!navigator.hasOwnProperty('block')) {
        return
      }

      refUnBlock.current = navigator.block((tx: Transition) => {
        const autoUnblockingTx = {
          ...tx,
          retry() {
            refUnBlock.current?.() //need to unblock so retry succeeds
            tx.retry()
          },
        }

        blocker(autoUnblockingTx)
      })

      previousBeforeUnloadHandlerRef.current = window.onbeforeunload as () => void
      window.onbeforeunload = () => message
    }

    return cleanup
  }, [navigator, blocker, message, when])
}

/**
 * @source https://github.com/remix-run/react-router/issues/8139#issuecomment-1021457943
 */
export function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx: Transition) => {
      const response = window.confirm(message)
      if (response) {
        tx.retry()
      } else {
        document.dispatchEvent(new Event(SOFT_NAV_STATE.END))
        document.dispatchEvent(new Event(SOFT_NAV_STATE.PROGRESS_BAR.END))
      }
    },
    [message],
  )
  return useBlocker(blocker, message, when)
}