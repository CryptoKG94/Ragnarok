import { React, useEffect, useState } from 'react'
import { Image } from "semantic-ui-react";
import { Header } from '../../components/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import { Footer } from '../../components/Footer';
import ContractUtils from '../../utils/contractUtils';
import { walletLocalStorageKey } from '../../config'
import "../../assets/styles/partyHall.css"
import logo from "../../assets/images/partyHall/logo.png"
import createBtn from "../../assets/images/partyHall/btn.png"
import text from "../../assets/images/partyHall/text.png"
import borad from "../../assets/images/partyHall/borad.png"
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

const CharacterBtn = styled.button`
    &:focus-visible {
        border: none;
        outline: none;
    }
    padding: 2px;
    padding-left: 5px;
    padding-right: 5px;

    background: rgb(222,200,153);
    color: black;
    font-size: 1.5vw;
    border: 2px solid black;
    border-radius: 5px;
    margin-right: 3.3vw;
`

export const PartyHall = () => {
    const history = useHistory();

    const [isConnected, setConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [nftAssets, setNFTAssets] = useState("");

    useEffect(() => {
        async function fetchNFTAssets() {
            let assets = await ContractUtils.getAssetInfo();
            setNFTAssets(assets);
        }
        fetchNFTAssets()
    }, [])


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

            let assets = await ContractUtils.getAssetInfo();
            setNFTAssets(assets);
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

    const onCreateParty = () => {
        alert('coming soon');
    }

    const onToastClose = () => {
        setShowToast(false);
    }

    return (
        <div className="create_party_container">
            <Header func={headerFuncs} headerPages={headerPages} image={header_2} headerClass={'palyNowHeader'} style={{ position: 'relative' }}>
                {!address ?
                    <>
                        <img src={header_logo} className='header_con' alt="connect_wall" onClick={() => onClickConnect()} />
                    </>
                    :
                    <>
                        <img src={disconnect_logo} className='header_con' alt="connect_wall" onClick={onClickDisconnect} />
                    </>}
            </Header>
            <div style={{ paddingLeft: '3.4vw', paddingRight: '3.4vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div className="party_title_container">
                    <div className="party_logo">
                        <img src={logo} alt="" style={{ height: '35vw', width: '25vw' }} />

                    </div>
                    <div className="party_title">
                        <div className='party_create_btn' onClick={onCreateParty}>
                            <img src={createBtn} alt="" />
                        </div>
                        <div className="party_sub_text">
                            <div>Party Fee: 5BUSD</div>
                            <div>Fee Maximum Member: 5</div>
                            <div>Additional Party Member Fee: 1BUSD</div>
                        </div>
                        <div className='party_info_text'>
                            <img src={text} alt="" style={{ width: '16.7vw' }} />
                        </div>
                        <div className="party_sub_text">
                            <div>Party Level:</div>
                            <div>Party Members</div>
                        </div>
                    </div>
                </div>
                <div className="character_container">
                    <div className="character_btn_group" >
                        <CharacterBtn>CHARACTER</CharacterBtn>
                        <CharacterBtn>PARTY</CharacterBtn>
                    </div>
                    <div className='character_table'>
                        <img src={borad} alt="" />
                        <div className="chararcter_lists">
                            <div className="character_title">
                                <div className="character_title_props">CLASSES</div>
                                <div className="character_title_props">LEVEL</div>
                                <div className="character_title_props">GENDER</div>
                                <div className="character_title_props">UPPER</div>
                                <div className="character_title_props">MID</div>
                                <div className="character_title_props">LOWER</div>
                            </div>
                            <div className="character_itm_container">
                                <div className="character_itm_close">X</div>
                                <div className="character_itm_list">
                                    {nftAssets && nftAssets.status && nftAssets.status.metadatas && nftAssets.status.metadatas.map(image => {
                                        return (
                                            <div className="character_itm">
                                                <Image
                                                    draggable={false}
                                                    src={image}
                                                    alt={image}
                                                    style={{ width: "3.5vw", height: "3.5vw" }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="character_itm_container">
                                <div className="character_itm_close">X</div>
                                <div className="character_itm_list">
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                </div>
                            </div>
                            <div className="character_itm_container">
                                <div className="character_itm_close">X</div>
                                <div className="character_itm_list">
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                    <div className="character_itm"></div>
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5vw' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><div className='character_add'>ADD MORE PARTY HALL SLOT</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <Footer />

        </div>
    )
}
