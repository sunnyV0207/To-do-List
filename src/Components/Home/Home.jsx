import React, { useEffect } from 'react'
import "./Home.css"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const getLocalStorageItems = ()=>{
  let list = localStorage.getItem('arr');
  if(list){
    return JSON.parse(localStorage.getItem('arr'));
  }else{
    return [];
  }
}

// [{task:"sample task",id:uuidv4()}]

const Home = () => {
  let [taskArr,setTaskArr] = useState(getLocalStorageItems());
  let [item,setItem] = useState("");

  function taskExecuting(e){
    // console.log(e.target.value);
    setItem(e.target.value);
    setItem = "";
  }

  function addTask(){
    setTaskArr([...taskArr,{task:item,id:uuidv4()}]);
    setItem("");
  }

  function handleKeyDown(e){
    if(e.key==='Enter'){
      addTask();
    }
  }

  useEffect(()=>{
    localStorage.setItem('arr',JSON.stringify(taskArr));
  },[taskArr]);

  function transformation(e){
    let tag = e.target.parentElement.parentElement.parentElement;
    // console.log(tag);
    tag.classList.toggle('lineThrough');
  }

  function removeItem(e){
    let tag = e.target.parentElement.parentElement.parentElement;
    // console.log(tag);
    let localItem = tag.getAttribute("id");
    // console.log(localItem);
    let data = JSON.parse(localStorage.getItem('arr'));
    // console.log(data);
    let foundObj = data.filter((obj)=>obj.id !== localItem);
    localStorage.setItem('arr', JSON.stringify(foundObj));
    // console.log(data);
    setTaskArr(foundObj);
  }

  return (
    <>
      <div className="home">
        <div>
        <h1>To-do List</h1>
          <div className="head">
            <input type='text' placeholder='Enter the Task to add' name='task' className='inpBox' value={item} onChange={taskExecuting} onKeyDown={handleKeyDown}/>
            <button className='btn' onClick={addTask}>Add Task</button>
          </div>
          <hr></hr>
          </div>
          <ul>
            {
              taskArr.map((obj)=>{
                return(
                  <li id={obj.id} key={obj.id} className='listItem'>
                    <span className='parentSpan'>{obj.task}</span>
                    <span className='spanTag'><span><i className="fa-regular fa-square-check" onClick={transformation}></i></span><span><i className="fa-solid fa-trash-can" onClick={removeItem}></i></span></span>
                  </li>
                )
              })
            }
          </ul>
      </div>
    </>
  )
}

export default Home