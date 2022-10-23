import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public longitude: number

  @column()
  public latitude: number

  @column()
  public suburb: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
