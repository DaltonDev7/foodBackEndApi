import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Usuario } from "../entity/Usuario"
import { encriptarPassword, validateUserName } from '../handlers/usuario.handlers';


export const Saludo = (req: Request, res: Response) => {

    return res.json({
        Saludo: "Desde Controllador usuario"
    })

}

export const getUser = async (req: Request, res: Response): Promise<Response> => {

    try {

        const users = await getRepository(Usuario).find();
        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    try {
        console.log(req.body);
        
        const user = await validateUserName(req.body)


        if (user) {
            return res.status(400).json({
                msg: 'Este usuario ya existe',
            })
        } else {
            await encriptarPassword(req.body)

            const newUser = await getRepository(Usuario).create(req.body)

            await getRepository(Usuario).save(newUser)
            return res.status(201).json({
                msg: 'Usuario Creado',
            })
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}


export const updateUser = async (req: Request, res: Response): Promise<Response> => {

    try {

        const user = await getRepository(Usuario).findOne(req.body.Id)

        if (user) {
            await getRepository(Usuario).merge(user, req.body)
            await getRepository(Usuario).save(user)
            return res.json({
                msg: 'Actualizado'
            })
        }

        return res.status(404).json({
            msg: 'Usuario no encontrado'
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}
