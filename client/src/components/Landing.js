import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Landing = ({user}) => 

{  
    return (
    <div className="jumbotron">
        <h1>Hey  <span className="full-stop">{user}</span> </h1>
        <h2 className="display-4">
            Code The Best
        </h2>
        <main>
            This is a Coding platform for all your Curious needs!
            <br />
            Want to do some awesome questions? We've got you covered!
            <br /> Want to provide some mind bending problems?
            <br /> Rest assured, because we've got you covered once again!
        </main>
        <hr className="my-4 gold-hr" />
        <p>So, click below and dive right in!</p>
        <Link
            className="btn btn-outline-primary btn-lg"
            to="/posts"
            role="button"
        >
           Begin Hunting
        </Link>
    </div>

);
}
export default Landing;