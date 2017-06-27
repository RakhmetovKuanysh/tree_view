import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './Tree';
import './index.css';

const rootEl = document.getElementById('root');

const st = [
	{
        id: 1,
        name: "1",
        description: "Описание темы 1",
        parId: 0,
    },
    {
        id: 2,
        name: "1.1",
        description: "Описание подтемы 1",
        parId: 1,
    },
	{
    	id: 5,
    	name: "1.1.1",
    	description: "Описание подтемы 1",
    	parId: 2,
    },
    {
    	id: 6,
    	name: "1.1.2",
    	description: "Описание подтемы 2",
    	parId: 2,
    },
    {
    	id: 7,
    	name: "1.1.3",
    	description: "Описание подтемы 3",
    	parId: 2,
    },
    {
        id: 3,
        name: "1.2",
        description: "Описание подтемы 2",
        parId: 1,
    },
	{
		id: 8,
		name: "1.2.1",
    	description: "Описание подтемы 1",
    	parId: 3,
	},
	{
		id: 9,
		name: "1.2.2",
    	description: "Описание подтемы 2",
    	parId: 3,
    },
	{
		id: 10,
		name: "1.2.3",
    	description: "Описание подтемы 3",
    	parId: 3,
	},
    {
        id: 4,
        name: "1.3",
        description: "Описание подтемы 3",
        parId: 1,
    },
	{
		id: 11,
		name: "1.3.1",
    	description: "Описание подтемы 1",
    	parId: 4,
    },
	{
		id: 20,
		name: "1.3.1.1",
		description: "hrhrh",
		parId: 11,
	},
	{
		id: 21,
		name: "1.3.1.1.1",
		description: "hrhrh",
		parId: 20,
	},
	{
		id: 12,
		name: "1.3.2",
		description: "Описание подтемы 2",
		parId: 4,
	},
	{
		id: 13,
		name: "1.3.3",
    	description: "Описание подтемы 3",
    	parId: 4,
	},
    {
    	id: 14,
    	name: "2",
    	description: "Описание темы 2",
    	parId: 0,
    },
];

ReactDOM.render(
	<Tree chapter={st}/>,
	rootEl
)
