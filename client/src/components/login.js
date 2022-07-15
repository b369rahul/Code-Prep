const Login=()=>{
    const url = `http://localhost:5000/auth/Login`;
    return (
    <button onClick={window.location.assign(url)}>Login</button>
    )
}
export default Login