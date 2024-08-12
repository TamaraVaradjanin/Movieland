import { Link } from 'react-router-dom'
import '../styles/movies.scss'
import Movie from './Movie'

const MoviesList = ({ movies = [], header, footer, emptyListText, buttonAction, testId }) => {
  return (
    <div className="starred" data-testid={testId}>
      {movies.length > 0 ? (
        <>
          {header && <h6 className="header">{header}</h6>}
          <div data-testid="watch-later-movies" className="grid-container">
            {movies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>
          {footer && buttonAction && (
            <footer className="text-center">
              <button className="btn btn-primary" onClick={buttonAction}>
                Empty list
              </button>
            </footer>
          )}
        </>
      ) : (
        <div className="text-center empty-cart">
          <i className="bi bi-heart" />
          <p>{emptyListText}</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default MoviesList
