import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Lists() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [taskInputs, setTaskInputs] = useState({});

  const handleCreateList = () => {
    const newList = {
      id: String(lists.length + 1),
      name: listName,
      tasks: [],
    };
    setLists([...lists, newList]);
    setListName('');
    setTaskInputs({ ...taskInputs, [newList.id]: '' });
  };

  const handleCreateTask = (listId) => {
    const newTask = {
      id: String(Math.random()), // Using Math.random() for unique task IDs
      name: taskInputs[listId] !== '' ? taskInputs[listId] : `Task ${lists[listId - 1].tasks.length + 1}`,
    };
    const updatedLists = lists.map((list) => {
      if (list.id === String(listId)) {
        return { ...list, tasks: [...list.tasks, newTask] };
      }
      return list;
    });
    setLists(updatedLists);
    setTaskInputs({ ...taskInputs, [listId]: '' });
  };

  const handleUpdateTask = (listId, taskId) => {
    console.log(`Updating Task ${taskId} in List ${listId}`);
    // Logic to update the task here
  };

  const handleDeleteTask = (listId, taskId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
  
    // dropped outside the list
    if (!destination) {
      return;
    }
  
    if (source.droppableId !== destination.droppableId) {
      // Moving from one list to another
      const sourceList = lists.find(list => list.id === source.droppableId);
      const destList = lists.find(list => list.id === destination.droppableId);
      const task = sourceList.tasks[source.index];
  
      // Remove task from source list
      sourceList.tasks.splice(source.index, 1);
      // Add task to destination list
      destList.tasks.splice(destination.index, 0, task);
  
    } else {
      // Reordering within the same list
      const list = lists.find(list => list.id === source.droppableId);
      const [removed] = list.tasks.splice(source.index, 1);
      list.tasks.splice(destination.index, 0, removed);
    }
  
    setLists([...lists]);
  };
  

  return (
    <div className="lists-container">
      <div className="list-creator">
        <input
          type="text"
          placeholder="Enter List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {lists.map((list) => (
          <Droppable droppableId={String(list.id)} key={list.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="list-container">
                <h3>{list.name}</h3>
                <div className="task-creator">
                  <input
                    type="text"
                    placeholder="Task Name"
                    value={taskInputs[list.id] || ''}
                    onChange={(e) => setTaskInputs({ ...taskInputs, [list.id]: e.target.value })}
                  />
                  <button onClick={() => handleCreateTask(list.id)}>Create Task</button>
                </div>
                <ul>
                  {list.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="task-item">
                            <p>{task.name}</p>
                            <div className="task-icons">
                              <span onClick={() => handleUpdateTask(list.id, task.id)}>Update</span>
                              <span onClick={() => handleDeleteTask(list.id, task.id)}>Delete</span>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
