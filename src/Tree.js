import React, { Component } from 'react' 
import Leaf from './Leaf.js'

class Tree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chapter: [
				{
		            id: 1,
		            name: "1",
		            description: "Описание темы 1",
		            isOpened: false,
		            parId: 0,
		        },
		        {
		            id: 2,
		            name: "1.1",
		            description: "Описание подтемы 1",
		            isOpened:false,
		            parId: 1,
		        },
		    	{
	            	id: 5,
	            	name: "1.1.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	parId: 2,
	            },
	            {
	            	id: 6,
	            	name: "1.1.2",
	            	description: "Описание подтемы 2",
	            	isOpened:false,
	            	parId: 2,
	            },
	            {
	            	id: 7,
	            	name: "1.1.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	parId: 2,
	            },
		        {
		            id: 3,
		            name: "1.2",
		            description: "Описание подтемы 2",
		            isOpened:false,
		            parId: 1,
		        },
            	{
            		id: 8,
            		name: "1.2.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	parId: 3,
            	},
            	{
            		id: 9,
            		name: "1.2.2",
	            	description: "Описание подтемы 2",
	            	isOpened:false,
	            	parId: 3,
	            },
            	{
            		id: 10,
            		name: "1.2.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	parId: 3,
            	},
		        {
		            id: 4,
		            name: "1.3",
		            description: "Описание подтемы 3",
		            isOpened:false,
		            parId: 1,
		        },
            	{
            		id: 11,
            		name: "1.3.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	parId: 4,
	            },
        		{
        			id: 20,
        			name: "1.3.1.1",
        			description: "hrhrh",
        			isOpened: false,
        			parId: 11,
        		},
				{
					id: 21,
        			name: "1.3.1.1.1",
        			description: "hrhrh",
        			isOpened: false,
        			parId: 20,
				},
            	{
					id: 12,
					name: "1.3.2",
					description: "Описание подтемы 2",
					isOpened:false,
					parId: 4,
				},
            	{
            		id: 13,
            		name: "1.3.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	parId: 4,
	        	},
		        {
		        	id: 14,
		        	name: "2",
		        	description: "Описание темы 2",
		        	isOpened:false,
		        	parId: 0,
		        },
		    ]
		}
		this.getArray = this.getArray.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		let n = this.state.chapter.find(l => l.id === e);
		let tree2 = this.state.chapter.slice();
		n.isOpened = !n.isOpened;

		tree2.map(leaf => (
			leaf.id === e ? n : leaf
		))

		this.setState({
			chapter: tree2,
		})
		console.log(e);
	}

	getArray(e) {
		return this.state.chapter.filter(l => l.parId === e);
	}

	render() {
		let arr = this.state.chapter.filter(l => l.parId === 0);
		let list = arr.map(l => (
			<div className="parent">
				<h3>{l.name}</h3>
				<p>{l.description}</p>
				<button onClick={() => this.handleClick(l.id)}>Show</button>
				<hr/>
				<Leaf 
					key={l.id} 
					name={l.name}
					id={l.id}
					description={l.description} 
					children={l.children}
					isOpened={l.isOpened}
					changeClick={this.handleClick}
					getArray={this.getArray}
				/>
			</div>
		))
		return (
			<div className="leafs">
				{list}
			</div>
		);
	}
}

export default Tree