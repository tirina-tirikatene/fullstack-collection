/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary(); 
    table.string('name').notNullable(); 
    table.string('category');
    table.string('location'); 
    table.text('description'); 
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('events');
}

