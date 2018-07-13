import hh from 'hyperscript-helpers';
import {h} from 'virtual-dom';
import { showFormMsg, mealInputMsg, caloriesInputMsg, saveMealMsg } from './update.js';
import * as R from 'ramda';

const { pre, div, h1, button, form, label, input, td, tr, th, tbody, table, thead } = hh(h);

function fieldSet(labelText, inputValue, oninput){
	return div([
		label({className: 'db mb1'}, labelText),
		input({className: 'pa2 input-reset ba w-100 mb2', type: 'text', value: inputValue, oninput})
	]);
}

function buttonSet(dispatch){
	return div([
		button({ 
			className: 'f3 pv2 ph3 bg-blue white bn mr2 dim', 
			type: 'submit',
		}, 
		'Save',
		),
		button({ 
			className: 'f3 pv2 ph3 bn bg-light-gray dim', 
			type: 'button',
			onclick: () => dispatch(showFormMsg(false))
		}, 
		'Cancel'
		)
	]);
}
function formView(dispatch, model){
	const { description, calories, showForm } = model;
	if(showForm){
		return form({
		className: 'w-100 mv2',
		onsubmit: e => {
			e.preventDefault();
			dispatch(saveMealMsg);
		}
		}, 
		[
			fieldSet('Meal', description, e => dispatch(mealInputMsg(e.target.value)) ),
			fieldSet('Calories', calories || '', e => dispatch(caloriesInputMsg(e.target.value)) ),
			buttonSet(dispatch)
		]);
	}
	
	return button(
				{
					className: 'f3 pv2 ph3 bn bg-blue white bn m42',
					onclick: () => dispatch(showFormMsg(true))
				}, 
				'Add Meal');
}

function cell(tag, className, value){
	return tag({className}, value);
}

const tableHeader = thead([
	tr([
		cell(th, 'pa2 tl', "MEAL"),
		cell(th, 'pa2 tr', "CALORIES"),
		cell(th, "", "")
	])
])

function mealRow(dispatch, className, meal){
	return tr({className}, [
		cell(td, 'pa2', meal.description),
		cell(td, 'pa2 tr', meal.calories),
		cell(td, 'pa2 tr', [])
	]);
}

function totalRow(meals){
	const total = R.pipe(
		R.map(meal => meal.calories),
		R.sum,
	)(meals);
	return tr({ className: 'bt b' }, [
		cell(td, 'pa2 tl', 'Total'),
		cell(td, 'pa2 tr', total),
		cell(td, "", "")
	]);
}

function mealBody(dispatch, className, meals){
	const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);
	const rowWithTotal = [...rows, totalRow(meals)];
	return tbody({className}, rowWithTotal);
}

function tableView(dispatch, meals){
	if(meals.length === 0){
		return div({className: 'mv2 i black-50'}, "No meals to display");
	}
	return table({className: 'mv2 w-100 collapse'}, [
		tableHeader,
		mealBody(dispatch, '', meals)
	]);
}

function view (dispatch, model){
	return div ({ className: 'mw6 center'}, [
		h1({className: 'f2 pv2 bb'}, 'Calorie Counter'),
		formView(dispatch, model),
		tableView(dispatch, model.meals),
		pre(JSON.stringify(model, null, 2))
	]);
}

export default view;