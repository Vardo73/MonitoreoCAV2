import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AilLo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location_id: number

  @column()
  public ailment_id: number
  
  @column()
  public year: number
  
  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
