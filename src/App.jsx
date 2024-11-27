import { useState } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = (e) => {
    if (todo != "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };
  const handleCheckBox = (e) => {
    const idx = e.target.name;
    console.log(idx);
    const updatedtodos = todos.map((item) => {
      if (item.id === idx) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(updatedtodos);
  };
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-black min-h-[100vh]">
        <Navbar />
        <div
          className="bg-gradient-to-br from-gray-800 via-teal-800 to-green-700
 container mx-auto mt-20 my-5 rounded-xl p-5 w-1/2 text-gray-100 "
        >
          {/* style={{ backgroundColor: "#C8D5B9" }} */}
          <div className="addtodo">
            <h2 className="text-3xl  font-bold text-center ">Plan Your Day</h2>
            <div className="flex items-center justify-center mt-5">
              <input
                type="text"
                name=""
                className=" transition-all duration-100 h-12 w-[80%] rounded-l-full p-2  mx-0 border border-gray-300 placeholder-gray-500 text-black placeholder:text-center"
                id=""
                onChange={handleChange}
                value={todo}
                onKeyDown={handleKeydown}
                placeholder="Enter your todo"
              />
              <button
                onClick={handleAdd}
                type="submit"
                className="rounded-r-full w-24 mx-0  p-2 h-12 flex justify-center items-center transition-all duration-100 bg-[#FE654F] hover:bg-[#E5533D]"
              >
                Add
              </button>
            </div>
          </div>

          <h2 className="text-2xl mt-5 mb-5 font-mono font-semibold text-center ">
            Your Todos
          </h2>
          <div className="todos flex flex-col gap-2 items-center justify-center">
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{ backgroundColor: "#ccd7e2ff" }}
                  className=" w-[80%] todo flex items-center justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-mono text-black"
                >
                  <div className="text_check flex gap-4 items-center">
                    <input
                      type="checkbox"
                      value={item.isCompleted}
                      name={item.id}
                      onChange={handleCheckBox}
                      className="w-5 h-5 accent-green-500  rounded-md cursor-pointer transition-all duration-200"
                    />

                    <div
                      className={
                        item.isCompleted ? "bg-slate-600" : "bg-pink-600"
                      }
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className=" flex gap-5 buttons">
                    <button onClick={handleEdit}>
                      <img src="./edit.svg" alt="" />
                    </button>
                    <button onClick={handleDelete}>
                      <img src="./delete.svg" alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
