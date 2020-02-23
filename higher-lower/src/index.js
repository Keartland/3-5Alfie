import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import './index.css';
import './bootstrap.min.css';

class ListItem extends React.Component {
  render() {
    const amount = Math.round(this.props.number * data[this.props.current].carbon / this.props.amount).toLocaleString()
    return (
      <li className=" bg-transparent p-3" style={{ fontSize: "1.7rem", minWidth: "300px", float: "left", color: "#f7c84c", fontWeight: "600" }}>{this.props.left} {amount} {this.props.right}</li>
    );
  }
}

class List extends React.Component {
  render() {
    const maxItems = 5
    const current = this.props.current;

    const inteval = Math.floor(Math.random() * (6 - 3)) + 3;

    const itemsToDisplay = data.filter(function (el, index) {
      if (Math.ceil(index / inteval) < maxItems) {
        let con1 = (data[current].carbon > 0 && (data[current].carbon / el.carbon > 1))
        let con2 = (data[current].carbon < 0)
        let con3 = (el !== data[current - 1])
        let con4 = (index % inteval === 0)
        return ((con1 || con2) && con3 && con4)
      } else {
        return false
      }
    })

    const listItems = itemsToDisplay.map((item, index) =>
      <ListItem current={this.props.current} left={item.left} number={item.number} right={item.right} thumbnail={item.thumbnail} amount={item.carbon} />
    );

    return (
      <ul className=" list-group list-group-horizontal flex-wrap justify-content-center list-group-flush bg-transparent" style={{ listStyleType: "none" }}>
        {listItems}
      </ul >
    );
  }
}

class Choice extends React.Component {
  render() {
    return (
      <button className="btn shadow-none" onClick={() => this.props.answerButtonPressed(this.props.index)} onMouseOver={() => this.props.answerButtonHover(this.props.option)} onMouseLeave={() => this.props.answerButtonLeave()}>{String.fromCharCode(65 + this.props.index)}. {this.props.option}</button>
    )
  }
}

