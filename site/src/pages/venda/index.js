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
    const [qtd, setQtd] = useState('');
    const [descricao, setDescricao] = useState('');
    const [descEspecifico, setDescEspecifico] = useState('');
    const [desconto, setDesconto] = useState('');
    const [pos, setPos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState([])
    const [idProduto, setIdProduto] = useState([])

    const {id} = useParams()

    async function vendaNovo(){
        try {
            let quantidade = 0
            if(!desconto || !qtd){
                if (!desconto) {
                    setDesconto(0)
                }
                if(qtd <= 0){
                    quantidade = 1
                }else{
                    quantidade = Number(qtd);
                }
            }
            const r = await novaVenda( Number(idProduto[2]), id, Number(desconto), data, descricao, quantidade)
            toast(r.data)            
        } catch (err) {
            console.log(err.message)
        }
    }    
    
    function carregarValor(){
        if(produto.length > 0){
            setValor(produto[pos[0]].valor)
            setDescricao(produto[pos[0]].descricao)
        }
    }
    
    useEffect(() => {
        setData(new Date().toISOString().split('T')[0])
        
        async function carregarProduto() {
            const r = await carregarProdutoApi(id);
            setProduto(r)
        }
    
        carregarProduto();
    }, []);
    
    
    useEffect(() => {
        carregarValor()
    },[pos])
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
                                setIdProduto(e.target.value)
                                setProdutoSelecionado(e.target.value);
                            }}
                        >
                            <option className='opcao-produto' value="" disabled hidden>Selecione um produto</option>
                            {produto.map((prod, index) => (
                                <option key={index} value={[index, prod.id]}>{prod.nome}</option>
                            ))}
                        </select>
                            
                                <input type="number" name="text" min='0' class="input" placeholder="Valor da venda" value={valor} />
                                <input type="number" name="text" min='1' class="input" placeholder="Quantidade de vendas" value={qtd} onChange={e => setQtd(e.target.value)}/>
                            
                        </div>
                        
                        <div className='textos'>
                            <textarea type="" name="text" class="input" placeholder="O que é esse produto ou serviço" value={descricao} />
                            <textarea type="text" name="text" class="input" placeholder="explicação especifica dessa venda(não obrigatorio)" value={descEspecifico} onChange={e => setDescEspecifico(e.target.value)}/>
                            <div className='org-div-textarea'>
                                <input type="number" name="text" min='0' class="input" placeholder="Desconto em %" value={desconto} onChange={e => setDesconto(e.target.value)}/>
                                <input type="date" name="text" class="input" placeholder="Data da venda"  value={data} onChange={e => setData(e.target.value)}/>
                            </div>
                        </div>
                        <div className='botao-salvar'>
                            <button class="button" onClick={vendaNovo}> Salvar </button>
                        </div>
                    </div>
                        
                    </div>
                
                
            </section>

        </main>
    )
}