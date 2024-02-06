import { ConnectWallet, ContractOwner, useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {

const address = useAddress();

const{
  contract
} = useContract(CONTRACT_ADDRESS);

const {
  data: counter,
  isLoading: isCounterLoading,
} = useContractRead(contract, "getCounter");

const {
  data: owner,
} = useContractRead(contract, "owner");

  return (
    <main className={styles.main}>
      <div className={styles.container}>


        <ConnectWallet />


        <h1>Counter APP</h1>


        <div className = "counter-container">
            {isCounterLoading ? ( 
              <p>loading...</p>
            ) : (
              <p>{counter.toNumber()}</p>
            )}


            {address && (
              <div className = "button-container">
                <Web3Button
                  contractAddress= {CONTRACT_ADDRESS}
                  action = {(contract) => contract.call("increment",)}
                  onSuccess={()=>alert("counter has been incremented")}
                >+</Web3Button>
                <Web3Button
                contractAddress= {CONTRACT_ADDRESS}
                action = {(contract) => contract.call("decrement",)}
                onError = {(error)=> alert(error)}
                >-</Web3Button> 
              </div>
            )}
            {address == owner} ? (
                <Web3Button
                  contractAddress= {CONTRACT_ADDRESS}
                  action = {(contract) => contract.call("reset",)}
                  onSuccess={()=> alert("THANKS FOR USING")}
                  onError={()=> alert("U must not be the owner of the contract")}
                >RESET</Web3Button>
            )
        </div>
      </div>
    </main>
  );
};

export default Home;
