import React, { useEffect, useState } from "react";
import { Toast } from "../../../app/components/Toast";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        // Mostrar el Toast si viene de un inicio de sesión exitoso
        if (location.state?.fromLogin) {
            setShowSuccessToast(true);
        }
    }, [location.state]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
            {showSuccessToast && (
                <Toast
                    message="Login successful!"
                    type="success"
                    onClose={() => setShowSuccessToast(false)}
                />
            )}
        </div>
    );
}