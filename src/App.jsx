import React, { Component } from "react";
import moment from "moment-timezone";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      timeZones: moment.tz.names(),
      selectedTZName: "",
      selectedTZTime: "",
      listOfSelectedTZ: [],
      warning: false
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
      listOfSelectedTZ: newList
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
      selectedTZTime
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
        selectedTZName: e.target.value
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
        <header>
          <h1>World</h1>
          <img
            src="https://freefrontend.com/assets/img/css-clocks/analog-clock.gif"
            alt=""
          />
          <h1>Clocks</h1>
        </header>
        <main>
          <aside>
            <div className="add-clock-box">
              <button onClick={this.handleAddClick}>Add Clock</button>
              <select
                onChange={this.handleSelectChange}
                name="timezone"
                id="timezone"
              >
                <option>- Select a timezone -</option>;
                {timeZones.map((zone, ind) => {
                  return <option key={ind}>{zone}</option>;
                })}
              </select>
            </div>
          </aside>
          <section>
            {listOfSelectedTZ.map((tzBox, ind) => {
              return (
                <div key={ind} className="single-timezone">
                  <span onClick={() => this.handleTXBoxRemove(tzBox.id)}>
                    X
                  </span>
                  <h3 className="single-clock">{tzBox.zoneName}</h3>
                  <div>{tzBox.zoneTime}</div>
                </div>
              );
            })}
          </section>
        </main>
      </div>
    );
  }
}
