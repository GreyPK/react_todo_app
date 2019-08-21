import React from 'react'
import styles from './Todo.module.css';

const TodoItem = ({ todo: { id, title, done }, onTodoToggle, onTodoDelete }) => {
	const titleClasses = done ? `${styles.todoTitle} ${styles.todoTitleDone}` : styles.todoTitle
	return (
		<div className={styles.todoItem}>
			<span className={titleClasses} onClick={() => onTodoToggle(id)}>
				{title}
			</span>
			<button className={styles.todoDelete} onClick={() => onTodoDelete(id)}>Delete todo</button>
		</div>
	)
}

export default TodoItem
