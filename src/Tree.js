import React, { Component } from 'react' 
import Leaf from './Leaf.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Tree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chapter: [
				{
		            id: 1,
		            name: "1",
		            description: "Описание темы 1",
		            isOpened:false,
		            src: require("./right.png"),
		            parId: 0,
		        },
		        {
		            id: 2,
		            name: "1.1",
		            description: "Описание подтемы 1",
		            isOpened:false,
		            src: require('./right.png'),
		            parId: 1,
		        },
		    	{
	            	id: 5,
	            	name: "1.1.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 2,
	            },
	            {
	            	id: 6,
	            	name: "1.1.2",
	            	description: "Описание подтемы 2",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 2,
	            },
	            {
	            	id: 7,
	            	name: "1.1.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 2,
	            },
		        {
		            id: 3,
		            name: "1.2",
		            description: "Описание подтемы 2",
		            isOpened:false,
		            src: require('./right.png'),
		            parId: 1,
		        },
            	{
            		id: 8,
            		name: "1.2.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 3,
            	},
            	{
            		id: 9,
            		name: "1.2.2",
	            	description: "Описание подтемы 2",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 3,
	            },
            	{
            		id: 10,
            		name: "1.2.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 3,
            	},
		        {
		            id: 4,
		            name: "1.3",
		            description: "Описание подтемы 3",
		            isOpened:false,
		            src: require('./right.png'),
		            parId: 1,
		        },
            	{
            		id: 11,
            		name: "1.3.1",
	            	description: "Описание подтемы 1",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 4,
	            },
        		{
        			id: 20,
        			name: "1.3.1.1",
        			description: "hrhrh",
        			isOpened:false,
        			src: require('./right.png'),
        			parId: 11,
        		},
				{
					id: 21,
        			name: "1.3.1.1.1",
        			description: "hrhrh",
        			isOpened:false,
        			src: require('./right.png'),
        			parId: 20,
				},
            	{
					id: 12,
					name: "1.3.2",
					description: "Описание подтемы 2",
					isOpened:false,
					src: require('./right.png'),
					parId: 4,
				},
            	{
            		id: 13,
            		name: "1.3.3",
	            	description: "Описание подтемы 3",
	            	isOpened:false,
	            	src: require('./right.png'),
	            	parId: 4,
	        	},
		        {
		        	id: 14,
		        	name: "2",
		        	description: "Описание темы 2",
		        	isOpened:false,
		        	src: require('./right.png'),
		        	parId: 0,
		        },
		    ]
		}
		this.getArray = this.getArray.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.changeStringTit = this.changeStringTit.bind(this);
		this.changeStringDesc = this.changeStringDesc.bind(this);
	}

	handleClick(e){
		let n = this.state.chapter.find(l => l.id === e);
		let tree2 = this.state.chapter.slice();
		n.isOpened = !n.isOpened;
		(n.isOpened ? n.src=require('./down.png') : n.src=require('./right.png'))
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

	changeStringTit(e, id) {
		console.log(e.target.value);
		let arr = this.state.chapter.slice();
		let n = arr.find(l => l.id === id);
		n.name = e.target.value;

		arr.map(l => (
			l.id === id ? n : l
		))
		this.setState({
			chapter: arr,
		})
	}

	changeStringDesc(e, id) {
		console.log(e.target.value);
		let arr = this.state.chapter.slice();
		let n = arr.find(l => l.id === id);
		n.description = e.target.value;

		arr.map(l => (
			l.id === id ? n : l
		))

		this.setState({
			chapter: arr,
		})
	}

	render() {
		const transitionOptions = {
			transitionName: "fade",
			transitionEnterTimeout: 500,
			transitionLeaveTimeout: 400
		};

		let arr = this.state.chapter.filter(l => l.parId === 0);
		let list = arr.map(l => (
			<div className="parent" key={l.id}>
				<div className="info">
					<div className="title">
						<img className="arrows" src={l.src} onClick={() => this.handleClick(l.id)}/>
						<input className="name" type="text" value={l.name} onChange={(e) => this.changeStringTit(e, l.id)}/>
					</div>
					<textarea rows="10" cols="50"  className="descInput"  
					value={l.description} onChange={(e) => this.changeStringDesc(e, l.id)}/>
				</div>
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
					handleChangeTit={this.changeStringTit}
					handleChangeDesc={this.changeStringDesc}
				/>
			</div>
		))
		return (
			<div className="list">
				<ReactCSSTransitionGroup {...transitionOptions}>
					{list}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default Tree