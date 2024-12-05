 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> } 
  */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
//};

export async function seed(knex) {
  await knex('vendors').insert([
    {id: 1,  name: 'CHC vendor', location: 'Christchurch', description: 'Fantastic food' },
    {id: 2, name: 'WLG vendor', location: 'Wellington', description: 'Beautiful balloons' },
    {id: 3, name: 'AKL vendor', location: 'Auckland', description: 'Excellent entertainment' },
  ]);
};