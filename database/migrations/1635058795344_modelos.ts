import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Modelos extends BaseSchema {
  protected tableName = 'modelos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',25).notNullable().unique();
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
