import "./css/home.css"
import RedLogo from './RedLogo.png' 
import Box from "./box";
import Charts from "./charts";
import { useAccount } from "wagmi";
import {useState, useEffect} from 'react';
import { API } from 'aws-amplify';

  
const Home: React.FC = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [name, setName] = useState("")

    const connect = async () => {
        var data = {
            body: {
                address: address?.toLowerCase()
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response:any) => {
            setName(response.name)
        })

        
    }
    useEffect(() => {
        if(isDisconnected) {}
        else {
            connect()
        }
    }, [])
    

    if (isDisconnected) {
        return (
            <div className="home">
                <div className="welcome">
                    <h2>The new way of decentralizing</h2>
                </div>
            
                <img id="logo" src={RedLogo} alt="" />
    
                <Box name="Token is out" info="The $CREDIT is dropped! Want to take part in the project? " link="imperialdao.net/Liquidity" />
                <br />
                <Box name="Token is out" info="The $CREDIT is dropped! Want to take part in the project? " link="imperialdao.net/Liquidity" />
                <br />
                <Charts />
                
            </div>
        );
    }
    else {
        return (
            <div className="home">
                <div className="welcome">
                    <h2>welcome, <strong>{name}</strong></h2>
                </div>
            
                <img id="logo" src={RedLogo} alt="" />
    
                <Box name="Token is out" info="The $CREDIT is dropped! Want to take part in the project? " link="imperialdao.net/Liquidity" />
                <br />
                <Box name="Token is out" info="The $CREDIT is dropped! Want to take part in the project? " link="imperialdao.net/Liquidity" />
                <br />
                <Charts />
            </div>
        );
    }
    
    
};
  
export default Home;