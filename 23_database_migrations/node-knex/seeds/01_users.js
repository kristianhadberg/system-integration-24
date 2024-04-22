/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users2").del();
    await knex("users2").insert([
        { id: 1, first_name: "Admin", last_name: "Adminson" },
        { id: 2, last_name: "John" },
        { id: 3, first_name: "Doe", last_name: "Stinger" },
    ]);
};
