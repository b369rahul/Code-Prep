import { useEffect, useState } from "react";
const Add = ({addAll}) => {
    const [link,setlink]=useState('');
    const [desc, setdesc]=useState('');
    const [tag, settag]=useState('');
    const [onlyme, setOnlyme]=useState(false);
    const linkChange=(e)=>{
        setlink(e.target.value);
    }
    const descChange=(e)=>{
        //console.log(e.target.value)
        setdesc(e.target.value);
    }
    const tagChange=(e)=>{
        //console.log(e.target.value)
        settag(e.target.value);
    }
    const choice = (e)=>{
        //console.log(e.target.checked);
        setOnlyme(e.target.checked)        
    }
    const handle=(e)=>{
        e.preventDefault();    
        addAll({link,desc,tag})
        //console.log(link,desc,tags);
    }
    return (
        <form>
            {/* <div> */}
            <div class="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Question Link</label>
                <input type="url" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={linkChange}/>
            </div>
            <div class="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                <input type="text" class="form-control" id="exampleInputPassword1" onChange={descChange}/>
            </div>
            <div class="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" class="form-control" id="tags" onChange={tagChange}/>
            </div>
            {/* <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={choice} />
                    <label class="form-check-label" for="exampleCheck1">Add to mine only</label>
            </div> */}
            <button type="submit" className="btn btn-primary" onClick={handle}>Submit</button>
            {/* </div> */}
            </form>
    )
}
export default Add;