import { React, useEffect, useState } from 'react'
import { Image } from "semantic-ui-react";
import { Header } from '../../components/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import { useRef } from 'react';
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

const CHARACTER_MODE = 1;
const PARTY_MODE = 2;

export const PartyHall = () => {
    const history = useHistory();

    const [address, setAddress] = useState(ContractUtils.isWalletConnected());
    const [mode, setMode] = useState(CHARACTER_MODE);
    const [nftAssets, setNFTAssets] = useState("");
    const [selectedNft, setSelectedNft] = useState(null);

    useEffect(() => {
        async function fetchNFTAssets() {
            let assets = await ContractUtils.getAssetInfo();
            console.log("============assets=============", assets)
            setNFTAssets(assets);
        }

        // async function getAccountInfo() {
        //     let res = await ContractUtils.getAccountInfo();
        //     if (res.address) {
        //         setAddress(res.address);
        //     }
        // }
        // getAccountInfo()
        const _address = window.localStorage.getItem(walletLocalStorageKey)
        console.log(_address);
        if (_address) {
            setAddress(_address)
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

    const pull_data = (page) => {
        if (!page.current) return;
        page.current.scrollIntoView({ behavior: "smooth" });
    }

    const onClickConnect = async () => {
        let res = await ContractUtils.connectWallet();
        if (res.address) {
            setShowToast(true)
            setToastType(1)
            setToastMessage("Connected Successfully!")
            setAddress(res.address);

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
        alert()
    }

    const onHoverNft = (nft) => () => {
        setSelectedNft(nft);
    }

    const hoverOff = () => {
        setSelectedNft(null);
    }

    const renderCharacter = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '97%' }}>
                <div className="character_title">
                    <div className="character_title_props">CLASSES</div>
                    <div className="character_title_props">LEVEL</div>
                    <div className="character_title_props">GENDER</div>
                    <div className="character_title_props">UPPER</div>
                    <div className="character_title_props">MID</div>
                    <div className="character_title_props">LOWER</div>
                </div>
                <div className="party_mode_container">
                    <div className="party_mode_itm_list">
                        {nftAssets && nftAssets.status && nftAssets.status.metadatas && nftAssets.status.metadatas.map(image => {
                            return (
                                <div className="character_itm" onMouseEnter={onHoverNft(image)} onMouseLeave={hoverOff}>
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
            </div>
        );
    }

    const renderParty = () => {
        return <>
            <div className="party_mode_container" style={{ marginTop: '2vw' }}>
                <div className="character_itm_container">
                    <div className="character_itm_close">X</div>
                    <div className="character_itm_list">

                    </div>
                </div>
                <div className="character_itm_container">
                    <div className="character_itm_close">X</div>
                    <div className="character_itm_list">
                    </div>
                </div>
                <div className="character_itm_container">
                    <div className="character_itm_close">X</div>
                    <div className="character_itm_list">
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '1.5vw' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}><div className='character_add'>ADD MORE PARTY HALL SLOT</div></div>
            </div>
        </>
    }

    return (
        <div className="create_party_container">
            <Header func={headerFuncs} headerPages={headerPages} image={header_2} headerClass={'playNowHeader'} style={{ position: 'relative' }}>
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
                        <div className='party_create_btn' onClick={onCreateParty} style={{ cursor: 'pointer' }}>
                            <img src={createBtn} alt="" style={{ cursor: 'pointer' }} />
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
                        <CharacterBtn onClick={() => setMode(CHARACTER_MODE)}>CHARACTER</CharacterBtn>
                        <CharacterBtn onClick={() => setMode(PARTY_MODE)}>PARTY</CharacterBtn>
                    </div>
                    <div className='character_table'>
                        <img src={borad} alt="" />
                        <div className="chararcter_lists">
                            {
                                mode === CHARACTER_MODE ?
                                    renderCharacter() : renderParty()
                            }
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <Footer />
            {selectedNft && <div className='hover_container'>
                <img src={selectedNft} alt="" style={{marginRight: 20, width: 120, height: 180}} />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center'}}>
                    <div style={{color: 'red', marginBottom: '30px'}}>Class: X</div>
                    <div style={{color: 'red'}}>Level: XXX</div>
                </div>
            </div>}
        </div>
    )
}
