import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Suburb extends BaseModel {
  @column({ isPrimary: true })
  public id: number  

  @column()
  public name: string

  @column()
  public longitude: number

  @column()
  public latitude: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
