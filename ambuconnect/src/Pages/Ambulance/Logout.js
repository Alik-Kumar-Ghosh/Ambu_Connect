import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/auth';
import logoutimg from '../../Assets/undraw_login_re_4vu2.svg'

const Logout= () => {

    const navigate = useNavigate();

    async function logoutfunc() {
        const promise = account.deleteSessions();

        promise.then(function (response) {
            console.log(response); // Success
            navigate("/")
        }, function (error) {
            console.log(error); // Failure
            navigate("/")
        });
      }
    
  
  return (
    <div style={{"text-align":"center", "display":"block", "margin":"10px"}}>
      <img src={logoutimg} alt='logout img'/>
      <button style={{"margin-left":"45%"}} className="secondary-button"  onClick={logoutfunc}>logout</button>
    </div>
  )
}

export default memo(Logout)