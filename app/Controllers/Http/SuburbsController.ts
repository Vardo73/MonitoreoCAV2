import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pollutant from 'App/Models/Pollutant'
import Suburb from 'App/Models/Suburb'
import SuburbPollutant from 'App/Models/SuburbPollutant'
import Database from '@ioc:Adonis/Lucid/Database';

export default class SuburbsController {

    public async show({view}:HttpContextContract){
        const suburbs=await Suburb.all();
        const pollutants=await Pollutant.all();

        const relacion=await Database
        .from('suburb_pollutants')
        .join('pollutants', (query) => {
            query
            .on('pollutants.id', '=', 'suburb_pollutants.pollutant_id')
        })
        .select('suburb_pollutants.pollutant_id')
        .select('pollutants.name')
        .select('suburb_pollutants.suburb_id')


        return view.render('admin/suburb',{suburbs,pollutants,relacion});
    }

    public async store({request}:HttpContextContract){

        try {
            let pollutants= request.input('pollutants');
            const suburb= await Suburb.create({
                name: request.input('name'),
                longitude: request.input('longitude'),
                latitude: request.input('latitude')
            });
            let idS=suburb.id

            pollutants.forEach(async element => {
                await SuburbPollutant.create({
                    suburb_id: idS,
                    pollutant_id:element
                });
            });

            return 'Colonia registrada con exito.';

        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const suburb=await Suburb.findOrFail(id);

            await Database.from('suburb_pollutants')
            .whereRaw('suburb_pollutants.suburb_id=? ',[id]).delete();
            
            await suburb.delete();
            await Database.rawQuery('ALTER TABLE monitoreocav2.suburbs AUTO_INCREMENT = ?', [id])
            return 'Colonia eliminada con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }

    
    public async showSuburb({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const suburb=await Suburb.findOrFail(id);
            const relacion=await Database
            .from('suburb_pollutants')
            .select('suburb_pollutants.pollutant_id')
            .whereRaw('suburb_pollutants.suburb_id=? ',[id])


            return [suburb,relacion]

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    public async edit({request}:HttpContextContract){
        const id=request.input('id');
        const name=request.input('name');
        const latitude=request.input('latitude');
        const longitude=request.input('longitude');
        
        let pollutants= request.input('pollutants');
        let aux: any[]=[];
        try {
            
            const suburb=await Suburb.findOrFail(id);
            suburb.name=name;
            suburb.latitude=latitude;
            suburb.longitude=longitude;
            
            await suburb.save()

            
            const relacion=await Database
            .from('suburb_pollutants')
            .select('suburb_pollutants.pollutant_id')
            .select('suburb_pollutants.id')
            .whereRaw('suburb_pollutants.suburb_id=? ',[id])

            relacion.forEach( async element => {
                aux.push(element.pollutant_id)
                if(!pollutants.includes(element.pollutant_id)){
                    const sub=await SuburbPollutant.findOrFail(element.id);
                    await sub.delete();
                }
            });

            pollutants.forEach( async element => {
                if(!aux.includes(element)){
                    await SuburbPollutant.create({
                        pollutant_id: element,
                        suburb_id:id
                    });
                }
            });


            return 'Colonia actualizada con exito.';

        } catch (error) {
            console.log(error)
            return error
        }
    }

    public async showMap({view}:HttpContextContract){
        return view.render('airelimpio/mapSuburb');
    }

    
    public async SuburbMap(){
        const suburbs=await Suburb.all();
        return suburbs;
    }


    
    public async SubPoll({request}:HttpContextContract){
        const suburb_id=request.param('suburb_id');
       try {
            const pollutants=await Database
            .from('suburb_pollutants')
            .join('pollutants', (query) => {
                query
                .on('pollutants.id', '=', 'suburb_pollutants.pollutant_id')
            })
            .select('suburb_pollutants.suburb_id')
            .select('suburb_pollutants.pollutant_id ')
            .select('pollutants.name')
            .select('pollutants.description')
            .whereRaw('suburb_pollutants.suburb_id=?',[suburb_id])
        
                
            return pollutants;
       } catch (error) {
            console.log(error)
            return error
       }
    }

}
