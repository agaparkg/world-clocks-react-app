import React, { Component } from "react";
import moment from "moment-timezone";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      timeZones: moment.tz.names(),
      selectedTZName: "",
      selectedTZTime: "",
      listOfSelectedTZ: [],
      warning: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.runTZTime(), 1000);
  }

  runTZTime() {
    const { listOfSelectedTZ } = this.state;
    const newList = [...listOfSelectedTZ];
    newList.forEach((item) => {
      item.zoneTime = moment().tz(item.zoneName).format("hh:mm:ss A");
    });
    this.setState({
      listOfSelectedTZ: newList,
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleAddClick = () => {
    const {
      listOfSelectedTZ,
      selectedTZName,
      timeZones,
      selectedTZTime,
    } = this.state;
    const tzIndex = timeZones.indexOf(selectedTZName);
    const selectedTZIndex = listOfSelectedTZ.findIndex(
      (item) => item.zoneName === selectedTZName
    );

    if (tzIndex > -1 && selectedTZIndex < 0) {
      const newList = [...listOfSelectedTZ];
      const objectOfEachTZ = {};
      objectOfEachTZ["id"] = tzIndex;
      objectOfEachTZ["zoneName"] = selectedTZName;
      objectOfEachTZ["zoneTime"] = selectedTZTime;
      newList.push(objectOfEachTZ);
      this.setState({ listOfSelectedTZ: newList });
    }
  };

  handleSelectChange = (e) => {
    if (e.target.value !== "- Select a timezone -") {
      this.setState({
        selectedTZTime: moment().tz(e.target.value).format("hh:mm:ss A"),
        selectedTZName: e.target.value,
      });
    }
  };

  handleTXBoxRemove = (index) => {
    const { listOfSelectedTZ } = this.state;
    const newList = [...listOfSelectedTZ];
    const itemIndex = newList.findIndex((item) => item.id === index);
    newList.splice(itemIndex, 1);
    this.setState({ listOfSelectedTZ: newList });
  };
  render() {
    const { timeZones, listOfSelectedTZ } = this.state;
    return (
      <div className="App">
        <Header />
        <Main
          handleAddClick={this.handleAddClick}
          handleSelectChange={this.handleSelectChange}
          handleTXBoxRemove={this.handleTXBoxRemove}
          timeZones={timeZones}
          listOfSelectedTZ={listOfSelectedTZ}
        />
      </div>
    );
  }
}
