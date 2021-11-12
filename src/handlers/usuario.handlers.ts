import { Usuario } from '../entity/Usuario';
import { getRepository } from "typeorm"
import bcryptjs from "bcryptjs"

export const validateUserName = async (usuario: Usuario) => {

    return await getRepository(Usuario).findOne({
        UserName: usuario.UserName
    })
}

export const encriptarPassword = async (usuario: Usuario) => {


    const { PassWord } = usuario

    const salt = await bcryptjs.genSaltSync()
    usuario.PassWord = await bcryptjs.hashSync(PassWord, salt)

    console.log(usuario);

}
export const validatePassword = (password: string, usuario: Usuario) => {

    //validamos que la contrase;a este correcto
    return bcryptjs.compareSync(password, usuario.PassWord);

}