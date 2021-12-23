import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Localidads extends BaseSchema {
  protected tableName = 'localidads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id',10).primary();
      table.string('name',25).notNullable().unique();
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
