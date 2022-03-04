import { React, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Image } from "semantic-ui-react";
import orderBy from 'lodash/orderBy'
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import ContractUtils from '../../utils/contractUtils';
import { SortOption } from '../../config'
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';
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
const NUMBER_OF_NFTS_VISIBLE = 100;

const MALE = "asc";
const FEMALE = "desc";

const ASC = 'asc';
const DSC = 'desc';

const UPPER = 'UPPER'
const MID = 'MID';
const LOWER = 'LOWER'

export const PartyHall = () => {
    const history = useHistory();

    const [address, setAddress] = useState(ContractUtils.isWalletConnected());
    const [mode, setMode] = useState(CHARACTER_MODE);
    const [nftAssets, setNFTAssets] = useState("");
    const [selectedNft, setSelectedNft] = useState(null);
    const [sortOption, setSortOption] = useState(SortOption.CLASSES);
    const [numberOfNFTsVisible, setNumberOfNFTsVisible] = useState(NUMBER_OF_NFTS_VISIBLE);

    const [showToast, setShowToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState(2) //1: success, 2: error
    const [gender, setGender] = useState(MALE);
    const [order, setOrder] = useState(ASC)
    const [size, setSize] = useState(UPPER)

    const initialShowConf = {
        class: false,
        level: false,
        gender: false
    }
    const [showSortConf, setShowSortConf] = useState(initialShowConf)

    const [checkedVal, setCheckedVal] = useState("");

    useEffect(() => {

        // async function getAccountInfo() {
        //     let res = await ContractUtils.getAccountInfo();
        //     if (res.address) {
        //         setAddress(res.address);
        //     }
        // }
        // getAccountInfo()
        // const _address = window.localStorage.getItem(walletLocalStorageKey)
        const _address = ContractUtils.isWalletConnected()
        console.log(_address);
        if (_address) {
            setAddress(_address)
        }

        fetchNFTAssets()
    }, [])



    const fetchNFTAssets = async () => {
        setLoading(true)
        let assets = await ContractUtils.getAssetInfo();
        setLoading(false)
        setNFTAssets(assets);
    }

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
        let res = await ContractUtils.connectWallet();
        if (res.address) {
            setShowToast(true)
            setToastType(1)
            setToastMessage("Connected Successfully!")
            setAddress(res.address);

            fetchNFTAssets()
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

    const sortNFTs = useCallback((dataToSort) => {
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
                    gender,
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
                        console.log(metadata.attributes[sortIndex].value)
                        return Number(metadata.attributes[sortIndex].value);
                    },
                    order,
                )
            default:
                return metadatasToSort
        }
    }, [order, gender, sortOption])

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
                    {/* <div className="character_title_props character_title_gender"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowSortConf(
                                (conf) => { return { ...initialShowConf, class: !conf.class } }
                            )
                        }}
                    >
                        CLASSES
                        <div className='sort_classes' style={!showSortConf.class ? { display: 'none' } : { width: '270px' }}>
                            <ul>
                                <li>
                                    <input id="classes_job1" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                    <label htmlFor="classes_job1">First Job</label>
                                    <ul style={{ paddingLeft: '2rem' }}>
                                        <li>
                                            <input id="lb_class_acolyte" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                            <label htmlFor="lb_class_acolyte">Acolyte</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_archer" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_archer">Archer</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_mage" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_mage">Mage</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_merchant" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_merchant">Merchant</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_swordsman" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_swordsman">Swordsman</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_thief" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_thief">Thief</label>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <input id="classes_job2" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                    <label htmlFor="classes_job2">Second Job</label>
                                    <ul style={{ paddingLeft: '2rem' }}>
                                        <li>
                                            <label >Assassin</label>
                                            <ul>
                                                <li>
                                                    <input id="lb_class_assassin" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_assassin">Assassin</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_cross" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_cross">Assassin Cross</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <label>Blacksmith</label>
                                            <ul>
                                                <li>
                                                    <input id="lb_class_blacksmith" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_blacksmith">Blacksmith</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_whitesmith" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_whitesmith">Whitesmith</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <label>Hunter</label>
                                            <ul >
                                                <li>
                                                    <input id="lb_class_hunter" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_hunter">Hunter</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_sniper" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_sniper">Sniper</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <label>Knight</label>
                                            <ul >
                                                <li>
                                                    <input id="lb_class_knight" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_knight">Knight</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_lord" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_lord">Lord Knight</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <label>Priest</label>
                                            <ul >
                                                <li>
                                                    <input id="lb_class_priest" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_priest">Priest</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_highpriest" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_highpriest">High Priest</label>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <label>Wizard</label>
                                            <ul >
                                                <li>
                                                    <input id="lb_class_wizard" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                                    <label htmlFor="lb_class_wizard">Wizard</label>
                                                </li>
                                                <li>
                                                    <input id="lb_class_high " type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                                    <label htmlFor="lb_class_high ">High Wizard</label>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <input id="classes_job3" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                    <label htmlFor="classes_job3">Third Job</label>
                                    <ul style={{ paddingLeft: '2rem' }}>
                                        <li>
                                            <input id="lb_class_arch" type="radio" onClick={() => setSortOption(SortOption.CLASSES)} value="ASC" name="classes" style={{ marginRight: 10 }} />
                                            <label htmlFor="lb_class_arch">Arch Bishop</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_genetic" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_genetic">Genetic</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_gulitione" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_gulitione">Gulitione Cross</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_ranger" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_ranger">Ranger</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_runeknight" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_runeknight">Rune Knight</label>
                                        </li>
                                        <li>
                                            <input id="lb_class_warlock" type="radio" onClick={() => { setSortOption(SortOption.CLASSES) }} style={{ marginRight: 10 }} value="DSC" name="classes" />
                                            <label htmlFor="lb_class_warlock">Warlock</label>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </div> */}
                    <div className="character_title_props character_title_gender" onClick={
                        (e) => {
                            e.stopPropagation();
                            setShowSortConf(
                                (conf) => { return { ...initialShowConf, level: !conf.level } }
                            )
                        }}
                    >
                        LEVEL
                        <div className='sort_gender' style={!showSortConf.level ? { display: 'none' } : { width: '180px' }}>
                            <div className='sort_gender_column'>
                                <input id="lb_order_Ascending" type="radio"
                                    onChange={
                                        (e) => {
                                            e.stopPropagation();
                                            setCheckedVal(e.currentTarget.value)
                                            setOrder(ASC)
                                            setSortOption(SortOption.LEVEL)
                                        }}
                                    value={ASC}
                                    name="order"
                                    checked={checkedVal === ASC}
                                    style={{ marginRight: 10 }}
                                />
                                <label htmlFor="lb_order_Ascending">Ascending</label></div>
                            <div className='sort_gender_column'>
                                <input id="lb_order_Decending" type="radio"
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        setCheckedVal(e.currentTarget.value)
                                        setOrder(DSC)
                                        setSortOption(SortOption.LEVEL)
                                    }}
                                    style={{ marginRight: 10 }}
                                    value={DSC}
                                    name="order"
                                    checked={checkedVal === DSC}
                                />
                                <label htmlFor="lb_order_Decending">Decending</label></div>
                        </div>
                    </div>
                    <div className="character_title_props character_title_gender" onClick={
                        (e) => {
                            e.stopPropagation();
                            setShowSortConf(
                                (conf) => { return { ...initialShowConf, gender: !conf.gender } }
                            )
                        }}
                    >
                        GENDER
                        <div className='sort_gender' style={!showSortConf.gender ? { display: 'none' } : {}}>
                            <div className='sort_gender_column'>
                                <input
                                    id="lb_gender_male"
                                    type="radio"
                                    onChange={(e) => {e.stopPropagation();setCheckedVal(e.currentTarget.value); setGender(MALE); setSortOption(SortOption.GENDER) }}
                                    value={MALE}
                                    name="gender"
                                    checked={checkedVal === MALE}
                                    style={{ marginRight: 10 }}
                                />
                                <label htmlFor="lb_gender_male">Male</label></div>
                            <div className='sort_gender_column'>
                                <input
                                    id="lb_gender_female"
                                    type="radio"
                                    onChange={(e) => {e.stopPropagation();setCheckedVal(e.currentTarget.value); setGender(FEMALE); setSortOption(SortOption.GENDER) }}
                                    style={{ marginRight: 10 }}
                                    value={FEMALE}
                                    name="gender"
                                    checked={checkedVal === FEMALE}
                                />
                                <label htmlFor="lb_gender_female">Female</label></div>
                        </div>
                    </div>
                    {console.log(size)}
                    <div className="character_title_props" style={{ width: '22vw' }}>
                        <input 
                            id="lb_upper" 
                            type="radio" 
                            onChange={(e) => {e.stopPropagation();setCheckedVal(e.currentTarget.value); setSize(UPPER); setSortOption(SortOption.UPPER);}} 
                            value={UPPER} 
                            name="case"
                            checked={checkedVal === UPPER}
                            style={{ marginRight: 10 }} 
                        />
                        <label htmlFor="lb_upper">UPPER</label>
                        <input 
                            className='radio_container' 
                            id="lb_mid" 
                            type="radio" 
                            onChange={(e) => {e.stopPropagation();setCheckedVal(e.currentTarget.value); setSortOption(SortOption.MID); setSize(MID) }} 
                            value={MID} 
                            checked={checkedVal === MID}
                            name="case" 
                            style={{ marginRight: 10 }} 
                        />
                        <label htmlFor="lb_mid">MID</label>
                        <input 
                            className='radio_container' 
                            id="lb_lower" 
                            type="radio" 
                            onChange={(e) => {e.stopPropagation();setCheckedVal(e.currentTarget.value);setSortOption(SortOption.LOWER); setSize(LOWER)}} 
                            value={LOWER} 
                            checked={checkedVal === LOWER}
                            name="case" 
                            style={{ marginRight: 10 }} 
                        />
                        <label htmlFor="lb_lower">LOWER</label>
                    </div>

                </div>
                <div className="party_mode_container">
                    <div className="party_mode_itm_list">
                        {viewNFTs.map((metadata, key) => {
                            return (
                                <div className="character_itm" key={key} onMouseEnter={onHoverNft(metadata)} onMouseLeave={hoverOff}>
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
        <div className="create_party_container" onClick={() => { setShowSortConf(initialShowConf) }}>
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
                            <div>Party Fee: 2 ROK</div>
                            <div>Free Initial Members: 5</div>
                            <div>Additional Party Member Fee: 1 ROK</div>
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
            <Loading
                open={loading}
            />
            <Footer />
            {selectedNft && <div className='hover_container'>
                <img src={selectedNft.image} alt="" style={{ marginRight: 20, width: 120, height: 180 }} />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'right' }}>
                    <div style={{ color: 'white', fontWeight: 'bold', margin: '50px 10px 85px 10px' }}> {selectedNft.class} </div>
                    <div style={{ color: 'white', fontWeight: 'bold', margin: '0 10px 10px 10px' }}> {selectedNft.level} </div>
                </div>
            </div>}
        </div>
    )
}

