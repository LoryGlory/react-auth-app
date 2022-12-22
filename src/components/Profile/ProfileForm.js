import {useRef, useContext} from "react";

import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    // maybe: add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAG7y-kKvDaGz5Maq_1y68N80DQYkG2DPI',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          //assumption: always successful

    })
  };

  return (
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' ref={newPasswordInputRef} minLength='7'/>
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
  );
}

export default ProfileForm;
