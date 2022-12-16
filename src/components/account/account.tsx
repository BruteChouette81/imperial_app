import { useWeb3React } from "@web3-react/core"
import {
    EthereumClient,
    walletConnectProvider,
  } from "@web3modal/ethereum";
  
import { Web3Modal } from "@web3modal/react";
//import { useWeb3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";

  
import { mainnet, configureChains, createClient, WagmiConfig } from "wagmi";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { useAccount } from 'wagmi'
  
import {useState} from 'react';
import { Contract, ethers } from 'ethers';

import Profile from "./profile";
import injected from './connector.js'
import Credit from './credits/credit.json'
import icon from './css/metamask.02e3ec27.png'

import './css/account.css'

const contractAddress = '0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565';
//put the contract address in each file needed

//0x5FbDB2315678afecb367f032d93F642f64180aa3

//4C62fC52D5Ad4c827feb97684bA612288eE9507

const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "ac8f3cd302aec77982fbc7a6f0615e67" }),
]);
//modalConnectors({ appName: "imperial_app", chains })
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [ new MetaMaskConnector({ chains }), new WalletConnectConnector({ chains, options: { qrcode: true } }) ],
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);






const getContract = (injected_prov: any) => {
    const provider = new ethers.providers.Web3Provider(injected_prov);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Credit.abi, signer);
    return contract
}

const Account:React.FC = () => {
    const [credit, setCredit] = useState<Contract>()
    //const { isOpen, open, close } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount({
        async onConnect({ address, connector, isReconnected }) {
            console.log(address)
            console.log(connector?.getProvider())
            console.log(isReconnected)

            let provider = await connector?.getProvider()
            let credits = getContract(provider)
            console.log(credits.address)
            setCredit(credits)
        }
      })
    
  
    

    /* go in connection div 
    *** save this code for the website
    <h4>Connect your Wallet</h4>
                        <br />
                        <button onClick={connect} >
                            <div className="icon">
                                <img src={icon} alt="icon" />
                            </div>
                            MetaMask
                            
                        </button>

            async function connect() {
        try {
            //console.log(isOpen)
            console.log(address)
            console.log(isDisconnected)

            
        } catch (ex) {
            alert(ex)
            console.log(ex)
        }
    }

            let provider = await injected.getProvider()
            let credits = getContract(provider)
            setCredit(credits)
            await activate(injected)
    */

    return(
        
            <div className="account">
                    {isDisconnected==false && isConnecting==false ? (
                    <Profile account={address} credit={credit} />
                        
                    ) : (
                        <WagmiConfig client={wagmiClient} >
                            <div className="connection">
                                <h4>Connect your Wallet</h4>
                                <br />
                                <Web3Button />
                            </div>
                            <Web3Modal
                                projectId="ac8f3cd302aec77982fbc7a6f0615e67"
                                ethereumClient={ethereumClient}
                            />
                        </WagmiConfig>
                        
                    )}

                

                
            </div>
            
        
        
    )

}

export default Account;