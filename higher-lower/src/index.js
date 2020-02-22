import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';

class Item extends React.Component {
  render() {
    return (
      <div>
        <img className="w-100 h-100" src={this.props.thumbnail} alt=""></img>
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
      <li className="list-group-item bg-transparent text-white">{Math.round((data[this.props.current].carbon / amount) * 10000) / 10000} x {name}</li>
    );
  }
}

class List extends React.Component {
  render() {
    const current = this.props.current

    const items = this.props.items.filter(function (el) {
      return (data[current].carbon / el.carbon) > 1
    });

    const listItems = data.map((item) =>
      <li key={item.name}>
        <ListItem current={this.props.current} name={item.name} thumbnail={item.thumbnail} amount={item.carbon} />
      </li>
    );
    return (
      <ul className="list-group list-group-flush bg-transparent pt-4" style={{ listStyleType: "none" }}>
        <li>{listItems}</li>
      </ul >
    );
  }
}

class Choice extends React.Component {
  render() {
    return (
      <a className="btn shadow-none" onClick={() => this.props.answerButtonPressed(this.props.index)}> {this.props.option} times</ a>
    )
  }
}

class Choices extends React.Component {
  render() {
    const listItems = this.props.options.map((currentValue, index) =>
      <div className="row py-5" style={{ backgroundColor: "rgba(88, 84, 84, 0.6)" }}>
        <div className="col-12">
          <Choice answerButtonPressed={this.props.answerButtonPressed} option={currentValue} index={index} />
        </div>
      </div>
    );

    return (
      <div className="col-4 height-fill">
        <div className="vertical-centre">
          <div className="text-center" style={{ margin: "0 auto" }}>
            {listItems}
          </div>
        </div>
      </div>);
  }
}

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = { score: 0, currentIndex: 1, currentOptions: data[1].options };
  }

  onAnswerButtonClicked = (index) => {
    const correctIndex = data[this.state.currentIndex].correctIndex;

    if (index === correctIndex) {
      // NOTE: Check index.
      // Next question but score increases.
      this.setState({ score: this.state.score + 1 });
    }

    // Next question but score stays the same.
    this.setState({ currentIndex: this.state.currentIndex + 1, currentOptions: data[this.state.currentIndex + 1].options });
  }

  render() {
    // NOTE: Index checking needed.
    const leftImageSrc = data[this.state.currentIndex - 1].thumbnail;
    const rightImageSrc = data[this.state.currentIndex].thumbnail;
    return (
      <div className="main">

        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "-1" }}>
          <div className="row height-fill ">
            <div className="col-6 height-fill " style={{ filter: "grayscale(60%)", backgroundPosition: "center", backgroundImage: "url(" + leftImageSrc + ")", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}></div>
            <div className="col-6 height-fill " style={{ filter: "grayscale(60%)", backgroundPosition: "center", backgroundImage: "url(" + rightImageSrc + ")", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}></div>
          </div>
        </div>

        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "1" }}>
          <div className="row height-fill">

            <div className="col-2 height-fill" style={{ backgroundColor: "rgba(88, 84, 84, 0.6)" }}>
              <h5 className="text-white text-center pt-5">These equate to a {data[this.state.currentIndex].name}</h5>
              <List items={data} current={this.state.currentIndex} />
            </div>

            <Choices answerButtonPressed={this.onAnswerButtonClicked} options={this.state.currentOptions} />

          </div>
        </div>
      </div >
    );
  }
}

const data = [
  { name: "One plastic straw", carbon: 0.00146, source: "https://www.appropedia.org/HSU_straw_analysis", thumbnail: "https://cdn.pixabay.com/photo/2011/06/17/15/47/straws-8001_960_720.jpg" },
  { name: "A latte", carbon: 0.34, source: "https://www.theguardian.com/environment/green-living-blog/2010/jun/17/carbon-footprint-of-tea-coffee", thumbnail: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", correctIndex: 1, options: [23, 230, 66] },
  { name: "One year of smartphone usage", carbon: 3, source: "https://www.lovefone.co.uk/blogs/news/how-much-co2-does-it-take-to-make-a-smartphone", thumbnail: "https://images.unsplash.com/photo-1558899460-5bfd4c5f091a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", correctIndex: 1, options: [5, 9, 18] },
  { name: "2Kg of Potatoes", carbon: 5.8, source: "https://www.greeneatz.com/foods-carbon-footprint.html", thumbnail: "https://images.unsplash.com/photo-1563012678-bdfec255931b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80", correctIndex: 0, options: [2, 5, 7] },
  { name: "Taking the bus for 100 miles", carbon: 6, source: "https://reason.org/commentary/does-bus-transit-reduce-greenhouse/", thumbnail: "https://images.unsplash.com/photo-1520105072000-f44fc083e508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80", correctIndex: 0, options: [1, 5, 10] },
  { name: "1Kg of Beef", carbon: 27, source: "https://www.greeneatz.com/foods-carbon-footprint.html", thumbnail: "https://images.unsplash.com/photo-1467217322460-5f03dc33a28e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", correctIndex: 1, options: [2, 5, 10] },
  { name: "Driving 100 miles", carbon: 40, source: "https://reason.org/commentary/does-bus-transit-reduce-greenhouse/", thumbnail: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", correctIndex: 2, options: [1, 1.25, 1.5] }
]
// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
