import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contaminante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
