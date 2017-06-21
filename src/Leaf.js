import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Leaf extends Component {
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
						<div className="title">
							<img className="arrows" src={l.src} onClick={() => this.props.changeClick(l.id)}/>
							<input className="name" type="text" value={l.name} onChange={(e) => this.props.handleChangeTit(e, l.id)}/>
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
						children={l.children}
						isOpened={l.isOpened}
						changeClick={this.props.changeClick}
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

export default Leaf