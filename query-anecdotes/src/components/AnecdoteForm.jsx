import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({type: 'SHOW_NOTIFICATION', payload: `anecdote created ${newAnecdote.content}`})
      setTimeout(() => {
        dispatch({type: 'HIDE_NOTIFICATION'})
      }, 5000);
    },
    onError: (error) => {
      dispatch({type: 'SHOW_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({type: 'HIDE_NOTIFICATION'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id:getId(), votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
