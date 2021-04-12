import { setRpcUrl } from "./utils/json-rpc.js";

export type NetworkInfo = {
    name: string;
    rootAccount: string;
    displayName: string;
    color: string;
    rpc: string;
    explorerUrl: string;
    NearWebWalletUrl: string;
  }


export const NetworkList:NetworkInfo[] = [

  { name: "mainnet", rootAccount: "near", displayName: "NEAR Mainnet", color: "green", 
      rpc: "https://rpc.mainnet.near.org/", explorerUrl: "https://explorer.near.org/", NearWebWalletUrl:"https://wallet.near.org/",
  },

  { name: "guildnet", rootAccount: "guildnet", displayName: "OSA Guildnet", color: "cyan", 
      rpc: "https://rpc.openshards.io/", explorerUrl: "https://explorer.guildnet.near.org/", NearWebWalletUrl:"https://wallet.openshards.io/",
  },

  { name: "testnet", rootAccount: "testnet", displayName: "NEAR Testnet", color: "yellow", 
      rpc: "https://rpc.testnet.near.org/", explorerUrl: "https://explorer.testnet.near.org/", NearWebWalletUrl:"https://wallet.testnet.near.org/", 
  },

  { name: "betanet", rootAccount: "betanet", displayName: "NEAR Betanet", color: "violet", 
    rpc: "https://rpc.betanet.near.org/", explorerUrl: "https://explorer.betanet.near.org/", NearWebWalletUrl:"https://wallet.betanet.near.org/",  
  },

  { name: "local", rootAccount: "local", displayName: "Local Network", color: "red", 
    rpc: "http://127.0.0.1/rpc", explorerUrl: "http://127.0..0.1/explorer/", NearWebWalletUrl:"http://127.0..0.1/wallet/",  
  },
];

export const defaultName = "mainnet"; //default network
export let current = defaultName;

export function setNetwork(networkName:string):void {
  const info = getInfo(networkName); //get & check
  if (networkName==current) { //no change
    return;
  }
  current = networkName
  setRpcUrl(info.rpc)
};

export function getInfo(name:string) :NetworkInfo {
  for (let i = 0; i < NetworkList.length; i++) if (NetworkList[i].name == name) return NetworkList[i];
  throw new Error("invalid network name: " + name);
}

export function currentInfo():NetworkInfo { return getInfo(current) };

