import React from "react";

function Section({ handleTXBoxRemove, listOfSelectedTZ }) {
  return (
    <section>
      {listOfSelectedTZ.map((tzBox, ind) => {
        return (
          <div key={ind} className="single-timezone">
            <span onClick={() => handleTXBoxRemove(tzBox.id)}>X</span>
            <h3 className="single-clock">{tzBox.zoneName}</h3>
            <div>{tzBox.zoneTime}</div>
          </div>
        );
      })}
    </section>
  );
}

export default Section;
