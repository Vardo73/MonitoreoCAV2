import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StationSponsor extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public station_id: number

  @column()
  public sponsor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
