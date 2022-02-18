import { React, useEffect, useState } from 'react'
import { Header } from '../Components/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import { PageFive } from '../GamePages/PageFive';
import { useRef } from 'react';
import { Footer } from '../Components/Footer';
import ContractUtils from '../../utils/contractUtils';
import Toast from '../Components/Toast';
import { walletLocalStorageKey } from '../../config'

export const PlayNow = () => {
  let page5 = useRef(null);
  let page6 = useRef(null);

  const [isConnected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    // const _address = window.localStorage.getItem(walletLocalStorageKey);
    // if (_address) {
    //   setAddress(_address)
    // }
  }, [])

  const headerPages = [
    { 'page': 'VALHALLA', 'scroll': page5 },
    { 'page': 'PARTY HALL', 'scroll': page6 },
    { 'page': 'ADVENTURE', 'scroll': null },
    { 'page': 'MARKET PLACE', 'scroll': null },
    { 'page': 'WEDDING HALL', 'scroll': null }
  ];
  const pull_data = (page) => {
    if (!page.current) return;
    page.current.scrollIntoView({ behavior: "smooth" });
  }

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState(2) //1: success, 2: error

  const onClickConnect = async () => {
    let res = await ContractUtils.connectWallet();
    if (res.address) {
      setShowToast(true)
      setToastType(1)
      setToastMessage("Connected Successfully!")
      setAddress(res.address);
      window.localStorage.setItem(walletLocalStorageKey, res.address);
    }
    else {
      setShowToast(true)
      setToastType(2)
      setToastMessage(res.status)
      setAddress("");
    }
  }

  const onClickDisconnect = async () => {
    await ContractUtils.disconnectWallet();
    setAddress("");
  }

  const onMint = async (cnt) => {
    let res = await ContractUtils.mintNFT(cnt);
    if (res.success) {
      setShowToast(true)
      setToastType(1)
			setToastMessage("Minted Successfully!");
    } else {
      setShowToast(true);
			setToastMessage(res.status);
			setToastType(2)
    }
  }

  const onToastClose = () => {
    setShowToast(false);
  }

  return (
    <>
      <Header func={pull_data} headerPages={headerPages} image={header_2} headerClass={'palyNowHeader'} />
      {!address ?
        <>
        <img src={header_logo} className='header_con' alt="connect_wall" />
        <div className="connect-button" onClick={() => onClickConnect()} ></div>
        </>
        : 
        <>
        <img src={disconnect_logo} className='header_con' alt="connect_wall" />
        <div className="connect-button" onClick={onClickDisconnect} ></div>
        </>}
      <div className="playnow-container"> 
        <div className="button-group">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="mint-button" onClick={() => onMint(1)}>
                x1
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
            <div className="mint-button" onClick={() => onMint(5)}>
                x5
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
            <div className="mint-button" onClick={() => onMint(10)}>
                x10
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={page5}>
        <PageFive className="" />
      </div>
      {/* <div ref={page6}>
              <PageSix className="" />
            </div> */}
      <Toast
        open={showToast}
        message={toastMessage}
        handleClose={onToastClose}
        type={toastType}
      />
      <Footer />
    </>
  )
}
