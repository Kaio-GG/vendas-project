import './index.scss';
import React, { useState } from 'react';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';
import AlterarDados from '../alterarDados/index.jsx';

export default function Header() {
    const nome = String(storage('usuario').nome).toUpperCase();
    const navigate = useNavigate();
    const [mostrarAlterarDados, setMostrarAlterarDados] = useState(false);

    function sair() {
        storage.remove('usuario');
        navigate('/');
    }

    function alternarAlterarDados() {
        setMostrarAlterarDados(!mostrarAlterarDados);
    }

    function abrirAlterarDados() {
        setMostrarAlterarDados(true);
    }

    return (
        <main className='cp-header'>
            <h2 onClick={abrirAlterarDados}>
                {nome}
            </h2>
            <div className='org'>
                {mostrarAlterarDados && <AlterarDados aoFechar={alternarAlterarDados} />}
            </div>
            <img onClick={sair} src='/assets/image/logosair.svg' alt='' />
        </main>
    );
}
