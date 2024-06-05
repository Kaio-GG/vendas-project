import './index.scss';
import Header from '../../components/header/index.js';
import Navegacao from '../../components/navegacao/index.js';
import Confirmar from '../../components/confirmarExclusao/index.jsx';
import { useEffect, useState } from 'react';
import { criarProduto, alterarProduto, carregarProdutoApi, deletarProdutoApi } from '../../api/produto.js';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'


export default function NovoProduto(){
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [liquido, setLiquido] = useState('');
    const [gasto, setGasto] = useState('');
    const [confirmado, setConfirmado] = useState(null)
    const [progress, setProgress]= useState(0)

    const {id} = useParams()
    const {produtoid} = useParams()
    const Navigate = useNavigate('')
    async function cadastrarProduto(){
        try {
            if(!id || !nome || !Number(valor) || !Number(liquido) || !descricao || Number(gasto) < 0 ){
                toast.error("Preercha todos os campos");
                return
            }
            let r = await criarProduto(id , nome , Number(valor) , Number(gasto) , Number(liquido), descricao);
            toast(r.data)
            setProgress(100)
            setTimeout(() => {
                Navigate(`/novo/venda/1/${id}`)            
            }, 900);
        } catch (err) {
            console.log(err)
        }
    }
    async function salvarAlteracao(){
        try {
            const r = await alterarProduto(produtoid,nome ,Number(valor) , Number(gasto) , Number(liquido),descricao)            
            toast(r)
        } catch (err) {
            console.log(err)
        }
    }
    async function deletarProduto(){
        try {
            const r = await deletarProdutoApi(produtoid);
            toast(r)
            setProgress(100)
            setTimeout(() => {
                Navigate(`/novo/venda/1/${id}`)            
            }, 900);
        } catch (err) {
            console.log(err)
        }
    }

    function formatarDinheiro (valor) {
        
        if (valor !== '') {
            return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        } else {
            return '';
        }
    }
    
    useEffect(()=>{
        setLiquido(Number(valor) - Number(gasto));
    },[valor, gasto])

    useEffect(()=>{
            async function carregarProduto(){
                try { 
                    if (Number(produtoid)  >  0) {
                        const r = await carregarProdutoApi(id)
                        for (let i = 0; i < r.length; i++) {
                            if(r[i].id === Number(produtoid)){
                                console.log(r[i].valor)
                                setValor(r[i].valor)     
                                setNome(r[i].nome)
                                setLiquido(r[i].liquido)
                                setDescricao(r[i].descricao)
                                setGasto(r[i].gasto)
                            }
                            
                        }       
                    }     
                        
                } catch (err) {
                    console.log(err)
                }
            }
        carregarProduto()
    },[produtoid])

    function abriExcluir(){
        setConfirmado(true)
    }
    function fecharExcluir(){
        setConfirmado(null)
    }

    return(
        <main className='pg-novoProduto'>
            <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            />
             <section className='header'>
                <Header/>
            </section>
            <section className='meio'>
                <Navegacao/>
                <div className='fundo'>
                        {produtoid === 'novo' ? 
                        <div className='formulario'>
                            <div className='linha-nome'>
                                <div className='linha-vertical'></div>
                                <h2>Novo produto</h2>
                            </div>
                            <div className='inputs'>
                                <input type="text" className="input" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)}/>
                                <input type="number" step="0.01" name="quantity" min="0.01"  className="input"  placeholder="Valor do produto" value={valor} onChange={e => setValor(Number(e.target.value))} />
                                <input type="number" step="0.01" name="quantity" min="0.01" className="input" placeholder="Valor de gasto para a produção" value={gasto} onChange={e => setGasto(Number(e.target.value))} />
                            </div>
                            <div className='textos'>
                                <textarea type="" name="text" className="input" placeholder="O que é esse produto ou serviço" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                            </div>
                            <div className='botao-salvar'>
                                <h4>Valor líquido recebido por venda: {formatarDinheiro(liquido)}</h4>
                                <button className="button" onClick={()=>cadastrarProduto()}>Salvar</button>
                            </div>
                        </div>
                        :
                         
                        <div className='formulario'>
                            <div className='linha-nome'>
                                <div className='linha-vertical'></div>
                                <h2>Editar produto</h2>
                            </div>
                            <div className='inputs'>
                                <input type="text" className="input" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)}/>
                                <input type="number" step="0.01" name="quantity" min="0.01"  className="input"  placeholder="Valor do produto" value={valor} onChange={e => setValor(Number(e.target.value))} />
                                <input type="number" step="0.01" name="quantity" min="0.01" className="input" placeholder="Valor de gasto para a produção" value={gasto} onChange={e => setGasto(Number(e.target.value))} />
                            </div>
                            <div className='textos'>
                                <textarea type="" name="text" className="input" placeholder="O que é esse produto ou serviço" value={descricao} onChange={e => setDescricao(e.target.value)}/>
                            </div>
                            <div className='botao-salvar'>
                                <h4>Valor líquido recebido por venda: {formatarDinheiro(liquido)}</h4>
                                <div className='div-btns'>
                                    <button className="button" onClick={()=> abriExcluir()}>Deletar</button>
                                    <button className="button" onClick={()=>salvarAlteracao()}>Salvar</button>
                                </div>
                            </div>
                        </div>
                }
                </div>
                <Confirmar
                    aparecer={confirmado}
                    onClose={fecharExcluir}
                    onConfirm={deletarProduto}
                />
            </section>
        </main>
    )
}
