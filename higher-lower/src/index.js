import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import './bootstrap.min.css';

class Item extends React.Component {
  render() {
    return (
      <div className="Item">
        <img  className = "w-100 h-100" src={this.props.thumbnail} alt=""></img>
        <p>{this.props.name}</p>
        <a href={this.props.source}>source</a>
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
    this.props.answerButtonClicked(option === currentChoice.correctIndex)
  }
  render() {
    const currentChoice = !this.props.left ? DATASOURCE[this.props.current + 1] : DATASOURCE[this.props.current]
    const optionsList = !this.props.left ? currentChoice.options.map((option, i) =>
    <div key={i}>
      <button onClick={() => this.handleClick(i,currentChoice)}>{option} times</button>
    </div>) : null


    return (
      <div className="Choice">
          <img  className = "w-100 h-100" src={currentChoice.thumbnail} alt=""></img>
        {/* <Item name={currentChoice.name} source={currentChoice.source} thumbnail={currentChoice.thumbnail} /> */}
        <ul>{optionsList}</ul>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score:0, current:0};
  }

  onAnswerButtonClicked = (correct) => {
    if(this.state.current == DATASOURCE.length-2) { prompt(); }
    else { this.setState({score:correct ? this.state.score+1 : this.state.score,current:this.state.current+1})}
  }

  render() {
    return (
      <div className="game">
        <List items={DATASOURCE} current={this.state.current}/>
        <div className = "container-fluid height-fill position-absolute index-1">
          <div className = "row height-fill ">
            <div className = "col-6 height-fill">
              <Choice left={true} current={this.state.current}/>
            </div>
            <div className = "col-6 height-fill">
              <Choice left={false} answerButtonClicked={this.onAnswerButtonClicked} current={this.state.current}/>
            </div>
          </div>
        </div>
        <p>{this.state.score}</p>
      </div>
    );
  }
}




const DATASOURCE = [
  {name:"One plastic straw",carbon:0.00146,source:"https://www.appropedia.org/HSU_straw_analysis",thumbnail:"https://cdn.pixabay.com/photo/2011/06/17/15/47/straws-8001_960_720.jpg"},
  {name:"A latte",carbon:0.34,source:"https://www.theguardian.com/environment/green-living-blog/2010/jun/17/carbon-footprint-of-tea-coffee",thumbnail:"https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",correctIndex:1,options:[23,230,66]},
  {name:"One year of smartphone usage",carbon:3,source:"https://www.lovefone.co.uk/blogs/news/how-much-co2-does-it-take-to-make-a-smartphone",thumbnail:"https://images.unsplash.com/photo-1558899460-5bfd4c5f091a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",correctIndex:1,options:[5,9,18]},
  {name:"2Kg of Potatoes",carbon:5.8,source:"https://www.greeneatz.com/foods-carbon-footprint.html",thumbnail:"https://images.unsplash.com/photo-1563012678-bdfec255931b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",correctIndex:0,options:[2, 5, 7]},
  {name:"Taking the bus for 100 miles",carbon:6,source:"https://reason.org/commentary/does-bus-transit-reduce-greenhouse/",thumbnail:"https://images.unsplash.com/photo-1520105072000-f44fc083e508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",correctIndex:0,options:[1,5,10]},
  {name:"1Kg of Beef",carbon:27,source:"https://www.greeneatz.com/foods-carbon-footprint.html",thumbnail:"https://images.unsplash.com/photo-1467217322460-5f03dc33a28e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",correctIndex:1,options:[2,5,10]},
  {name:"Driving 100 miles",carbon:40,source:"https://reason.org/commentary/does-bus-transit-reduce-greenhouse/",thumbnail:"https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",correctIndex:2,options:[1,1.25,1.5]}
]
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
