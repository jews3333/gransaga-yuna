import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useMember from '../hooks/useMember';
import useBanner from '../hooks/useBanner';

import Title from '../res/img/txt_title.png';
import Logo from '../res/img/ico_logo.jpg';
import Frame from '../res/img/bg_txt2_frame.png';
import Compete1 from '../res/img/img_compete_01.jpg';
import Compete2 from '../res/img/img_compete_02.jpg';
import Inquiry from '../res/img/txt_inquiry.png';
import Kakao from '../res/img/ico_kakao.png';
import Quality from '../res/img/ico_quality.png';
import Swords from '../res/img/ico_swords.png';
import Plus from '../res/img/ico_plus.png';
import { BannerState } from '../reducers/banner';

function BannerForm(){

    const navigation = useNavigate();

    const { member, onGetMember } = useMember();
    const { banner, onGetBanner, onSetBanner } = useBanner();

    const [ data, setData ] = useState<BannerState>(banner);

    const [ txt1, setTxt1 ] = useState<string | undefined>("");
    const [ txt2, setTxt2 ] = useState<string | undefined>("");

    const [ ruleTitle1, setRuleTitle1 ] = useState<string | undefined>("");
    const [ ruleTitle2, setRuleTitle2 ] = useState<string | undefined>("");
    const [ ruleTitle3, setRuleTitle3 ] = useState<string | undefined>("");

    const [ ruleTxt1, setRuleTxt1 ] = useState<string | undefined>("");
    const [ ruleTxt2, setRuleTxt2 ] = useState<string | undefined>("");
    const [ ruleTxt3, setRuleTxt3 ] = useState<string | undefined>("");

    useEffect(() => {
        onGetMember();
        onGetBanner();
    }, []);

    useEffect(() => {
        if(banner){
            setTxt1(banner.txt1);
            setTxt2(banner.txt2);

            if(banner.rules){
                Object.values(banner.rules).map((value, idx) => {
                    switch(idx){
                        case 0 : {
                            setRuleTitle1(value.title);
                            setRuleTxt1(value.txt);
                            break;
                        }
                        case 1 : {
                            setRuleTitle2(value.title);
                            setRuleTxt2(value.txt);
                            break;
                        }
                        case 2 : {
                            setRuleTitle3(value.title);
                            setRuleTxt3(value.txt);
                            break;
                        }
                    }
                });
            }
        }
    }, [banner]);

    useEffect(() => {
        setData({
            txt1: txt1,
            txt2: txt2,
            rules: {
                1: {
                    title: ruleTitle1,
                    txt: ruleTxt1
                },
                2: {
                    title: ruleTitle2,
                    txt: ruleTxt2
                },
                3: {
                    title: ruleTitle3,
                    txt: ruleTxt3
                }
            }
        });
    }, [txt1, txt2, ruleTitle1, ruleTitle2, ruleTitle3, ruleTxt1, ruleTxt2, ruleTxt3]);

    const setBanner = () => {
        onSetBanner(data)
        .then((result) => {
            alert(result);
            navigation('/admin/banner')
        })
        .catch((err) => alert(err));
    }  

    return (
        <>  
            <div className="banner-scroll">
                <div className="banner-view">
                    <div className="view-wrap">
                        <div className="view-title">
                            <img src={Title} alt=""/>
                        </div>
                        <div className="view-logo">
                            <img src={Logo} alt=""/>
                        </div>
                        <div className='view-txt1'>
                            <p><input type="text" defaultValue={txt1} onChange={(e) => setTxt1(e.target.value)}/></p>
                        </div>
                        <div className='view-txt2'>
                            <img src={Frame} alt=""/>
                            <p><input type="text" defaultValue={txt2} onChange={(e) => setTxt2(e.target.value)}/></p>
                        </div>
                        <div className='view-rules'>
                            <div className='rule-item rule1'>
                                <img src={Kakao} alt=""/>
                                <p className='rule-title'>
                                    <input type="text" defaultValue={ruleTitle1} onChange={(e) => setRuleTitle1(e.target.value)}/>
                                </p>
                                <p className='rule-txt'>
                                    <input type="text" defaultValue={ruleTxt1} onChange={(e) => setRuleTxt1(e.target.value)}/>
                                </p>
                            </div>
                            <div className='rule-plus'><img src={Plus} alt=""/></div>
                            <div className='rule-item rule2'>
                                <img src={Quality} alt=""/>
                                <p className='rule-title'>
                                    <input type="text" defaultValue={ruleTitle2} onChange={(e) => setRuleTitle2(e.target.value)}/>
                                </p>
                                <p className='rule-txt'>
                                    <input type="text" defaultValue={ruleTxt2} onChange={(e) => setRuleTxt2(e.target.value)}/>
                                </p>
                            </div>
                            <div className='rule-plus'><img src={Plus} alt=""/></div>
                            <div className='rule-item rule3'>
                                <img src={Swords} alt=""/>
                                <p className='rule-title'>
                                    <input type="text" defaultValue={ruleTitle3} onChange={(e) => setRuleTitle3(e.target.value)}/>    
                                </p>
                                <p className='rule-txt'>
                                    <input type="text" defaultValue={ruleTxt3} onChange={(e) => setRuleTxt3(e.target.value)}/>
                                </p>
                            </div>
                            {/* {
                                banner?.rules &&
                                Object.values(banner.rules).map((value, idx) => {
                                    return (
                                        <>
                                        <div className={`rule-item rule${idx+1}`}>
                                            <img src={idx === 0 ? Kakao : idx === 1 ? Quality : Swords} alt=""/>
                                            <p className='rule-title'>{value.title}</p>
                                            <p className='rule-txt'>{value.txt}</p>
                                        </div>
                                        {
                                            idx < Object.keys(banner).length-1 &&
                                            <div className='rule-plus'><img src={Plus} alt=""/></div>
                                        }
                                        </>
                                    )
                                })
                            } */}
                        </div>
                        <div className='view-compete1'>
                            <img src={Compete1} alt=""/>
                        </div>
                        <div className='view-compete2'>
                            <img src={Compete2} alt=""/>
                        </div>
                        <div className="view-inquiry">
                            <img src={Inquiry} alt=""/>
                            {
                                Object.keys(member).map((mber, idx) => {
                                    if(member[mber].class === 1 || member[mber].class === 2){
                                        return (
                                            <p className='inquiry-item' key={idx}>
                                                <span>{member[mber].class === 1 ? '길드마스터' : '서브마스터'}</span>
                                                <strong>{member[mber].id}</strong>
                                            </p>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="view-logo">
                            <img src={Logo} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='submit-layout'>
                <button type="submit" onClick={setBanner} className='button submit'>저장</button>
                <button className='button cancel' onClick={() => navigation(-1)}>취소</button>
            </div>
        </>
    )
}

export default BannerForm;