import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onTodoToggle, onTodoDelete }) => {
	return (
		todos.length ?
			todos.map(todo => <TodoItem todo={todo} key={todo.id} onTodoToggle={onTodoToggle} onTodoDelete={onTodoDelete} />)
			: 'Have 0 todos'
	)
}

export default TodoList
