import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/login/login.js';
import Venda from './pages/venda/index.js';
import NovoProduto from './pages/novoProduto/index.js';
import Produto from './pages/produtos/index.js';
import Analise from './pages/analise/index.jsx';


export default function Roteador(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/> 
                <Route path='/novo/venda/:tela' element={<Venda/>}/>
                <Route path='/novo/produto/:tela' element={<NovoProduto/>}/>
                <Route path='/produto/:tela' element={<Produto/>}/>
                <Route path='/analise/:tela' element={<Analise/>}/>
            </Routes>
        </BrowserRouter>
    )
}
