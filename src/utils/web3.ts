import { ethers, Contract } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract-config";

export const getBlockchain = async () => {
  const provider = new ethers.JsonRpcProvider();
  const signer = await provider.getSigner();
  const contractProvider = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const contractSigner = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  return {
    provider,
    signer,
    contractProvider,
    contractSigner
  };
};