class Choices extends React.Component {
  render() {
    const listItems = this.props.options.map((currentValue, index) =>
      <div className="row py-3" >
        <div className="col-12">
          <Choice answerButtonPressed={this.props.answerButtonPressed} answerButtonHover={this.props.answerButtonHover} answerButtonLeave={this.props.answerButtonLeave} option={currentValue} index={index} />
        </div>
      </div>
    );
    return (
      <div>{listItems}</div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { score: 0, currentIndex: 1, answer: data[1].answer, currentOptions: this.generateRandomChoices(data[1].answer), isOverAnswer: false, answerOver: null };
  }

  generateRandomChoices = (answer) => {
    const options = [null, null, null]
    options[Math.floor(Math.random() * (3))] = answer;
    const upper = answer === 0 ? (answer - 10000) * 3 : answer + answer * 10 * Math.random()
    const lower = answer === 0 ? (answer - 10000) * 0.3 : 0
    for (let i = 0; i < options.length; i++) {
      if (options[i] === null) {
        options[i] = Math.round(10 * (Math.random() * (upper - lower) + lower)) / 10
      }
    }
    return (options)
  }

  onAnswerButtonHover = (option) => {
    this.setState({ isOverAnswer: true, answerOver: option });
  }

  onAnswerButtonLeave = () => {
    this.setState({ isOverAnswer: false, answerOver: null });
  }

  onAnswerButtonClicked = (index) => {
    const correctAnswer = data[this.state.currentIndex].answer;

    if (this.state.currentOptions[index] === correctAnswer) {
      this.setState({ score: this.state.score + 1 });
      document.getElementsByTagName("BODY")[0].setAttribute("style", "background-color: #06d6a0;");// correct
    } else {
      document.getElementsByTagName("BODY")[0].setAttribute("style", "background-color: #ef4747;"); // incorrect
    }
    if (this.state.currentIndex === data.length - 1) {
      window.location.assign('/completed?s=' + this.state.score + '&' + 't=' + this.state.currentIndex);
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1, answer: data[this.state.currentIndex + 1].answer, currentOptions: this.generateRandomChoices(data[this.state.currentIndex + 1].answer), isOverAnswer: false, answerOver: null });
    }
  }

  render() {
    const leftImageSrc = data[this.state.currentIndex - 1].thumbnail;
    const rightImageSrc = data[this.state.currentIndex].thumbnail;
    return (
      <div className="main">
        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "0" }}>
          <div className="row height-fill ">
            <div className="col-6 height-fill p-0" style={{ filter: "brightness(50%)" }}>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={400}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                <img key={leftImageSrc} src={leftImageSrc} align="middle" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </CSSTransitionGroup>
            </div>
            <div className="col-6 height-fill p-0" style={{ filter: "brightness(50%)" }}>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={400}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                <img key={rightImageSrc} src={rightImageSrc} align="middle" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
        <div className="container-fluid height-fill position-absolute" style={{ zIndex: "1", overflow: "hidden" }}>
          <h2 className="text-right text-white p-3">Score: {this.state.score}</h2>
          <div className="row height-top-part">
            <div className="col-5 vertical-centre">
              <div className="text-center mx-auto">
                {data[this.state.currentIndex].carbon < 0 ? (
                  <h1 classname="text-white text-weight-bold" id="equv-text">Carbon absorbed by</h1>
                ) : (
                    <h1 classname="text-white text-weight-bold" id="equv-text">Carbon produced by</h1>
                  )}
                {this.state.isOverAnswer ? (
                  <h4 className="text-center w-100 context-text">{data[this.state.currentIndex - 1].left} {data[this.state.currentIndex].number * this.state.answerOver} {data[this.state.currentIndex - 1].right}</h4>
                ) : (
                    <h4 className="text-center w-100 context-text">{data[this.state.currentIndex - 1].left} x {data[this.state.currentIndex - 1].right}</h4>
                  )}
                    <h5 className="text-white text-weight-bold" id="equv-text">{data[this.state.currentIndex - 1].number} {data[this.state.currentIndex - 1].right} = {data[this.state.currentIndex - 1].carbon} KG Carbon <a href={data[this.state.currentIndex - 1].source} className="text-white" target="_blank">(source)</a></h5>
              </div>
            </div>
            <div className="col-2 height-fill">
              <div className="vertical-centre align-content-center">
                <div className="text-center" style={{ margin: "0 auto" }}>
                  <h3 className="text-white text-center pt-2 font-weight-bold" style={{ fontSize: "1.7rem" }}>Which is x?</h3>
                  <Choices answerButtonPressed={this.onAnswerButtonClicked} answerButtonHover={this.onAnswerButtonHover} answerButtonLeave={this.onAnswerButtonLeave} options={this.state.currentOptions} />
                </div>
              </div>
            </div >
            <div className="col-5 vertical-centre">
              <div className="text-center mx-auto">
                <h1 classname="text-white text-weight-bold" id="equv-text">Is equivalent to</h1>
                <h4 className="text-center w-100 context-text">{data[this.state.currentIndex].left} {data[this.state.currentIndex].number} {data[this.state.currentIndex].right}</h4>
              </div>
            </div>
          </div>
          <div className="row height-bottem-part">
            <div className="col-12" style={{ backgroundColor: "rgba(117, 117, 117, 0.30)" }}>
              <h5 className="text-white text-center pt-2 font-weight-bold" style={{ fontSize: "1.7rem" }}>{data[this.state.currentIndex].left} {data[this.state.currentIndex].number} {data[this.state.currentIndex].right} has the same impact as:</h5>
              <List className="p-0" items={data} current={this.state.currentIndex} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const data = [
  {left:"making",number:1,right:"plastic straw(s)",carbon:0.00146,source:"https://www.appropedia.org/HSU_straw_analysis",thumbnail:"https://cdn.pixabay.com/photo/2011/06/17/15/47/straws-8001_960_720.jpg",answer:-1},
  {left:"producing",number:1,right:"latte coffee(s)",carbon:0.34,source:"https://www.theguardian.com/environment/green-living-blog/2010/jun/17/carbon-footprint-of-tea-coffee",thumbnail:"https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",answer:232.9},
  {left:"producing",number:1,right:"kg of potatoes",carbon:2.9,source:"https://www.greeneatz.com/foods-carbon-footprint.html",thumbnail:"https://images.unsplash.com/photo-1563012678-bdfec255931b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",answer:8.5},
  {left:"using a smartphone for",number:1,right:"year(s)",carbon:3,source:"https://www.lovefone.co.uk/blogs/news/how-much-co2-does-it-take-to-make-a-smartphone",thumbnail:"https://images.unsplash.com/photo-1558899460-5bfd4c5f091a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:1},
  {left:"taking a bus",number:100,right:"miles",carbon:6,source:"https://reason.org/commentary/does-bus-transit-reduce-greenhouse/",thumbnail:"https://images.unsplash.com/photo-1520105072000-f44fc083e508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",answer:2},
  {left:"producing",number:1,right:"kg of beef",carbon:27,source:"https://www.greeneatz.com/foods-carbon-footprint.html",thumbnail:"https://images.unsplash.com/photo-1467217322460-5f03dc33a28e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",answer:4.5},
  {left:"using a dishwasher for",number:1,right:"year(s)",carbon:84,source:"https://www.carbonfootprint.com/energyconsumption.html",thumbnail:"https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",answer:3.1},
  {left:"using an electric oven for",number:1,right:"year(s)",carbon:91,source:"https://www.carbonfootprint.com/energyconsumption.html",thumbnail:"https://images.unsplash.com/photo-1462392435449-542c64fd805d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:1.1},
  {left:"producing",number:1,right:"IPhone 11 Pro(s)",carbon:110,source:"https://www.apple.com/environment/pdf/products/iphone/iPhone_11_Pro_PER_sept2019.pdf",thumbnail:"https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",answer:1.2},
  {left:"using a fridge-freezer for",number:1,right:"year(s)",carbon:116,source:"https://www.carbonfootprint.com/energyconsumption.html",thumbnail:"https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80",answer:1.1},
  {left:"managing emails for",number:1,right:"year(s)",carbon:135,source:"https://ourworld.unu.edu/en/uncovering-the-carbon-footprint-of-everything",thumbnail:"https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:1.2},
  {left:"using an electric tumble dryer for",number:1,right:"year(s)",carbon:159,source:"https://www.carbonfootprint.com/energyconsumption.html",thumbnail:"https://images.unsplash.com/photo-1581788487364-db375f9ac4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",answer:1.2},
  {left:"flying from london to new york",number:1,right:"time(s)",carbon:590,source:"https://travelnav.com/emissions-from-london-united-kingdom-to-new-york-ny",thumbnail:"https://images.unsplash.com/photo-1573984693612-97c0f6ee4ed8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",answer:3.7},
  {left:"producing",number:1,right:"iMac 27\"",carbon:993,source:"https://www.apple.com/environment/pdf/products/desktops/27-inch_iMac_with_Retina5KDisplay_PER_Mar2019.pdf",thumbnail:"https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:1.7},
  {left:"driving a car for",number:1,right:"year(s)",carbon:4600,source:"https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle",thumbnail:"https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:4.6},
  {left:"total consuption of Texas in",number:1,right:"year(s)",carbon:596383.2,source:"https://www.eia.gov/state/data.php?sid=US",thumbnail:"https://images.unsplash.com/photo-1525814230241-7f78c608c54c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",answer:129.6},
  {left:"total consumption of Austria in",number:1,right:"day(s)",carbon:197942465,source:"https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions",thumbnail:"https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",answer:331.9},
  {left:"total consumption of the UK over",number:1,right:"year(s)",carbon:380000000000,source:"https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions",thumbnail:"https://images.unsplash.com/photo-1560366828-0e5c35b758bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",answer:1919.7},
  {left:"running",number:1,right:"google(s) since 2007",carbon:0.0001,source:"https://www.wired.com/story/how-google-keeps-power-hungry-operations-carbon-neutral/",thumbnail:"https://images.unsplash.com/photo-1573141597928-403fcee0e056?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",answer:0},
  {left:"",number:1,right:"pine tree(s)",carbon:-10,source:"https://www.gotreequotes.com/how-much-co2-do-trees-absorb/",thumbnail:"https://images.unsplash.com/photo-1480442646297-37901d5ea815?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",answer:-10},
  {left:"",number:1,right:"acre of grass",carbon:-417.305,source:"http://www.fort-worth-metropolitan-area.com/nativeplantwildlifegardencom/is-lawn-a-carbon-sink/",thumbnail:"https://images.unsplash.com/photo-1438786657495-640937046d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",answer:41.7},
  {left:"the only carbon negative country:",number:1,right:"bhutan",carbon:-3800000,source:"https://www.scienceabc.com/social-science/carbon-negative-country.html",thumbnail:"https://images.unsplash.com/photo-1545585521-41880512d0cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",answer:9106},
  {left:"every",number:1,right:"teamtrees project",carbon:-217235410,source:"https://teamtrees.org/",thumbnail:"https://teamtrees.org/images/social-share-earth-astronaut-1-9x1.png",answer:57.2},
  {left:"",number:1,right:"amazon rainforest per year",carbon:-1995806428000,source:"https://www.livescience.com/44235-amazon-rainforest-carbon-cycle-measured.html",thumbnail:"https://images.unsplash.com/photo-1579571157206-351f50eb3046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",answer:9187.3}
]

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
