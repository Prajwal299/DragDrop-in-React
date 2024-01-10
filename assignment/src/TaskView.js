import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskView() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const fetchTasksByListId = async (listId) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/lists/${listId}/tasks`);
      const tasks = response.data;

      // Log or use the tasks data, e.g., update state to display the tasks
      console.log(`Tasks in List ID ${listId}:`, tasks);
    } catch (error) {
      console.error(`Error fetching tasks for List ID ${listId}:`, error);
    }
  };

  return (
    <div className="task-view">
      <h2>Lists and Tasks</h2>
      {lists.map((list) => (
        <div key={list.id} className="list-item">
          <h3>{list.list_name}</h3>
          <button onClick={() => fetchTasksByListId(list.id)}>View Tasks</button>
        </div>
      ))}
    </div>
  );
}

export default TaskView;
