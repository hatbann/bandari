import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './css/MainPage.module.css';

import Nav from '../components/Nav';
import Category from '../components/Category';
import Card from '../components/sellPage/Card';

import PuppyMainImg from '../assets/PuppyMainImg.png';
import CatMainImg from '../assets/CatMainImg.png';
import BasicMainImg from '../assets/BasicMainImg.png';
import { useNavigate } from 'react-router-dom';

let datas = [
  {
    id: 1,
    userID: '누구 님',
    title: '고양이 이동장 팝니다.',
    price: '25000',
    location: '용산 어디어디 오디',
    saleStatus: false,
    likeStatus: false,
    cardImg: '/Test.png',
  },
  {
    id: 2,
    userID: '누구 님',
    title: '강아지 배변 패드 팝니다.',
    price: '25000',
    location: '용산 어디어디 오디',
    saleStatus: false,
    likeStatus: false,
    cardImg: '/Test.png',
  },
  {
    id: 3,
    userID: '누구 님',
    title: '사료 기호성 테스트 키트.',
    price: '10000',
    location: '어디어디 오디',
    saleStatus: true,
    likeStatus: true,
    cardImg: '/Test.png',
  },
  {
    id: 4,
    userID: '누구 님',
    title: '사료 기호성 테스트 키트.',
    price: '10000',
    location: '어디어디 오디',
    saleStatus: true,
    likeStatus: true,
    cardImg: '/Test.png',
  },
];

const MainPage = () => {
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const btnState = useSelector((state) => state.typeSwitch.switchState);

  console.log(isLoggedIn);

  const navigate = useNavigate();

  const moveSellPage = () => {
    navigate('/sellPage');
  };

  return (
    <>
      <Nav />
      <div className={styles.mainPage}>
        {/*첫번째 메인페이지*/}
        <section>
          <Category />
          <div className={styles.mainImg}>
            {btnState === 'basic' ? <img src={BasicMainImg} alt="basic" /> : ''}
            {btnState === 'puppy' ? <img src={PuppyMainImg} alt="puppy" /> : ''}
            {btnState === 'cat' ? <img src={CatMainImg} alt="cat" /> : ''}
          </div>
        </section>
        {/*두번째 메인페이지*/}
        <section>
          <div className={styles.sellImg}>판매사진캡쳐이미지들</div>
          <div>
            <h1>
              반려동물
              <br />
              중고용품 거래 공간
            </h1>
            <h3>
              우리 강아지가 쓰지 않는 물건을
              <br />
              버리지말고 이웃에게 판매해보세요.
            </h3>
          </div>
        </section>
        {/*세번째 메인페이지*/}
        <section>
          <div>
            <h1>
              유기견들에게
              <br />
              사랑과 관심을 전달하는 곳
            </h1>
            <h3>
              반려동물 물품을
              <br />
              필요한 아이들에게 기부해보세요
            </h3>
          </div>
          <div className={styles.donateImg}>기부캡쳐이미지들</div>
        </section>
        {/*네번째 메인페이지*/}
        <section>
          <div className={styles.locationImg}>위치기반이미지</div>
          <div>
            <h1>
              내 근처에서
              <br />
              쉽게 거래할 수 있는 공간
            </h1>
            <h3>
              멀리가지 말고 내 근처에 있는
              <br />
              이웃에게 구매하거나 판매해보세요
            </h3>
          </div>
        </section>
        {/*마지막 메인페이지*/}
        <section>
          <h1>인기글</h1>
          <div className={styles.cards}>
            {datas.map((data, index) => {
              return (
                <>
                  <Card key={data.id} list={data} />
                </>
              );
            })}
          </div>
          <span onClick={moveSellPage}>더보기</span>
        </section>
      </div>
    </>
  );
};

export default MainPage;