import './index.scss';
import { historicoApi } from '../../api/analliseApi.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MaisVendido(props) {
    const [historico, setHistorico] = useState([]);
    const [lucro, setLucro] = useState(0); 
    const [historicoDias, setHistoricoDias] = useState([])
    const { id } = useParams();

    async function carregarHistorico() {
        try {
            const lista = await historicoApi(id);
            setHistorico(lista);
            setHistoricoDias(lista)
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
    useEffect(()=>{
        carregarHistorico()
    },[])

    useEffect(() => {
        carregarHistorico()
        if (props.fun === 'historico') {
            setHistoricoDias(historico)
        }
        else if (props.fun === 'lucro30dias') {
            LucroMes();
        } else if (props.fun === 'lucro360dias'){
            LucroAno()
        }
    }, [props.fun]);

    async function LucroMes() {
        await carregarHistorico();
        let lista = [];
        let dataAtual = new Date();
        let data30DiasAtras = new Date();
        data30DiasAtras.setDate(dataAtual.getDate() - 30);
        let contadorLucro = 0;
        for (let i = 0; i < historico.length; i++) {
            let dt = new Date(historico[i].data).getTime();
            if (dt >= data30DiasAtras) {
                lista.push(historico[i]);
                contadorLucro += Number(historico[i].liquido);
            }
        }
        setLucro(contadorLucro);
        setHistoricoDias(lista);
        return
    }

    async function LucroAno() {
        await carregarHistorico()
        let lista = [];
        let dataAtual = new Date();
        let data360DiasAtras = new Date();
        data360DiasAtras.setDate(dataAtual.getDate() - 360);
        let contadorLucro = 0;
        for (let i = 0; i < historico.length; i++) {
            let dt = new Date(historico[i].data).getTime();
            if (dt >= data360DiasAtras) {
                lista.push(historico[i]);
                contadorLucro += Number(historico[i].liquido);
            }
        }
        setLucro(contadorLucro);
        setHistoricoDias(lista);
        return
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
                        <th>Data</th>
                        {(props.fun === 'lucro30dias' || props.fun === 'lucro360dias') && <th>Lucro Total</th>}
                    </tr>
                </thead>
                <tbody>
                    {historicoDias.length > 0 && historicoDias.map((prod, index) => (
                        <tr key={index}>
                            <td>{prod.nome}</td>
                            <td>R$: {prod.preco}</td>
                            <td>R$: {prod.liquido}</td>
                            <td>R$: {prod.gasto}</td>
                            <td>{prod.qtd}</td>
                            {prod.data && <td>{formatarData(prod.data)}</td>}
                            {(props.fun === 'lucro30dias' || props.fun === 'lucro360dias')  && (
                                index === 0 
                                    ? <td rowSpan={historico.length}>R$: {lucro}</td> 
                                    : <td></td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
