import { Props } from "./index";
import * as Api from "../../api/Api";

const TodoCard = ({ id, todo, isCompleted, userId, getTodoList }: Props) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false)

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

  //Todo 완료하기
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
        <label className="task-list-item-label">
          <input type="checkbox" checked={isCompleted} onClick={todoComplete} />
          <span>{todo}</span>
        </label>
        <button
          data-testid="modify-button"
          className="edit-btn"
          title="Delete Task"
        ></button>
        <button
          data-testid="delete-button"
          className="delete-btn"
          title="Delete Task"
          onClick={deleteTodo}
        ></button>
      </li>
    </>
  );
};

export default TodoCard;
