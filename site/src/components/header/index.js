import './index.scss';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';




export default function Header(){
    const nome = String(storage('usuario').nome).toUpperCase()
    const Navigate = useNavigate('')

    function sair (){
        storage.remove('usuario')
        Navigate('/')
    }

    return(
        <main className='cp-header'>
            <h2>
                {nome}
            </h2>
            <img onClick={sair} src='/assets/image/logosair.svg' alt='' />
        </main>
    )
}