import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { openModal } from '../data/modalSlice'

import { createSearchParams } from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import '../app.scss'
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'
import moviesSlice, { fetchMovies } from '../data/moviesSlice'

export const useMovies = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const state = useSelector((state) => state)
  const {
    movies: { page, isSearching, movies, loading, totalPages },
  } = state
  const { setIsSearching } = moviesSlice.actions

  const getMovie = async (id) => {
    const URL = `${process.env.REACT_APP_MOVIES_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    const videoData = await fetch(URL).then((response) => response.json())
    const videos = videoData.videos

    if (videos && videos.results.length) {
      const videoList = videos.results
      const trailer = videoList.find((vid) => vid.type === 'Trailer')
      const key = trailer ? trailer.key : videoList[0].key
      dispatch(openModal(key))
    }
  }

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
      return
    }
    dispatch(fetchMovies(ENDPOINT_DISCOVER))
    setSearchParams()
  }

  const searchMovies = (query) => {
    if ((query.length && !isSearching) || (!query.length && isSearching)) {
      dispatch(setIsSearching(query.length ? true : false))
    }
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
      return
    }
    dispatch(fetchMovies(ENDPOINT_DISCOVER))
  }

  return { movies, page, loading, searchQuery, totalPages, getMovie, searchMovies, getMovies }
}
