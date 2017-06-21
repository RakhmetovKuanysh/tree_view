import React, {Component} from 'react'

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
						<input type="text" value={l.name} onChange={(e) => this.props.handleChangeTit(e, l.id)}/>
						<input type="text" className="descInput" value={l.description}
						 onChange={(e) => this.props.handleChangeDesc(e, l.id)}/>
					</div>
					<button onClick={() => this.props.changeClick(l.id)}>Show</button>
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
		return (
			<div className="anotherList">
				{this.handleChange()}
			</div>
		);
	}
}

export default Leaf