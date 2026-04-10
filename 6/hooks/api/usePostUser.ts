import { useState } from "react";
import { createUser, CreateUserData } from "../../services/api";

export const usePostUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveUser = async (userData: CreateUserData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await createUser(userData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear usuario");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { saveUser, loading, error, success };
};
