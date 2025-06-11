import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRequireLogin(allowedRole) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
    const gebruikerId = localStorage.getItem("gebruiker_id");
    const userRole = localStorage.getItem("rol");

    if (!gebruikerId || !userRole) {
      alert("Je moet ingelogd zijn om deze pagina te bekijken.");
      navigate("/login");
      localStorage.clear();
      return;
    }

    if ( userRole != allowedRole) {
      alert("Je hebt geen toegang tot deze pagina.");
      navigate("/login");
      localStorage.clear();
    }}, 200); // short delay

  return () => clearTimeout(timer);
  }, [navigate, allowedRole]);
}

export default useRequireLogin;