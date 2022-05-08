import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import MainProvider from './providers/MainProvider/MainProvider'
import Main from './layout/Main/Main'

import './index.css'
import GridProvider from './providers/GridProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <MainProvider>
      <GridProvider>
        <Main />
      </GridProvider>
    </MainProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
