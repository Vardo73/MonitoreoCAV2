import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AilmentPollutant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ailment_id: number

  @column()
  public pollutant_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
