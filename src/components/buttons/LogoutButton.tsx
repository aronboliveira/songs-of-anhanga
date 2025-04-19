"use client";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
export default function LogoutButton(): JSX.Element {
  const logout = async () => {
    try {
      const res = await fetch(`/api/auth/isLoggedIn`, { method: "POST" });
      if (!res.status.toString().startsWith("2"))
        throw new Error(`Unsuccessful fetch`);
      Swal.fire({ title: `Successfully logged out` });
    } catch (e) {
      toast.error(`There was some error logging out. Try again later.`);
      console.error(`Error : ${(e as Error).name} — ${(e as Error).message}`);
    }
    sessionStorage.setItem("isLoggedIn", "false");
  };
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true");
  }, []);
  return (
    <button onClick={logout} className="nav-button">
      Logout
    </button>
  );
}
