import { useState, useEffect } from "react";

export default function Todo() {
  const [text, setText] = useState({ task: "", date: "" });
  const [local, setLocal] = useState([]);

  const onChange = (e) => { //Function to get the Value
    setText({ ...text, [e.target.name]: e.target.value });
  }; // used to get the Value of the input

  const putValue = () => { //Function to Store the Value in Local Storage
    let existingData = JSON.parse(localStorage.getItem('lists')) || [];
    // Add new data to existing data
    existingData.push(text);
    // Save updated data back to local storage
    localStorage.setItem('lists', JSON.stringify(existingData));
    setLocal(existingData);
  };

  const deleteTask = (taskToDelete) => { // Fucntion to Delete Task
    let existingData = JSON.parse(localStorage.getItem('lists')) || [];
    // Filter out the task to be deleted
    existingData = existingData.filter(item => item.task !== taskToDelete.task || item.date !== taskToDelete.date);
    // Save updated data back to local storage
    localStorage.setItem('lists', JSON.stringify(existingData));
    setLocal(existingData);
    alert("Task Completed")
  };
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('lists')) || [];
    setLocal(existingData);
  }, []);

  return (
    <>
      <div className="container text-center">
        <h1><u>TODO APP</u></h1>
        <div className="row mt-4">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              id="Textinput"
              name="task"
              placeholder="Enter the Task"
              onChange={onChange}
            />
          </div>
          <div className="col-5">
            <input
              type="date"
              className="form-control"
              id="Dateinput"
              name="date"
              onChange={onChange}
            />
          </div>
          <div className="col">
            <button type="submit" onClick={putValue} className="btn btn-success sizebtn">
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {local.map((item, index) => (
          <div className="row mt-4" key={index}>
            <div className="col-6">
              <h3>{item.task}</h3>
            </div>
            <div className="col-5">
              <h3>{item.date}</h3>
            </div>
            <div className="col">
              <button type="button" onClick={() => deleteTask(item)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
