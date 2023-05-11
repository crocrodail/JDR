import React from 'react';
import * as Recoil from 'recoil';
import { userState } from './../store/userStore';
import { io } from 'socket.io-client';


const Board = () => {
    const [user, ] = Recoil.useRecoilState(userState);
    const [socket, setSocket] = React.useState(null);
    let moveImage = '';
    let scaleImage = '';

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    const handleAddImage = () => {
        const urlimage = document.getElementById('urlimage').value;
        const dataImage = {id: utf8_to_b64(new Date()), urlimage: urlimage, size: 100, x: 0, y: 0 };
        socket.emit('dataImage', dataImage);
    }

    const handleHide = () => {
        const menu = document.querySelector('.menu');
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }

    const createImage = (id, urlimage, size, x, y, sockett) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.id = id + 'div';
        div.style.position = 'absolute';
        div.style.zIndex = '1000000';
        img.style.zIndex = '1000000';
        div.style.width = 3 + 'px';
        div.style.height = 3 + 'px';
        div.style.borderRadius = '50%';
        div.style.cursor = 'nwse-resize'
        div.style.background = 'rgba(0, 0, 0, 1)';
        img.src = urlimage;
        img.id = id;
        img.style.position = 'absolute';
        img.style.width = size + 'px';
        img.style.userSelect = 'none';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        div.style.left = x - img.width + 5 + 'px';
        div.style.top = y - img.height + 5 + 'px';
        document.querySelector('#root').appendChild(img);
        document.querySelector('#root').appendChild(div);
        img.addEventListener('click', (e) => {
            if (moveImage !== '') {
                moveImage = '';
            } else {
                moveImage = e.target.id;
            }
        });
        div.addEventListener('mousedown', (e) => {
            scaleImage = e.target.id.replace('div', '');
        })
        document.addEventListener('mouseup', (e) => {
            scaleImage = '';
        })
        img.addEventListener('dblclick', (e) => {
            sockett.emit('dataImageDelete', {id: e.target.id, x: div.offsetLeft, y: div.offsetTop, size: size });
        })

    }

    

    React.useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL, {
            transports: ['websocket'],
        });
        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('disconnectemit', (id) => {
            const pointer = document.getElementById(id)
            if (pointer) {
                pointer.remove();
            }
        });

        socket.on('ImageRemove', (data) => {
            const img = document.getElementById(data.id);
            const div = document.getElementById(data.id + 'div');
            if (img) {
                img.remove();
            }
            if (div) {
                div.remove();
            }
        });

        socket.on('dataImage', (data) => {
            for (const key in data) {
                if (document.getElementById(data[key].id) === null) {
                    createImage(data[key].id, data[key].urlimage, data[key].size, data[key].x, data[key].y, socket)
                }
                const element = data[key];
                const img = document.getElementById(data[key].id);
                const div = document.getElementById(data[key].id + 'div');
                if (img) {
                    img.style.left = element.x + 'px';
                    img.style.top = element.y + 'px';
                    div.style.left = element.x + 'px';
                    div.style.top = element.y + 'px';
                    img.style.width = element.size + 'px';
                }
            }
        });

        socket.on('dataMouse', (data) => {
            for (const key in data) {
                if (document.getElementById(data[key].user) === null) {
                    const div = document.createElement('div');
                    const img = document.createElement('img');
                    const span = document.createElement('span');
                    span.innerHTML = data[key].user;
                    span.style.fontFamily = 'Poppin bold';
                    span.style.fontSize = '14px';
                    span.style.marginLeft = '5px';
                    div.style.zIndex = '10000000';
                    div.id = data[key].user;
                    img.src = 'https://cdn-icons-png.flaticon.com/512/3119/3119220.png';
                    div.style.position = 'absolute';
                    span.style.position = 'absolute';
                    span.style.position = 'absolute';
                    img.style.width = '20px';
                    img.style.height = '20px';
                    document.querySelector('#root').appendChild(div);
                    div.appendChild(img);
                    div.appendChild(span);
                }
                const element = data[key];
                const div = document.getElementById(data[key].user);
                if (div) {
                    div.style.left = element.x + 'px';
                    div.style.top = element.y + 'px';
                }
            }
        });

        setSocket(socket);

        window.addEventListener('mousemove', (e) => {
            socket.emit('dataMouse', {user: user.user.email, x: e.clientX, y: e.clientY });
            if (moveImage !== '') {
                const img = document.getElementById(moveImage);
                socket.emit('dataImage', {id: moveImage, x: e.clientX - img.width / 2, y: e.clientY - img.height / 2, size: img.style.width.replace('px', '') });
            }
            if (scaleImage !== '') {
                const div = document.getElementById(scaleImage + 'div');
                const img = document.getElementById(scaleImage);
                const size = Math.sqrt(Math.pow(e.clientX - img.offsetLeft, 2) + Math.pow(e.clientY - img.offsetTop, 2));
                socket.emit('dataImage', {id: scaleImage, x: div.offsetLeft, y: div.offsetTop, size: size });
            }
                    
        });
        
        return () => {
            socket.disconnect();
        };
    }, [moveImage, user.token, user.user.email]);

    return (
        <div className="Board">
            <button id="addimage" onClick={handleHide}>Hide</button>
            {
                user.user.role.includes('mj') &&
                    <>
                        <input id="urlimage" type="text"/>
                        <button id="addimage" onClick={handleAddImage}>image</button>
                    </>
            }
        </div>
    );
}

export default Board;
