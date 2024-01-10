import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function GetList() {
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [taskInputs, setTaskInputs] = useState({});

  const handleCreateList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8090/api/list/createList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: listName, tasks: [] }),
        }
      );

      if (response.ok) {
        const newList = await response.json();
        setLists([...lists, newList]);
        setListName("");
        setTaskInputs({ ...taskInputs, [newList.id]: "" });
      } else {
        console.error("Failed to create list");
      }
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleCreateTask = async (listId) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/task/addTask/${listId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: taskInputs[listId] }),
        }
      );

      if (response.ok) {
        const newTask = await response.json();
        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            return { ...list, tasks: [...list.tasks, newTask] };
          }
          return list;
        });
        setLists(updatedLists);
        setTaskInputs({ ...taskInputs, [listId]: "" });
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    // Fetch all lists from the backend when the component mounts
    const fetchLists = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/list/hello");
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error("Failed to fetch lists");
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, []);

  //------------------------------

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;
    const draggableId = result.draggableId;

    if (sourceListId === destinationListId) {
      const updatedLists = lists.map((list) => {
        if (String(list.id) === sourceListId) {
          const reorderedTasks = Array.from(list.tasks);
          const [removed] = reorderedTasks.splice(source.index, 1);
          reorderedTasks.splice(destination.index, 0, removed);
          return { ...list, tasks: reorderedTasks };
        }
        return list;
      });

      setLists(updatedLists);
    } else {
      const sourceList = lists.find((list) => String(list.id) === sourceListId);
      const destinationList = lists.find(
        (list) => String(list.id) === destinationListId
      );
      const taskToMove = sourceList.tasks.find(
        (task) => String(task.id) === draggableId
      );

      const updatedSourceList = {
        ...sourceList,
        tasks: sourceList.tasks.filter(
          (task) => String(task.id) !== draggableId
        ),
      };

      const updatedDestinationList = {
        ...destinationList,
        tasks: [
          ...destinationList.tasks.slice(0, destination.index),
          taskToMove,
          ...destinationList.tasks.slice(destination.index),
        ],
      };

      const updatedLists = lists.map((list) => {
        if (String(list.id) === sourceListId) {
          return updatedSourceList;
        } else if (String(list.id) === destinationListId) {
          return updatedDestinationList;
        }
        return list;
      });

      setLists(updatedLists);
    }
  };

  //--------------------------

  const handleTaskDelete = async (listId, taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/task/delete/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            const updatedTasks = list.tasks.filter(
              (task) => task.id !== taskId
            );
            return { ...list, tasks: updatedTasks };
          }
          return list;
        });
        setLists(updatedLists);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //---------------------------------------------------
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="lists-container">
          <h2>All Lists</h2>
          {lists.map((list) => (
            <Droppable droppableId={String(list.id)} key={String(list.id)}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="list-item"
                  key={String(list.id)}
                >
                  <h3>{list.name}</h3>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Task Name"
                      value={taskInputs[list.id] || ""}
                      onChange={(e) =>
                        setTaskInputs({
                          ...taskInputs,
                          [list.id]: e.target.value,
                        })
                      }
                    />
                    <button onClick={() => handleCreateTask(list.id)}>
                      Add Task
                    </button>
                  </div>

                  <ul>
                    {list.tasks.map((task, index) => (
                      <Draggable
                        key={String(task.id)}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleTaskDelete(list.id, task.id)
                              }
                            />
                            {task.name}
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
