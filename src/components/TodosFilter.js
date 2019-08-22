import React from 'react'
import styles from './Todo.module.css'

const TodosFilter = ({ value, onChange }) => {
	const handleChange = e => {
		onChange(e.target.value)
		console.log('filtered todos...')
	}

	return (
		<div>
			Filter todos:
			<input type="text" value={value} onChange={handleChange} className={styles.todoInput} />
		</div>
	)
}

export default TodosFilter
