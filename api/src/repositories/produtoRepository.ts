import { con } from "./connection";

const connection = con()

export async function novoProduto(id:number, nome:string, preco:number , gasto:number, liquido:number , descricao:string){
    try {
        const comando = `
        insert into tb_produto(id_usuario,nm_produto,vl_preco,vl_gasto,vl_liquido,ds_descricao)
			values(?, ?, ? ,? , ?, ? )
        `
        const [linha] = await (await connection).execute(comando,[id,nome,preco,gasto,liquido,descricao]);
        return linha
    } catch (err) {
        console.log(err)
    }
}


export async function editarProduto(id:number, nome:string, preco:number , gasto:number, liquido:number , descricao:string) {
    try {
        const comando = `
        update tb_produto 
        set 
        nm_produto = ?,
        vl_preco = ?,
        vl_gasto = ?,
        vl_liquido = ?,
        ds_descricao = ?
        where id_produto = ?`
        const [linhas] = await (await connection).execute(comando,[nome, preco, gasto, liquido, descricao, id])
        return linhas
    } catch (err) {
        console.log(err)
    }   
}

export async function deletarProduto(id:number) {
    try {
        const comando = `delete from tb_produto where id_produto = ?`;
        const [linha] = await (await connection).query(comando,[id]);
        return linha
    } catch (err:any) {
        console.log(err.message)
    }
}

