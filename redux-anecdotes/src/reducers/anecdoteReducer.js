import { createSlice, current } from "@reduxjs/toolkit"


// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

      console.log(current(state))

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})



export const { createAnecdote, voteFor, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer