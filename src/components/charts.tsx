import { LineChart, Line, Tooltip } from 'recharts';
import './css/charts.css'
const data = [{name: '15', price: 0.00005}, {name: '15', price: 0.000055}, {name: '15', price: 0.00005}, {name: '15', price: 0.00006} ];

const Charts: React.FC = () => {
    return(
        <div className="charts-lineup">
            <h2>Charts:</h2>
            <div className='charts'>
                <h6>1 $CREDIT = 0.00006$</h6>
                <LineChart width={400} height={200} data={data} margin={{ top: 40, left: 5, right:5}}>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    <Tooltip />
                </LineChart>
            </div>
           

        </div>
    )
}

export default Charts;