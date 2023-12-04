import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const options = [
  { id: '1', title: 'Option 1' },
  { id: '2', title: 'Option 2' },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App options={options} onSelect={() => {}} label="Test Multidrop" />
  </React.StrictMode>
)
