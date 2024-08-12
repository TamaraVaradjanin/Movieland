import { useDispatch, useSelector } from 'react-redux'
import watchLaterSlice from '../data/watchLaterSlice'
import '../styles/starred.scss'
import MoviesList from './MoviesList'

const WatchLater = () => {
  const state = useSelector((state) => state)
  const {
    watchLater: { watchLaterMovies },
  } = state
  const { remveAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  return (
    <MoviesList
      movies={watchLaterMovies}
      header="Watch Later List"
      footer="Empty list"
      emptyListText="You have no movies saved to watch later."
      buttonAction={() => dispatch(remveAllWatchLater())}
      testId="watch-later-div"
    />
  )
}

export default WatchLater
