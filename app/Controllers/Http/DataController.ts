import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Station from 'App/Models/Station'
import Logic from 'App/Methods/Logic';
import moment from 'moment';

export default class DataController {
    public async show({view}:HttpContextContract){
        const stations=await Station.all()

        return view.render('admin/report',{stations});
    }

    public async reportDayJson({request}:HttpContextContract){
        const station_id=request.input('station_id');
        const date=request.input('date');

        try{
            const data=await Database.from('data')
            .join('stations', (query) => {
                query
                .on('stations.id', '=', 'data.station_id')
            })
            .select('stations.name')
            .select('data.average_pm2')
            .select('data.average_pm10')
            .select('data.created_at')
            .where('data.created_at','like','%'+date+'%')
            .andWhereRaw('data.station_id=? ',[station_id])
            .orderBy([{ column: 'created_at', order: 'asc' }])

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


            const data=await Database.from('data')
            .join('stations', (query) => {
                query
                .on('stations.id', '=', 'data.station_id')
            })
            .select('stations.name')
            .select('data.average_pm2')
            .select('data.average_pm10')
            .select('data.created_at')
            .where('data.created_at','like','%'+date+'%')
            .andWhereRaw('data.station_id=? ',[station_id])
            .orderBy([{ column: 'created_at', order: 'asc' }])

            let i=0;
            while (i<data.length) {
                data[i].created_at=moment(data[i].created_at).format()
                let date=data[i].created_at;
                let hour=moment(date).format('HH')
                data[i].hour=hour;
                i++;
            }

            let day=moment(date).format('YYYY-MM-DD')

            return view.render('admin/reportDay',{station,data,day});

        }catch(error){
            return error
        }
    }
    
    public async reportMonthJson({request}:HttpContextContract){
        const station_id=request.input('station_id');
        const date=request.input('date');

        try{
            const logic= new Logic();
            let data=await logic.averageMonth(station_id,date);            

            return JSON.stringify(data);
        }catch(error){
            return error
        }
    }

    
    public async reportMonthHTML({view,request}:HttpContextContract){
        const station_id=request.param('station_id');
        const date=request.param('date');
        try{
            
            const station=await Station.findOrFail(station_id);

            const logic= new Logic();
            let data=await logic.averageMonth(station_id,date);  
             
            let i=0;
            while (i<data.length) {
                data[i].created_at=moment(data[i].created_at).format()
                let date=data[i].created_at;
                let day=moment(date).format('DD')
                data[i].day=day;
                i++;
            }

            let month=moment(date)

            return view.render('admin/reportMonth',{station,data,month});

        }catch(error){
            return error
        }
    }
}
