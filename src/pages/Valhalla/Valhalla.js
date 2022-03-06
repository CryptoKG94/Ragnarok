import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { getNFTInfo } from "../../store/actions/thunks";
import { Header } from '../../components/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import { AssetsSlider } from './AssetsSlider';
import { Footer } from '../../components/Footer';
import ContractUtils from '../../utils/contractUtils';
import { allocateTimeUnits } from '../../utils';
import Toast from '../../components/Toast';
import { walletLocalStorageKey, SECOND_TO_START, EndDay } from '../../config'
import x1 from "../../assets/images/buying/x1.png"
import x5 from "../../assets/images/buying/x5.png"
import x10 from "../../assets/images/buying/x10.png"
import x50 from "../../assets/images/buying/x50.png"
import x100 from "../../assets/images/buying/x100.png"
import x200 from "../../assets/images/buying/x200.png"
import { useHistory } from 'react-router-dom';
import mintBtn from "../../assets/images/mintbtn.gif"

export const Valhalla = () => {

    const dispatch = useDispatch();
    const nftInfo = useSelector(selectors.nftInfo);
    // console.log('[kg] => nftprice: ', nftInfo);

    const [isConnected, setConnected] = useState(false);
    const [address, setAddress] = useState(ContractUtils.isWalletConnected());
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState(2) //1: success, 2: error
    const [mintType, setMintType] = useState(0)

    const [countDown, setCountDown] = useState(SECOND_TO_START * 1000)
    const [startMint, setStartMint] = useState(false)

    useEffect(() => {
        let diff = EndDay.getTime() - new Date().getTime();
        setCountDown(diff)
    }, [])

    useEffect(() => {
        // const _address = window.localStorage.getItem(walletLocalStorageKey);
        // if (_address) {
        //   setAddress(_address)
        // }
        // console.log(ContractUtils.isWalletConnected())
        const _address = ContractUtils.isWalletConnected()
        // console.log(_address);
        if (_address) {
            setAddress(_address)
            dispatch(getNFTInfo())
        }
    }, [dispatch])

    useEffect(() => {
        let interval = 0;
        if (countDown > 0) {
            interval = setInterval(() => {
                // console.log(countDown);
                setCountDown(count => count - 1000);
            }, 1000);
        } else {
            clearInterval(interval);
            setStartMint(true)
        }

        return () => clearInterval(interval);
    }, [countDown]);

    let strTime = allocateTimeUnits(countDown);

    const history = useHistory();


    const headerFuncs = (target) => {
        history.push(target);
    }

    const headerPages = [
        { page: 'VALHALLA', target: '/valhalla' },
        { page: 'PARTY HALL', target: '/partyhall' },
        { page: 'ADVENTURE' },
        { page: 'MARKETPLACE' },
        { page: 'WEDDING HALL' }
    ];

    const onClickConnect = async () => {
        setMintType(0);
        let res = await ContractUtils.connectWallet();
        if (res.address) {
            setShowToast(true)
            setToastType(1)
            setToastMessage("Connected Successfully!")
            setAddress(res.address);
            dispatch(getNFTInfo())
            window.localStorage.setItem(walletLocalStorageKey, res.address);

            let assetInfos = await ContractUtils.getAssetInfo();
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
        setMintType(0);
    }

    const onMint = async (cnt) => {
        if (!startMint) {
            setShowToast(true);
            setToastMessage("Can't mint now");
            setToastType(2);
            return;
        }
        
        let res = await ContractUtils.mintNFT(cnt);
        // console.log("--------cnt---------",cnt)
        if (res.success) {
            setShowToast(true)
            setToastType(1)
            setToastMessage("Minted Successfully!");
            setMintType(cnt)
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
            <Header func={headerFuncs} headerPages={headerPages} image={header_2} headerClass={'playNowHeader'} style={{ position: 'relative' }}>
                {!address ?
                    <>
                        <img src={header_logo} className='header_con' alt="connect_wall" onClick={onClickConnect} />
                    </>
                    :
                    <>
                        <img src={disconnect_logo} className='header_con' alt="connect_wall" onClick={onClickDisconnect} />
                    </>}
            </Header>
            <div className="nft-price" style={{ display: 'flex', justifyContent: 'center' }} >
                {
                    startMint ?
                        <span className='nft-price-span'>Live Minting Cost: ${nftInfo && nftInfo.data}</span>
                        :
                        <span className='nft-price-span'> {strTime} </span>
                }
            </div>
            <div className="row" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x1} alt="" style={{ width: '15vw' }} onClick={() => onMint(1)} />
                        {mintType === 1 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x5} alt="" style={{ width: '15vw' }} onClick={() => onMint(5)} />
                        {mintType === 5 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x10} alt="" style={{ width: '15vw' }} onClick={() => onMint(10)} />
                        {mintType === 10 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x50} alt="" style={{ width: '15vw' }} onClick={() => onMint(50)} />
                        {mintType === 50 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x100} alt="" style={{ width: '15vw' }} onClick={() => onMint(100)} />
                        {mintType === 100 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <div className="mint-button">
                        <img src={x200} alt="" style={{ width: '15vw' }} onClick={() => onMint(200)} />
                        {mintType === 200 && showToast &&<img src={mintBtn} alt="" style={{ width: '12vw', height: '12vw', position: 'absolute'}} />}
                    </div>
                </div>
            </div>
            <AssetsSlider className="" />
            <Toast
                open={showToast}
                message={toastMessage}
                handleClose={onToastClose}
                type={toastType}
            />
            <div style={{ position: 'relative' }}><Footer /></div>

        </div>
    )
}
