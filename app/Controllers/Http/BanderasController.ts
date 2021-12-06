import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Bandera from 'App/Models/Bandera'

export default class BanderasController {
    public async index(ctx:HttpContextContract){
        return await Bandera.all();
    }

    public async store({request}:HttpContextContract){

        const newUserSchema = schema.create({
            tipo_id:schema.string({},[
                rules.required()
            ]),
            contaminante_id:schema.string({},[
                rules.required()
            ]),
            name:schema.string({},[
                rules.required()
            ]),
            description:schema.string({},[
                rules.required()
            ]),
            limOMS:schema.string({},[
                rules.required()
            ]),
            limNOM:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
                schema: newUserSchema,
                messages: {
                  required: 'El campo {{ field }} es requerido para crear una cuenta.'
                }
            })

            const  bandera= await Bandera.create({
                tipo_id: request.input('tipo_id'),
                contaminante_id: request.input('contaminante_id'),
                name:request.input('name'),
                description: request.input('description'),
                limOMS: request.input('limOMS'),
                limNOM:request.input('limNOM')
            });
            
            return bandera;
        } catch (error) {
            return error;
        }
    }

     //Elimina un registro de Tipo
    public async destroy({params}:HttpContextContract){
        const {id}=params;
        const bandera=await Bandera.find(id);
        await bandera?.delete();
        return bandera;
    }
}
