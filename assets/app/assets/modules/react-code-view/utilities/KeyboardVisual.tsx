import type {Shortcut} from '@github-ui/code-view-shared/hooks/shortcuts'
import {Fragment} from 'react'

export function KeyboardVisual({shortcut}: {shortcut: Shortcut}) {
  return (
    <>
      {shortcut.text?.split(' ').map(keyValue => {
        return (
          <Fragment key={keyValue}>
            <kbd>{keyValue}</kbd>{' '}
          </Fragment>
        )
      })}
    </>
  )
}

try{ (KeyboardVisual as any).displayName ||= 'KeyboardVisual' } catch {}