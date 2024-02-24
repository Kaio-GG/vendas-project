import './index.scss';
import Header from '../../components/header';
import Navegacao from '../../components/navegacao';



export default function Produto(){

    return(
        <main className='pg-produto'>
            <section className='header'>
                <Header/>
            </section>
            <section className='meio'>
                <Navegacao/>
                <div className='fundo'>
                    <div className='formulario'>
                        <div className='linha-nome'>
                            <div className='linha-vertical'></div>
                            <h2>Produtos</h2>
                        </div>
                    <div className='org-produtos'>
                        <div class="card">
                            <div class="card-info">
                                <div className='card-header'>    
                                    <h4>
                                        Nome do produto
                                    </h4>
                                </div>
                                <div className='card-valores'>
                                    <p>R$: 20,00</p>
                                    <p>Lucro: 10,00</p>
                                </div>
                                <div className='card-btn'>
                                    <button>
                                       Alterar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </main>
    )
}