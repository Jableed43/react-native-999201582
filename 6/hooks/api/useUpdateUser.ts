import { useCallback, useState } from "react";
import { updateUser, CreateUserData } from "../../services/api";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = useCallback(async (id: number, userData: Partial<CreateUserData>) => {
    try {
      setLoading(true);
      setError(null);
      await updateUser(id, userData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar usuario");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { editUser, loading, error };
};
