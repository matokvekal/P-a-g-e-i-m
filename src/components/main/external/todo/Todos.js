import React from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';


function Todos() {

    const deleteTodo = (index) => {
        setTodoList((oldTotoList) => {
            const newTodolist = oldTotoList.filter((todo, i) => {
                return i !== index;
            });
            return newTodolist;
        });
    };
    const toggleTodo = (index) => {
        setTodoList((oldTotoList) => {
            const newTodoList = oldTotoList.map((todo, i) => {
                if (i === index) {
                    return {
                        ...todo,
                        isComplete: !todo.isComplete,
                    };
                } else {
                    return todo;
                };
            });
            return newTodoList;
        });
    };
    const todoListState = atom({
        key: "todoListState",
        default: [],
    })
    const todoList = useRecoilValue(todoListState);
    const setTodoList = useSetRecoilState(todoListState)
    return (
        <ul className="newTodo">
            {todoList.map((todo, index) => (
                <li className="newTodoList" key={index + 100} >
                    <input
                        type="checkbox"
                        id="todo"
                        checked={todo.isComplite}
                        onChange={() => {
                            toggleTodo(index);
                        }}
                    />
                    <label className="todoLebel" htmlFor="todo" data-content={"todo"}>{todo.text}</label>
                    <button onClick={() => deleteTodo(index)} className='btnDelTodo'>X</button>
                </li>
            ))}
        </ul>
    )
}
export default Todos;