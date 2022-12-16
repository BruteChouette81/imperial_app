import './css/profile.css'
import {Contract, ethers} from 'ethers'
import {useState, useEffect} from 'react';

import { API , Storage} from 'aws-amplify';

import imagetest from './css/metamask.02e3ec27.png'

interface ContainerProps {
    account: any;
    credit: Contract | undefined;
}

const getBalance = async(account: string, credit: Contract | undefined, setBalance: any) => {
    const userbalance = await credit?.balanceOf(account);
    setBalance(parseInt(userbalance));
}



const Profile:React.FC<ContainerProps> = ({account, credit}) => {
    const [balance, setBalance] = useState<any>(0)
    //get the info using amplify DB
    //<p>Contract connected: <b>{credit?.address}</b></p>
    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')
    const [image, setImage] = useState("")
    const [name, setName] = useState("")

    //useEffect(() => {alert("Starting the webapp... need to connect to Metamask");})
    function setS3Config(bucket:string, level:string) {
        Storage.configure({
            bucket: bucket,
            level: level,
            region: "ca-central-1",
            identityPoolId: 'ca-central-1:85ca7a33-46b1-4827-ae75-694463376952'
        })
    }

    const getImage = async () => {
        setS3Config("clientbc6cabec04d84d318144798d9000b9b3205313-dev", "public")
        const file = await Storage.get(`${account.toLowerCase()}.png`) //add ".png"    `${address}.png` {download: true}
        setImage(file)
    }
    
    const connect = async () => {
        var data = {
            body: {
                address: account.toLowerCase()
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response) => {
            console.log(response)
            setBack(response.bg);
            setImg(response.img);
            setName(response.name)
            if(response.cust_img) {
                getImage()
            }
        })
    }

    useEffect(() => {
        async function boot() {
            await connect();
        }
        boot()
    }, [])

    return(
        <div className="profile">
            <div className='banner' style={{backgroundColor: back}}>
                <img alt="" src={image} id="profile_img" />
            </div>

            <div className="profile-info">
                <h6 id="profile-info-tag"><strong> personnal information: </strong> </h6>
                <p>Your account: <b>{account.slice(0,10) + "..."}</b></p>
                <p>Connected as: <b>{name}</b></p>
                <p>Balance: <b>{balance}</b> $credit </p>
                <button id='button-reload' onClick={() => {getBalance(account, credit, setBalance)}}>Reload balance</button>
            </div>

            <div className="control-panel">
                <h6>Control panel:</h6>
                <h5><strong>Not Yet available</strong></h5>
            </div>
            
        </div>
    )
}

export default Profile;