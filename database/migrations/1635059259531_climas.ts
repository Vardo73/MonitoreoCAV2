import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Climas extends BaseSchema {
  protected tableName = 'climas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('localidad_id').references('id').inTable('localidads')
      table.float('velViento',8,2)
      table.integer('dirViento',5)
      table.float('temperatura',8,2)
      table.float('humedad',8,2)
      table.float('hPa',8,2)
      table.float('radiacion',8,2)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
