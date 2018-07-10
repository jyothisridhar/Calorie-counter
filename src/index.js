//console.log('It Worked!');

import initModel from './model';
import app from './App';
import update from './update';
import view from './view';

const node = document.getElementById('app');

app(initModel, update, view, node);

