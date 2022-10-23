import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ail_los'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('location_id').unsigned().references('id').inTable('locations');
      table.integer('ailment_id').unsigned().references('id').inTable('ailments');
      table.integer('year',4).unsigned();
      table.integer('total',4).unsigned();
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
