import Database from '@ioc:Adonis/Lucid/Database';
import moment from 'moment';

export default class Logic{
    public async averageMonth(station:string,date:string){
        
        //Sumatoria de los contaminantes
        let pm2=0
        let pm10=0
        let datum:any[]=[]
        //Optener los meses actual y siguiente
        let month=parseFloat(moment(date).format('MM'))
        let month2=month+1

        //Iniciar objeto fecha a inicio de mes
        let start=moment(moment(date).format('YYYY-MM').toString()+'-01')

        //console.log(start) 
        //date=moment(date).add(1, 'day').format('YYYY-MM-DD').toString()
        

        while(month<month2){
            //Optenemos la fecha en cormato YYYY-MM-DD como string
            let day=start.format('YYYY-MM-DD').toString()
            //console.log(day) 

            //Consulta a la base de datos del dia
            const data=await Database.from('data')
            .join('stations', (query) => {
                query
                .on('stations.id', '=', 'data.station_id')
            })
            .select('stations.name')
            .select('data.average_pm2')
            .select('data.average_pm10')
            .select('data.created_at')
            .where('data.created_at','like','%'+day+'%')
            .andWhereRaw('data.station_id=? ',[station])
            .orderBy([{ column: 'created_at', order: 'asc' }])

            if(data.length>0){
                let dat = {
                    name:'',
                    average_pm2:0,
                    average_pm10:0,
                    created_at:'',
                }

                //Sumar
                data.forEach(e=>{
                    dat.name=e.name
                    pm2+=e.average_pm2
                    pm10+=e.average_pm10
                    dat.created_at= moment(e.created_at).format('YYYY-MM-DD').toString()
                })

                //Promedio
                pm2=pm2/data.length
                pm10=pm10/data.length

                dat['average_pm2']=Math.round((pm2 + Number.EPSILON) * 100) / 100;
                dat['average_pm10']=Math.round((pm10 + Number.EPSILON) * 100) / 100;

                datum.push(dat)
            }
            //Le sumamos un dia
            start.add(1, 'day')
            //console.log(start.format('YYYY-MM-DD').toString()) 

            //Aumenta el contador si cambia de mes
            month=parseFloat(moment(start).format('MM'))
            
        }

        //console.log(datum)

        return datum
        
    }
} 