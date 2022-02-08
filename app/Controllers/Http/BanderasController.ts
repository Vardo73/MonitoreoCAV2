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
            contaminante_id:schema.number([
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
                  required: 'El campo {{ field }} es requerido para crear una bandera.'
                }
            })

            const  bandera= await Bandera.create({
                tipo_id: request.input('tipo_id'),
                contaminante_id: request.input('contaminante_id'),
                name:request.input('name'),
                description: request.input('description'),
                lim_oms: request.input('limOMS'),
                lim_nom:request.input('limNOM')
            });
            
            return [true,'Bandera registrada con exito.'];
        } catch (error) {
            console.log(error)
            return [false,error];
        }
    }

    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const tipo_id=request.input('tipo_id');
        const description=request.input('description');
        const limOMS=request.input('limOMS');
        const limNOM=request.input('limNOM');

        try {
            
            const bandera=await Bandera.findOrFail(id);

            bandera.name=name;
            bandera.description=description;
            bandera.tipo_id=tipo_id;
            bandera.lim_oms=limOMS;
            bandera.lim_nom=limNOM;

            
            await bandera.save();
            
            return [true,'Estación actualizada con exito.'];

        } catch (error) {
            console.log(error);
        }
    }

     //Elimina un registro de Bandera
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const bandera=await Bandera.findOrFail(id);
            await bandera.delete();
            return [true,'Bandera eliminada con exito.']
        } catch (error) {
            console.log(error);
            return [false,error]
        }
    }
}
