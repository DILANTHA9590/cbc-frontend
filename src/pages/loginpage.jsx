
import "./loginpage.css"


export default function Loginpage() {


    return (


        <div className="login-container">
            <h2>Login</h2>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="button">Login</button>
            <a href="#">Forgot Password?</a>
        </div>





    )

}