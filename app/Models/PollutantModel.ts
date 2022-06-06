import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PollutantModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public model_id: number

  @column()
  public pollutant_id: number

  @column.dateTime()
  public createdAt: DateTime
}
