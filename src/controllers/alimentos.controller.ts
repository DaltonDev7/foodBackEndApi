import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { AlimentoUsuario } from '../entity/AlimentosUsuario';
import { Usuario } from '../entity/Usuario';

export const saveAlimentos = async (req: Request, res: Response): Promise<Response> => {

    try {
        //console.log(req.body);

        const newAlimentoUser = await getRepository(AlimentoUsuario).create(req.body)

        let format = {
            ...newAlimentoUser,
            FechaCreacion: new Date(),
            IdUsuario: req.body.IdUsuario
        }

        const result = await getRepository(AlimentoUsuario).save(format)

        return res.status(201).json({
            msg: 'Registro Creado',
            result
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}
export const getAlimentoById = async (req: Request, res: Response): Promise<Response> => {


    try {

        const alimento = await getRepository(AlimentoUsuario).findOne(req.params.id);

        if(!alimento){
            return res.status(400).json({
                msg: 'Registro no encontrado'
            })
        }else{
            return res.status(200).json({
                ...alimento
            });
        }

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}


export const getAlimentos = async (req: Request, res: Response): Promise<Response> => {

    try {

        const alimentos = await getRepository(AlimentoUsuario).find({
            // relations: ["Usuario"],
            //  select: ["Desayuno", "Cena", "Comida", "FechaCreacion"],
            order: {
                FechaCreacion: "DESC"
            },
            join: {
                alias: "alimento",
                leftJoinAndSelect: {
                    usuario: "alimento.Usuario"
                },


            },
        });

        // const alimentos = await getRepository(AlimentoUsuario)
        //     .createQueryBuilder("alimentos")
        //     .innerJoinAndSelect("alimentos.Usuario" , "usuario", "usuario.Id as IdUsuario")
        //     //.leftJoinAndSelect("alimentos.Usuario" , "usuario")

        //     .getOne()


        const resultFormat = alimentos.map((item) => {
            return {
                Desayuno: item.Desayuno,
                Comida: item.Comida,
                Cena: item.Cena,
                FechaCreacion: item.FechaCreacion,
                IdUsuario: item.Usuario.Id,
                ComidaExtra: item.ComidaExtra,
                Merienda: item.Merienda
            }
        })

        return res.status(200).json(resultFormat)

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Ha ocurrido un error" + error,
        })
    }

}


export const updateAlimento = async (req: Request, res: Response): Promise<Response> => {

    try {
        console.log(req.body);

        
        const alimento = await getRepository(AlimentoUsuario).findOne(req.body.Id)

        if (alimento) {

            let format = { ...alimento, FechaModificacion: new Date() }

            await getRepository(AlimentoUsuario).merge(format, req.body)
            await getRepository(AlimentoUsuario).save(format)
            return res.json({
                msg: 'Actualizado'
            })
        }

        return res.status(404).json({
            msg: 'Registro no encontrado'
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}

export const getAlimentosByIdUser = async (req: Request, res: Response): Promise<Response> => {

    try {
        //const Id = req.params.id.toString()
        const Id = req.body.idUserAutenticado

        const page: number = parseInt(req.body.page as any) || 1;
        const itemsByPage: number = 5;
        console.log(req.body);


        const alimentos = await getRepository(AlimentoUsuario).createQueryBuilder("AlimentoUsuario")
            .innerJoin("AlimentoUsuario.Usuario", "usuario")
            .where("usuario.Id = :Id", { Id: Id })
            .offset((page - 1) * itemsByPage).limit(itemsByPage).orderBy("AlimentoUsuario.FechaCreacion", "DESC")


        const total = await alimentos.getCount()

        // .addSelect(['usuario.Id'])

        /*const result = await getRepository(AlimentoUsuario).find({
           where: {
               Usuario: Id
           },
           relations: ["Usuario"],
           order: {
               FechaCreacion: "DESC"
           }
       })

        /*const resultFormat = result.map((item) => {
            return {
                Id: item.Id,
                Desayuno: item.Desayuno,
                Comida: item.Comida,
                Cena: item.Cena,
                FechaCreacion: item.FechaCreacion,
                IdUsuario: item.Usuario.Id,
                ComidaExtra: item.ComidaExtra,
                Merienda: item.Merienda
            }
        })*/
        return res.status(200).json({
            data: await alimentos.getMany(),
            page,
            itemsByPage,
            total
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}


export const deleteAlimento = async (req: Request, res: Response): Promise<Response> => {

    try {

        const alimento = await getRepository(AlimentoUsuario).findOne(req.params.id);

        if (alimento) {
            await getRepository(AlimentoUsuario).delete(req.params.id)
            return res.status(200).json({
                msg: 'Registro eliminado'
            })
        }

        return res.status(404).json({
            msg: 'Registro no encontrado'
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}