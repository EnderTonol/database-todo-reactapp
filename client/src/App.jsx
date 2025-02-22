import { useState, useEffect } from "react";
import { Form,Input,Button, ButtonGroup } from "@heroui/react";

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

  async function handleDelete(name){
    const res = await fetch(`http://localhost:5000/del/users/${name.name}`, {
      method: "DELETE",
      headers: { "Server": "method Deletion"},
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
    <div className="w-full h-screen p-2">
      <Form onSubmit={handleSubmit} className="flex flex-row items-center">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Enter Name"
          color="primary"
          size="sm"
          required
        />
        <Button type="submit" variant="shadow" color="primary">Add User</Button>
      </Form>
      {(allN.length > 0)? (
        <div className="p-2 mt-4 rounded-2xl bg-slate-400">
        <ol className="flex flex-col gap-1">
          {allN.map((itm, index) => (
            <>
            <li className="flex flex-row items-center w-full p-1 rounded-2xl bg-slate-200" key={index}><p className="grow">{itm.name}</p><ButtonGroup><Button color="warning" onPress={()=>handleUpdate(itm)}>Update</Button><Button color="danger" variant="shadow" onPress={()=>handleDelete(itm)}>Delete</Button></ButtonGroup></li>
            </>
          ))}
        </ol>
      </div>) : (<h1>No Data Found By restfull API</h1>)
      }
      </div>
    </>
  );
}

export default App;
