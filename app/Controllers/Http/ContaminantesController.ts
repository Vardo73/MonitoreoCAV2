import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Contaminante from 'App/Models/Contaminante'
import Bandera from 'App/Models/Bandera'


export default class ContaminantesController {
    
    public async index(ctx:HttpContextContract){
        return await Contaminante.all();
    }
    
    public async store({request}:HttpContextContract){

        const newUserSchema = schema.create({
            nameC:schema.string({},[
                rules.required()
            ]),
            nameB:schema.string({},[
                rules.required()
            ]),
            tipoB:schema.string({},[
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
                required: 'El campo {{ field }} es requerido para registrar el Contaminante.'
              }
            })

            const contaminante= await Contaminante.create({
                name: request.input('nameC')
            });
            
            const bandera=await Bandera.create({
                name: request.input('nameB'),
                tipo_id: request.input('tipoB'),
                contaminante_id:contaminante.id ,
                description:request.input('description'),
                limOMS: request.input('limOMS'),
                limNOM:request.input('limNOM')
            });

            return [true,'Contaminante registrado con exito.'];

        } catch (error) {
            console.log(error)
            return [false,error];
        }

    }

    public async consulta({request, response,session}:HttpContextContract){
        const id:number=request.param('id');

        try {
            
            const banderas=await Database.from('banderas')
            .select('banderas.id as IdBan','tipo_bs.name as NomT','banderas.name as NomB',
            'banderas.description as Des','banderas.limOMS as LimOMS','banderas.limNOM as LimNOM')
            .join('tipo_bs','tipo_bs.id', '=', 'banderas.tipo_id')
            .where(Database.raw('banderas.contaminante_id = ?', [id]));

            return [banderas,'Jala'];

        } catch (error) {
            console.log(error)
            return [error,'error'];
        }
    }

     //Elimina un registro de Contaminante
    public async destroy({params}:HttpContextContract){
        const {id}=params;
        const contaminante=await Contaminante.find(id);
        await contaminante?.delete();
        return contaminante;
    }
}
