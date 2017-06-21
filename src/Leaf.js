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
				<div className="parent">
					<h3>{l.name}</h3>
					<p>{l.description}</p>
					{console.log(l.name)}
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