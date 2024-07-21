import { LoginView } from "./LoginView";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "@/services";

export const Login = () => {
	const navigate = useNavigate();
  const { data, error, isLoading, fetchData } = useLogin();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);

    fetchData(form);
  };

  useEffect(() => {
		if (data && data.success) {
			navigate("/admin/settings");
		}
  }, [data]);

  return (
    <LoginView
      handleChange={handleChange}
      handleSubmit={handleSubmit}
			data={data}
      error={error}
      isLoading={isLoading}
    />
  );
};
