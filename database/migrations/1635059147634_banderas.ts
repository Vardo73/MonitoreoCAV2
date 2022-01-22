import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Banderas extends BaseSchema {
  protected tableName = 'banderas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tipo_id').unsigned().references('id').inTable('tipo_bs');
      table.integer('contaminante_id').unsigned().references('id').inTable('contaminantes');
      table.string('name',25).unique().notNullable();
      table.string('description').notNullable();
      table.float('lim_oms').notNullable();
      table.float('lim_nom').notNullable();
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
