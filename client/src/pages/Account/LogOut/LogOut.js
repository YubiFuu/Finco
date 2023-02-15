import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LogOut = ({ setToken }) => {
    useEffect(() => {
        setToken(null);
    }, []);
    return <Navigate to="/login" />;
};

export default LogOut;
