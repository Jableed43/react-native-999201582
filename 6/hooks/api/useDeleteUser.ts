import { useCallback, useState } from "react";
import { deleteUser } from "../../services/api";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeUser = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteUser(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar usuario");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { removeUser, loading, error };
};
