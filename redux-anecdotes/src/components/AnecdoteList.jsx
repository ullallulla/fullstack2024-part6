import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 10))
  }
  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      )}
    </div>
  )
}

export default AnecdoteList