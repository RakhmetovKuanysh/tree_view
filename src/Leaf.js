import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Leaf extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		var list;
		if(this.props.isOpened) {
			let id = this.props.id;
			let arr = this.props.getArray(id);
			list = arr.map(l => (
				<div className="parent" key={l.id}>
					<div className="info">
						<div className="top">
							<div className="title">
								<img className="arrows" alt="" src={l.src} onClick={() => this.props.changeClick(l.id)}/>
								<input id={l.id} className="name" disabled type="text" value={l.name} onChange={(e) => this.props.handleChangeTit(e, l.id)}/>
								<div className="icons">
									<img id={l.id + "edit"} alt="" className="icon" src="https://image.flaticon.com/icons/svg/148/148926.svg"  
									onClick={() => this.props.editClick(l.id)}/>
									<img id={l.id + "delete"} alt="" className="icon" src={require('./delete.png')} 
									onClick={() => this.props.deleteClick(l.id)}/>
									<img id={l.id + "plus"} alt="" className="icon" src={require('./plus.png')} 
									onClick={() => this.props.addClick(l.id)}/>
								</div>
							</div>
						</div>
						<textarea rows="10" cols="50" className="descInput" value={l.description}
							 onChange={(e) => this.props.handleChangeDesc(e, l.id)}/>
					</div>
					<hr/>
					<Leaf 
						key={l.id} 
						name={l.name}
						id={l.id}
						description={l.description} 
						isOpened={l.isOpened}
						changeClick={this.props.changeClick}
						deleteClick={this.props.deleteClick}
						addClick={this.props.addClick}
						editClick={this.props.editClick}
						getArray={this.props.getArray}
						handleChangeTit={this.props.handleChangeTit}
						handleChangeDesc={this.props.handleChangeDesc}
					/>
				</div>
			));
			return list;
		}
	}

	render() {
		const transitionOptions = {
			transitionName: "fade",
			transitionEnterTimeout: 500,
			transitionLeaveTimeout: 400
		};
		return (
			<div className="leafs">
				<ReactCSSTransitionGroup {...transitionOptions}>
					{this.handleChange()}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}
