import React, { useEffect, useRef, useState } from 'react';

import html2canvas from 'html2canvas';
import moment from 'moment';

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

function BannerList(){

    const { member, onGetMember } = useMember();
    const { banner, onGetBanner } = useBanner();

    const [ status, setStatus ] = useState<boolean>(false);

    const [ txt1, setTxt1 ] = useState<string | undefined>("");
    const [ txt2, setTxt2 ] = useState<string | undefined>("");

    const [ ruleTitle1, setRuleTitle1 ] = useState<string | undefined>("");
    const [ ruleTitle2, setRuleTitle2 ] = useState<string | undefined>("");
    const [ ruleTitle3, setRuleTitle3 ] = useState<string | undefined>("");

    const [ ruleTxt1, setRuleTxt1 ] = useState<string | undefined>("");
    const [ ruleTxt2, setRuleTxt2 ] = useState<string | undefined>("");
    const [ ruleTxt3, setRuleTxt3 ] = useState<string | undefined>("");

    const [ download , setDownload ] = useState<string | null>(null);
    const [ filename, setFilename ] = useState<string>("");

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

            setStatus(true);
        }
    }, [banner]);
    
    useEffect(() => {
        if(status){
            htmlToImage();
        }
    }, [status]);

    const bannerRef = useRef<any>();

    const htmlToImage = () => {
        html2canvas(bannerRef.current).then((canvas) => {
            let date = new Date();

            setDownload(canvas.toDataURL('image/jpg'));
            setFilename('banner_' + moment(date).format('YYYYMMDDhhmmss'));
        });
    }

    return (
        <>
            <div className="mb-30 txt-center">
                {
                    download && <a href={download} download={filename} className="button cancel">이미지 다운로드</a>
                }
            </div>
            <div className="banner-scroll">
                <div className="banner-view" ref={bannerRef}>
                    <div className="view-wrap">
                        <div className="view-title">
                            <img src={Title} alt=""/>
                        </div>
                        <div className="view-logo">
                            <img src={Logo} alt=""/>
                        </div>
                        <div className='view-txt1'>
                            <p>{txt1}</p>
                        </div>
                        <div className='view-txt2'>
                            <img src={Frame} alt=""/>
                            <p>{txt2}</p>
                        </div>
                        <div className='view-rules'>
                            <div className='rule-item rule1'>
                                <img src={Kakao} alt=""/>
                                <p className='rule-title'>{ruleTitle1}</p>
                                <p className='rule-txt'>{ruleTxt1}</p>
                            </div>
                            <div className='rule-plus'><img src={Plus} alt=""/></div>
                            <div className='rule-item rule2'>
                                <img src={Quality} alt=""/>
                                <p className='rule-title'>{ruleTitle2}</p>
                                <p className='rule-txt'>{ruleTxt2}</p>
                            </div>
                            <div className='rule-plus'><img src={Plus} alt=""/></div>
                            <div className='rule-item rule3'>
                                <img src={Swords} alt=""/>
                                <p className='rule-title'>{ruleTitle3}</p>
                                <p className='rule-txt'>{ruleTxt3}</p>
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
        </>
    )
}

export default BannerList;