import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EnvInfoState {
  envInfo: {
    env: string
    mobileDomain: string
    pcApplyDomain: string
    picDomain: string
  }
}

const initialState: EnvInfoState = {
  envInfo: {
    env: '',
    mobileDomain: 'string',
    pcApplyDomain: 'string',
    picDomain: 'string',
  }
}

export const envInfoSlice = createSlice({
  name: 'user-info',
  initialState,
  reducers: {
    updateEnvInfo: (state, action: PayloadAction<EnvInfoState>) => {
      state.envInfo = action.payload.envInfo
    },
  }
})

export const { updateEnvInfo } = envInfoSlice.actions

export default envInfoSlice.reducer
