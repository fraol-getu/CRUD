"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgMoreO } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Create from "@/components/Create";
import Read from "@/components/Read";
import { useRouter } from "next/router";
import Update from "./Update";
import { URL } from "@/api/api";

function Home() {
  const [data, setData] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [user, setUser] = useState({});

  function handleDelete(id) {
    const confrim = window.confirm("Do you like to Delete");
    if (confrim) {
      axios.delete(URL+ id).then((res) => {
        alert("record deleted");
        getData();
      });
    }
  }

  function getData() {
    axios
      .get(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
      if(document){
        document.body.style.overflowY = "scroll"
      }
  }
  function handleRead(id) {
    setId(id);
    if (window) {
      window.scrollTo(0, 0);
      window.document.body.style.overflowY = "hidden";
    }
    setIsRead((state) => !state);
  }

  function handleUpdate(data) {
   setUser(data);
    if (window) {
      window.scrollTo(0, 0);
      window.document.body.style.overflowY = "hidden";
    }
    setIsUpdate((state) => !state);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <h1>CRUD APP.</h1>
      {!isRead && !isUpdate && <Create getData={getData} />}
      {isRead && <Read id={id} close={setIsRead}/>}
      {isUpdate && <Update user={user} close={setIsUpdate} getData={getData}/>}

      <div className="table-container">
        <table>
          <caption>Users List.</caption>
          <tbody>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            {data.map((user, index) => {
              return (
                <tr className="lists" key={index}>
                  <td data-cell="No">{index + 1}</td>
                  <td data-cell="id">{user.id}</td>
                  <td data-cell="Name">{user.name}</td>
                  <td data-cell="Email">{user.email}</td>
                  <td data-cell="Action">
                    <div className="btn-container">
                      <button
                        onClick={() => {
                          handleRead(user.id);
                        }}
                      >
                        <CgMoreO className="icon" />
                      </button>

                      <button onClick={()=>handleUpdate(user)}>
                          <FaRegEdit className="icon" />
                      </button>
                      <button onClick={(e) => handleDelete(user.id)}>
                        <MdDelete className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Home;
