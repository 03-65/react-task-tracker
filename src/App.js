import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';

export function App() {

    const [showForm, setShowForm] = useState(false);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer);
        }

        getTasks();
        
    }, [])

    // Fetch Tasks from Server
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();
        
        return data;
    }

    // delete Task
    const deleteTask = async (id) => {

        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        }) 

        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
        })

        const data = await res.json()

        setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, reminder: data.reminder } : task
        )
        )
    }

    // Add Task
    const onAddTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })
    
        const data = await res.json();
    
        setTasks([...tasks, data])
    
        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }

    return (
        <Router>
        <div className='container'>
            <Header title="Task Tracker" onAdd={() => setShowForm(!showForm)} showForm={showForm}/>
            <Route
            path='/'
            exact
            render={(props) => (
                <>
            {showForm && <AddTask onAdd={onAddTask}/>}
            {
                tasks.length > 0 ?
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
                :
                ('No tasks to display')
            }
        </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
    );
}