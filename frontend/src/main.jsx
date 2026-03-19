import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { RoomContexProvider } from './contex/RoomsContex.jsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <RoomContexProvider>
    <BrowserRouter>
      <App />
      <Toaster />
  </BrowserRouter>
  </RoomContexProvider>
)
