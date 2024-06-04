import { useState } from "react";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {

    const [token, setToken] = useState<ConfirmToken['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
            {!isValidToken ? (
                <p className="text-2xl font-light text-white mt-5">
                    Ingresa el código que recibiste {''}
                    <span className=" text-fuchsia-500 font-bold"> por email</span>
                </p>
            ) : (
                <p className="text-2xl font-light text-white mt-5">
                    Ingresa tu {''}
                    <span className=" text-fuchsia-500 font-bold"> nueva contraseña</span>
                </p>
            )}

            {!isValidToken ?
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                /> :
                <NewPasswordForm
                    token={token}
                />}
        </>
    );
}
