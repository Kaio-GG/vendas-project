import './index.scss';
import { useParams, useNavigate } from 'react-router-dom';



export default function Navegacao(){

    const { tela } =useParams();
    const Navigate = useNavigate()


    function navegar(navi){
        if (navi === 1) {
            Navigate('/novo/venda/1')
        }else if( navi === 2){
            Navigate('/novo/produto/2')
        }else if( navi === 3){
            Navigate('/produto/3')
        }else if(navi === 4){
            Navigate('/analise/4')
        }
    }

    return(
        <main className='cp-navegacao'>
            <div className='organizar-icon'>
                {Number(tela) === 1 ?
                    <div className='marcar'>
                        <img src='/assets/image/venda.svg' alt='' />
                    </div>
                :
                <div className='no-marcado'>
                    <img src='/assets/image/venda.svg' alt='' onClick={() => navegar(1)}/>
                </div>       
                }
                {Number(tela) === 2 ?
                    <div className='marcar'>
                        <img src='/assets/image/plus.svg' alt='' />
                    </div>
                :
                <div className='no-marcado'>
                    <img src='/assets/image/plus.svg' alt='' onClick={() => navegar(2)}/>
                </div>       
                }
                {Number(tela) === 3 ?
                    <div className='marcar'>
                         <img src='/assets/image/produto.svg' alt='' />
                    </div>
                :
                <div className='no-marcado'>     
                    <img src='/assets/image/produto.svg' alt='' onClick={() => navegar(3)} />
                </div> 
                }
                {Number(tela) === 4 ?
                <div className='marcar'>
                        <img src='/assets/image/analise.svg' alt='' />
                </div>
                :   
                <div className='no-marcado'>
                    <img src='/assets/image/analise.svg' alt='' onClick={() => navegar(4)} />
                </div>    
                }                         
            </div>
        </main>
    )
}