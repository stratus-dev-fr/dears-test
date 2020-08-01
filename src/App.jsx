import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import Welcome from './Welcome'
import Three from './Three'
import Begin from './Begin'
import Second from './Second'
import Test from './Test'
import API from './API'

export default function App () {
  return (
    <>
      <Router>
          <Route render={({ location }) => (
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/' render={() => <Welcome />} />
                <Route path='/Projects' render={() => <Second />} />
                <Route path='/Test' render={() => <Test />} />
                <Route path='/API' render={() => <API />} />
                <Route path='*' render={() => <Welcome />} />
              </Switch>
            </AnimatePresence>
          )} />
      </Router>
    </>
  )
}