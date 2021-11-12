import Jwt from "jsonwebtoken"

export const generarJsonWebToken = async (uid : any) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        Jwt.sign(payload, process.env.SECRETOKEY as string, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puedo generar el token')
            }else{
                return resolve(token)
            }
        })


    })

}