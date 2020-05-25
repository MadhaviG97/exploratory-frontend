const io = require('socket.io-client')

export default function (user_id, token, controls) {
  // const socket = io.connect('http://localhost:3006?id=' + user_id.toString() + '&token=' + token.toString())
  const socket = io.connect('http://localhost:3006', {query:"id="+user_id.toString()+"&token="+ token.toString()})

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })


  socket.on('message', controls.onMessageReceived)

  // socket.on('chats', function (chats){console.log(chats)})
  // socket.emit('message',"Test message")


  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }
  function getChatroomParticipants(chat_id,cb){
    socket.emit('getChatroomParticipants',chat_id,cb)
  }

  function getMoreMessages(chat_id,lastMsg_id,cb){
    socket.emit('getMoreMsg',chat_id,lastMsg_id,cb)
  }

  function updateChatInfo(chatInfo,cb){
    socket.emit('updateChatInfo',chatInfo,cb)
  }

  function changeAdmin(userInfo,cb){
    socket.emit('changeAdmin',userInfo,cb)
  }

  function addMoreParticipants(usersInfo,cb){
    socket.emit('addMoreParticipants',usersInfo,cb)
  }

  function removeParticipant(chat_id,user_id,cb){
    socket.emit('removeParticipant',chat_id,user_id,cb)
  }

  function sendMessage(msg = {}, cb) {
    socket.emit('message', msg, cb)
  }

  function searchResearchers(searchString = "", cb) {
    socket.emit('searchReseacher', searchString, cb)
  }

  function allResearchers(cb) {
    socket.emit('allResearcher', cb)
  }

  function createChatroom(chatDetails, cb) {
    socket.emit('createChatroom', chatDetails, cb)
  }

  function markSeen(MsgInfo,cb){
    socket.emit('markSeen',MsgInfo,cb)
  }

  function getSeen(chat_id,message_id,cb){
    socket.emit('getSeen',chat_id,message_id,cb)
  }

  function markDeliver(MsgInfo,cb){
    socket.emit('markDeliver',MsgInfo,cb)
  }

  function getDeliver(chat_id,message_id,cb){
    socket.emit('getDeliver',chat_id,message_id,cb)
  }

  return {
    getChatrooms,
    getChatroomParticipants,
    getMoreMessages,
    updateChatInfo,
    changeAdmin,
    addMoreParticipants,
    removeParticipant,
    sendMessage,
    searchResearchers,
    allResearchers,
    createChatroom,
    markSeen,
    getSeen,
    markDeliver,
    getDeliver,
  }
}

