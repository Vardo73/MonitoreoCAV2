import { BaseTask } from 'adonis5-scheduler/build'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'
import Emailer from 'App/Methods/email'
import Logic from 'App/Methods/Logic'
const emailer=new Emailer()
const logic=new Logic()

export default class EmailTask extends BaseTask {
    public static get schedule() {
		//return '0 15 * * * *'
        return '0 0 8 * * *'
	}
    
	public static get useLock() {
		return false
	}

    public async handle() {
        this.queryStation()
    }

    public async queryStation(){
        const stations=await Database
        .from('stations')
        .select('*')
        .whereRaw('stations.active=? ',[true])
        
        let datStations:any[]=[]

        //let day=moment().format('2022-05-15')
        let day=moment().subtract(1, 'days').format('YYYY-MM-DD').toString();

        if(stations.length>0){
            let i=0;
			while (i<stations.length){
                //console.log(stations[i].name)
                let averageDayStation=await logic.averageDay(stations[i].id,day)
                if(averageDayStation!=null){
                    datStations.push(averageDayStation)
                }
                i++;
            }
        }
        emailer.sendMail(datStations,day)
    }
}