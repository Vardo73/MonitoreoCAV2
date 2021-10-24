import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Estacions extends BaseSchema {
  protected tableName = 'estacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary();
      table.integer('modelo_id').unsigned().references('id').inTable('modelos');
      table.string('name',25).notNullable();
      table.integer('channel',15).unique().notNullable();
      table.string('apikey',50).unique().notNullable();
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
