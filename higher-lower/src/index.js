import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

// import P5Wrapper from 'react-p5-wrapper';

class ListItem extends React.Component {
  render() {
    const amount = this.props.amount;
    return (
      <li className=" bg-transparent p-3" style={{ fontSize: "1.7rem", minWidth: "300px", float: "left", color: "#f7c84c", fontWeight: "600" }}>{this.props.left} {this.props.number * Math.round((data[this.props.current].carbon / amount) * 100) / 100} {this.props.right}</li>
    );
  }
}

class List extends React.Component {
  render() {
    const current = this.props.current
    console.log(data[current])
    const items = data.filter(function (el, index) {
      return ((data[current].carbon / el.carbon) > 1 && el !== data[current - 1]) && (index % 5 == 0)
    });

    const listItems = items.map((item, index) =>
      <ListItem current={this.props.current} left={item.left} number={item.number} right={item.right} thumbnail={item.thumbnail} amount={item.carbon} />
    );
    return (
      <ul className=" list-group list-group-horizontal flex-wrap justify-content-center list-group-flush bg-transparent pt-4" style={{ listStyleType: "none" }}>
        {listItems}
      </ul>
    );
  }
}

class Choice extends React.Component {
  render() {
    return (
      <button className="btn shadow-none" onClick={() => this.props.answerButtonPressed(this.props.index)}> {this.props.option} times</button>
    )
  }
}

class Choices extends React.Component {
  render() {
    const listItems = this.props.options.map((currentValue, index) =>
      <div className="row py-3" >
        <div className="col-12">
          <Choice answerButtonPressed={this.props.answerButtonPressed} option={currentValue} index={index} />
        </div>
      </div>
    );

    return (
      <div className="col-2 height-fill">
        <div className="vertical-centre">
          <div className="text-center" style={{ margin: "0 auto" }}>
            {listItems}
            <div className="row py-5" >
              <div className="col-12">
                <h1 classname="text-white text-weight-bold" id="equv-text">Is equivalent to</h1>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { score: 0, currentIndex: 1, answer: data[1].answer, currentOptions: this.generateRandomChoices(data[1].answer) };
  }

  generateRandomChoices = (answer) => {
    const options = [0, 0, 0]
    options[Math.floor(Math.random() * (3))] = answer;
    const upper = answer === 0 ? (answer - 1) * 3 : answer * 3
    const lower = answer === 0 ? (answer - 1) * 0.3 : answer * 0.3
    for (let i = 0; i < options.length; i++) {
      if (options[i] === 0) {
        options[i] = Math.round(10 * Math.random() * (upper - lower) + lower) / 10
      }
    }
    return (options)
  }


  onAnswerButtonClicked = (index) => {
    const correctAnswer = data[this.state.currentIndex].answer;

    if (this.state.currentOptions[index] === correctAnswer) {
      // NOTE: Check index.
      // Next question but score increases.
      this.setState({ score: this.state.score + 1 });
      document.getElementById("equv-text").style.color = "green";

    }else{
      document.getElementById("equv-text").style.color = "red";
    }
    setTimeout(function() {
      document.getElementById("equv-text").style.color = "white";
    }, 1000)
    if (this.state.currentIndex === data.length-1){
      window.location.assign('/completed');
    } else {
      // Next question but score stays the same.
      this.setState({ currentIndex: this.state.currentIndex + 1, answer: data[this.state.currentIndex + 1].answer, currentOptions: this.generateRandomChoices(data[this.state.currentIndex + 1].answer) });
    }
  }

  render() {
    // NOTE: Index checking needed.
    const leftImageSrc = data[this.state.currentIndex - 1].thumbnail;
    const rightImageSrc = data[this.state.currentIndex].thumbnail;
    return (
      <div className="main">

        {/* <div className="position-absolute" style={{ zIndex: "1" }} >
        <P5Wrapper sketch={sketch} />
      </div> */}

        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "1" }}>
          <div className="row height-fill ">
            <div className="col-6 height-fill p-0" style={{ filter: "brightness(50%)" }}>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                <img key={leftImageSrc} src={leftImageSrc} align="middle" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </CSSTransitionGroup>
            </div>
            <div className="col-6 height-fill p-0" style={{ filter: "brightness(50%)" }}>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                <img key={rightImageSrc} src={rightImageSrc} align="middle" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </CSSTransitionGroup>
            </div>
          </div>
        </div>

        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "2" }}>

          <div className="row height-top-part">

            <div className="col-5">
              <div className="vertical-centre text-center">
                <h4 className="text-center w-100 context-text">{data[this.state.currentIndex - 1].left} {data[this.state.currentIndex].number} {data[this.state.currentIndex - 1].right}</h4>
              </div>
            </div>

            <Choices answerButtonPressed={this.onAnswerButtonClicked} options={this.state.currentOptions} />

            <div className="col-5">
              <div className="vertical-centre text-center">
                <h4 className="text-center w-100 context-text">{data[this.state.currentIndex].left} {data[this.state.currentIndex].number} {data[this.state.currentIndex].right}</h4>
              </div>
            </div>

          </div>

          <div className="row height-bottem-part">
            <div className="col-12" style={{ backgroundColor: "rgba(117, 117, 117, 0.20)" }}>
              <h5 className="text-white text-center pt-5 font-weight-bold" style={{ fontSize: "1.7rem" }}>{data[this.state.currentIndex].left} {data[this.state.currentIndex].number} {data[this.state.currentIndex].right} has the same impact as:</h5>
              <List items={data} current={this.state.currentIndex} />
            </div>
          </div>

            <div style={{zIndex:"3"}}>
              <h2 className = "text-right text-white p-3" id = "scoreTxt">Score: {this.state.score}</h2>
            </div>

        <div style={{ zIndex: "3" }}>
          <h2 className="text-right text-white p-3">Score: {this.state.score}</h2>
        </div>

      </div>
    );
  }
}

