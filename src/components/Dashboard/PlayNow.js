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
import imgBox from "../../assets/images/buying/box.png"
import x1 from "../../assets/images/buying/x1.png"
import x10 from "../../assets/images/buying/x10.png"
import x5 from "../../assets/images/buying/x5.png"

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
    <div className="play_container">
      <Header func={pull_data} headerPages={headerPages} image={header_2} headerClass={'palyNowHeader'} style={{ position: 'relative' }}>
        {!address ?
          <>
            <img src={header_logo} className='header_con' alt="connect_wall" onClick={() => onClickConnect()} />
          </>
          :
          <>
            <img src={disconnect_logo} className='header_con' alt="connect_wall" onClick={onClickDisconnect} />
          </>}
      </Header>
      <div className="row" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="mint-button" onClick={() => onMint(1)}>
            <img src={imgBox} alt="" style={{ width: '15vw' }} />
            <img src={x1} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute' }} />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="mint-button" onClick={() => onMint(5)}>
            <img src={imgBox} alt="" style={{ width: '15vw' }} />
            <img src={x5} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute' }} />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div className="mint-button" onClick={() => onMint(10)}>
            <img src={imgBox} alt="" style={{ width: '15vw' }} />
            <img src={x10} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute' }} />
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
      <div style={{position: 'relative'}}><Footer /></div>
    </div>
  )
}
