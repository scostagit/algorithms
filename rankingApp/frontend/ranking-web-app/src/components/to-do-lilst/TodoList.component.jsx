import React, { useState, useEffect, useMemo, useCallback  } from "react";
import  Item  from './Task.component'

const TodoList = () => {
    
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  //  Load tasks from localStorage on mount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks){
            setTasks(storedTasks);
        }
    }, []);

    //  Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Add a new task
    const handleAddTask = useCallback((e) => {

        e.preventDefault();

        if (newTask.trim() === '') return;

        const task = {
            id: Date.now(),
            text: newTask,
            completed: false,
        };

        setTasks([...tasks, task]);
        setNewTask('');
        
    },[newTask, tasks])

    // Toggle task completion
    const handleToggleTask = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    // Delete a task
    const handleDeleteTask = useCallback((id) => {
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    },[tasks])
  
    const completedCount = useMemo(() => {
        console.log('Calculating completed tasks...');
        return tasks.filter(task => task.completed).length;
    }, [tasks]);

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h4>Tasks List</h4>

            <input
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <button onClick={handleAddTask}>Add</button>

            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>  
                    <Item tasks={tasks} 
                          onDelete={handleDeleteTask} 
                          onToggle={handleToggleTask}
                    />
            </ul>
            <p>Completed Tasks: {completedCount}</p>
        </div>
    );
}

export default TodoList;
