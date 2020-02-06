const db = require('../data/db-config.js');

function find() {
	return db('schemes');
}

function findById(id) {
	return db('schemes').where({ id });
}

async function findSteps(id) {
	return db('schemes')
			.join('steps', 'steps.scheme_id', 'schemes.id')
			.where({ scheme_id: id })
			.select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
			.orderBy('steps.step_number')
}

async function add(scheme) {
	const id = await db("schemes").insert(scheme)
	return findById(id[0]);
}

async function update(changes, id) {
	await db('schemes')
		.where({ id })
		.update(changes)
	return findById(id);
}

async function remove(id) {
	const scheme = await findById(id);
	const removed = await db('schemes').where({ id }).del();
	return removed ? scheme : null;
}


module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
}