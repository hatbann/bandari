import React, { useEffect, useRef, useState } from 'react';
import styles from './css/ChatRoom.module.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ chatData, categoryType, chatRef, setSelectChat }) => {
  const user = sessionStorage.getItem('userId'); // 로그인한 유저

  const inputRef = useRef();
  const chat = useRef();

  const [send, setSend] = useState(false); //채팅전송시바뀜

  // 채팅 목록에서 채팅방 클릭 시 DB에서 chat 가져오기
  useEffect(() => {
    axios.get('chat/getData', { params: { id: chatData.id } }).then((res) => {
      res.data.forEach((el, idx) => {
        if (el.userId === user) {
          chat.current.insertAdjacentHTML(
            'beforeend',
            `<div class='${styles.myChat} ${styles[categoryType]}'>` +
              `<span>${el.time}</span>` +
              `<div>` +
              `${el.msg}` +
              '</div>' +
              '</div>'
          );
        } else {
          chat.current.insertAdjacentHTML(
            'beforeend',
            `<div class=` +
              `${styles.otherChat}>` +
              `${el.time}` +
              `<div>` +
              `${el.msg}` +
              '</div>'
          );
        }
      });
    });
  }, []);

  //스크롤 위치를 위함
  const resetScroll = () => {
    window.setTimeout(() => {
      chat.current.scrollTop = chat.current.scrollHeight - 100;
    }, 50);
  };
  useEffect(() => {
    resetScroll();
  }, []);

  let socket = io.connect('http://13.124.185.47:5000');
  const closeBtnRef = useRef();

  // 현재 채팅에 들어온 유저와 방 번호
  socket.emit('loginUser', { user: user, roomId: chatData.id });

  /*전송이벤트 */
  const btnSend = () => {
    const inputText = inputRef.current.value;
    // 시간
    let hourMin = new Date().toTimeString().split(' ')[0];
    hourMin = hourMin.substring(0, hourMin.lastIndexOf(':'));
    const datas = {
      msg: inputText,
      time: hourMin,
      userId: user,
      roomId: chatData.id,
    };
    socket.emit('sendMsg', datas);
    axios.post('chat/insert', datas);
    inputRef.current.value = '';
    resetScroll();
  };

  socket.on('newMsg', (data) => {
    console.log('server에서 넘어온 값', data);
    if (user === data.userId) {
      chat.current.insertAdjacentHTML(
        'beforeend',
        `<div class='${styles.myChat} ${styles[categoryType]}'>` +
          `<span>${data.time}</span>` +
          `<div>` +
          `${data.msg}` +
          '</div>' +
          '</div>'
      );
    } else {
      chat.current.insertAdjacentHTML(
        'beforeend',
        `<div class=` +
          `${styles.otherChat}>` +
          `${data.time}` +
          `<div>` +
          `${data.msg}` +
          '</div>'
      );
    }
  });

  /**채팅 방 나가기 */
  const onClickClose = () => {
    console.log('채팅방 close');
    chatRef.current.classList.add(`${styles.transparent}`);
    socket.disconnect();
    setSelectChat(false);
  };

  /**판매 완료 버튼 이벤트 */
  const onClickCheckSoldOut = () => {
    axios
      .patch('/supplies/updateDeal', {
        id: chatData.suppliesId,
      })
      .then((res) => {
        if (res.data[0] === 1) alert('판매완료 되었습니다!');
        else alert('이미 판매완료된 상품입니다.');
      });
  };

  /** 채팅 종료 버튼 이벤트 : 채팅 삭제 */
  const onClickExit = () => {
    alert('채팅을 종료하시겠습니까? 채팅방의 모든 내용이 삭제됩니다.');
    axios.delete('room/delete', { data: { id: chatData.id } }).then((res) => {
      if (res.data.result === 1) alert('성공적으로 채팅방에서 나가졌습니다!');
      else alert('이미 채팅방에서 나가졌습니다.');
      socket.disconnect();
      onClickClose();
      window.location.reload();
    });
  };

  /*엔터 이벤트 */
  const enter = (e) => {
    if (e.keyCode == 13) {
      btnSend();
    }
  };

  return (
    <div
      className={`${styles.chatRoom} ${styles[`${categoryType}`]}`}
      ref={chatRef}
    >
      <button
        className={`${styles.closeBtn}`}
        onClick={() => {
          onClickClose();
        }}
        ref={closeBtnRef}
      >
        X
      </button>
      {/**상품정보창 */}
      <div className={styles.item}>
        <div>
          <img src={`/uploadImg/${chatData['supply.cover']}`} alt="" />
          <div>
            <h1>{chatData['supply.title']}</h1>
            <span>{chatData['supply.content']}</span>
          </div>
        </div>
        {/**상품정보 */}
        <div>
          <button
            className={`${styles.checkSoldBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickCheckSoldOut}
          >
            판매완료확인
          </button>
          <button
            className={`${styles.exitBtn} ${styles[`${categoryType}`]}`}
            onClick={onClickExit}
          >
            채팅종료
          </button>
        </div>
        {/**버튼2개 */}
      </div>
      {/**카톡내용창 */}
      <div className={styles.chatpage}>
        <div ref={chat} className={styles.container}></div>
      </div>
      <div className={styles.inputSection}>
        <input type="text" id="msg_box" onKeyDown={enter} ref={inputRef} />
        <button onClick={btnSend} className={`${styles[`${categoryType}`]}`}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
