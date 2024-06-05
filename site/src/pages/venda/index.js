import './index.scss';
import Navegacao from '../../components/navegacao/index.js'
import Header from '../../components/header/index.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { carregarProdutoApi } from '../../api/produto.js';
import { novaVenda } from '../../api/vendas.js';
import { toast } from 'react-toastify'


export default function Venda(){
    const [data, setData] = useState('');
    const [produto, setProduto] = useState([]);
    const [valor, setValor] = useState('');
    const [valorOriginal, setValorOriginal] = useState('');
    const [qtd, setQtd] = useState('');
    const [descricao, setDescricao] = useState('');
    const [desconto, setDesconto] = useState('');
    const [pos, setPos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);
   
    const {id} = useParams()

    async function vendaNovo(){
        try {
            let quantidade = 0
            let gastoTotal = 0
            let liquidoTotal = 0
            if(!desconto || !qtd){
                if (!desconto) {
                    setDesconto(0)
                }
            }
            if(qtd <= 0){
                quantidade = 1
            }else{
                quantidade = qtd;
                gastoTotal = produto[pos[0]].gasto * qtd
                liquidoTotal = produto[pos[0]].liquido * qtd
            }
            const r = await novaVenda( id, Number(desconto), data, descricao, quantidade , produto[pos[0]].nome, valor, gastoTotal, liquidoTotal)
            toast(r.data)            
        } catch (err) {
            console.log(err.message)
        }
    }    
    
    function carregarValor(){
        if(produto.length > 0){
            const valorProduto = produto[pos[0]].valor;
            setValor(valorProduto);
            setValorOriginal(valorProduto);
            setDescricao(produto[pos[0]].descricao);
        }
    }
    
    useEffect(() => {
        setData(new Date().toISOString().split('T')[0])
        
        async function carregarProduto() {
            const r = await carregarProdutoApi(id);
            setProduto(r);
            console.log(produto)
        }
    
        carregarProduto();
    }, []);
    
    
    useEffect(() => {
        carregarValor()
    },[pos])

    useEffect(() => {
        let novoValor = 0
        if (qtd && qtd > 0) {
            novoValor = (valorOriginal * qtd).toFixed(2);
        }
        
        if (desconto && desconto > 0) {
            const valorComDesconto = (novoValor - ((desconto / 100) * novoValor)).toFixed(2);
            setValor(valorComDesconto);
            return
        }
        
        if(!qtd){
            setValor(valorOriginal)
            return
        }
        setValor(novoValor);
    },[qtd, valorOriginal])
    
    useEffect(() =>{
        if (desconto && desconto > 0 && !qtd ) {
            const valorComDesconto = (valorOriginal - ((desconto / 100) * valorOriginal)).toFixed(2);
            setValor(valorComDesconto);
        } else if(desconto && desconto > 0 && qtd) {
            const valorComDesconto = ((valorOriginal * qtd ) - ((desconto / 100) * (valorOriginal * qtd ))).toFixed(2);
            setValor(valorComDesconto);
        }else if(qtd){
            setValor((valorOriginal*qtd))
        }else{
            setValor(valorOriginal)
        }

    },[desconto, valorOriginal])

    

    return(
        <main className='pg-venda'>
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
                            
                        <select
                            className="input"
                            placeholder="Qual venda foi feita"
                            value={produtoSelecionado || ''}
                            onChange={(e) => {
                                setPos(e.target.value);
                                setProdutoSelecionado(e.target.value);
                            }}
                        >
                            <option className='opcao-produto' value="" disabled hidden>Selecione um produto</option>
                            {produto.map((prod, index) => (
                                <option key={index} value={[index, prod.id]}>{prod.nome}</option>
                            ))}
                        </select>
                            
                                <input 
                                    type="number" 
                                    name="text" 
                                    min='0' 
                                    step='.01' 
                                    className="input" 
                                    placeholder="Valor da venda" 
                                    value={valor} 
                                    onChange={e => setValor(parseFloat(e.target.value).toFixed(2))} 
                                />
                                <input 
                                    type="number" 
                                    name="text" 
                                    min='1' 
                                    className="input" 
                                    placeholder="Quantidade de vendas" 
                                    value={qtd} 
                                    onChange={e => setQtd(e.target.value)} 
                                />
                            
                        </div>
                        
                        <div className='textos'>
                            <textarea type="" name="text" className="input" placeholder="O que é esse produto ou serviço" value={descricao} />
                            <div className='org-div-textarea'>
                                <input 
                                    type="number" 
                                    name="text" 
                                    min='0' 
                                    max="100" 
                                    className="input" 
                                    placeholder="Desconto em %" 
                                    value={desconto} 
                                    onChange={e => setDesconto(e.target.value)} 
                                />
                                <input 
                                    type="date" 
                                    name="text" 
                                    className="input" 
                                    placeholder="Data da venda"  
                                    value={data} 
                                    onChange={e => setData(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className='botao-salvar'>
                            <button className="button" onClick={vendaNovo}> Salvar </button>
                        </div>
                    </div>
                        
                    </div>
                
                
            </section>

        </main>
    )
}
