import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ListCreator() {
  const [listName, setListName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/list');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const handleCreateList = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/list/createList', {
        list_name: listName,
      });
      const newList = response.data;
      setLists([...lists, newList]);
      setListName('');
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleAddTask = async (listId) => {
    try {
      const response = await axios.post(`http://localhost:8090/api/task/lists/${listId}/tasks`, {
        task_name: taskName,
      });
      const updatedList = response.data;
      const updatedLists = lists.map((list) => (list.id === listId ? updatedList : list));
      setLists(updatedLists);
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    try {
      const sourceListId = lists[source.droppableId].id;
      const destinationListId = lists[destination.droppableId].id;
      const taskId = lists[source.droppableId].tasks[source.index].id;

      const response = await axios.put(
        `http://localhost:8090/api/task/lists/${sourceListId}/tasks/${taskId}`,
        {
          list_id: destinationListId,
        }
      );

      const updatedList = response.data;
      const updatedLists = lists.map((list) =>
        list.id === updatedList.id ? updatedList : list
      );
      setLists(updatedLists);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  return (
    <div className="boxContainer">
      <div className="start-creating">
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
        <div className="lists-container">
          <DragDropContext onDragEnd={onDragEnd}>
            {lists && lists.length > 0 ? (
              lists.map((list) => (
                <div key={list.id} className="list">
                  <h3>{list.list_name}</h3>
                  <Droppable droppableId={String(list.id)}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="task-list"
                      >
                        {list.tasks && list.tasks.length > 0 ? (
                          list.tasks.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={String(task.id)}
                              index={index}
                            >
                              {/* ... */}
                            </Draggable>
                          ))
                        ) : (
                          <p>No tasks yet</p>
                        )}
                        {provided.placeholder}
                        <input
                          type="text"
                          placeholder="Enter Task Name"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                        <button onClick={() => handleAddTask(list.id)}>Add Task</button>
                      </div>
                    )}
                  </Droppable>
                </div>
              ))
            ) : (
              <p>No lists created yet</p>
            )}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default ListCreator;
