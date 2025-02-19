import React, { useState } from 'react';
import '../scss/Login.scss';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const serverURL = process.env.REACT_APP_SERVER_URL
const serverApiKey = process.env.REACT_APP_API_KEY

const Login = ({ setUser }) => {
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e, doc, pass) => {
        setLoading(true);
        if (e) e.preventDefault();
        setMensaje('');
    
        const loginData = { usuario: doc, contrasena: pass, api_key: serverApiKey };
    
        try {
            const response = await fetch(`${serverURL}/check_student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
    
            const data = await response.json();
    
            if (data.usuario) {
                setUser(data);
                localStorage.setItem('usuario', data.usuario);
                localStorage.setItem('contraseña', data.contrasena);
                navigate("/");
            } else {
                setMensaje("Datos incorrectos.");
            }
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
            setMensaje("Error en la conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className={`login-form ${loading ? 'login-form-loading' : ''}`} onSubmit={(e) => handleLogin(e, document, password)}>

                {
                    !loading ? (
                        <>
                            <img src={require('../img/big-logo.webp')} alt="" />
                            <h2 className="login-title">Iniciar Sesión</h2>
                            <input
                                type="text"
                                id="document"
                                value={document}
                                onChange={(e) => setDocument(e.target.value)}
                                placeholder="Documento"
                            />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                            />
                            <p id='forgot-password'>¿Olvidó su contraseña?</p>
                            <button type="submit" className="login-button">Ingresar</button>
                            <p id="error">{mensaje}</p>
                        </>
                    ) : (<Loading />)
                }

            </form>
        </div>
    );
};

export default Login;
