import './index.scss';
import { useState } from 'react';
import {login, cadastrar } from '../../api/usuarioApi.js'
import storage from 'local-storage';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const [email, setEmail]= useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const Navigate = useNavigate();


    async function loginCadastrar(modo){

        if (mostrarLogin === true && modo === '') {
            setMostrarLogin(false);
        }else if(mostrarLogin === false && modo === ''){
            setMostrarLogin(true);
            if(!email || !senha || !nome)
            return
            const r = await cadastrar(nome, email, senha);
            toast.dark('Cadastrado')
        }else if (mostrarLogin === false && modo === 'login') {
            setMostrarLogin(true);
        }else if(mostrarLogin === true && modo === 'login'){
        if(!email || !senha)
            return
            const r = await login(email, senha);
        if(r.status === 202){
                toast.error('Usuario ou senha incorretos')
                return
         }
            storage('usuario', r.data);
            const id = storage('usuario').id
            Navigate(`/novo/venda/1/${id}`)
        }   
    }



    return(
        <main className='pg-login'>

                <div class="form">
                    {mostrarLogin === true ?
                        <p id="heading">Login</p>
                        :<p id="heading">Cadastar</p>
                    }
                    {mostrarLogin === false &&
                        <div class="field">
                            <img src='/assets/image/arroba.svg' className='input-icon' alt=''/>
                            <input autocomplete="off" placeholder="Username" class="input-field" type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                        </div>
                    }
                    <div class="field">
                        <img src='/assets/image/email.svg' className='input-icon' alt=''/>
                        <input placeholder="Email" class="input-field" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    
                    <div class="field">
                        <img src='/assets/image/cadiado.svg' className='input-icon' alt=''/>
                        <input placeholder="Password" class="input-field" type="password" value={senha} onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <div class="btn">
                        <button class="button1" onClick={() => loginCadastrar('login')}>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        <button class="button2" onClick={() => loginCadastrar('')} >Sign Up</button>
                    </div>
                <button class="button3">Forgot Password</button>
        </div>
        </main>
    )
}