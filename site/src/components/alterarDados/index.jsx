import './index.scss';
import React, { useEffect, useState } from "react";
import storage from 'local-storage';
import { AlterarDadosApi } from '../../api/usuarioApi.js';
import { toast } from 'react-toastify';

export default function AlterarDados({ aoFechar }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    async function alterar() {
        try {
            let r = await AlterarDadosApi(nome, email, id);
            toast(r.data);
            aoFechar(); // Fecha o modal após salvar
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const usuario = storage('usuario');
        setNome(String(usuario.nome));
        setEmail(String(usuario.email));
        setId(String(usuario.id));
    }, []);

    return (
        <main className="alterardadospg">
            <div className="caixa">
                <h2>ALTERAR DADOS</h2>
                <div className='org-inputs-alterar'>
                    <p>Nome:</p>
                    <input value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className='org-inputs-alterar'>
                    <p>Email:</p>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                
                <div className='btnsalterar'>
                    <button onClick={alterar}>Salvar</button>
                    <button onClick={aoFechar}>Cancelar</button>
                </div>
            </div>
        </main>
    );
}
