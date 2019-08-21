import React, { useState } from 'react'
import styles from './Todo.module.css'
import TodoList from './TodoList'
import TodosFilter from './TodosFilter'

const Todo = () => {
	const [todos, setTodos] = useState([])
	const [filteredTodos, setFilteredTodos] = useState(null)
	const [todo, setTodo] = useState('')
	const [error, setError] = useState('')

	const onChange = e => {
		setTodo(e.target.value)
	}

	const onTodoAdd = () => {
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

			clearFilter()
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

	const filterTodos = text => {
		setFilteredTodos(
			todos.filter(todo => {
				const regex = new RegExp(`${text}`, 'gi')
				return todo.title.match(regex)
			})
		)
	}

	const clearFilter = () => {
		setFilteredTodos(null)
	}

	const onSubmit = e => {
		e.preventDefault()
		onTodoAdd()
	}

	return (
		<div className={styles.todo}>
			<form onSubmit={onSubmit} className={styles.todoAdding}>
				<input type="text" value={todo} onChange={onChange} className={styles.todoInput} />
				<button type="submit" className={styles.todoBtn}>Add todo</button>
			</form>

			<TodosFilter filterTodos={filterTodos} clearFilter={clearFilter} filteredTodos={filteredTodos} />

			<div className={styles.todoError}>{error}</div>
			{filteredTodos ?
				<TodoList todos={filteredTodos} onTodoToggle={onTodoToggle} onTodoDelete={onTodoDelete} />
				:
				<TodoList todos={todos} onTodoToggle={onTodoToggle} onTodoDelete={onTodoDelete} />
			}
		</div >
	)
}

export default Todo
