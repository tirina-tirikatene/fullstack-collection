/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable(); // Event name
    table.string('category'); // Event category
    table.string('location'); // Optional location field
    table.text('description'); // Optional description field
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('events');
}
