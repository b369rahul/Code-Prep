import { useEffect, useState } from "react";
import Quest from "./quest"
import axios from "axios";
const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";
const Questions =({Addmine, questions, searchParam})=>{

  return (
    <div className="posts-list">
      <h1 id="title">
        Latest Questions<span className="full-stop">.</span>
      </h1>
      <br></br>
      <ul>
      {
        questions.filter((val)=>{
            if(searchParam=='')return val;
            else if(val.desc.toLowerCase().includes(searchParam.toLowerCase()) || val.link.toLowerCase().includes(searchParam.toLowerCase()) || val.user.toLowerCase().includes(searchParam.toLowerCase()) || val.tag.toLowerCase().includes(searchParam.toLowerCase()))return val;
        }).map((q,id)=>{
          return (<li key={id} className="d-flex ">
          <a href={q.link} className="text-wrap">{q.desc} </a>
          <p className="ms-auto m-2 fs-5 fst-italic text-end" >{q.user}</p>
          <button  onClick={()=>Addmine(q)} className="m-2">ADD</button>
          </li>)
        })
      }
      </ul>
    </div>
  )
}
export default Questions;

//style ={{right:100, position:'absolute'}}