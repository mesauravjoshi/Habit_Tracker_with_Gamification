import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'
import { ArchiveProvider } from './Components/Context/ArchiveContext'
import { StreaXPProvider } from './Components/Context/Strea&XPContext.jsx'
import { ThemeProvider } from './Components/Context/ThemeProvider.jsx'
import { ToastProvider } from './Components/Context/ToastContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { Transition } from '@headlessui/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ArchiveProvider>
          <StreaXPProvider>
            {/* <ToastProvider> */}
              <App />
            {/* </ToastProvider> */}
          </StreaXPProvider>
        </ArchiveProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)

const Toast = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition show={true}>
          <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  {/* <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" /> */}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-white">Successfully saved!</p>
                  <p className="mt-1 text-sm text-gray-400">Anyone with a link can now view this file.</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShow(false)
                    }}
                    className="inline-flex rounded-md text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    {/* <XMarkIcon aria-hidden="true" className="size-5" /> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}