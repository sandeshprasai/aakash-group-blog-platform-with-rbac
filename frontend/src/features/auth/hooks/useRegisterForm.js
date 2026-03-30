import { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatpassword: "",
};

const useRegisterForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    
    if (!form.username.trim()) newErrors.username = "Username is required";

    
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6 || form.password.length > 20)
      newErrors.password = "Password must be 6-20 characters";

    
    if (!form.repeatpassword) newErrors.repeatpassword = "Confirm your password";
    else if (form.repeatpassword !== form.password)
      newErrors.repeatpassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return { form, errors, handleChange, validate, setForm };
};

export default useRegisterForm;