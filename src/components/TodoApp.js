import React, { useState, useEffect } from 'react'
import styles from './Todo.module.css'
import TodoList from './TodoList'
import TodosFilter from './TodosFilter'

const TodoApp = () => {
	const [todos, setTodos] = useState([])
	const [filter, setFilter] = useState('')
	const [todo, setTodo] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		const localStorageTodos = JSON.parse(localStorage.getItem('todos'))
		localStorageTodos && setTodos(localStorageTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const onChange = e => {
		setTodo(e.target.value)
	}

	const onTodoAdd = () => {
		if (todo === '') {
			setError('Please Add some text in todo')
		}
		else {
			const currentId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1

			const newTodos = [...todos, {
				id: currentId,
				title: todo,
				done: false
			}]

			setTodos(newTodos)
			setTodo('')
			setError('')
		}
	}

	const onTodoToggle = id => {
		const newTodos = todos.map(todo => todo.id === id ?
			{ ...todo, done: !todo.done }
			: todo)

		setTodos(newTodos)
	}

	const onTodoDelete = id => {
		const newTodos = todos.filter(todo => todo.id !== id)
		setTodos(newTodos)
	}

	const onSubmit = e => {
		e.preventDefault()
		onTodoAdd()
	}

	const filteredTodos = todos.filter(todo => {
		const regex = new RegExp(`${filter}`, 'gi')
		return todo.title.match(regex)
	})

	return (
		<div className={styles.todo}>
			<form onSubmit={onSubmit} className={styles.todoAdding}>
				<input type="text" value={todo} onChange={onChange} className={styles.todoInput} />
				<button type="submit" className={styles.todoBtn}>Add todo</button>
			</form>

			<TodosFilter value={filter} onChange={setFilter} />

			<div className={styles.todoError}>{error}</div>

			<TodoList todos={filteredTodos} onTodoToggle={onTodoToggle} onTodoDelete={onTodoDelete} />
		</div >
	)
}

export default TodoApp
