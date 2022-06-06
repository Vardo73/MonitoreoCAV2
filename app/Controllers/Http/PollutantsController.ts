import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Pollutant from 'App/Models/Pollutant'
import Database from '@ioc:Adonis/Lucid/Database'
export default class PollutantsController {
    public async show({view}:HttpContextContract){
        const pollutants=await Pollutant.all();
        return view.render('admin/pollutant',{pollutants});
    }

    public async store({request}:HttpContextContract){
        const newPollutantSchema = schema.create({
            name:schema.string({},[
                rules.required()
            ]),
            description:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
              schema: newPollutantSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para registrar el Contaminante.'
              }
            })

            const pollutant= await Pollutant.create({
                name: request.input('name'),
                description:request.input('description')
            });
            
            return 'Contaminante registrado con exito.';

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async edit({request}:HttpContextContract){
        const newUserSchema = schema.create({
            name:schema.string({},[
                rules.required()
            ]),
            description:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para editar el Contaminante.'
              }
            })

            const pollutant= await Pollutant.findOrFail(request.input('id'))
            pollutant.name=request.input('name');
            pollutant.description=request.input('description');

            await pollutant.save();
            
            
            return 'Contaminante editado con exito.'

        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const pollutant=await Pollutant.findOrFail(id);
            

            await Database.from('pollutant_models')
            .whereRaw('pollutant_models.pollutant_id=? ',[id]).delete();
            
            await pollutant.delete();
            return 'Contaminante eliminado con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }
}
