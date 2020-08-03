import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import Item from 'antd/lib/list/Item';
// import useLocalStorage from "./"


function AddTodo({ }) {
    const textState = atom({
        key: "textState",
        default: "",
    });
    const [text, setText] = useRecoilState(textState);
    const todoListState = atom({
        key: "todoListState",
        default: [],
    });
    // debugger
    const setTodoList = useSetRecoilState(todoListState);
    const addItem = (event) => {
        event.preventDefault();
        if (!text.length) return;
        setTodoList(oldTodoList=>{
            const newTodoList=[
                ...oldTodoList,
                {
                    text,
                    isComplete:false,
                },
            ];
            setText([]);
            return newTodoList;
        })
    };

    const onchange = (event) => {
        setText(event.target.value);
    };

    return (
        <form className="">
            <input className='todoInput' type="text" value={text} onChange={onchange} />
            <button className="btnTodo" onClick={addItem}>Add</button>
        </form>
    );
}
export default AddTodo;