const data = [{ left: "making", number: 1, right: "plastic straw(s)", carbon: 0.00146, source: "https://www.appropedia.org/HSU_straw_analysis", thumbnail: "https://cdn.pixabay.com/photo/2011/06/17/15/47/straws-8001_960_720.jpg", answer: -1 },
{ left: "producing", number: 1, right: "latte coffee(s)", carbon: 0.34, source: "https://www.theguardian.com/environment/green-living-blog/2010/jun/17/carbon-footprint-of-tea-coffee", thumbnail: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", answer: 232.9 },
{ left: "producing", number: 1, right: "kg of potatoes", carbon: 2.9, source: "https://www.greeneatz.com/foods-carbon-footprint.html", thumbnail: "https://images.unsplash.com/photo-1563012678-bdfec255931b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80", answer: 8.5 },
{ left: "using a smartphone for", number: 1, right: "year(s)", carbon: 3, source: "https://www.lovefone.co.uk/blogs/news/how-much-co2-does-it-take-to-make-a-smartphone", thumbnail: "https://images.unsplash.com/photo-1558899460-5bfd4c5f091a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", answer: 1 },
{ left: "taking a bus for", number: 100, right: "miles", carbon: 6, source: "https://reason.org/commentary/does-bus-transit-reduce-greenhouse/", thumbnail: "https://images.unsplash.com/photo-1520105072000-f44fc083e508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80", answer: 2 },
{ left: "producing", number: 1, right: "kg of beef", carbon: 27, source: "https://www.greeneatz.com/foods-carbon-footprint.html", thumbnail: "https://images.unsplash.com/photo-1467217322460-5f03dc33a28e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", answer: 4.5 },
{ left: "driving", number: 100, right: "miles", carbon: 40, source: "https://reason.org/commentary/does-bus-transit-reduce-greenhouse/", thumbnail: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", answer: 1.5 },
{ left: "using a dishwasher for", number: 1, right: "year(s)", carbon: 84, source: "https://www.carbonfootprint.com/energyconsumption.html", thumbnail: "https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", answer: 2.1 },
{ left: "using an electric oven for", number: 1, right: "year(s)", carbon: 91, source: "https://www.carbonfootprint.com/energyconsumption.html", thumbnail: "https://images.unsplash.com/photo-1462392435449-542c64fd805d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", answer: 1.1 },
{ left: "producing", number: 1, right: "IPhone 11 Pro(s)", carbon: 110, source: "https://www.apple.com/environment/pdf/products/iphone/iPhone_11_Pro_PER_sept2019.pdf", thumbnail: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", answer: 1.2 },
{ left: "using a fridge-freezer for", number: 1, right: "year(s)", carbon: 116, source: "https://www.carbonfootprint.com/energyconsumption.html", thumbnail: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80", answer: 1.1 },
{ left: "using an electric hob for", number: 1, right: "year(s)", carbon: 129, source: "https://www.carbonfootprint.com/energyconsumption.html", thumbnail: "https://images.unsplash.com/photo-1578845425994-e46a1459566d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", answer: 1.1 },
{ left: "managing emails for", number: 1, right: "year(s)", carbon: 135, source: "https://ourworld.unu.edu/en/uncovering-the-carbon-footprint-of-everything", thumbnail: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", answer: 1 },
{ left: "using an electric tumble dryer for", number: 1, right: "year(s)", carbon: 159, source: "https://www.carbonfootprint.com/energyconsumption.html", thumbnail: "https://images.unsplash.com/photo-1581788487364-db375f9ac4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80", answer: 1.2 },
{ left: "producing", number: 1, right: "new laptop(s)", carbon: 250, source: "https://phys.org/news/2011-04-factory-energy.html", thumbnail: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80", answer: 1.6 },
{ left: "producing", number: 1, right: "iMac 27\"", carbon: 993, source: "https://www.apple.com/environment/pdf/products/desktops/27-inch_iMac_with_Retina5KDisplay_PER_Mar2019.pdf", thumbnail: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", answer: 4 },
{ left: "driving a car for", number: 1, right: "year(s)", carbon: 4600, source: "https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle", thumbnail: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", answer: 4.6 },
{ left: "manufacturing of", number: 1, right: "new car(s)", carbon: 20000, source: "https://www.theguardian.com/environment/green-living-blog/2010/sep/23/carbon-footprint-new-car", thumbnail: "https://images.unsplash.com/photo-1543857182-68106299b6b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80", answer: 4.3 },
{ left: "total consumption of Austria in", number: 1, right: "day(s)", carbon: 197942465, source: "https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions", thumbnail: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", answer: 9897.1 },
{ left: "total consumption of the UK over", number: 1, right: "year(s)", carbon: 380000000000, source: "https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions", thumbnail: "https://images.unsplash.com/photo-1560366828-0e5c35b758bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", answer: 1919.7 }
]
// ========================================

// function generateGrammar(iterations) {
//   let functions = ["F[+F]F", "FGF"]

//   let result = "F";
//   for (let i = 0; i < iterations; i++) {
//     result = result.split("F").join(functions[Math.floor(Math.random() * functions.length)]);
//   }
//   console.log(result)
// }

// function getPoints() {
//   let points = []
//   for (let i = 0; i < 10; i++) {

//   }
// }

// function sketch(p) {
//   let rotation = 0;

//   p.setup = function () {
//     p.createCanvas(600, 400, p.WEBGL);
//   };

//   p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
//     if (props.rotation) {
//       rotation = props.rotation * Math.PI / 180;
//     }
//   };

//   p.draw = function () {
//     p.background(100);
//     p.normalMaterial();
//     p.noStroke();
//     p.push();
//     p.rotateY(rotation);
//     p.box(100);
//     p.pop();
//   };
// };

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
