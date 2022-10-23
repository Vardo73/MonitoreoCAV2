import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Location from 'App/Models/Location'
import Ailment from 'App/Models/Ailment'
import Database from '@ioc:Adonis/Lucid/Database';

export default class LocationsController {
    public async show({view}:HttpContextContract){

        const locations=await Location.all();

        
        return view.render('admin/location',{locations});
    }


    
    public async store({request}:HttpContextContract){

        try {
            const location= await Location.create({
                name: request.input('name'),
                longitude: request.input('longitude'),
                latitude: request.input('latitude'),
                suburb: request.input('suburb')
            });

            return 'Unidad médica registrada con exito.';

        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const location=await Location.findOrFail(id);

            await location.delete();
            await Database.rawQuery('ALTER TABLE monitoreocav2.locations AUTO_INCREMENT = ?', [id])

            return 'Unidad médica eliminada con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const longitude=request.input('longitude');
        const latitude=request.input('latitude');
        const suburb=request.input('suburb');
        try {
            
            const location=await Location.findOrFail(id);
            location.name=name;
            location.longitude=longitude;
            location.latitude=latitude;
            location.suburb=suburb;
            
            await location.save()


            return 'Unidad médica actualizada con exito.';

        } catch (error) {
            console.log(error)
            return error
        }
    }

    public async LocationsMap(){
        const locations=await Database
        .from('locations')
        .select('locations.id')
        .select('locations.name')
        .select('locations.longitude')
        .select('locations.latitude')
        .select('locations.suburb')

        return locations;
    }

    public async LocAil({request}:HttpContextContract){
        const location_id=request.param('location_id');
        let poll='';
       try {
            const locations=await Database
            .from('ail_los')
            .join('ailments', (query) => {
                query
                .on('ailments.id', '=', 'ail_los.ailment_id')
            })
            .select('ail_los.location_id')
            .select('ail_los.ailment_id ')
            .select('ailments.name')
            .select('ail_los.total')
            .whereRaw('ail_los.location_id=?',[location_id])

            const ailments=await Database
            .from('ailments')
            .select('*')

            const relacion=await Database
            .from('ailment_pollutants')
            .join('pollutants', (query) => {
                query
                .on('pollutants.id', '=', 'ailment_pollutants.pollutant_id')
            })
            .select('ailment_pollutants.pollutant_id')
            .select('pollutants.name')
            .select('ailment_pollutants.ailment_id')


            ailments.forEach(async ailment => {
                relacion.forEach(async rel => {
                    if(ailment.id==rel.ailment_id){
                        poll+=rel.name+', '
                    }
                }); 

                locations.forEach(async loc => {
                    if(loc.ailment_id==ailment.id){
                        loc.pollutans=poll
                    }
                });

                poll='';
            });
            
        
                
            return locations
       } catch (error) {
            console.log(error)
            return error
       }
    }

    public async showMap({view}:HttpContextContract){
        return view.render('airelimpio/mapAil');
    }
}
