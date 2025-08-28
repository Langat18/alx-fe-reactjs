import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FormikForm from './components/formikForm.js'
import RegistrationForm from './components/RegistrationForm.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <FormikForm />
    <RegistrationForm />  
  </StrictMode>,
)
