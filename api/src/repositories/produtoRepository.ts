import { con } from "./connection";

const connection = con()

export async function novoProduto(id:number, nome:string, preco:number , gasto:number, liquido:number , descricao:string){
    try {
        const comando:string = `
        insert into tb_produto(id_usuario,nm_produto,vl_preco,vl_gasto,vl_liquido,ds_descricao)
			values(?, ?, ? ,? , ?, ? )
        `
        const [linha]:any = await (await connection).execute(comando,[id,nome,preco,gasto,liquido,descricao]);
        return linha
    } catch (err:any) {
        console.log(err.message)
    }
}


export async function editarProduto(id:number, nome:string, preco:number , gasto:number, liquido:number , descricao:string) {
    try {
        const comando:string = `
        update tb_produto 
        set 
        nm_produto = ?,
        vl_preco = ?,
        vl_gasto = ?,
        vl_liquido = ?,
        ds_descricao = ?
        where id_produto = ?`
        const [linhas]:any = await (await connection).execute(comando,[nome, preco, gasto, liquido, descricao, id])
        return linhas
    } catch (err:any) {
        console.log(err.message)
    }   
}

export async function deletarProduto(id:number) {
    try {
        const comando:string = `delete from tb_produto where id_produto = ?`;
        const [linha]:any = await (await connection).query(comando,[id]);
        return linha
    } catch (err:any) {
        console.log(err.message)
    }
}



export async function carregarProduto(id:number) {
    try {
        const comando:string =`
        select 
        id_produto  id,
        nm_produto  nome,
        vl_preco    valor,
        vl_liquido  liquido,
        ds_descricao descricao,
        vl_gasto gasto
        from        
        tb_produto 
        inner join 
        tb_usuario
        on tb_produto.id_usuario = tb_usuario.id_usuario
        where 
        tb_produto.id_usuario = ?
        `;
        const [linha]:any = await (await connection).query(comando,[id]);
        return linha
    } catch (err:any) {
        console.log(err.message)
    }
    
}

