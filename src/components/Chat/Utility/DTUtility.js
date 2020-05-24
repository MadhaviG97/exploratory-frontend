

  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  const isYesterday=(someDate)=>{
    let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
    return someDate.getDate() == yesterday.getDate() &&
      someDate.getMonth() == yesterday.getMonth() &&
      someDate.getFullYear() == yesterday.getFullYear()
  }

  const getDateTime = (timestamp) => {
    var a = new Date(timestamp);
   
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours().toString();
    hour=(hour.length<2)?"0"+hour:hour
    var min = a.getMinutes().toString();
    min=(min.length<2)?"0"+min:min

    // var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' - ' + hour + ':' + min

    if(isToday(a)){
      var time = 'Today - ' + hour + ':' + min
    }
    else if(isYesterday(a)){
      var time = 'Yesterday - ' + hour + ':' + min
    }

    return time;
    // console.log(date)
}

export  {getDateTime}