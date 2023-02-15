import { Props } from "./index";
import * as Api from "../../api/Api";
import { useState, useRef } from "react";
import "../../styles/todo.css";

const TodoCard = ({ id, todo, isCompleted, userId, getTodoList }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo);
  const todoInput = useRef<HTMLInputElement>(null);

  //수정하기
  const putTodo: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (editTodo.length < 1 && todoInput.current) {
      todoInput.current.focus();
      return;
    }
    try {
      const res = await Api.put(`todos/${id}`, {
        todo: editTodo,
        isCompleted,
      });
      if (res.status === 200) {
        getTodoList();
        setIsEdit(false);
      }
    } catch (err) {
      console.log("err : ", err);
      alert("수정 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };
  console.log(editTodo);

  //삭제하기
  const deleteTodo: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const res = await Api.delete(`todos/${id}`);
        if (res.status === 204) {
          getTodoList();
        }
      } catch (err) {
        console.log("err : ", err);
        alert("삭제 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };

  //완료 체크박스 클릭
  const todoComplete = async () => {
    try {
      const res = await Api.put(`todos/${id}`, {
        todo,
        isCompleted: !isCompleted,
      });
      if (res.status === 200) {
        getTodoList();
      }
    } catch (err) {
      console.log("err : ", err);
      alert("완료처리 중 오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <>
      <li className="task-list-item">
        {isEdit ? (
          <>
            <input
              className="task-edit-input"
              ref={todoInput}
              value={editTodo}
              type="text"
              data-testid="modify-input"
              v-model="tasks.name"
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
            />
            <button
              data-testid="cancel-button"
              className="editmode-btn-cancel"
              title="edit Task"
              onClick={() => {
                setIsEdit(!isEdit);
                setEditTodo(todo);
              }}
            >
              취소
            </button>
            <button
              data-testid="submit-button"
              className="editmode-btn-confirm"
              title="edit Task"
              onClick={putTodo}
            >
              제출
            </button>
          </>
        ) : (
          <>
            <label className="task-list-item-label">
              <input
                className="task-checkbox"
                type="checkbox"
                checked={isCompleted}
                onClick={todoComplete}
              />
              <span className="taskbox">{todo}</span>
              <button
                data-testid="modify-button"
                className="edit-btn"
                title="edit Task"
                onClick={() => setIsEdit(!isEdit)}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                className="delete-btn"
                title="Delete Task"
                onClick={deleteTodo}
              >
                삭제
              </button>
            </label>
          </>
        )}
      </li>
    </>
  );
};

export default TodoCard;
