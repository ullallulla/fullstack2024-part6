import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    }
  }
})


export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer