import React, { FunctionComponent, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/first';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import First from "./components/pages/first"
import { ToastProvider, useToasts } from 'react-toast-notifications'

function App() {
  return (
      <ToastProvider>
      <First/>
      </ToastProvider>
  );
}

export default App;