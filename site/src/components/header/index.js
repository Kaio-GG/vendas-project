import './index.scss';
import storage from 'local-storage';





export default function Header(){
    const nome = String(storage('usuario').nome).toUpperCase()


    return(
        <main className='cp-header'>
            <h2>
                {nome}
            </h2>
            <img src='/assets/image/menu.svg' alt='' />
        </main>
    )
}