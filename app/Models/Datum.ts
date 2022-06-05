import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Datum extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public station_id: number

  @column()
  public average_pm2: number

  @column()
  public average_pm10: number

  @column.dateTime()
  public createdAt: DateTime
}
