function sendToUserPage(userID){
    window.location.replace('E:/DASH%20projects/API%20fetch%20request%20todo%20app/tasks.html');
}

const buttons = document.getElementsByClassName("button-70");
for(let btn of buttons){
    btn.addEventListener("click", event=>{
       let id = event.target.id;
       window.location = 'E:/DASH%20projects/API%20fetch%20request%20todo%20app/tasks.html?userId='+id;
    });
}