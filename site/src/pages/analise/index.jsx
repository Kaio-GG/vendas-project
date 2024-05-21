import './index.scss';
import Header from '../../components/header';
import Navegacao from '../../components/navegacao';
import MaisVendido from '../../components/mais-vendidos';
import { useState } from 'react';


export default function Analise(){
    const [direcao, setDirecao] = useState('historico')

    return(

        <main className='pg-analise'>
             <section className='header'>
                <Header/>
            </section>
            <section className='meio'>
                <Navegacao/>
                <div className='fundo'>
                    
                <div className='formulario'>
                        <div className='linha-nome'>
                            <div className='linha-vertical'></div>
                            <h2>Analise</h2>
                        </div>
                        <div className='form'>
                            <div className='btns'>
                                <button>Mais vendidos</button>
                                <button>Dia com mais vendas</button>
                                <button onClick={() => setDirecao('lucro30dias')}>Lucro no ultimos 30 dias</button>
                                <button onClick={() => setDirecao('lucro360dias')}>lucro no ultimos 360 dias</button>
                                <button>Gasto de produção no ultimos 30 dias</button>
                                <button>Gasto de produção no ultimos 360 dias</button>
                            </div>
                            <div className='btns'>
                                <button onClick={()=> setDirecao('historico')}>Historico</button>
                            </div>
                            <div className='org-info'>
                                <MaisVendido fun={direcao}/>
                            </div>
                        </div>

                </div>
                </div>
            </section>
        </main>
    )
}