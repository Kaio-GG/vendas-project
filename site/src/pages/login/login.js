import { useState } from 'react';
import './index.scss';





export default function Login(){
    const [mostrarLogin, setMostrarLogin] = useState(true);


    function loginCadastrar(modo){
        if (mostrarLogin === true && modo === '') {
            setMostrarLogin(false)
        }else if(mostrarLogin === false && modo === ''){
            setMostrarLogin(true)
        }else if (mostrarLogin === false && modo === 'login') {
            setMostrarLogin(true)
        }else if(mostrarLogin === true && modo === 'login'){
            console.log('enviou info')
        }
    }



    return(
        <main className='pg-login'>

                <div class="form">
                    {mostrarLogin === true ?
                        <p id="heading">Login</p>
                        :<p id="heading">Cadastar</p>
                    }

                    <div class="field">
                        <img src='/assets/image/arroba.svg' className='input-icon' alt=''/>
                        <input autocomplete="off" placeholder="Username" class="input-field" type="text"/>
                    </div>
                    {mostrarLogin === false &&
                        <div class="field">
                            <img src='/assets/image/email.svg' className='input-icon' alt=''/>
                            <input placeholder="Email" class="input-field" type="text"/>
                        </div>
                    }
                    <div class="field">
                        <img src='/assets/image/cadiado.svg' className='input-icon' alt=''/>
                        <input placeholder="Password" class="input-field" type="password"/>
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