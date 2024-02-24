import Header from '../../components/header';
import Navegacao from '../../components/navegacao';
import './index.scss';






export default function NovoProduto(){
    return(
        <main className='pg-novoProduto'>
             <section className='header'>
                <Header/>
            </section>
            <section className='meio'>
                <Navegacao/>
                <div className='fundo'>

                    <div className='formulario'>
                        <div className='linha-nome'>
                            <div className='linha-vertical'></div>
                            <h2>Novo produto</h2>
                        </div>
                        <div className='inputs'>
                            <input type="text" name="text" class="input" placeholder="Nome do produto"/>
                            <input type="text" name="text" class="input" placeholder="Valor do produto"/>
                            <input type="text" name="text" class="input" placeholder="Quantidade de vendas por vez"/>
                        </div>
                        <div className='textos'>
                            <textarea type="" name="text" class="input" placeholder="O que é esse produto ou serviço"/>
                            <input type="text" name="text" class="input" placeholder="valor de gasto para a produção"/>
                        </div>
                        <div className='botao-salvar'>
                            <h4>Valor liquido recebido por venda: R$ 50,00</h4>
                            <button class="button"> Salvar </button>
                        </div>
                        </div>
                    </div>
            </section>
        </main>
    )
}