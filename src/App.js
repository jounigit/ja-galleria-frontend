import React from 'react'
import { Route, Link } from 'react-router-dom'

import './App.css'
import { CategoryList, Category } from './components/Category'
import { PictureList } from './components/Picture'
import { Home } from './components/Home'
const App = () => {
  const padding = { padding: 5 }

  return (
    <div>


      <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/categories">categories</Link>
          <Link style={padding} to="/pictures">pictures</Link>
        </div>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/categories" component={CategoryList} />
        <Route exact path="/categories/:id" component={Category} />
        <Route exact path="/pictures" render={() => <PictureList />} />
      </div>

    </div>
  )
}

export default App
