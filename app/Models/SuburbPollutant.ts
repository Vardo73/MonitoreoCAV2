import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SuburbPollutant extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public suburb_id: number

  @column()
  public pollutant_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
