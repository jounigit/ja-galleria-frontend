import React from 'react'
import { BrowserRouter as Router,Route, Link } from 'react-router-dom'
import useFetch from './utils/useFetch'
import './App.css'
import { PictureList } from './components/Picture'
import { Home } from './components/Home'
import { CategoryList } from './components/Category/'
import { AlbumList } from './components/Album'
const baseUrl = 'http://localhost:8000/api'

const App = () => {
  const pictures = useFetch(
    `${baseUrl}/pictures`
  )
  const categories = useFetch(
    `${baseUrl}/categories`
  )
  const albums = useFetch(
    `${baseUrl}/albums`
  )

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/categories">categories</Link>
            <Link style={padding} to="/albums">albums</Link>
            <Link style={padding} to="/pictures">pictures</Link>
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/categories" render={() => <CategoryList categories={categories} />} />
          <Route exact path="/albums" render={() => <AlbumList albums={albums} />} />
          <Route exact path="/pictures" render={() => <PictureList pictures={pictures} />} />
          {/* <Route exact path="/categories/:id" render={({ match }) =>
            <Category
              category = {categories.data.data.find(c => c.id === match.params.id)}
            />} /> */}
        </div>
      </Router>
    </div>
  )
}

export default App
