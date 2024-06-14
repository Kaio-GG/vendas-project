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
            dt_venda data 
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