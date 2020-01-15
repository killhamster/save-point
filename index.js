// Requirements!
/* 1. Create an async function that
queries the moogle api and returns the body
2. Call that function onclick event
3. Return the following data in an array: Image, Character Name, Age
*/
var requestURL = "https://www.moogleapi.com/api/v1/characters/search?origin=8";
const locations = ['Balamb', 'Balamb Garden', 'Balamb Town', 'Fire Cavern', 'Dollet', 'Timber', "Forest Owls' Base", 'Centra Excavation Site', 'Galbadia', 'Galbadia Garden', 'Tomb of the Unknown King', 'Deling City', 'Winhill', 'D-District Prison', 'Missile Base', 'Fishermans Horizon', 'Trabia Garden', "Edea's Orphanage", 'White SeeD Ship', 'Great Salt Lake', 'Esthar', 'Esthar City', 'Lunar Base', 'Sorceress Memorial', 'Deep Sea Research Center', 'Shumi Village', 'Lunatic Pandora', 'Lunatic Pandora Laboratory', 'Ultimecia Castle', 'Vienne Mountains', 'Lunar Gate', "Tears' Point", 'Obel Lake', 'Centra Ruins', 'Island Closest to Heaven', 'Island Closest to Hell']

function ajaxSuccess(data) {
  partyChooser(data);
}

function ajaxError() {
  console.log("sad face");
}

function loadState() {
  $.ajax({
    type: "GET",
    url: requestURL,
    success: function(data) {
      ajaxSuccess(data);
    },
    error: function() {
      ajaxError();
    }
  });
  return false;
}

function createSaveData(data, id) {
  //for each of 3 saved states return the following:
  const saveID = '0' + id.toString();
  const partyLeader = data[0].name;
  const charName = partyLeader.split(" ")[0];
  const partyLevel = data[0].age;
  const discNum = (Math.floor(Math.random() * (4 - 1 + 1) + 1)).toString();  let now = new Date(Date.now());
  const playTime = now.getHours() + ":" + (now.getMinutes()<10?'0':'') + now.getMinutes();
  const money = Math.floor(Math.random()*10000).toString() + "G";
  const location = locations[Math.floor(locations.length * Math.random())]
  //for each party Member, return their avatar URL
  const partyLeaderIMG = data[0].picture;
  const partyMember2IMG = data[1].picture;
  const partyMember3IMG = data[2].picture;
  const saveHTML = "<div class='save-id'><h1>" + saveID + "</h1></div>";
  const characterWrapper = "<div class='characters'>";
  const character1ImgHTML = "<img class='avatar' src='" + partyLeaderIMG + "'>";
  const character2ImgHTML = "<img class='avatar' src='" + partyMember2IMG + "'>";
  const character3ImgHTML = "<img class='avatar' src='" + partyMember3IMG + "'>";
  const divWrapperEnd = "</div>";
  const gameDataHTML = '<div class="game-data"><div class="row game-text"><span>' + charName + '</span><span>PLAY: <b>' + playTime + '</b></span></div>'
  const gameTextHTML = '<div class="row game-text"><span>LVL ' + partyLevel + '</span><span>DISC ' + discNum + '</span><span>' + money + '</span></div>'
  const locationHTML = '<div class="location row"><p>' + location + '</p></div>'
  const saveStateWrapper = document.createElement("div");
  document.getElementById("saveState" + id.toString()).innerHTML= saveHTML + characterWrapper + character1ImgHTML + character2ImgHTML + character3ImgHTML + divWrapperEnd + gameDataHTML + gameTextHTML + locationHTML;
}

function partyChooser(cast){
  // generate a random list of 3 characters from the cast of the game
  const responseArray=cast;
  let saveID = 1
  const playableIDs = ["29d97307-9938-4bc0-0ffe-08d6afcab3e2", "8d664171-f4de-4ce8-0fff-08d6afcab3e2", "eda4e079-c79a-4363-1000-08d6afcab3e2", "7892daab-5a12-4269-1001-08d6afcab3e2", "ef7e403d-1b18-4414-1002-08d6afcab3e2", "28cc1f70-619f-4ebf-1004-08d6afcab3e2", "fcf43868-ccef-4232-1005-08d6afcab3e2", "5c7f09df-8767-467a-1007-08d6afcab3e2", "b975f11e-0da6-4107-1008-08d6afcab3e2"]
  const filtered = responseArray.filter(function(item) {
    return playableIDs.indexOf(item.id) !== -1;
    });

  for (i = 0; i < 3; i++) {
    let characters = [];
    for (let i = 0; i < 3; i++) {
    let character = filtered[Math.floor(filtered.length * Math.random())];
    console.log(character);
    filtered.slice(character);
    characters.push(character);
    }
    createSaveData(characters, saveID);
    saveID++;
  }
  return;
}

loadState();
