//
// require("./lib.js")

import { ToyReact, Component}  from './ToyReact'

console.log("hhahah")

class Square extends Component {
	  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}


class Board extends Component {
  renderSquare(i) {
    return <Square
    			 value={i}
    			 onClick={ () => this.props.onClick(i) }
            />;
  }
  render() {
  	 return <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
  }
}






// class MyComponent extends Component {
// 	render(){
// 		return <div>
// 					<span>hello</span>
// 					<span>bb!!!</span>
// 					<span></span>
// 					{ this.children }
// 				</div>;
// 	}

// }

// let a = <div name="a">
// document.body.appendChild(a);
// 			<span>hello</span>
// 			<span>bb!!!</span>
// 			<span></span>
// 		</div>

// document.body.appendChild(a);


// let b = <MyComponent name="a"></MyComponent>

// ToyReact.render(b,document.body)


ToyReact.render(new Board(),document.body)
