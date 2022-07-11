import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Model from 'App/Models/Model';
import Station from 'App/Models/Station'
export default class StationsController {
    public async show({view}:HttpContextContract){
        const models=await Model.all()

        const stations=await Database
            .from('stations')
            .join('models', (query) => {
                query
                .on('stations.model_id', '=', 'models.id')
            })
            .select('stations.id')
            .select('stations.slug')
            .select('stations.name ')
            .select('stations.channel')
            .select('stations.apikey')
            .select('stations.longitude')
            .select('stations.latitude')
            .select('stations.active')
            .select('models.name as nomM')
            .select('models.id as idM')
            .select('stations.suburb')
        
        const relacion=await Database
        .from('pollutant_models')
        .join('pollutants', (query) => {
            query
            .on('pollutants.id', '=', 'pollutant_models.pollutant_id')
        })
        .select('pollutant_models.pollutant_id')
        .select('pollutants.name')
        .select('pollutant_models.model_id')

        return view.render('admin/station',{stations,models,relacion});
    }

    public async store({request}:HttpContextContract){
        try {
            const station= await Station.create({
                slug:request.input('slug'),
                model_id: request.input('model_id'),
                name: request.input('name'),
                channel: request.input('channel'),
                apikey: request.input('apikey'),
                longitude: request.input('longitude'),
                latitude: request.input('latitude'),
                active:request.input('active'),
                suburb:request.input('suburb')
            });

            
            return 'Estación registrada con exito.';

        } catch (error) {
            console.log(error)
            return error
        }
    }

    
    public async delete({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const station=await Station.findOrFail(id);
            

            await Database.from('data')
            .whereRaw('data.station_id=? ',[id]).delete();
            
            await station.delete();
            return 'Estación eliminada con exito.'
        } catch (error) {
            console.log(error);
            return error
        }
    }

    public async showStation({request}:HttpContextContract){
        const id=request.input('id');
        try {
            const station=await Station.findOrFail(id);
            return station;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    
    public async edit({request}:HttpContextContract){
        try {

            const station= await Station.findOrFail(request.input('id'))
            station.name=request.input('name');
            station.slug=request.input('slug');
            station.channel=request.input('channel');
            station.apikey=request.input('apikey');
            station.model_id=request.input('model_id');
            station.active=request.input('active');
            station.suburb=request.input('suburb');
            station.latitude=request.input('latitude');
            station.longitude=request.input('longitude');

            await station.save();
            
            
            return 'Estación editada con exito.'

        } catch (error) {
            console.log(error);
            return error
        }
    }
}
