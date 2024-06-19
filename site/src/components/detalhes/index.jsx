import './index.scss';










export default function Detalhes ({aparecer, desc}){


    return(
        <main className='cp-detalhes'>
            <div className='caixa'>
                <h3>DETALHES</h3>
                <textarea value={desc}/>
                
                <button onClick={aparecer}>Fechar</button>
            </div>
        </main>
    )
} 