const Quest =({ques,id})=>{
    return(
        <li>
            <a href={ques.link}>{ques.link}</a>
        </li>
    )
}
export default Quest