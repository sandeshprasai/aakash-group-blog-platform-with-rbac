import { useState } from "react";

const initialState = {
  title: "",
  body: "",
};

const useCreatePost = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.body.trim()) {
      newErrors.body = "Blog content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return { form, errors, handleChange, validate, setForm };
};

export default useCreatePost;