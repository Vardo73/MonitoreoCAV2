import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Datum from 'App/Models/Datum'
import Station from 'App/Models/Station'
import moment from 'moment'

export default class DataController {
    public async show({view}:HttpContextContract){
        const stations=await Station.all()
        return view.render('admin/report',{stations});
    }
    
    public async showJson({view}:HttpContextContract){
        return view.render('admin/json');
    }
    

    public async reportDayJson({request}:HttpContextContract){
        const station_id=request.input('station_id');
        const date=request.input('date');

        try{
            const station=await Station.findOrFail(station_id);
            let year=parseFloat(moment(date).format('YYYY'))
            let month=parseFloat(moment(date).format('MM'))
            let day1=parseFloat(moment(date).format('DD'))
            
            const dat=await Database.rawQuery(`
            Select data.average_pm2 as average_pm2,data.average_pm10 as average_pm10,hour(data.created_at) as hour,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year  and month(data.created_at)=:month and day(data.created_at)=:day
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month,
                    day:day1
                }
            )          
            let data=dat[0]

            return JSON.stringify(data);

        }catch(error){
            return error
        }
    }


    public async reportDayHTML({view,request}:HttpContextContract){
        const station_id=request.param('station_id');
        const date=request.param('date');
        try{
            
            const station=await Station.findOrFail(station_id);
            let year=parseFloat(moment(date).format('YYYY'))
            let month=parseFloat(moment(date).format('MM'))
            let day1=parseFloat(moment(date).format('DD'))

            const dat=await Database.rawQuery(`
            Select data.average_pm2 as average_pm2,data.average_pm10 as average_pm10,hour(data.created_at) as hour,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year  and month(data.created_at)=:month and day(data.created_at)=:day
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month,
                    day:day1
                }
            )          
            let data=dat[0]

            let day=moment(date).format('YYYY-MM-DD')

            return view.render('admin/reportDay',{station,data,day});

        }catch(error){
            return error
        }
    }
    
    public async reportMonthJson({request}:HttpContextContract){
        const station_id:string=request.input('station_id');
        const date:string=request.input('date');
        
        console.log('------Parametros de entrada JSON----------')
        console.log('Fecha: '+date)
        console.log('Estacion ID: '+station_id)
        try{
            const station=await Station.findOrFail(station_id);
            let year=parseFloat(moment(date).format('YYYY'))
            let month=parseFloat(moment(date).format('MM'))

            const dat=await Database.rawQuery(`
            Select round(avg(data.average_pm2),2) as average_pm2,round(avg(data.average_pm10),2) as average_pm10,count(day(data.created_at)) as total_hours,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year and month(data.created_at)=:month
            group by day(data.created_at), month(data.created_at)
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month
                }
            )          
            let data=dat[0]
            //console.log(JSON.stringify(data))
            
            return JSON.stringify(data);
        }catch(error){
            return error
        }
    }
    
    public async reportCalendarJson({request}:HttpContextContract){
        const station_id:string=request.input('station_id');
        const year:number=request.input('year');
        const month:number=request.input('month');


        try {
            const station=await Station.findOrFail(station_id);

            const dat=await Database.rawQuery(`
            Select round(avg(data.average_pm2),2) as average_pm2,round(avg(data.average_pm10),2) as average_pm10,count(day(data.created_at)) as total_hours,data.created_at as fecha,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug, stations.id as station_id
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year and month(data.created_at)=:month
            group by day(data.created_at), month(data.created_at)
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month
                }
            )          
            let data=dat[0]

            
            return JSON.stringify(data);
        } catch (error) {
            return error
        }
    }
    
    public async reportMonthHTML({view,request}:HttpContextContract){
        const station_id:string=request.param('station_id');
        const date:string=request.param('date');
       /* console.log('------Parametros de entrada HTML----------')
        console.log('Fecha: '+date)
        console.log('Estacion ID: '+station_id)*/
        try{
            const station=await Station.findOrFail(station_id);
            let year=parseFloat(moment(date).format('YYYY'))
            let month1=parseFloat(moment(date).format('MM'))

            const dat=await Database.rawQuery(`
            Select round(avg(data.average_pm2),2) as average_pm2,round(avg(data.average_pm10),2) as average_pm10,count(day(data.created_at)) as total_days,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year and month(data.created_at)=:month
            group by day(data.created_at), month(data.created_at)
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month1
                }
            )          
            let data=dat[0]
            
            let month=moment(date);

            return view.render('admin/reportMonth',{station,data,month});

        }catch(error){
            return error
        }
    }

    public async reportYearHTML({view, request}:HttpContextContract){
        const station_id:string=request.param('station_id');
        const date:string=request.param('date');
        /*console.log('------Parametros de entrada HTML----------')
        console.log('Fecha: '+date)
        console.log('Estacion ID: '+station_id)*/
        try{
            const station=await Station.findOrFail(station_id);
            let year=moment(date)

            return view.render('admin/reportYear',{station,year});

        }catch(error){
            return error
        }
    }

    public async reportYearJson({ request}:HttpContextContract){
        const station_id:string=request.input('station_id');
        const date:string=request.input('date');
        /*console.log('------Parametros de entrada JSON----------')
        console.log('Fecha: '+date)
        console.log('Estacion ID: '+station_id)*/
        try{
            const station=await Station.findOrFail(station_id);
            let year=parseFloat(date)
            const dat=await Database.rawQuery(`
            Select round(avg(data.average_pm2),2) as average_pm2,round(avg(data.average_pm10),2) as average_pm10,count(day(data.created_at)) as total_days,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year
            group by day(data.created_at), month(data.created_at)
            `,
                {
                    id:station.slug,
                    year:year,
                }
            )          
            let data=dat[0]
            return JSON.stringify(data);

        }catch(error){
            return error
        }

    }

    async API(){
        try{
            const datos=await Database.from('data')
            .join('stations', (query) => {
                query
                .on('stations.id', '=', 'data.station_id')
            })
            .select('stations.slug as estacion_id','data.average_pm2 as promedio_PM2','data.average_pm10 as promedio_PM10','data.created_at')
            .orderBy([{ column: 'data.created_at', order: 'desc' }])
            .limit(2520);

            let i=0;
            while (i<datos.length) {
                datos[i].created_at=moment(datos[i].created_at).format()
                let fec=datos[i].created_at;
                let h=moment(fec).format('HH')

                datos[i].hora=h;
                datos[i].datodiario_id=23;
                i++;
            }
            return datos;
        }
        catch(error){
            return error;
        }
    }

    public async calendar({view}:HttpContextContract){
        try{
            const stations=await Database
            .from('stations')
            .select('stations.id')
            .select('stations.slug')
            .select('stations.name');

            return view.render('admin/calendar',{stations});
        }catch(error){
            return error
        }
    }

    public async storeDataFwop({request}:HttpContextContract){
        try {
            let obj=request.input('obj');

            let i=0;
            while (i<obj.length) {
                let slug=parseInt(obj[i].ID)
                const station = await Station.findBy('slug',slug);
                if(!station){
                    throw new Error(`Monitor ${slug} no ha sido registrado.`);
                }
                i++;
            }


            obj.forEach(async element => {
                let slug=parseInt(element.ID)
                const station = await Station.findBy('slug',slug);

                await Datum.create({
                    station_id: station?.id,
                    average_pm2:element.PM25,
                    average_pm10:element.PM10,
                    createdAt:element.Date
                });
            });

            return 'Datos capturados exitosamente.';
        } catch (error) {
            console.log(error)
            return [error.name,error.message]
        }
    }

    public async dataHAppMovil({request}:HttpContextContract){
        let id_station= request.input('id_station');
        let date= request.input('date');
        try {
            
            let data=await Database.from('data')
            .join('stations', (query) => {
                query
                .on('data.station_id', '=', 'stations.id')
            })
            .select('data.average_pm2')
            .select('data.average_pm10')
            .select('data.created_at')
            .where('data.created_at','like','%'+date+'%')
            .andWhereRaw('stations.slug=? ',[id_station])
            .orderBy([{ column: 'created_at', order: 'asc' }])

            return data
        } catch (error) {
            return error
        }
    }
    
    public async dataMAppMovil({request}:HttpContextContract){
        const id_station:string=request.input('id_station');
        const date:string=request.input('date');
        
        try{
            const station=await Station.findByOrFail('slug', id_station);
            let year=parseFloat(moment(date).format('YYYY'))
            let month=parseFloat(moment(date).format('MM'))

            const dat=await Database.rawQuery(`
            Select round(avg(data.average_pm2),2) as average_pm2,round(avg(data.average_pm10),2) as average_pm10,count(day(data.created_at)) as total_hours,day(data.created_at) as day,
            month(data.created_at) as month, year(data.created_at) as year, stations.name as name, stations.slug as slug
            FROM monitoreocav2.data, monitoreocav2.stations
            where data.station_id=stations.id and stations.slug=:id and year(data.created_at)=:year and month(data.created_at)=:month
            group by day(data.created_at), month(data.created_at)
            `,
                {
                    id:station.slug,
                    year:year,
                    month:month
                }
            )          
            let data=dat[0]
            //console.log(JSON.stringify(data))
            
            return JSON.stringify(data);
        }catch(error){
            return error
        }
    }
}
