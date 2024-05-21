import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/login/login.js';
import Venda from './pages/venda/index.js';
import Produto from './pages/produto/index.js';
import Produtos from './pages/produtos/index.js';
import Analise from './pages/analise/index.jsx';


export default function Roteador(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/> 
                <Route path='/novo/venda/:tela/:id' element={<Venda/>}/>
                <Route path='/produto/:tela/:id/:produtoid' element={<Produto/>}/>
                <Route path='/produtos/:tela/:id' element={<Produtos/>}/>
                <Route path='/analise/:tela/:id' element={<Analise/>}/>
            </Routes>
        </BrowserRouter>
    )
}
