// The One That Holds Everything //

class User{
    constructor(clicks, autoClickLevel, clickLevel){
        this.clicks = clicks;
        this.autoClickLevel = autoClickLevel;
        this.clickLevel = clickLevel;
    }
}

// Gets all that juicy user Stuff //

var currentUser;

fetchUser();

function fetchUser(){
    var temp = JSON.parse(window.localStorage.getItem('user'));
    if(temp == null){
        currentUser= new User(0,-1,1);
    }
    else{
        currentUser = new User(temp.clicks, temp.autoClickLevel, temp.clickLevel);
        //TODO: same thing, change this 
        if(currentUser.clicks >= 10 || currentUser.autoClickLevel >= 0){
            unlockAutoClick();
        }
        updateClick();
    }
}

// clicking Stuff!! //

function addClick(modifier=1) {
    currentUser.clicks = currentUser.clicks + modifier;
    updateClick();
    
    //TODO: change this to smth more or less challenging? this is a clicking game
    if(currentUser.clicks == 10){
        unlockAutoClick();
    }
}

function updateClick(){
    document.getElementById("clickNbText").innerHTML = currentUser.clicks;
}

//TODO: saves progress every second, change timer when things actually get Big
setInterval(function() { 
    window.localStorage.setItem('user', JSON.stringify(currentUser));
}, 1000);

// events ! //

function unlockAutoClick(){
    if(currentUser.autoClickLevel > 0){
        document.getElementById("autoClickBtn").innerHTML = "auto click: " + currentUser.autoClickLevel;
        updateAutoClick();
    }
    else{
        currentUser.autoClickLevel = 0;
    }
    document.getElementById("shop").style.visibility='visible';
    document.getElementById("autoClickBtn").style.visibility='visible';
}

// shop buttons //

document.getElementById("autoClickBtn").addEventListener("click", buyAutoClick);

function buyAutoClick() {
    var price = (currentUser.autoClickLevel + 1)*10;
    if(currentUser.clicks >= price ){
        currentUser.clicks = currentUser.clicks-price;
        currentUser.autoClickLevel++;
        document.getElementById("autoClickBtn").innerHTML = "auto click: " + currentUser.autoClickLevel;
        updateClick();
        updateAutoClick();
    }
}

// item effects //
var autoClickTimer; 

function autoClick(){
    var timer = 2000; //clicks every 2 seconds for you
    autoClickTimer = setInterval(function(){addClick(currentUser.autoClickLevel)}, timer)
}

function updateAutoClick(){
    clearTimeout(autoClickTimer);
    autoClick();
}

// modal behavior //

var modal = document.getElementById("mainModal");
var closeModalBtn = document.getElementById("closeModalBtn");
var okBtnModal = document.getElementById("okModalBtn");
var cancelBtnModal = document.getElementById("cancelModalBtn");
var modalText = document.getElementById("textModal");

closeModalBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

okBtnModal.onclick = function() {
    if(okBtnModal.innerHTML=="delete it"){
        deleteUser();
    }
}

cancelBtnModal.onclick = function() {
    modal.style.display = "none";
}

// delete user //

var deleteinfobtn = document.getElementById("deleteInfoBtn");

deleteinfobtn.onclick = function() {
    modal.style.display = "block";
    modalText.innerHTML= "are you sure you want to delete your information?<br>this will reset all of your data, including your clicks";
    okBtnModal.innerHTML= "delete it";
    cancelBtnModal.innerHTML="no what the fuck";
}

function deleteUser(){
    window.localStorage.removeItem('user');  
    location.reload();  
}