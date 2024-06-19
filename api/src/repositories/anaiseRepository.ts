import { con } from "./connection";

const connection = con();

export async function historico(idUsuario:number) {
    try {
        const comando:string = `        
            select 
            id_venda id,
            nm_produto nome,
            vl_preco preco,
            vl_liquido liquido,
            vl_gasto gasto,
            ds_quantidade qtd,
            dt_venda data,
            ds_descricao des 
            from tb_venda 
            where id_usuario = ?
            order by id_venda desc
            `
        const [linhas]:any = await (await connection).query(comando,[idUsuario]);
        return linhas 
    } catch (err:any) {
        console.log(err.message)
    }
}


export async function maisVendido(id:number) {
    try {
        const comando:string =`
            SELECT 
            nm_produto nome, 
            SUM(ds_quantidade) AS qtd,
            SUM(vl_preco * ds_quantidade) AS preco,
            SUM(vl_gasto * ds_quantidade) AS gasto,
            SUM(vl_liquido * ds_quantidade) AS liquido
            FROM 
                tb_venda
            WHERE 
                id_usuario = ?
            GROUP BY 
                nm_produto
            ORDER BY 
               qtd DESC;
            `
        const [linhas]:any = await (await connection).query(comando,[id])  
        return linhas
    } catch (err:any) {
        console.log(err)       
    }
}