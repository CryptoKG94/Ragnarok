import { React, useEffect, useState } from 'react'
import { Header } from '../../components/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import { AssetsSlider } from './AssetsSlider';
import { Footer } from '../../components/Footer';
import ContractUtils from '../../utils/contractUtils';
import Toast from '../../components/Toast';
import { walletLocalStorageKey } from '../../config'
import imgBox from "../../assets/images/buying/box.png"
import x1 from "../../assets/images/buying/x1.png"
import x10 from "../../assets/images/buying/x10.png"
import x5 from "../../assets/images/buying/x5.png"
import { useHistory } from 'react-router-dom';

export const Valhalla = () => {

    const [isConnected, setConnected] = useState(false);
    const [address, setAddress] = useState(ContractUtils.isWalletConnected());

    useEffect(() => {
        // const _address = window.localStorage.getItem(walletLocalStorageKey);
        // if (_address) {
        //   setAddress(_address)
        // }
        console.log(ContractUtils.isWalletConnected())
    }, [])

    const history = useHistory();
    

    const headerFuncs = (target) => {
        history.push(target);
    }

    const headerPages = [
        { page: 'VALHALLA', target: '/valhalla' },
        { page: 'PARTY HALL', target: '/partyhall' },
        { page: 'ADVENTURE', target: '/adventure' },
        { page: 'MARKETPLACE', target: '/marketplace' },
        { page: 'WEDDING HALL', target: '/weddinghall' }
    ];

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
            <div className="row" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div className="mint-button">
                        <img src={imgBox} alt="" style={{ width: '15vw', cursor: 'pointer' }} onClick={() => onMint(1)} />
                        <img src={x1} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute', cursor: 'pointer' }} onClick={() => onMint(1)} />
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div className="mint-button">
                        <img src={imgBox} alt="" style={{ width: '15vw', cursor: 'pointer' }} onClick={() => onMint(5)} />
                        <img src={x5} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute', cursor: 'pointer' }} onClick={() => onMint(5)} />
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div className="mint-button">
                        <img src={imgBox} alt="" style={{ width: '15vw', cursor: 'pointer' }} onClick={() => onMint(10)} />
                        <img src={x10} alt="" style={{ width: '4vw', height: '4vw', position: 'absolute', cursor: 'pointer' }} onClick={() => onMint(10)} />
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
