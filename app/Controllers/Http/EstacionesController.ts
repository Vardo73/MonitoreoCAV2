import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Estacion from 'App/Models/Estacion'

export default class EstacionesController {
    public async index(ctx:HttpContextContract){
        return await Estacion.all();
    }
    
    public async store({request}:HttpContextContract){

        const newUserSchema = schema.create({
            id:schema.string({},[
                rules.required()
            ]),
            modelo_id:schema.string({},[
                rules.required()
            ]),
            name:schema.string({},[
                rules.required()
            ]),
            channel:schema.string({},[
                rules.required()
            ]),
            apikey:schema.string({},[
                rules.required()
            ])
        })

        try {
            const payload = await request.validate({
              schema: newUserSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para registrar la Estación.'
              }
            })

            const estacion= await Estacion.create({
                id:request.input('id'),
                name: request.input('name'),
                modelo_id: request.input('modelo_id'),
                channel: request.input('channel'),
                apikey: request.input('apikey')
            });
            

            return [true,'Estación registrado con exito.'];

        } catch (error) {
            console.log(error)
            return [false,error];
        }

    }

    public async consulta({request}:HttpContextContract){
        const id=request.input('id');
        try {
            
            const estacion=await Database
            .from('estacions')
            .join('modelos', (query) => {
                query
                .on('estacions.modelo_id', '=', 'modelos.id')
            })
            .select('estacions.id')
            .select('estacions.name ')
            .select('estacions.channel')
            .select('estacions.apikey')
            .select('modelos.name as nameM')
            .select('modelos.id as idM')
            .whereRaw('estacions.id=? ',[id])
           
            return estacion;

        } catch (error) {
            return [error,'error'];
        }
    }

    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const modelo_id=request.input('modelo_id');
        const channel=request.input('channel');
        const apikey=request.input('apikey');

        try {
            
            const estacion=await Estacion.findOrFail(id);

            estacion.name=name;
            estacion.modelo_id=modelo_id;
            estacion.channel=channel;
            estacion.apikey=apikey;

            
            await estacion.save();
            
            return [true,'Estación actualizada con exito.'];

        } catch (error) {
            console.log(error);
        }
    }

    public async consultaM({request}:HttpContextContract){
        const id:number=request.param('id');
        try {
            //const estacion=await Estacion.find(id);
            
            const estaciones=await Database
            .from('estacions')
            .join('modelos', (query) => {
                query
                .on('estacions.modelo_id', '=', 'modelos.id')
            })
            .select('estacions.id')
            .select('estacions.name ')
            .select('estacions.channel as channel')
            .select('estacions.apikey as apikey')
            .select('modelos.name as nomM')
            .whereRaw('modelos.id=? ',[id])
           
            return estaciones;

        } catch (error) {
            //console.log(error)
            return [error,'error'];
        }
    }


     //Elimina un registro de Contaminante
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const estacion=await Estacion.findOrFail(id);
            await estacion.delete();
            //Recuerda aquí hacer algo al respecto de los datos obtenidos al eliminar la estación
            return [true,'Estación eliminado con exito.'];
        } catch (error) {
            console.log(error);
            return [false,error]
        }
    }
}
