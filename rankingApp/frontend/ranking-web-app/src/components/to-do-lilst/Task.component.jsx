import React from "react";

const Item =  React.memo(({ tasks, onDelete, onToggle }) => {
    return(
        <>      
            {
                tasks.map(task => (
                    <li key={task.id} style={{ margin: '10px 0' }}>
                        <span
                        onClick={() => onToggle(task.id)}
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                        >
                        {task.text}
                        </span>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                    </li>
            ))}
        </>
    )
});

export default Item;