import { BaseTask } from 'adonis5-scheduler/build'
import Database from '@ioc:Adonis/Lucid/Database'
import Emailer from 'App/Methods/email'
import Logic from 'App/Methods/Logic'
import moment from 'moment'
const emailer=new Emailer()
const LIM_PM2=35.5 ;
const LIM_PM10=155;
const logic=new Logic()
let flagEmail=false;
let hrSend:moment.Moment;



export default class Subscriber extends BaseTask {
	public static get schedule() {
		//return '0 0 * * * *'
		return '0 */15 * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() { 
		this.querySubs()
  	}

	public async querySubs(){
		let alert=false;
		const stations=await Database
        .from('stations')
        .select('*')
        .whereRaw('stations.active=? ',[true]);

		const subscribers=await Database
        .from('subscribers')
        .select('email');

		let suburb='';

		let subs=subscribers.map(x=>x.email)

		if(stations.length<=0) return false;

		let i=0;
		while (i<stations.length){
			let url= `https://api.purpleair.com/v1/sensors/${stations[i].slug}`
			let query=await logic.QueryPurple(url)
			if (query[0]){
				let data=query[1].data.sensor;
				let average_pm2=parseFloat(data["pm2.5"]);
				let average_pm10=parseFloat(data["pm10.0"]);
				if(average_pm2>=LIM_PM2 || average_pm10>=LIM_PM10 ){
					suburb=stations[i].suburb;
					alert=true;
					break;
				}
			}
			i++;
		}

		if(!alert) return false;

		if (flagEmail){
			let a=moment();
			let dif= a.diff(hrSend,'hours')
			if(dif>=1){
				this.sendEmail(suburb,subs);
				hrSend=moment();
			}
		}else{
			this.sendEmail(suburb,subs);
			hrSend=moment();
			flagEmail=true;
		}
	}

	public async sendEmail(suburb,subscribers){
		let date=moment().format('MM-DD').toString();
		let hour=moment().format('LT'); 
		emailer.sendSubscribers(suburb,date,hour,subscribers)
	}
}
