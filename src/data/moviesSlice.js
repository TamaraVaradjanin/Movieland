import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl)
  return response.json()
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    page: 0,
    totalPages: 0,
    totalMovies: 0,
    loading: false,
    isSearching: false,
  },
  reducers: {
    setIsSearching: (state, action) => {
      state.isSearching = action.payload
      state.page = 0
      state.movies = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { results, page, total_pages, total_results } = action.payload
        if (
          (state.isSearching && action.meta?.arg?.includes('search') && state.page !== page) ||
          (!state.isSearching && action.meta?.arg?.includes('discover') && state.page !== page)
        ) {
          state.movies = [...state.movies, ...results]
        } else {
          state.movies = results
        }
        state.page = page
        state.totalPages = total_pages
        state.totalMovies = total_results
        state.fetchStatus = 'success'
        state.loading = false
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading'
        state.loading = true
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error'
      })
  },
})

export default moviesSlice
