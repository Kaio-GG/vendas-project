import './index.scss';
import Navegacao from '../../components/navegacao/index.js'
import Header from '../../components/header/index.js';
import { useEffect, useState } from 'react';




export default function Analise(){
    const [data, setData] = useState('')




    useEffect(()=>{
        setData( new Date().toISOString().split('T')[0])
    },[])
    return(
        <main className='pg-Analise'>
            <section className='header'>
                <Header/>
            </section>
            <section className='meio'>
                <Navegacao/>
                <div className='fundo'>
                    
                    <div className='formulario'>
                        <div className='linha-nome'>
                            <div className='linha-vertical'></div>
                            <h2>Nova venda</h2>
                        </div>
                        <div className='inputs'>
                            <input type="text" name="text" class="input" placeholder="Qual venda foi feita"/>
                            <input type="text" name="text" class="input" placeholder="Valor da venda"/>
                            <input type="text" name="text" class="input" placeholder="Quantidade de vendas"/>
                        </div>
                        <div className='textos'>
                            <textarea type="" name="text" class="input" placeholder="O que é esse produto ou serviço"/>
                            <textarea type="text" name="text" class="input" placeholder="explicação especifica dessa venda(não obrigatorio)"/>
                            <div className='org-div-textarea'>
                                <input type="text" name="text" class="input" placeholder="Desconto em %"/>
                                <input type="date" name="text" class="input" placeholder="Data da venda"  value={data} onChange={e => setData(e.target.value)}/>
                            </div>
                        </div>
                        <div className='botao-salvar'>
                            <button class="button"> Salvar </button>
                        </div>
                    </div>
                        
                    </div>
                
                
            </section>

        </main>
    )
}