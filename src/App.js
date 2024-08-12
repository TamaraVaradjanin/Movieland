import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import './app.scss'
import Header from './components/Header'
import Modal from './components/Modal'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import { useMovies } from './hooks/useMovies'

const App = () => {
  const { isOpen } = useSelector((store) => store.modal)
  const hasLoadedBefore = useRef(false)

  const { getMovies } = useMovies()

  useEffect(() => {
    if (!hasLoadedBefore.current) {
      hasLoadedBefore.current = true
      getMovies()
    }
  }, [])

  return (
    <div className="App">
      <Header />

      <div className="container">
        {isOpen && <Modal />}

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home"  element={<Movies />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
