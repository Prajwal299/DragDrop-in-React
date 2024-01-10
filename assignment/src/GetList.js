import React, { useState, useEffect } from 'react';

export default function GetList() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [taskInputs, setTaskInputs] = useState({});

  const handleCreateList = async () => {
    try {
      const response = await fetch('http://localhost:8090/api/list/createList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName, tasks: [] }),
      });

      if (response.ok) {
        const newList = await response.json();
        setLists([...lists, newList]);
        setListName('');
        setTaskInputs({ ...taskInputs, [newList.id]: '' });
      } else {
        console.error('Failed to create list');
      }
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleCreateTask = async (listId) => {
    try {
      const response = await fetch(`http://localhost:8090/api/task/addTask/${listId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskInputs[listId] }),
      });

      if (response.ok) {
        const newTask = await response.json();
        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            return { ...list, tasks: [...list.tasks, newTask] };
          }
          return list;
        });
        setLists(updatedLists);
        setTaskInputs({ ...taskInputs, [listId]: '' });
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    // Fetch all lists from the backend when the component mounts
    const fetchLists = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/list/getAllList');
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error('Failed to fetch lists');
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };
    fetchLists();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>

      <div className="lists-container">
        <h2>All Lists</h2>
        {lists.map((list) => (
          <div className="list-item" key={list.id}>
            <h3>{list.name}</h3>
            <div>
              <input
                type="text"
                placeholder="Enter Task Name"
                value={taskInputs[list.id] || ''}
                onChange={(e) => setTaskInputs({ ...taskInputs, [list.id]: e.target.value })}
              />
              <button onClick={() => handleCreateTask(list.id)}>Add Task</button>
            </div>
            <ul>
              {list.tasks.map((task) => (
                <li key={task.id}>{task.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}