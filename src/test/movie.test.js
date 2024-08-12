import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { moviesMock } from './movies.mocks'
import { renderWithProviders } from './utils'

const mock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
  }
}

window.IntersectionObserver = mock
beforeEach(() => {
  global.fetch = jest.fn()
})

it('movies starred and saved to watch later', async () => {
  renderWithProviders(<App />)

  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ page: 1, results: moviesMock, total_pages: 1, total_results: 2 }),
    })
  )

  await userEvent.type(screen.getByTestId('search-movies'), 'inception')
  await waitFor(() => {
    expect(screen.getByTestId('search-movies').value).toBe('inception')
    expect(screen.getAllByText('Inception')[0]).toBeInTheDocument()
  })
  const starMovieLink = screen.getAllByTestId('starred-link')[0]
  await waitFor(() => {
    expect(starMovieLink).toBeInTheDocument()
  })
  await userEvent.click(starMovieLink)
  await waitFor(() => {
    expect(screen.getByTestId('star-fill')).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
  })

  const watchLaterLink = screen.getAllByTestId('watch-later')[0]
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument()
  })
  await userEvent.click(watchLaterLink)
  await waitFor(() => {
    expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
  })

  await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})
