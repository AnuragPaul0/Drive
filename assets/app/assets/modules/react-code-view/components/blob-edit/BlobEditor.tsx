import {ThemeProvider} from '@primer/react'
import useColorModes from './use-color-modes'
import {Box, BranchName} from '@primer/react'
import type React from 'react'
import { useEffect, useState} from 'react'
// , Button, TextInput, BaseStyles, useRefuseCallback,
let folderPath = 'https://drive.google.com/viewerng/viewer?embedded=true&url=', file = "File link..."
  // completeFilePath = `${folderPath}`, initialPath = completeFilePath,
  // ,fileNameChanged = completeFilePath !== initialPath, count = !0
  //  fileContentChanged = false, fileName = '', contentChanged = fileContentChanged,
  // commitDisabledRef = !(contentChanged || fileNameChanged) || fileName.length === 0

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor() {
  // console.log(1)
  const [firstName, setFirstName] = useState('');
  function handleLastNameChange(e: any) { setFirstName(e.target.value) }

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      document.querySelector('#left')?.classList.add(innerWidth < innerHeight ? "mob" : 'desk')
      // Set window width/height to state
      }
    
    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  // mmitDisabledRef.current ||
  return (<div><Box id='left'>
              <span className="TextInputWrapper__TextInputBaseWrapper-sc-1mqhpbi-0 TextInputWrapper-sc-1mqhpbi-1 lmZlSR igQCti TextInput-wrapper"
                aria-busy="false">
                <input value={firstName} onChange={handleLastNameChange}
                  id='inp' aria-label={file} style={{ minWidth: '100px' }}
                  placeholder={file} className='UnstyledTextInput-sc-14ypya-0 kbCLEG'
                  aria-describedby="file-name-editor-breadcrumb"
              /></span>
          </Box>
      <Box id='right'className="tailwind"><a style={{ display: firstName ? 'flex' : 'none' }}
          href={folderPath+firstName}>Open in drive</a>
        {/* <a href={} data-zone="mktng"BranchNameBranchName
          className="link_link__hbWKh text-sm text-gray-900 hover:text-gray-1000" data-prefetch="true"
          ></a> */}
        {/* <Button data-hotkey="Mod+s" disabled={!firstName.length}
//             onClick={() => setWebCommitDialogState('pending')}
            variant="primary" sx={{ml: 2}}
             // ref={commitChangesRef}count
          >Commit changes...
        </Button> */}
        {/* </Box> */}
      </Box></div>
  )
}

try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}