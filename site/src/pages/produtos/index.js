import './index.scss';
import Header from '../../components/header/index.js';
import Navegacao from '../../components/navegacao/index.js';
import { useParams, useNavigate } from 'react-router-dom';
import { carregarProdutoApi } from '../../api/produto.js';
import { useEffect, useState } from 'react';


export default function Produto(){
    const [produto, setProduto] = useState([]);

    const {id} = useParams()
    const Navigate = useNavigate();
    async function carregarProduto(){
        const r = await carregarProdutoApi(id)
        setProduto(r);
    }
    
    useEffect( () =>{
         carregarProduto()
    },[])
    
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
                        {Array.isArray(produto) && produto.length > 0 ? produto.map((prod) =>(
                    
                        <div class="card">
                            <div class="card-info">
                                <div className='card-header'>    
                                    <h4>
                                        {prod.nome}
                                    </h4>
                                </div>
                                <div className='card-valores'>
                                    <p>Valor: {prod.valor} R$</p>
                                    <p>Lucro: {prod.liquido} R$</p>
                                </div>
                                <div className='card-btn'>
                                    <button onClick={()=> Navigate(`/produto/2/${id}/${prod.id}`)}>
                                       Alterar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )):
                        <div className='divimg'>
                            <img className='imgNotFound' src='/assets/image/notFound.svg' alt='' />

                        </div>
                    
                    }

                    </div>
                </div>
                </div>
            </section>
        </main>
    )
}