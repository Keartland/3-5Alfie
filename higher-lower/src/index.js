import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Item extends React.Component {
  render() {
    return (
      <div className="Item">
        <img src={this.props.thumbnail} alt=""></img>
        <p>{this.props.name}</p>
      </div>

    );
  }
}

class ListItem extends React.Component {
    render() {
        const name = this.props.name;
        const thumbnail = this.props.thumbnail;
        const amount = this.props.amount;
        return (
            <div className="ListItem">
                <img src={thumbnail} alt=""></img>
                <div className="Description">
                    <p>{name}</p>
                    <p>{DATASOURCE[this.props.current].carbon/amount}</p>
                </div>
            </div>
        );
    }
}

class List extends React.Component {
    render() {
      const current = this.props.current
        const items = this.props.items.filter(function (el) {
          return (DATASOURCE[current].carbon/el.carbon) > 1
        });

        const listItems = items.map((item) =>
              <div>
                <li key={item.name}>
                  <ListItem current={this.props.current} name={item.name} thumbnail={item.thumbnail} amount={item.carbon}/>
                </li>
              </div>
          );
        return (
            <ul>{listItems}</ul>
        );
    }
  }

class Choice extends React.Component {
  handleClick(option, currentChoice){
    if (option === currentChoice.correct){
      this.props.correctButtonClicked()
    }
  }
  render() {
    const currentChoice = !this.props.left ? DATASOURCE[this.props.current + 1] : DATASOURCE[this.props.current]
    const optionsList = !this.props.left ? currentChoice.options.map((option) =>
            <div key={option}>
              <button onClick={() => this.handleClick(option,currentChoice)}>{option} times</button>
            </div>
    ):
    <div>
    {currentChoice.carbon}
    </div>;
    return (
      <div className="Choice">
        <Item name={currentChoice.name} thumbnail={currentChoice.thumbnail} />
        <ul>{optionsList}</ul>
        <a href={currentChoice.source}>source</a>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score:0, current:0};
  }

  onCorrectButtonClicked = () => {
    this.setState({score:this.state.score+1,current:this.state.current+1})
  }

  render() {
    return (
      <div className="game">
        <List items={DATASOURCE} current={this.state.current}/>
        <div className="choices">
          <Choice left={true} current={this.state.current}/>
          <Choice left={false} correctButtonClicked={this.onCorrectButtonClicked} current={this.state.current}/>
          <p>{this.state.score}</p>
        </div>
      </div>
    );
  }
}




const DATASOURCE = [
  {name:"1kg Cheese", thumbnail:"placeholder.png", carbon:13.5, source:"http://link.com"},
  {name:"1kg Beef", thumbnail:"placeholder.png", carbon:27, source:"http://link.com", options:[4,2,10], correct:2},
  {name:"1kg Lamb", thumbnail:"placeholder.png", carbon:39.2, source:"http://link.com", options:[4,1.5,10],correct:1.5}
]
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
