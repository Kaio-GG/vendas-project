import './index.scss';
import { historicoApi, maisVendidoApi } from '../../api/analliseApi.js';
import { excluirVendaApi } from '../../api/vendas.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Confirmacao from '../confirmarExclusao/index.jsx'; 
import { toast } from 'react-toastify';
import Detalhes from '../detalhes/index.jsx';

export default function MaisVendido(props) {
    const [historico, setHistorico] = useState([]);
    const [lucroGasto, setLucroGasto] = useState(0); 
    const [historicoDias, setHistoricoDias] = useState([]);
    const [itemFocus, setItemFocus] = useState(null); 
    const [confirmado, setConfirmado] = useState(false); 
    const [vendaId, setVendaId] = useState(null); 
    const [aparecerDetalhe, setAparecerDetalhe] = useState(false)
    const [descricao, setDescricao] = useState('')
    const { id } = useParams();

    async function carregarHistorico() {
        try {
            const lista = await historicoApi(id);
            setHistorico(lista);
            setHistoricoDias(lista);
        } catch (err) {
            console.log(err.message);
        }
    }

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        carregarHistorico();
    }, [id]);

    useEffect(() => {
        if (props.fun === 'historico') {
            setHistoricoDias(historico);
        } else if (props.fun === 'lucro30dias') {
            lucroContador(30);
        } else if (props.fun === 'lucro360dias') {
            lucroContador(360);
        } else if (props.fun === 'gasto30dias') {
            gastoContador(30);
        } else if (props.fun === 'gasto360dias') {
            gastoContador(360);
        } else if (props.fun === 'valor30dias') {
            valorContador(30);
        } else if (props.fun === 'valor360dias') {
            valorContador(360);
        } else if (props.fun === 'maisvendido') {
            mostrarMaisVendidos();
        }
    }, [props.fun]);

    async function lucroContador(dias) {
        await carregarHistorico();
        let lista = [];
        let dataAtual = new Date();
        let data30DiasAtras = new Date();
        data30DiasAtras.setDate(dataAtual.getDate() - dias);
        let contadorLucro = 0;
        for (let i = 0; i < historico.length; i++) {
            let dt = new Date(historico[i].data).getTime();
            if (dt >= data30DiasAtras) {
                lista.push(historico[i]);
                contadorLucro += Number(historico[i].liquido);
            }
        }
        setLucroGasto(contadorLucro);
        setHistoricoDias(lista);
        return;
    }

    async function valorContador(dias) {
        await carregarHistorico();
        let lista = [];
        let dataAtual = new Date();
        let data30DiasAtras = new Date();
        data30DiasAtras.setDate(dataAtual.getDate() - dias);
        let contadorValor = 0;
        for (let i = 0; i < historico.length; i++) {
            let dt = new Date(historico[i].data).getTime();
            if (dt >= data30DiasAtras) {
                lista.push(historico[i]);
                contadorValor += Number(historico[i].preco);
            }
        }
        console.log(historico);
        setLucroGasto(contadorValor);
        setHistoricoDias(lista);
        return;
    }

    async function gastoContador(dias) {
        await carregarHistorico();
        let lista = [];
        let dataAtual = new Date();
        let data360DiasAtras = new Date();
        data360DiasAtras.setDate(dataAtual.getDate() - dias);
        let contadorGasto = 0;
        for (let i = 0; i < historico.length; i++) {
            let dt = new Date(historico[i].data).getTime();
            if (dt >= data360DiasAtras) {
                lista.push(historico[i]);
                contadorGasto += Number(historico[i].gasto);
            }
        }
        setLucroGasto(contadorGasto);
        setHistoricoDias(lista);
        return;
    }

    async function excluirVenda(id) {
        try {
            const r = await excluirVendaApi(id);
            toast(r);
            carregarHistorico();
        } catch (err) {
            console.error(err);
        }
    }

    function fecharExcluir(id) {
        setVendaId(id);
        setConfirmado(true);
    }

    function fecharExcluirFechar() {
        setConfirmado(false);
        setVendaId(null);
    }

    function confirmarExcluir() {
        excluirVenda(vendaId);
        setConfirmado(false);
    }

    function mostrarDetalhes(des) {
        setDescricao(des);
        setAparecerDetalhe(!aparecerDetalhe);
    }

    async function mostrarMaisVendidos() {
        try {
            const r = await maisVendidoApi(id);
            console.log(r);
            setHistoricoDias(r);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <main className='maisVendido'>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Lucro</th>
                        <th>Gasto</th>
                        <th>Quantidade</th>
                        {props.fun !== 'maisvendido' &&
                            <th>Data</th>
                        }
                        {(props.fun === 'lucro30dias' || props.fun === 'lucro360dias') && <th>Lucro Total</th>}
                        {(props.fun === 'gasto30dias' || props.fun === 'gasto360dias') && <th>Gasto Total</th>}
                        {(props.fun === 'valor30dias' || props.fun === 'valor360dias') && <th>Valor Total</th>}
                        
                        {props.fun !== 'maisvendido' &&
                            <th className='excluir'></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {historicoDias.length > 0 && historicoDias.map((prod, index) => (
                        <tr
                            className='lista'
                            key={index}
                            onMouseEnter={() => setItemFocus(index)}
                            onMouseLeave={() => setItemFocus(null)}
                            onClick={() => mostrarDetalhes(prod.des)}
                        >
                            <td>{prod.nome}</td>
                            <td>R$: {prod.preco}</td>
                            <td>R$: {prod.liquido}</td>
                            <td>R$: {prod.gasto}</td>
                            <td>{prod.qtd}</td>
                            {prod.data && <td>{formatarData(prod.data)}</td>}
                            {(props.fun === 'lucro30dias' || props.fun === 'lucro360dias' || props.fun === 'gasto30dias' || props.fun === 'gasto360dias' || props.fun === 'valor360dias' || props.fun === 'valor30dias') && (
                                index === 0 
                                    ? <td rowSpan={historico.length}>R$: {lucroGasto}</td> 
                                    : <td></td>
                            )}
                            <td className='excluir'>
                                <div className='organizar'>
                                    <img
                                        src='/assets/image/remove.svg'
                                        alt=''
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            fecharExcluir(prod.id);
                                        }}
                                        style={{ display: (itemFocus === index || window.innerWidth <= 500) ? 'block' : 'none' }} // Mostrar em telas pequenas
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Confirmacao 
                aparecer={confirmado} 
                onClose={fecharExcluirFechar} 
                onConfirm={confirmarExcluir} 
            />
            {aparecerDetalhe && <Detalhes aparecer={mostrarDetalhes} desc={descricao} />}
        </main>
    );
}
