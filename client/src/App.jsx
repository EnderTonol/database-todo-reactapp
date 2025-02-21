import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [initName, setIname] = useState("");
  const [allN, setAllN] = useState([]);

  async function getData() {
    const response = await fetch("http://localhost:5000/api/get");
    const data = await response.json();
    setAllN(data);
  }

  useEffect(() => {
    getData();
  }, []); 

  
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/add-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json(); 
    if (res.ok) {
      setName(""); 
      alert(data.message || data.error);
      getData(); 
    }
    getData();
  }

  async function handleUpdate(name){
    const userInp = await prompt("Enter new name", name.name);
    if(userInp == "") return;

    const res = await fetch(`http://localhost:5000/update-name/${name.name}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updateName: userInp }),
    });
    const data = await res.json();
    if(res.ok){
      setIname("");
      alert(data.message || data.error);
      getData();
    }
    getData();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <div>
        <ol>
          {allN.map((itm, index) => (
            <>
            <li key={index}>{itm.name}<button onClick={()=>handleUpdate(itm)}>Update</button></li>
            </>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
