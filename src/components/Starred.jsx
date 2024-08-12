import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import '../styles/starred.scss'
import MoviesList from './MoviesList'

const Starred = () => {
  const state = useSelector((state) => state)
  const {
    starred: { starredMovies },
  } = state
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  return (
    <MoviesList
      movies={starredMovies}
      header="Starred movies"
      footer="Remove all starred"
      emptyListText="There are no starred movies."
      buttonAction={() => dispatch(clearAllStarred())}
      testId="starred"
    />
  )
}

export default Starred
