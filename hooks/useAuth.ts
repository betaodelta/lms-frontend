import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const { user, setUser, setLoading, loading } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUser(data.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { user, loading };
};
