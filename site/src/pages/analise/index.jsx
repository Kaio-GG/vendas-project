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
                                {direcao === 'historico' 
                                    ?<button className='apertado' onClick={()=> setDirecao('historico')}>Historico</button>
                                    :<button onClick={()=> setDirecao('historico')}>Historico</button>
                                }
                                {direcao === 'lucro30dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('lucro30dias')}>Lucro no ultimos 30 dias</button>
                                    :<button onClick={() => setDirecao('lucro30dias')}>Lucro no ultimos 30 dias</button>
                                }
                                {direcao === 'lucro360dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('lucro360dias')}>Lucro no ultimos 360 dias</button>
                                    :<button onClick={() => setDirecao('lucro360dias')}>Lucro no ultimos 360 dias</button>
                                }
                                {direcao === 'gasto30dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('gasto30dias')}>Gasto no ultimos 30 dias</button>
                                    :<button onClick={() => setDirecao('gasto30dias')}>Gasto no ultimos 30 dias</button>
                                }
                                {direcao === 'gasto360dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('gasto360dias')}>Gasto no ultimos 360 dias</button>
                                    :<button onClick={() => setDirecao('gasto360dias')}>Gasto no ultimos 360 dias</button>
                                }
                                
                            </div>
                            <div className='btns'>
                                {direcao === 'valor360dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('valor360dias')}>Valor total nos ultimos 360 dias</button>
                                    :<button onClick={() => setDirecao('valor360dias')}>Valor total nos ultimos 360 dias</button>
                                }
                                {direcao === 'valor30dias'  
                                    ?<button className='apertado' onClick={() => setDirecao('valor30dias')}>Valor total nos ultimos 30 dias</button>
                                    :<button onClick={() => setDirecao('valor30dias')}>Valor total nos ultimos 30 dias</button>
                                }
                                {direcao === 'maisvendido'
                                        ?<button className='apertado' onClick={() => setDirecao('maisvendido')}>Mais Vendidos</button>
                                        :<button onClick={() => setDirecao('maisvendido')}>Mais Vendidos</button>     
                                }
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