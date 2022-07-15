import 'bootstrap/dist/css/bootstrap.min.css';
//import Popper from 'popper.js';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';  // navbar not collapsing on using this module
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./stylesheets/index.css";
import Landing from "./components/Landing"
import Questions from "./components/Questions"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyQuestions from "./components/myQues"
import Login from "./components/login"
import Add from "./components/add"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function App() {


  const [questions, setQuestions]=useState([]);

  let navigate = useNavigate();
  const [User, setUser]= useState({
    name:'Curious',
    isLogedIn:false,
    posts:[]
  });
  const [postLength,setPostLength]=useState(0)


  useEffect(()=>{
    const url = 'http://localhost:5000/server/questions';
      axios.get(url).then((res)=>{
          //console.log(res)
          return res.data
      }).then(res=>{
          //console.log(res)
          setQuestions(res)
      }).catch(err=>console.log(err))
  },[postLength])

  const Addmine=(q)=>{
    console.log(q)
    console.log("USER adsafsaasfas",User)
    if(!User.isLogedIn){
      console.log("Adsdsa")
      alert('YOU NEED TO LOGIN')
    }
    else{
        const url = 'http://localhost:5000/server/questions/addmine';
        axios.post(url,({
          withCredentials: true,
          data:{
              ques:q,
              id:User._id
          }
        })).then((res)=>{
          console.log("idadajn",res)
          setPostLength(postLength+1)
        }).catch(err=>console.log("adasdasd",err))
      }
  }
  const addAll = ({link,desc,tag})=>{
    //console.log("adddmine",link,desc)
    if(!User.isLogedIn){
      console.log("Adsdsa")
      alert('YOU NEED TO LOGIN')
    } 
    else{
        const url = 'http://localhost:5000/server/questions/addAll';
        axios.post(url,({
          withCredentials: true,
          data:{
              link:link,
              desc:desc,
              id:User._id,
              tag:tag
          }
        })).then((res)=>{
          if(res.data === '!'){
            alert('Already Exists')
          }
          else{
            setPostLength(postLength+1)
            navigate('/posts')
          }
        }).catch(err=>console.log("error: ",err))
   }
}
  const deletemine =(q)=>{
    if(!User.isLogedIn){
      //console.log("Adsdsa")
      alert('YOU NEED TO LOGIN')
    }
    else{
      const url = 'http://localhost:5000/server/questions/deletemine';
      axios.delete(url,({
        data:{
            ques:q,
            id:User._id
        }
      })).then((res)=>{
        setPostLength(postLength-1)
      }).catch(err=>console.log(err))
    }
  }


    useEffect(()=>{   
        console.log("asdasdas")
        const url = 'http://localhost:5000/auth/fetch';
        axios.get(url, {withCredentials: true}).then((res)=>{
            console.log("asdasaaaaaaaaaaadada",res)
            return res.data
        }).then(res=>{
            console.log(res)
            if(res.name!=="GUEST"){
              res={...res,isLogedIn:true}
              setUser(res);
            }
        }).catch(err=>console.log(err))
    },[postLength])

    const [searchParam, setSearch]=useState('');
    const searchPost=(val)=>{
        setSearch(val)
    }
  return (
        <div className="App">
          <Navbar isLogedIn={User.isLogedIn} searchPost={searchPost}/>
        <Routes>
          <Route path="/"  element={<Landing user={User.name}/>} />
          <Route path="/add"  element={<Add isLogedIn={User.isLogedIn} addAll={addAll}/>} />

          <Route path="/posts"  element={<Questions Addmine={Addmine} questions={questions} searchParam={searchParam}/>} />
          <Route path="/myposts"  element={<MyQuestions posts={User.posts} isLogedIn={User.isLogedIn} deletemine={deletemine} searchParam={searchParam}/>} />
          <Route path="/login" element={<Login></Login>}></Route>              
        </Routes>  
      </div>
  );
}

export default App;
