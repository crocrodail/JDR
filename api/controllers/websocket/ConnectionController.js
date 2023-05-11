// const { Categorie } = require('../../database').
let dataMouse = []
let dataImage = []
const connect = async (socket) => {

  // let data = await Categorie.findAll();
  console.log(`Connecté au client ${socket.id}`)
  socket.emit('dataImage', dataImage);
  socket.emit('dataMouse', dataMouse);
  
  socket.on('dataMouse', (data) => {
    const index = dataMouse.findIndex((element) => element.user === data.user)
    if (index !== -1) {
      dataMouse[index].x = data.x;
      dataMouse[index].y = data.y;
    } else {
      dataMouse.push({...data, socketid: socket.id});
    }
    socket.broadcast.emit('dataMouse', dataMouse);
  });

  socket.on('dataImage', (data) => {
    // check if image already exist
    if (dataImage.find((element) => element.id === data.id)) {
      const index = dataImage.findIndex((element) => element.id === data.id)
      dataImage[index].x = data.x;
      dataImage[index].y = data.y;
      dataImage[index].size = data.size;
    } else {
      dataImage.push(data);
    }
    socket.emit('dataImage', dataImage);
    socket.broadcast.emit('dataImage', dataImage);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnectemit', socket.id);
  });

  socket.on('dataImageDelete', (data) => {
    const index = dataImage.findIndex((element) => element.id === data.id)
    dataImage.splice(index, 1);
    socket.emit('ImageRemove', data);
    socket.broadcast.emit('ImageRemove', data);
  });
}


const disconnect = async (socket) => {

  console.log(`deconection au client ${socket.id}`)

}


module.exports = {
  connect,
  disconnect,
}
