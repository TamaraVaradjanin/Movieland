import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    videoKey: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.videoKey = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
      state.videoKey = ''
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice
