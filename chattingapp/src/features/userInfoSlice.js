import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
  value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  roomUser: localStorage.getItem("roomUser") ? JSON.parse(localStorage.getItem("roomUser")) : null,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.value=action.payload
        localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    roomUser: (state, action) => {
    state.roomUser=action.payload
    localStorage.setItem("roomUser", JSON.stringify(action.payload))
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, roomUser } = userInfoSlice.actions

export default userInfoSlice.reducer