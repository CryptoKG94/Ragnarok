import { React, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Image } from "semantic-ui-react";
import orderBy from 'lodash/orderBy'
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import ContractUtils from '../../utils/contractUtils';
import { SortOption } from '../../config'
import Toast from '../../components/Toast';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import disconnect_logo from '../../assets/images/DISCONNECT_WALL.png';
import "../../assets/styles/partyHall.css"
import logo from "../../assets/images/partyHall/logo.png"
import createBtn from "../../assets/images/partyHall/btn.png"
import text from "../../assets/images/partyHall/text.png"
import borad from "../../assets/images/partyHall/borad.png"
import styled from 'styled-components'
import { findIndex } from 'lodash';

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
const NUMBER_OF_NFTS_VISIBLE = 100

export const PartyHall = () => {
    const history = useHistory();

    const [address, setAddress] = useState(ContractUtils.isWalletConnected());
    const [mode, setMode] = useState(CHARACTER_MODE);
    const [nftAssets, setNFTAssets] = useState("");
    const [selectedNft, setSelectedNft] = useState(null);
    const [sortOption, setSortOption] = useState(SortOption.CLASSES);
    const [numberOfNFTsVisible, setNumberOfNFTsVisible] = useState(NUMBER_OF_NFTS_VISIBLE);

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState(2) //1: success, 2: error

    useEffect(() => {
        fetchNFTAssets()
    }, [])



    const fetchNFTAssets = async () => {
        let assets = await ContractUtils.getAssetInfo();
        console.log("============assets=============", assets)
        setNFTAssets(assets);
    }

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

    const onToastClose = () => {
        setShowToast(false);
    }

    const sortNFTs = (dataToSort) => {
        let metadatasToSort = dataToSort.map((metadata) => {
            let classIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.CLASSES)
            let levelIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.LEVEL)
            metadata.class = metadata.attributes[classIndex].value
            metadata.level = metadata.attributes[levelIndex].value
            return metadata;
        });
        switch (sortOption) {
            case SortOption.CLASSES:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.CLASSES);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            case SortOption.UPPER:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.CLASSES);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            case SortOption.GENDER:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.GENDER);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            case SortOption.LOWER:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.LOWER);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            case SortOption.MID:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.MID);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            case SortOption.LEVEL:
                return orderBy(
                    metadatasToSort,
                    (metadata) => {
                        let sortIndex = metadata.attributes.findIndex(item => item.trait_type === SortOption.LEVEL);
                        return metadata.attributes[sortIndex].value;
                    },
                    'desc',
                )
            default:
                return metadatasToSort
        }
    }

    let viewNFTs;
    if (nftAssets && nftAssets.status && nftAssets.status.metadatas) {
        viewNFTs = sortNFTs(nftAssets.status.metadatas).slice(0, numberOfNFTsVisible)
    } else {
        viewNFTs = [];
    }

    const renderCharacter = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '97%' }}>
                <div className="character_title">
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.CLASSES)}>CLASSES</div>
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.LEVEL)}>LEVEL</div>
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.GENDER)}>GENDER</div>
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.UPPER)}>UPPER</div>
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.MID)}>MID</div>
                    <div className="character_title_props" onClick={() => setSortOption(SortOption.LOWER)}>LOWER</div>
                </div>
                <div className="party_mode_container">
                    <div className="party_mode_itm_list">
                        {viewNFTs.map(metadata => {
                            return (
                                <div className="character_itm" onMouseEnter={onHoverNft(metadata)} onMouseLeave={hoverOff}>
                                    <Image
                                        draggable={false}
                                        src={metadata.image}
                                        // alt={metadata.image}
                                        style={{ width: "5vw", height: "7.5vw" }}
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
            <Toast
                open={showToast}
                message={toastMessage}
                handleClose={onToastClose}
                type={toastType}
            />
            <Footer />
            {selectedNft && <div className='hover_container'>
                <img src={selectedNft.image} alt="" style={{ marginRight: 20, width: 120, height: 180 }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ color: 'red', fontWeight: 'bold' }}>Class: </div>
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '30px'}}> {selectedNft.class} </div>
                    <div style={{ color: 'red', fontWeight: 'bold' }}>Level: </div>
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '30px' }}> {selectedNft.level} </div>
                </div>
            </div>}
        </div>
    )
}

