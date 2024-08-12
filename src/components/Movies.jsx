import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'
import { fetchMovies } from '../data/moviesSlice'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useMovies } from '../hooks/useMovies'
import '../styles/movies.scss'
import MoviesList from './MoviesList'

const Movies = () => {
  const state = useSelector((state) => state)
  const targetRef = useRef(null)
  const dispatch = useDispatch()
  const { searchQuery } = useMovies()
  const {
    movies: { movies, page, loading, isSearching },
  } = state

  useInfiniteScroll(targetRef, () => {
    const nextPage = page + 1
    if (page) {
      const url = (isSearching ? `${ENDPOINT_SEARCH}&query=` + searchQuery : ENDPOINT_DISCOVER) + `&page=${nextPage}`
      dispatch(fetchMovies(url))
    }
  })

  return (
    <div>
      <MoviesList movies={movies} testId="movies" />
      <div ref={targetRef} className="loader">
        {loading && <p>loading...</p>}
      </div>
    </div>
  )
}

export default Movies
