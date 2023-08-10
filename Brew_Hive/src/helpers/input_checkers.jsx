
export const disableSubmit = (email,password) =>{

    if(email.trim() !== '' && password.trim() !== '' ){
        return false
    }else {
      return true
    }
  }

  export const checkRegisterInputs = (input_helpers) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input_helpers.first_name.trim() === "") {
      alert("Please enter your first name.");
      input_helpers.first_nameRef.current.focus();
      return false;
    } else if (input_helpers.last_name.trim() === "") {
      alert("Please enter your last name.");
      input_helpers.last_nameRef.current.focus();
      return false;
    }else if (input_helpers.city.trim() === "") {
      alert("Please enter your city.");
      input_helpers.cityRef.current.focus();
      return false;
     } else if (input_helpers.username.trim() === "") {
      alert("Please enter a username.");
      input_helpers.usernameRef.current.focus();
      return false;
    } else if (!emailRegex.test(input_helpers.email)) {
      alert("Please enter a valid email");
      input_helpers.emailRef.current.focus();
      return false;
    } else if (input_helpers.hashed_Password.trim() === "") {
      alert("Please enter a password.");
      input_helpers.passwordRef.current.focus();
      return false;
    } else if (input_helpers.confirm_Password.trim() === "") {
      alert("Please confirm your password.");
      input_helpers.confirmPassRef.current.focus();
      return false;
    } else if (input_helpers.hashed_Password !== input_helpers.confirm_Password) {
      alert("passwords do not match!");
      return false;
    }
    return true
  }
