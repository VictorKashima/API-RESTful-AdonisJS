import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Coment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userName: string

  @column()
  public userComment: string

  @column()
  public day_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}