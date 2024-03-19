import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { UserInformationProvider } from './contexts/UserInformationProvider.tsx'
import { UserLocationProvider } from './contexts/UserLocationProvider.tsx'
import './index.css'
import RouterElement from './routes/Router.tsx'
import { store } from './store/store.ts'
import './translations/i18n.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <UserInformationProvider>
          <Toaster position='top-right' richColors />
          <UserLocationProvider>
            <RouterElement />
          </UserLocationProvider>
        </UserInformationProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
