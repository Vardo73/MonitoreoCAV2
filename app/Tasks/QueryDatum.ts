import { BaseTask } from 'adonis5-scheduler/build'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'
import Axios from 'axios'
import Datum from 'App/Models/Datum'
import Emailer from 'App/Methods/email'

/* Datos generales del monitor
https://www.purpleair.com/json?key=7X87EFT46TOH2OL9&show=39465
*/

/*Datos Capturados por el monitor
https://api.thingspeak.com/channels/'+station[i].channel+'/feeds.json?api_key='+
	station[i].apikey+'&average=60&timezone=America/Mazatlan&start='
	+fecha+'%20'+hora+':00:00&end='+fecha+'%20'+hora+':00:00&round=2
*/


export default class QueryDatum extends BaseTask {
	public static get schedule() {
		return '0 15 * * * *'
	}
	/*
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	*/
	public static get useLock() {
		return false
	}

	public async handle() {


		//Manual para rango de dias de un mes
		//this.date(17,18,'07')

		//Proceso automatico
		let hour=moment().format('HH');
		let date=moment().format('YYYY-MM-DD');
    	this.RequestPurpleAirCurrent(hour,date)
  	}

	public async date(pstart,plimit,pmonth){

		let limit=plimit
		let start=pstart
	
		let year='2022';
		let month=pmonth
		let day='';
	
		let date=''
	
		console.log('Inicio de capturar el mes '+month);
	
		try {
		  while (start<=limit) {
			day='';
			if (start<10) {
				day='0'
			}
	
			day+=start;
			date=year+'-'+month+'-'+day;
	
			console.log(date);
			await this.RequestPurpleAirAll(date);
	
			start++;
		  }
		  console.log('Terminó te capturar el mes '+month);
		} catch (error) {
		  return error;
		}
	}

	  
	  
	public async RequestPurpleAirCurrent(hour:string,date:string){
		try{

			const stations=await Database
			.from('stations')
			.select('*')
            .whereRaw('stations.active=? ',[true])

			if(stations.length>0){
				let i=0;
				while (i<stations.length){
					let url='https://api.thingspeak.com/channels/'+stations[i].channel+'/feeds.json?api_key='+
					stations[i].apikey+'&average=60&timezone=America/Mazatlan&start='
					+date+'%20'+hour+':00:00&end='+date+'%20'+hour+':07:00&round=2';


					let query=await Axios.get(url);

					if(query){
						let pet=query.data;
						let l=0;
						let created;

						while (l<pet.feeds.length){
							if(pet.feeds[l].hasOwnProperty('field2') && pet.feeds[l].hasOwnProperty('field3')){
								created=pet.feeds[l].created_at
								let average_pm2=parseFloat(pet.feeds[l].field2);
								let average_pm10=parseFloat(pet.feeds[l].field3);

								if(pet.feeds[l].field2!=null && pet.feeds[l].field3!=null){    
									const data=await Datum.create({
										station_id:stations[i].id,
										average_pm2:average_pm2,
										average_pm10:average_pm10,
										createdAt:created
									})
								}
							}
							l++;
						}
					}
					i++;
				}
			}

		} catch (error) {
		  console.log(error)
	    }
	}

	public async RequestPurpleAirAll(date:string){
		try{
			const stations=await Database
			.from('stations')
			.select('*')
            .whereRaw('stations.active=? ',[true])

			if(stations.length>0){
				let i=0;
				while (i<stations.length){
					let url='https://api.thingspeak.com/channels/'+stations[i].channel+'/feeds.json?api_key='+
					stations[i].apikey+'&average=60&timezone=America/Mazatlan&start='
            		+date+'%2000:00:00'+'&end='+date+'%2023:07:00'+'&round=2';


					let query=await Axios.get(url);
					
					if(query){
						let pet=query.data;
						let l=0;
						let created;

						while (l<pet.feeds.length){
							if(pet.feeds[l].hasOwnProperty('field2') && pet.feeds[l].hasOwnProperty('field3')){
								created=pet.feeds[l].created_at
								let average_pm2=parseFloat(pet.feeds[l].field2);
								let average_pm10=parseFloat(pet.feeds[l].field3);

								if(pet.feeds[l].field2!=null && pet.feeds[l].field3!=null){    
									const data=await Datum.create({
										station_id:stations[i].id,
										average_pm2:average_pm2,
										average_pm10:average_pm10,
										createdAt:created
									})
								}
							}
							l++;
						}
					}
					i++;
				}
			}

		} catch (error) {
		  console.log(error)
	    }
	}
}
