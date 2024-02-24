import './index.scss';
import Header from '../../components/header';
import Navegacao from '../../components/navegacao';
import MaisVendido from '../../components/mais-vendidos';


export default function Analise(){


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
                                <button>Lucro no ultimos 30 dias</button>
                                <button>lucro no ultimos 360 dias</button>
                                <button>Gasto de produção no ultimos 30 dias</button>
                                <button>Gasto de produção no ultimos 360 dias</button>
                            </div>
                            <div className='btns'>
                                <button>Historico</button>
                            </div>
                            <div className='org-info'>
                                <MaisVendido/>
                            </div>
                        </div>

                </div>
                </div>
            </section>
        </main>
    )
}