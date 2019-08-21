import React, { useRef, useEffect } from 'react'
import styles from './Todo.module.css'

const TodosFilter = ({ filteredTodos, filterTodos, clearFilter }) => {
	const text = useRef('')

	useEffect(() => {
		if (filteredTodos === null) {
			text.current.value = ''
		}
	})

	const onChange = e => {
		if (text.current.value !== '') {
			filterTodos(e.target.value)
			console.log('filtered todos...')
		} else {
			clearFilter()
		}
	}

	return (
		<div>
			Filter todos:
			<input type="text" ref={text} onChange={onChange} className={styles.todoInput} />
		</div>
	)
}

export default TodosFilter
