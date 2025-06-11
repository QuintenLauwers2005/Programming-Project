import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRequireLogin(allowedRole) {
  const navigate = useNavigate();

  useEffect(() => {
    const gebruikerId = localStorage.getItem("gebruiker_id");
    const userRole = localStorage.getItem("role");

    if (!gebruikerId || !userRole) {
      alert("Je moet ingelogd zijn om deze pagina te bekijken.");
      navigate("/login");
      return;
    }

    if ( userRole != allowedRole) {
      alert("Je hebt geen toegang tot deze pagina.");
      navigate("/login");
      localStorage.clear();
    }
  }, [navigate, allowedRole]);
}

export default useRequireLogin;