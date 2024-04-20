import React, { useState, useEffect } from "react";
import { Data } from "./Employee";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setData(Data);
  }, []);
  const handleClear = () => {
    alert("Record Cleared");
    setFirstName("");
    setLastName("");
    setAge(0);
    setUpdate(false);
  };
  const handleDelete = (id) => {
    alert(`Are your sure you want to delete record ${id}`);
    if (window.confirm(`Are your sure you want to delete record ${id}`)) {
      let dt = data.filter((item) => item.id !== id);
      setData(dt);
      alert(`Record ${id} has been deleted`);
    }
  };
  const handleEdit = (id) => {
    setFirstName(data[id - 1].firstName);
    setLastName(data[id - 1].lastName);
    setAge(data[id - 1].age);
    setId(id);
    setUpdate(true);
  };
  const handleUpdate = () => {
    let updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          id: id,
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
      }
      return item;
    });
    setUpdate(false);
    setData(updatedData);
    alert("Record Updated");
    handleClear();
  };

  const handleSave = () => {
    let error = "";
    if (firstName === "") {
      error += "first name is required";
      alert(error);
    } else if (lastName === "") {
      error += "Last name is required";
      alert(error);
    } else if (age <= 0) {
      error += "age is required";
      alert(error);
    } else {
      alert("Record saved");
      let dt = [...data];
      let newObj = {
        id: data.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      dt.push(newObj);
      setData(dt);
    }
  };
  return (
    <>
      <div className="bg-warning">
        <div className="form d-flex justify-content-center align-items-center   gap-4  mx-auto  py-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="d-flex gap-1">
            {!update ? (
              <button className="btn btn-dark" onClick={() => handleSave()}>
                Save
              </button>
            ) : (
              <button className="btn btn-dark" onClick={() => handleUpdate()}>
                Update
              </button>
            )}

            <button className="btn btn-danger" onClick={() => handleClear()}>
              clear
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <table className="table table-striped table-dark table-hover">
          <thead>
            <tr>
              <th scope="col"># </th>
              <th scope="col">id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last name</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} scope="row">
                  <th>{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td className="d-flex gap-1 ">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
