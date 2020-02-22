import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Item extends React.Component {
  render() {
    return (
      <div className="Item">
        <img src={this.props.thumbnail}></img>
        <p>{this.props.name}</p>
      </div>

    );
  }
}

class Choice extends React.Component {
  render() {
    const optionsList = !this.props.left ? this.props.value.options.map((option) =>
            <div>
              <button>{option} times</button>
            </div>
    ):
    <div>
    {this.props.value.carbon}
    </div>;
    return (
      <div className="Choice">
        <Item name={this.props.value.name} thumbnail={this.props.value.thumbnail} />
        <ul>{optionsList}</ul>
      </div>
    );
  }
}

class ListItem extends React.Component {
    render() {
        const name = this.props.name;
        const thumbnail = this.props.thumbnail;
        const amount = this.props.amount;
        const unit = this.props.unit;

        return (
            <div className="ListItem">
                <img src={thumbnail}></img>
                <div className="Description">
                    <p>{name}</p>
                    <p>{DATASOURCE[current].carbon/amount}</p>
                </div>
            </div>
        );
    }
}

class List extends React.Component {
    render() {
        const items = this.props.items;

        const listItems = items.map((item) =>
            <div>
                <li key={item.name}>
                    <ListItem name={item.name} thumbnail={item.thumbnail} amount={item.carbon}/>
                </li>
            </div>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <List items={DATASOURCE}/>
        <div className="choices">
          <Choice left={true} value={DATASOURCE[current]}/>
          <p>vs</p>
          <Choice left={false} value={DATASOURCE[current+1]}/>
        </div>
      </div>
    );
  }
}


const current = 1

const DATASOURCE = [
  {name:"1kg Cheese", thumbnail:"placeholder.png", carbon:13.5, source:"link.com"},
  {name:"1kg Beef", thumbnail:"placeholder.png", carbon:27, source:"link.com", options:[4,2,10]},
  {name:"1kg Lamb", thumbnail:"placeholder.png", carbon:39.2, source:"link.com", options:[4,1.5,10]}
]
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
