import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isElementAccessExpression } from "typescript";
import TodoList from "../components/TodoList";
export default function Todo() {
  return <TodoList />;
}
