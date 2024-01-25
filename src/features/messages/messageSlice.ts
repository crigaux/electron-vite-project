import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store.ts'

type Message = {
  selectedConversationId: number | null
}

const initialState: Message = {
  selectedConversationId: null,
}

export const setSelectedConversationId = createAsyncThunk(
  'message/setSelectedConversationId',
  (args: { selectedConversationId: number | null }) => {
    const { selectedConversationId } = args

    return {
      selectedConversationId,
    }
  },
)

const messageSlice = createSlice({
  name: 'message',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setSelectedConversationId.fulfilled, (state, action) => {
      state.selectedConversationId = action.payload.selectedConversationId
    })
  },
})

export const selectedConversationId = (state: RootState) =>
  state.message.selectedConversationId

export default messageSlice
