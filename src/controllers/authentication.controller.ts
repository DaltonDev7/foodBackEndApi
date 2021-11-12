import { Request, Response } from "express"
import { Usuario } from "../entity/Usuario"
import { generarJsonWebToken } from "../handlers/json-web-token.handlers"
import { validatePassword, validateUserName } from "../handlers/usuario.handlers"


export const SignIn = async (req: Request, res: Response) => {


    try {

        const user = await validateUserName(req.body)

        if (!user) {
            return res.status(400).json({
                msg: 'El usuario no existe',
            })
        } else {

            const validPass = validatePassword(req.body.PassWord, user)

            if (!validPass) {
                return res.status(400).json({
                    msg: 'La contraseña es incorrecta',
                })
            } else {

                const token = await generarJsonWebToken(user.Id)

                res.json({
                    Usuario: {
                        Id: user.Id,
                        UserName: user.UserName
                    },
                    token
                })

            }
        }



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: "Ha ocurrido un error",
            error
        })
    }

}