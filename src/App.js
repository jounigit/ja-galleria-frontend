import React, {
  createContext,
  // lazy,
  Suspense
} from 'react'
import {  Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css'
import { ResponsiveContainer } from './components/UI/containers/ResponsiveContainer'
import * as routes from './shared/constants/routes'

import { PictureData } from './components/Picture'
import { Home } from './components/Home'
import { CategoryData } from './components/Category'
import { AlbumData } from './components/Album'
import Login from './components/Login/Login'
import Footer from './components/UI/footers/AppFooter'

export const AuthContext = createContext()

const App = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <ResponsiveContainer>
          <Switch>
            <Route path={routes.CATEGORIES} component={CategoryData} />
            <Route path={routes.ALBUM} component={AlbumData} />
            <Route path={routes.ALBUMS} component={AlbumData} />
            <Route path={routes.PICTURE} component={PictureData} />
            <Route path={routes.PICTURES} component={PictureData} />
            {/* <Route path={routes.ADMIN} component={Admin} /> */}
            <Route path={routes.LOGIN} component={Login} />
            <Route component={Home} />
          </Switch>
        </ResponsiveContainer>
        <Footer />
      </Container>
    </Suspense>
  )
}

export default App