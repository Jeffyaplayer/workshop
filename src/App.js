import { useAddress, useDisconnect, useMetamask, useNFTDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const nftDrop = useNFTDrop('0x006c77e68d2cE85db549BAC376b4C7283A332447');
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaming, setIsClaming] = useState(false);

  useEffect(() => {
    if(!address){
      return;
    }
    const checkBalance = async () => {
      try{
        const nfts = await nftDrop.getOwned(address);
        setHasClaimedNFT(nfts?.length > 0);

      }catch(error){
        setHasClaimedNFT(false);
        console.error('Failed to mint NFT', error);
      }
    }
  });

  const mintNft = async () => {

    try {

      setIsClaming(true);
      await nftDrop.claim(1);
      setHasClaimedNFT(true);

    } catch (error) {

      setHasClaimedNFT(false);
      console.error('Failed to mint NFT', error);

    } finally {

      setIsClaming(false);
    }

  };

  if(!address){
    return (<button onClick={connectWithMetamask}>Connect with Metamask</button>);
  }

  if(hasClaimedNFT){
    return (
      <>
        🎉 You have a memebership NFT
      </>
    )
  }

  return (
    <>
      <p>Your address: {address}</p>
      <button disabled={isClaming} onClick={mintNft}>Mint NFT</button>
      <button onClick={disconnectWallet}>Disconnect Wallet</button>
    </>
  );
}

export default App;

