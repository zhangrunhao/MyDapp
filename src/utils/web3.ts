import { ethers } from "ethers";

export const getBlockchainProvider = async () => {
  const provider = new ethers.JsonRpcProvider();
  const signer = await provider.getSigner();
  return {
    provider,
    signer,
  };
};
