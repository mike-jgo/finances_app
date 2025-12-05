import { Field, Input } from "@headlessui/react"
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token);
                navigate('/app');
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }
    };
    return (
        <form className="flex flex-col h-full p-4 gap-4 justify-between" onSubmit={handleLogin}>
            <div className="flex flex-col w-full h-[90%] gap-4">
                <div className="flex justify-center items-center">
                    <h1>Login</h1>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Field className="flex flex-col w-full">
                    <label>Enter email</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                </Field>
                <Field className="flex flex-col w-full">
                    <label>Enter password</label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                </Field>
            </div>
            <button type="submit" className="w-full bg-[#adc9d4] h-[10%] rounded-lg">Login</button>
        </form>
    )
}

export default LoginForm