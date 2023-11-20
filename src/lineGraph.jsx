import { React, useRef } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Title,
  Tooltip,
);

export const LineChart = ({ defaultWorldRevenue }) => {
  //use a useref to not rerender the page on change
  // const [timeStamps, setTimeStamps] = useState([])

  // useEffect( () => {
  //     const newStamps =

  // })

  const options = {
    responive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total World Revenue',
      },
    },
  };

  // so you need now an array of length 5 to display all the points on the graph
  // change the initial usestate of stateworldtotal to an array.
  // when setting the new stateworldtotal, make sure to add the new data and take off the old data
  // to give you a hint do something like this
  // const temp = [...stateworldtotal, newdatadictionary]
  // temp.shift() //to take the first value from the queue.
  // setstateworldtotal(temp)
  // THE ABOVE IS PSEUDOCODE, DONT TRY TO JUST COPY AND PASTE IT

  //for the labels part i think you can do something along the lines of

  // labels: defaultWorldRevenue.map(obj)=>

  const arr = [{ total: 'x' }, { total: 'y' }];

  //   const axisValues = [...defaultWorldRevenue, ]

  const data = {
    labels: arr.map(i => i.total), //label on x axis
    datasets: [
      {
        label: 'current Set',
        data: [defaultWorldRevenue.total], // label on y axis here would be world revenue total
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };
  // use a useeffect here
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};
