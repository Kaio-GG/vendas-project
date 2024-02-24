import './index.scss';



export default function MaisVendido(){



    return(
        <main className='maisVendido'>
            <table>
                <header >
                    <thead>
                        <tr>
                            <th>
                                Nome
                            </th>
                            <th>
                                Valor
                            </th>
                            <th>
                                Lucro
                            </th>
                            <th>
                                Gasto   
                            </th>
                            <th>
                                Quantidade
                            </th>
                        </tr>
                    </thead>
                </header>
                <body>
                    <tr>
                        <td> Banco de moto</td>
                        <td> R$: 500,00</td>
                        <td> R$:300,00</td>
                        <td> R$:200,00</td>
                        <td> 10</td>
                    </tr>
                </body>
            </table>
        </main>
    )
}