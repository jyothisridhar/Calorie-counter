import * as R from 'ramda'

const MSGS = {
	SHOW_FORM: 'SHOW_FORM',
	MEAL_INPUT: 'MEAL_INPUT',
	CALORIES_INPUT: 'CALORIES_INPUT'
};

export function showFormMsg(showForm){
	return {
		type: MSGS.SHOW_FORM,
		showForm
	};
}

export function mealInputMsg(description){
	return {
		type: MSGS.MEAL_INPUT,
		description
	};
}

export function caloriesInputMsg(calories){

	return {
		type: MSGS.CALORIES_INPUT,
		calories
	};
}

function update(msg, model){
	switch(msg.type){
		case MSGS.SHOW_FORM:{
			const { showForm } = msg;
			return {...model, showForm, description:'', calories: 0};
		}
		case MSGS.MEAL_INPUT: {
			const { description } = msg;
			return {
				...model, description
			};
		}
		case MSGS.CALORIES_INPUT: {
			const calories = R.pipe(
				parseInt,
				R.defaultTo(0)
			)(msg.calories);
			return { ...model, calories};
		}
	}
	return model;
}

export default update;