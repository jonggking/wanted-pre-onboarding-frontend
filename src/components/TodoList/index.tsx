import { useState, useEffect, useRef } from "react";
import * as Api from "../../api/Api";
import "../../styles/todo.css";
import TodoCard from "./Todocard";

type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export type Props = Todo & {
  getTodoList: () => Promise<void>;
};

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<String>("");
  const todoInput = useRef<HTMLInputElement>(null);
  const getTodoList = async () => {
    try {
      const res = await Api.get("todos");
      setTodoList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  //추가하기
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    if (todo.length < 1 && todoInput.current) {
      todoInput.current.focus();
      return;
    }

    try {
      const res = await Api.post("todos", { todo });
      if (res.status === 201) {
        getTodoList();
        setTodo("");
      }
    } catch (err) {
      console.log("err : ", err);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className="app-container" id="taskList">
      <h1 className="app-header">ToDoList</h1>
      <div className="add-task">
        <input
          data-testid="new-todo-input"
          type="text"
          ref={todoInput}
          placeholder="할일을 입력해주세요."
          v-model="tasks.name"
          className="task-input"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          data-testid="new-todo-add-button"
          type="submit"
          value=""
          className="submit-task"
          title="Add Task"
          onClick={handleSubmit}
        />
      </div>
      <ul className="task-list">
        {todoList.map((todo) => (
          <TodoCard key={todo.id} {...todo} getTodoList={getTodoList} />
        ))}
      </ul>
    </div>
  );
}
