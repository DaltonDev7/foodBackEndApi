import Jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"




export const validarJwt = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('authorization-token')

    if (!token) {
        return res.status(401).json({
            error: "El usuario necesita estar autenticado."
        })
    }

    try {
        //verificamos en jwt
        Jwt.verify(token, process.env.SECRETOKEY as string)
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: "El usuario necesita estar autenticado."
        })
    }


}