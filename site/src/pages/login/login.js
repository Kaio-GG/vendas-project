import './index.scss';
import React, { useState } from 'react';
import { login, cadastrar } from '../../api/usuarioApi.js';
import storage from 'local-storage';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { motion } from 'framer-motion';

export default function Login() {
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    async function loginCadastrar(modo) {
        if (mostrarLogin && modo === '') {
            setMostrarLogin(false);
        } else if (!mostrarLogin && modo === '') {
            setMostrarLogin(true);
            if (!email || !senha || !nome) return;
            const r = await cadastrar(nome, email, senha);
            toast.dark('Cadastrado');
        } else if (!mostrarLogin && modo === 'login') {
            setMostrarLogin(true);
        } else if (mostrarLogin && modo === 'login') {
            if (!email || !senha) return;
            const r = await login(email, senha);
            if (r.status === 202) {
                toast.error('Usuario ou senha incorretos');
                return;
            }
            storage('usuario', r.data);
            const id = storage('usuario').id;
            setProgress(100);
            setTimeout(() => {
                navigate(`/novo/venda/1/${id}`);
            }, 900);
        }
    }

    return (
        <main className='pg-login'>
            <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
            
            <div class="container">
                <div class="bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="bubble">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
        </div>
            <div className='ajuste-org'>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='txt-inico'
                >
                    <h1>Bem vindo ao site StockExpert</h1>
                    <h4>Não perca mais tempo com planilhas complicadas e processos manuais. Experimente o StockExpert hoje mesmo e descubra como nossa plataforma pode transformar a maneira como você gerencia suas vendas e produtos.</h4>
                
                </motion.div>
                
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='form'
                >
                    {mostrarLogin ? <p id="heading">Login</p> : <p id="heading">Cadastrar</p>}
                    {!mostrarLogin && (
                        <div className='field'>
                            <img src='/assets/image/arroba.svg' className='input-icon' alt='' />
                            <input autoComplete="off" placeholder="Username" className='input-field' type="text" value={nome} onChange={e => setNome(e.target.value)} />
                        </div>
                    )}
                    <div className='field'>
                        <img src='/assets/image/email.svg' className='input-icon' alt='' />
                        <input placeholder="Email" className='input-field' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='field'>
                        <img src='/assets/image/cadeado.svg' className='input-icon' alt='' />
                        <input placeholder="Password" className='input-field' type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <div className='btn'>
                        <button className='button1' onClick={() => loginCadastrar('login')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        <button className='button2' onClick={() => loginCadastrar('')} >Sign Up</button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
