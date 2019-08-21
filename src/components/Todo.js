import React, { useState } from 'react'
import styles from './Todo.module.css'
import TodoList from './TodoList';

const Todo = () => {
	const [todos, setTodos] = useState([])
	const [todo, setTodo] = useState('')
	const [error, setError] = useState('')

	const onChange = e => {
		setTodo(e.target.value)
	}

	const onTodoAddHandler = () => {
		if (todo === '') {
			setError('Please Add some text in todo')
		}
		else {
			const currentId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1

			setTodos([...todos, {
				id: currentId,
				title: todo,
				done: false
			}])

			setTodo('')
			setError('')
		}
	}

	const onTodoToggle = id => {
		setTodos(todos.map(todo => todo.id === id ?
			{ ...todo, done: !todo.done }
			: todo))
	}

	const onTodoDelete = id => {
		setTodos(
			todos.filter(todo => todo.id !== id)
		)
	}



	return (
		<div className={styles.todo}>
			<div className={styles.todoAdding}>
				<input type="text" value={todo} onChange={onChange} className={styles.todoInput} />
				<button className={styles.todoBtn} onClick={onTodoAddHandler}>Add todo</button>
			</div>

			<div className={styles.todoError}>{error}</div>
			<TodoList todos={todos} onTodoToggle={onTodoToggle} onTodoDelete={onTodoDelete} />
		</div >
	)
}

export default Todo
