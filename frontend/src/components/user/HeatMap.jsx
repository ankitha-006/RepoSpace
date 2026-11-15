
import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";//this package directly provifes heat map 
// //HeatMap is its functinality which hels us build the map;
// //Generating dummy data for activity

// Function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);//we have converted our parameters into date formate  so that
//     // heat map recognises its start date and end date they are no longer strings
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);//this gives value between 0 and 50
    data.push({
      date: currentDate.toISOString().split("T")[0], //YYY-MM-DD
      count: count,
    });
     // this gives yyyy-mm-dd
//             //we dont want the time so we 
//             // are spliting it we only want date 
//             //count how many times the activity has been performed(streeks)
    currentDate.setDate(currentDate.getDate() + 1);//move to next day;
//         //for each day we check 50 activities
  }

  return data;
};
//logic for colours
const getPanelColors = (maxCount) => {//how many shades of green we want
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);// div by 255 as we have 255 as max in rgb
//         // generate random value  then div by 255 such thatits between 0 to 255
    colors[i] = `rgb(0, ${greenValue}, 0)`;//as we want only green shade red and blue are 0
  }

  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});//this is set not array and has unique values

  useEffect(() => {
    const fetchData = async () => {//dummy data mimicking(stimulating even though its not comming from server)
      const startDate = "2001-01-01";
      const endDate = "2001-01-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));//spread the data from set use map for each data from data 
           // count the activity or contribution on that perticular day based on the count value number of shades of green will
            // will be generated
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;
