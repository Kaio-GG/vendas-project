import './index.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';


export default function Confirmar( {aparecer ,onClose ,onConfirm }){
    if(!aparecer) return null;
    
    return(
        <main className='confirmar'>
            <div className='caixa'>
                <h2>Confirmar exclusão</h2>
                <p>Deseja confirmar a exclusão</p>
                <div className='btns'>
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Recusar</button>
                </div>
            </div>
        </main>
    )
}