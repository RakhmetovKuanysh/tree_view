import React, { Component } from 'react' 
import Leaf from './Leaf.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
/*
(function() {
	st.map(l = (
		l.isOpened = false,
        l.src = require("./right.png"),
	))
}());
*/

class Tree extends Component {
	constructor(props) {
		for(var i=0;i<st.length;i++) {
			st[i].isOpened = false;
			st[i].src = require('./right.png');
		}

		super(props);
		this.state = {
			globalId: 22,
			chapter: st,
		}

		this.getArray = this.getArray.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.changeStringTit = this.changeStringTit.bind(this);
		this.changeStringDesc = this.changeStringDesc.bind(this);
		this.addClick = this.addClick.bind(this);
		this.editClick = this.editClick.bind(this);
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

	deleteClick(e) {
		let n = this.state.chapter.find(l => l.id === e);
		let newParId = n.parId;
		let tree2 = this.state.chapter.slice();

		tree2.map(l => (
			l.parId === e ? l.parId = newParId : l
		))

		var index = tree2.indexOf(n);
		console.log(index);
		tree2.splice(index, 1);
		this.setState({
			chapter: tree2,
		})
	}


	addClick(e) {
		let n = this.state.chapter.find(l => l.id === e)
		let tree2 = this.state.chapter.slice()
		let id = this.state.globalId

		tree2 = [...tree2, {
			id: id,
			name: "",
			description: "",
			isOpened:false,
			src: require('./right.png'),
			parId: e,
		}]

		this.setState({
			globalId: id + 1,
			chapter: tree2
		})

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

	editClick(e) {
		var pic = document.getElementById(e + "edit");
		if(pic.src === "https://image.flaticon.com/icons/svg/148/148926.svg") {
			var elem = document.getElementById(e);
			elem.removeAttribute("disabled");
			elem.focus();
			pic.src = "https://image.flaticon.com/icons/svg/363/363205.svg";
		} else if(pic.src === "https://image.flaticon.com/icons/svg/363/363205.svg") {
			pic.src = "https://image.flaticon.com/icons/svg/148/148926.svg"
			var elem = document.getElementById(e);
			elem.setAttribute("disabled", "disabled");
			pic.focus();
		}
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
					<div className="top">
						<div className="title">
							<img className="arrows" alt="" src={l.src} onClick={() => this.handleClick(l.id)}/>
							<input id={l.id} className="name" type="text" value={l.name} disabled onChange={(e) => this.changeStringTit(e, l.id)}/>
							<div className="icons">
								<img className="icon" alt="" id={l.id + "edit"} src="https://image.flaticon.com/icons/svg/148/148926.svg" 
								onClick={() => this.editClick(l.id)}/>
								<img className="icon" alt="" id={l.id + "delete"} src={require('./delete.png')} 
								onClick={() => this.deleteClick(l.id)}/>
								<img className="icon" alt="" id={l.id + "plus"} src={require('./plus.png')} 
								onClick={() => this.addClick(l.id)}/>
							</div>
						</div>
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
					deleteClick={this.deleteClick}
					editClick={this.editClick}
					addClick={this.addClick}
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

export default DragDropContext(HTML5Backend)(Tree);