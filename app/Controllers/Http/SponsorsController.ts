import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Sponsor from 'App/Models/Sponsor'
import Database from '@ioc:Adonis/Lucid/Database';

export default class SponsorsController {
    public async show({view}:HttpContextContract){
       try { 
        const sponsors=await Sponsor.all();
        return view.render('admin/sponsor',{sponsors});
       } catch (error) {
        return view.render('errors/server-error');
       }
    }
    
    public async store({request}:HttpContextContract){
        
        const newSponsorSchema = schema.create({
            name:schema.string({},[
                rules.required()
            ]),
            logo:schema.string({},[
                rules.required()
            ])
        })
        
        try {
            await request.validate({ 
              schema: newSponsorSchema,
              messages: {
                required: 'El campo {{ field }} es requerido para registrar.'
              }
            })

      
            await Sponsor.create({
                name: request.input('name'),
                logo: request.input('logo')
            });

            return 'Patrocinador registrado con exito.';

        } catch (error) {
            //response.badRequest(error.messages)
            return error;
        }
    }

    public async delete({request}:HttpContextContract){
        try {
            const id=request.input('id');
            const sponsor=await Sponsor.findOrFail(id);

            await Database.from('station_sponsors')
            .whereRaw('station_sponsors.sponsor_id=? ',[id]).delete();
            
            await sponsor?.delete();
            
            await Database.rawQuery('ALTER TABLE monitoreocav2.sponsors AUTO_INCREMENT = ?', [id])
            return 'Patrocinador eliminado con exito.'
        } catch (error) {
            return error

        }
    }
}
