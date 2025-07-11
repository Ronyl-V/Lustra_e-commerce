"use client";
import { useRouter } from "next/navigation";
import { SunIcon as Sunburst } from "lucide-react";
import { useState } from "react";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Connected Successfully!");
        router.push("/dashboard");
      } else {
        alert("Incorrect email or password.");
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("Erreur lors de la connexion: " + err.message);
      } else {
        alert("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-white mt-[-50px] flex justify-center items-center gap-4 px-4">
      <div className="w-[100vh] bg-white flex flex-col justify-center border border-gray-200 rounded-xl p-6 shadow-md">
        <div className="flex flex-col items-left mb-8">
          <div className="text-red-500 mb-4">
            <Sunburst className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-medium mb-2 tracking-tight">Get Started</h2>
          <p className="text-left opacity-80">Welcome to Lustra — {"Let\u2019s get started!"}</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block text-sm mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Admin's email"
              className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && (
              <p id="email-error" className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Admin's password"
              className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!passwordError}
              aria-describedby="password-error"
            />
            {passwordError && (
              <p id="password-error" className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-400 hover:bg-red-500 cursor-pointer text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Connect
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;