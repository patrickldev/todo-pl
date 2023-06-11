import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [message, setMessage] = useState("");
  const [todoList, setTodoList] = useState([]);

  const url = "3.87.186.10:3001/todoList";

  const inputText = (e) => {
    setMessage(e.target.value);
  };

  const addTodo = async () => {
    if (message.trim() == "") {
    } else {
      const messageToEdit = message;
      const messageFirstUpper =
        message.charAt(0).toUpperCase() + messageToEdit.slice(1);
      const data = {
        description: `${messageFirstUpper}`,
        done: false,
      };
      await axios.post(url, data).then(() => getTodoList());
    }
  };

  const getTodoList = async () => {
    await axios.get(url).then((response) => {
      const data = response.data;
      setTodoList(data);
    });
  };

  const completeTask = async (id, description) => {
    const data = {
      id: id,
      description: description,
      done: true,
    };
    await axios.put(url + `/${id}`, data).then(() => {
      getTodoList();
    });
  };

  const deleteTask = async (id) => {
    await axios.delete(url + `/${id}`).then(() => {
      getTodoList();
    });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div className="toDoList">
        <div className="formTodo">
          <MDBInput
            onChange={inputText}
            label="What to do"
            id="typeText"
            type="text"
            contrast
          />
          <MDBBtn onClick={(e) => addTodo(e)} className="me-1" color="success">
            ADD
          </MDBBtn>
        </div>
        {todoList.map((todo, index) => {
          if (!todo.done) {
            return (
              <>
                <div className="todosList" key={todo.id}>
                  <span id="todoSpan">
                    <div>{todo.description}</div>
                    <div>
                      <MDBBtn
                        onClick={() => completeTask(todo.id, todo.description)}
                        className="me-1"
                        color="success"
                      >
                        done
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => deleteTask(todo.id)}
                        className="me-1"
                        color="danger"
                      >
                        delete
                      </MDBBtn>
                    </div>
                  </span>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="todosList" key={todo.id}>
                  <span id="todoSpan">
                    {todo.description}
                    <div>
                      <img
                        id="doneIcon"
                        src={`${process.env.PUBLIC_URL}/icons/done.png`}
                      />
                      <MDBBtn
                        onClick={() => deleteTask(todo.id)}
                        className="me-1"
                        color="danger"
                      >
                        delete
                      </MDBBtn>
                    </div>
                  </span>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}

export default Todo;
