import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfoStateInterface {
  id: string
  userName: string
  phone: string
}

interface initialStateInterface {
  userInfo: UserInfoStateInterface
}

const initialState: initialStateInterface = {
  userInfo: {
    id: '',
    userName: '',
    phone: '',
  },
};

export const userInfoSlice = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfoStateInterface>) => {
      state.userInfo = action.payload
    },
  }
})

export const { updateUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer
