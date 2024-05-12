import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loadState } from './storage'
import axios, { AxiosError } from 'axios'
import { baseUrl } from '../helpers/API'
import { ILoginResponse } from '../interfaces/ILoginResponse'
import { IProfile } from '../interfaces/IProfile'

export interface UserPersistentState {
  token: string | null
}

export interface UserState {
  jwt: string | null
  loginErrorMessage?: string
  profile?: IProfile
}
const initialState: UserState = {
  jwt: loadState<UserPersistentState>('userData')?.token ?? null
}

export const login = createAsyncThunk('user/login', async (params: { email: string; password: string }) => {
  try {
    const data = await axios.post<ILoginResponse>(`${baseUrl}/login`, {
      email: params.email,
      password: params.password
    })

    return data
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.error)
    }
  }
})

export const getProfile = createAsyncThunk('user/getProfile', async () => {
  const data = await axios.get<IProfile>(`${baseUrl}/user/profile`, {
    headers: {
      Authorization: `Bearer ${loadState<UserPersistentState>('userData')?.token}`
    }
  })
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return
      state.jwt = action.payload?.data.access_token ?? null
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error?.message ?? 'Unknown error occurred'
    })

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload?.data ?? null
    })
  }
})

export const userActions = userSlice.actions

export default userSlice.reducer
