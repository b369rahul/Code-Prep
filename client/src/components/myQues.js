import Quest from "./quest"
const deletemine=()=>{

}
const func =({posts, isLogedIn,deletemine,searchParam})=>{
    console.log(posts,"dass",isLogedIn)
    return(
    <div className="posts-list">
      <h1 id="title">
      {!isLogedIn?'You Need to Login to view your Questions': "MY Questions"} <span className="full-stop">.</span>
      </h1>
      <br></br>
      <ul>
      {
        isLogedIn &&  posts.filter((val)=>{
          if(searchParam=='')return val;
          else if(val.desc.toLowerCase().includes(searchParam.toLowerCase()) || val.link.toLowerCase().includes(searchParam.toLowerCase()) || val.user.toLowerCase().includes(searchParam.toLowerCase()) || val.tag.toLowerCase().includes(searchParam.toLowerCase()))return val;
          }).map((q,id)=>{
            return (<li key={id} className="d-flex ">
            <a href={q.link} className="text-wrap">{q.desc} </a>
            <p className="ms-auto m-2 fs-5 fst-italic text-end" >{q.user}</p>
            <button  onClick={()=>deletemine(q)} className="m-2">Delete</button>
            </li>)
          })
      }
      </ul>
    </div>
)}
export default func