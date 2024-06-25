/* eslint-disable react-hooks/exhaustive-deps */
import './index.scss';
import Navegacao from '../../components/navegacao/index.js';
import Header from '../../components/header/index.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { carregarProdutoApi } from '../../api/produto.js';
import { novaVenda } from '../../api/vendas.js';
import { toast } from 'react-toastify';

export default function Venda() {
    const [data, setData] = useState('');
    const [produto, setProduto] = useState([]);
    const [valor, setValor] = useState('');
    const [valorOriginal, setValorOriginal] = useState('');
    const [qtd, setQtd] = useState('');
    const [descricao, setDescricao] = useState('');
    const [desconto, setDesconto] = useState('');
    const [pos, setPos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState([]);
    const [liquido, setLiquido] = useState('');
    const [gasto, setGasto] = useState('');
    const [valorOriginalGasto, setValorOriginalGasto] = useState('');
    const [valorOriginalLiquido, setValorOriginalLiquido] = useState('');
    const { id } = useParams();

    async function vendaNovo() {
        try {
            let quantidade = qtd > 0 ? qtd : 1;
            let gastoTotal = gasto * quantidade;
            let liquidoTotal = liquido;
            const r = await novaVenda(id, Number(desconto), data, descricao, quantidade, produto[pos].nome, valor, gastoTotal, liquidoTotal);
            toast(r.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    function carregarValor() {
        if (produto.length > 0) {
            const valorProduto = produto[pos].valor;
            const valorLiquido = produto[pos].liquido;
            const valorGasto = produto[pos].gasto;
            setValor(valorProduto);
            setValorOriginal(valorProduto);
            setDescricao(produto[pos].descricao);
            setGasto(valorGasto);
            setLiquido(valorLiquido);
            setValorOriginalGasto(valorGasto);
            setValorOriginalLiquido(valorLiquido);
        }
    }

    useEffect(() => {
        const now = new Date().toISOString().slice(0, 10);
        setData(now);

        async function carregarProduto() {
            const r = await carregarProdutoApi(id);
            setProduto(r);
        }

        carregarProduto();
    }, [id]);

    useEffect(() => {
        carregarValor();
    }, [pos]);

    useEffect(() => {
        let novoValor = 0;
        let novoGasto = 0;
        let novoLiquido = 0;

        if (qtd && qtd > 0) {
            novoValor = (valorOriginal * qtd).toFixed(2);
            novoGasto = (valorOriginalGasto * qtd).toFixed(2);
            novoLiquido = (novoValor - novoGasto).toFixed(2);
        }

        if (desconto && desconto > 0) {
            const valorComDesconto = (novoValor - (desconto / 100) * novoValor).toFixed(2);
            setValor(valorComDesconto);
        } else {
            setValor(novoValor);
        }

        setGasto(novoGasto);
        setLiquido(novoLiquido);

        if (!qtd) {
            setValor(valorOriginal);
            setGasto(valorOriginalGasto);
            setLiquido(valorOriginalLiquido);
        }
    }, [qtd, valorOriginal, valorOriginalGasto, valorOriginalLiquido, desconto]);

    useEffect(() => {
        if (desconto && desconto > 0) {
            const valorComDesconto = (valorOriginal - (desconto / 100) * valorOriginal).toFixed(2);
            const valorComDescontoQtd = (valorOriginal * qtd - (desconto / 100) * (valorOriginal * qtd)).toFixed(2);

            if (!qtd) {
                setValor(valorComDesconto);
            } else {
                setValor(valorComDescontoQtd);
            }
        } else if (qtd) {
            setValor((valorOriginal * qtd).toFixed(2));
        } else {
            setValor(valorOriginal);
        }
    }, [desconto, valorOriginal, qtd]);

    useEffect(() => {
        const novoLiquido = (valor - gasto).toFixed(2);
        setLiquido(novoLiquido);
    }, [valor, gasto]);

    return (
        <main className='pg-venda'>
            <section className='header'>
                <Header />
            </section>
            <section className='meio'>
                <Navegacao />
                <div className='fundo'>
                    <div className='formulario'>
                        <div className='linha-nome'>
                            <div className='linha-vertical'></div>
                            <h2>Nova venda</h2>
                        </div>
                        <div className='inputs'>
                            <select
                                className="select-venda"
                                placeholder="Qual venda foi feita"
                                value={produtoSelecionado || ''}
                                onChange={(e) => {
                                    setPos(e.target.value);
                                    setProdutoSelecionado(e.target.value);
                                }}
                            >
                                <option className='opcao-produto' value="" disabled hidden>Selecione um produto</option>
                                {produto.map((prod, index) => (
                                    <option key={index} value={index}>{prod.nome}</option>
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
                            <textarea type="" name="text" className="input" placeholder="O que é esse produto ou serviço" value={descricao} onChange={e => setDescricao(e.target.value)} />
                            <input
                                type="number"
                                name="text"
                                className="input"
                                placeholder="Gasto de produção"
                                value={gasto}
                                onChange={e => setGasto(e.target.value)}
                            />
                            
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
                        <h4>Valor líquido recebido por venda: {liquido}</h4>
                        <div className='botao-salvar'>
                            <button className="button" onClick={vendaNovo}>Salvar</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
