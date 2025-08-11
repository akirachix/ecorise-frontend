import { useState } from "react";
import { signupUser } from "../utils/signupUser"; 

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = async (userData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await signupUser(userData);
      setSuccess("User registered successfully!");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
}