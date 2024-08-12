import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { moviesMock } from './test/movies.mocks'
import { renderWithProviders } from './test/utils'

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

it('renders watch later link', () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('search for movies', async () => {
  renderWithProviders(<App />)
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ page: 1, results: moviesMock, total_pages: 1, total_results: 2 }),
    })
  )

  await userEvent.type(screen.getByTestId('search-movies'), 'Inception')

  await waitFor(() => {
    expect(screen.getByTestId('search-movies').value).toBe('Inception')
    expect(screen.getAllByText('Inception')[0]).toBeInTheDocument()
  })
  jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          videos: {
            results: [
              {
                id: '653c6111c8a5ac00e3a09f82',
                key: 'cdx31ak4KbQ',
                name: '35mm Theatrical Trailer #3 [5.1] [4K] [FTD-0706]',
                type: 'Trailer',
              },
            ],
          },
        }),
    })
  )
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })
})

it('renders watch later component', async () => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})

it('renders starred component', async () => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })
})
