import {ThemeProvider, BaseStyles} from '@primer/react'
import useColorModes from './use-color-modes'
import {Box, BranchName, Button, TextInput} from '@primer/react'
import type React from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'

let fileContentChanged = false, fileName = '', contentChanged = fileContentChanged,
  folderPath = 'https://drive.google.com/viewerng/viewer?embedded=true&url=',
  completeFilePath = `${folderPath}`, initialPath = completeFilePath,
  fileNameChanged = completeFilePath !== initialPath, count = !0, file = "File link..."
  // commitDisabledRef = !(contentChanged || fileNameChanged) || fileName.length === 0

export const blobEditSidePanelId = 'blob-edit-side-panel-id'

export default function BlobEditor() {
  // console.log(1)
  const {colorMode, dayScheme, nightScheme} = useColorModes()

  const [firstName, setFirstName] = useState('');

  function handleLastNameChange(e: any) { setFirstName(e.target.value) }
  const size = useWindowSize()

  // Hook
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 1,
      height: 1,
    });

    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
// mmitDisabledRef.current ||
  return ( <ThemeProvider colorMode={colorMode} dayScheme={dayScheme} nightScheme={nightScheme}
    preventSSRMismatch>
    {/* <BaseStyles> , flex: 1
        Your ticket will be issued to: <b>{firstName}</b>, justifyContent: 'space-between'
      </p> */}
      {/* <Box sx={{display: 'flex', mb: 3, flexWrap: 'wrap', rowGap: 3,
          maxWidth: '100%'}}> */}
         {/* <Box sx={{display: 'flex', alignSelf: 'self-start', alignItems: 'center', pr: 3,
        maxWidth: '100%'}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            flexWrap: 'wrap',
            // maxWidth: showTreeToggle ? 'calc(100% - 75px)' : '100%',
          }}> */}
            <Box id='left' className={size.width < size.height ? "mob" : 'desk'}>
              <span className="TextInputWrapper__TextInputBaseWrapper-sc-1mqhpbi-0 TextInputWrapper-sc-1mqhpbi-1 lmZlSR igQCti TextInput-wrapper"
                aria-busy="false">
                <input value={firstName} onChange={handleLastNameChange}
                  id='inp' aria-label={file} style={{ minWidth: '100px' }}
                  placeholder={file} className='UnstyledTextInput-sc-14ypya-0 kbCLEG'
                  aria-describedby="file-name-editor-breadcrumb"
              /></span>
            {/* <TextInput */}
              {/* // disabled={inputDisabled}
              // onKeyDown={onFileNameInputKeyPress}fileName
              // ref={nameInputRef}onFileNameChange */}
              {/* block={undefined} contrast={undefined} monospace={undefined}
              width={undefined} maxWidth={undefined} minWidth={undefined} variant={undefined}
              size={undefined} validationStatus={undefined} as={'input'} disabled={undefined}/> */}
          </Box>
        {/* </Box>
      </Box> */}
      <Box id='right'className="tailwind"><BranchName style={{ display: firstName ? 'flex' : 'none' }}
          href={folderPath+firstName}>Open in drive</BranchName>
        {/* <a href={} data-zone="mktng" 
          
          className="link_link__hbWKh text-sm text-gray-900 hover:text-gray-1000" data-prefetch="true"
          ></a> */}
        {/* <Button data-hotkey="Mod+s" disabled={!firstName.length}
//             onClick={() => setWebCommitDialogState('pending')}
            variant="primary" sx={{ml: 2}}
             // ref={commitChangesRef}count
          >Commit changes...
        </Button> */}
        {/* </Box> */}
      </Box>
      {/* </BaseStyles> */}
  </ThemeProvider>
  )
}

try{ (BlobEditor as any).displayName ||= 'BlobEditor' } catch {}