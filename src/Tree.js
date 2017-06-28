import React, { Component } from 'react' 
import Leaf from './Leaf.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Tree extends Component {
	constructor(props) {
		super(props);
		var st = this.props.chapter.slice();
		var id = 0;
		for(var i=0;i<st.length;i++) {
			st[i].isOpened = false;
			st[i].src = require('./right.png');
			st[i].disabled = "disabled";
			st[i].focus = "";
			st[i].editImg = require('./edit.png');
			id = Math.max(id, st[i].id)
		}

		this.state = {
			globalId: id + 1,
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
		let tree2 = this.state.chapter.slice()
		let id = this.state.globalId

		tree2 = [...tree2, {
			id: id,
			name: "",
			description: "",
			isOpened:false,
			src: require('./right.png'),
			parId: e,
			disabled: "",
			focus: "focused",
			editImg: require('./edit-tools.png'),
		}]

		tree2.map(l => (
			l.id === e ? l.isOpened = true : l,
			l.id === e ? l.src = require('./down.png') : l
		))

		console.log(id);
		this.setState({
			globalId: id + 1,
			chapter: tree2
		})
	}

	getArray(e) {
		return this.state.chapter.filter(l => l.parId === e);
	}

	changeStringTit(e, id) {
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
		var elem = document.getElementById(e);
		var desc = document.getElementById(e+"description");
		if(pic.src === require('./edit.png')) {
			elem.removeAttribute("disabled");
			desc.removeAttribute("disabled");
			elem.focus();
			pic.src = require("./edit-tools.png");
		} else if(pic.src === require('./edit-tools.png')) {
			pic.src = require('./edit.png');
			elem.setAttribute("disabled", "disabled");
			desc.setAttribute("disabled", "disabled");
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
							<input autoFocus={l.focus} id={l.id} className="name" type="text" value={l.name} disabled={l.disabled} onChange={(e) => this.changeStringTit(e, l.id)}/>
							<div className="icons">
								<img className="icon" alt="" id={l.id + "edit"} src={l.editImg}
								onClick={() => this.editClick(l.id)}/>
								<img className="icon" alt="" id={l.id + "delete"} src={require('./delete.png')} 
								onClick={() => this.deleteClick(l.id)}/>
								<img className="icon" alt="" id={l.id + "plus"} src={require('./plus.png')} 
								onClick={() => this.addClick(l.id)}/>
							</div>
						</div>
					</div>
					<textarea id={l.id + "description"} onKeyUp={this.textAreaAdjust} rows="10" cols="50"  className="descInput"  
						value={l.description} onChange={(e) => this.changeStringDesc(e, l.id)} disabled={l.disabled}/>
				</div>
				<hr/>
				<Leaf 
					key={l.id} 
					name={l.name}
					id={l.id}
					description={l.description} 
					isOpened={l.isOpened}
					changeClick={this.handleClick}
					getArray={this.getArray}
					deleteClick={this.deleteClick}
					editClick={this.editClick}
					addClick={this.addClick}
					handleChangeTit={this.changeStringTit}
					handleChangeDesc={this.changeStringDesc}/>
			</div>
		))
		let newChapter = () => {
			console.log("ok")
			if(!this.state.wasEdited){
				this.editClick(this.state.globalId - 1)
			}
		}
		return (
			<div className="list">
				{list}
				<h5 className="mainIcon" onClick={() => this.addClick(0)}>Добавить новую тему</h5>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Tree);
