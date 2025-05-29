import { useEffect, useRef, useState } from "react";

import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); //you are using a state to capture a string
  const [todos, setTodos] = useState([]); //init an empty array
  const [editId, setEditId] = useState(null); // to edit u will need to fetch its id
  const inputRef = useRef(null); // You will use this to highlight the feild
  const [showfinished, setshowfinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const handleEdit = (id) => {
    const index = todos.findIndex((item) => item.id === id);

    if (index !== -1) {
      const todoToEdit = todos[index];

      setTodo(todoToEdit.todo); // Populate input field with the existing todo text
      setEditId(id); // Track the id of the todo being edited
      inputRef.current.focus(); // Focus the input field
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (isConfirmed) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((item) => item.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //Use this To create and modify the inputs
  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (editId) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((item) =>
          item.id === editId ? { ...item, todo } : item
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });

      setEditId(null); // Clear the edit state
    } else {
      setTodos((prevTodos) => {
        const newTodo = { id: uuidv4(), todo, isCompleted: false };
        const newTodos = [...prevTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      });
    }

    setTodo(""); // Clear the input field
    inputRef.current.focus(); // Focus the input field
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  const handleCheckBox = (e) => {
    const idx = e.target.name;
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) =>
        item.id === idx ? { ...item, isCompleted: !item.isCompleted } : item
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const toggleFinished = (params) => {
    setshowfinished(!showfinished);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-black min-h-screen">
        <div className="hidden sm:block">
          <Navbar />
        </div>
        <div className="sm:hidden bg-gray-800 text-center py-4 text-lg   text-orange-500 font-mono font-extrabold">
          NextUp
        </div>
        {/* gradient-to-br from-gray-800 via-teal-800 to-green-700 */}
        <div className="">
          <div
            className=" bg-[#1e2634]
            container mx-auto mt-10 sm:mt-20 mb-5 rounded-xl p-5 w-[90%] sm:w-3/4 lg:w-1/2 text-gray-100 select-none border-2 border-orange-500"
          >
            {/* Header */}
            <div className="add todo">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">
                Plan Your Day
              </h2>
              <div className="flex flex-col sm:flex-row lg:gap-0 gap-4 items-center justify-center mt-5">
                {/* Input */}
                <input
                  type="text"
                  className="w-full sm:w-3/4 p-3 sm:p-5 transition-all duration-100 h-12 
                    rounded-full lg:rounded-l-full lg:rounded-r-none 
                    border border-gray-300 placeholder-gray-500 text-black placeholder:text-center"
                  onChange={handleChange}
                  value={todo}
                  onKeyDown={handleKeydown}
                  placeholder="Enter your todo"
                  ref={inputRef}
                />
                {/* Add Button */}
                <button
                  onClick={handleAdd}
                  type="submit"
                  className="w-[40%] sm:w-[96px] h-12 p-2 lg:rounded-r-full lg:rounded-l-none rounded-full 
                    flex justify-center items-center transition-all duration-100 bg-[#FE654F] hover:bg-[#E5533D] text-white"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Filter and Heading */}
            <div className="flex flex-col sm:flex-row justify-center gap-[50%] items-center mt-4 mb-4 px-2 sm:px-10">
              <h2 className="text-lg sm:text-xl font-mono font-semibold">
                Your Todos
              </h2>
              <div
                className="flex items-center text-sm sm:text-base font-mono font-semibold cursor-pointer"
                onClick={toggleFinished}
              >
                <input
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-green-500 rounded-md cursor-pointer transition-all duration-200"
                  type="checkbox"
                  checked={showfinished}
                  onChange={(e) => e.stopPropagation()}
                />
                <span className="ml-2">Show Completed Tasks</span>
              </div>
            </div>

            {/* Todos List */}
            <div className="todos flex flex-col gap-4 items-center max-h-[45vh] overflow-y-scroll scrollbar-custom">
              {todos.length === 0 ? (
                <div className="flex flex-col  text-orange-100 gap-1">
                  <div className=" text-center text-orange-500">
                    You seem to be lazy!
                  </div>
                  <div>Start Planning</div>
                </div>
              ) : (
                todos.map((item) => {
                  if (!item) return null;
                  return (
                    (showfinished || !item.isCompleted) && (
                      <div
                        key={item.id}
                        className="w-full sm:w-[90%] lg:w-[80%] p-4 flex items-center justify-between 
              bg-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 "
                      >
                        <div className="flex items-center gap-4 w-[85%] p-1">
                          <input
                            type="checkbox"
                            className="w-4 h-4 sm:w-5 sm:h-5 accent-green-500 rounded-md cursor-pointer"
                            checked={item.isCompleted}
                            name={item.id}
                            onChange={handleCheckBox}
                          />
                          <span
                            className={`text-sm sm:text-base font-semibold ${
                              item.isCompleted
                                ? "line-through text-gray-500"
                                : "text-black"
                            }`}
                          >
                            {item.todo}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => handleEdit(item.id)}>
                            <img
                              src="./edit.svg"
                              alt="Edit"
                              className="w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-all duration-300"
                            />
                          </button>
                          <button onClick={() => handleDelete(item.id)}>
                            <img
                              src="./delete.svg"
                              alt="Delete"
                              className="w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-all duration-300"
                            />
                          </button>
                        </div>
                      </div>
                    )
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around items-center h-14 shadow-lg">
          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/abhiram-ys-8a3a2b266/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-sm"
          >
            <img
              src="./linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6 filter-white"
            />
            <span>LinkedIn</span>
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/Abhiram241"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-sm"
          >
            <img
              src="./github.svg"
              alt="GitHub"
              className="w-6 h-6 filter-white"
            />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
