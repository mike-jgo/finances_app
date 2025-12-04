import { Field, Input } from "@headlessui/react"
import { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! Please login.");
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <form className="flex flex-col h-full p-4 gap-4 justify-between" onSubmit={handleRegister}>
            <div className="flex flex-col gap-4 w-full h-[90%]">
                <div className="flex justify-center items-center">
                    <h1>Register</h1>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                <div className="w-full flex gap-4">
                    <Field className="flex flex-col w-1/2 h-full gap-2">
                        <label>Enter first name</label>
                        <Input name="firstname" value={formData.firstname} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                    </Field>
                    <Field className="flex flex-col w-1/2 h-full gap-2">
                        <label>Enter last name</label>
                        <Input name="lastname" value={formData.lastname} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                    </Field>
                </div>
                <Field className="flex flex-col w-full">
                    <label>Enter email</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                </Field>
                <Field className="flex flex-col w-full">
                    <label>Enter password</label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                </Field>
                <Field className="flex flex-col w-full">
                    <label>Confirm password</label>
                    <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="border border-[#646464] rounded-sm hover:border hover:border-white hover:transition duration-300 ease-in-out grow" />
                </Field>
            </div>
            <button type="submit" className="w-full bg-[#adc9d4] h-[10%] rounded-lg">Register</button>
        </form>
    )
}

export default RegistrationForm