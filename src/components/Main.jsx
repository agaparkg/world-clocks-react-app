import React from "react";
import Aside from "./Aside";
import Section from "./Section";

function Main({
  handleAddClick,
  handleSelectChange,
  handleTXBoxRemove,
  timeZones,
  listOfSelectedTZ,
}) {
  return (
    <main>
      <Aside
        handleAddClick={handleAddClick}
        handleSelectChange={handleSelectChange}
        timeZones={timeZones}
      />
      <Section
        handleTXBoxRemove={handleTXBoxRemove}
        listOfSelectedTZ={listOfSelectedTZ}
      />
    </main>
  );
}

export default Main;
