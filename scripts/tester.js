document.getElementById("papFoot").innerHTML =
"<p>&copy; " + new Date().getFullYear() + " PapI. All rights reserved.</p>";

document.getElementById("nav01").innerHTML =
"<ul id='menu'>" +
"<li><a href='tester.php'>Home</a></li>" +
"<li><a href='devices.php'>Devices</a></li>" +
"<li><a href='locations.php'>Locations</a></li>" +
"<li><a href='rules.php'>Rules</a></li>" +
"<li><a href='access/logout.php'><font color='red'>Logout</font></a></li>" +
"</ul>";

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
/*btn.onclick = function() {
    modal.style.display = "block";
    var serial = btn.value;
    deleteButt(serial);
}*/

span.onclick = function()
{
  modal.style.display = "none";
}

function closeModal()
{
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var deleteDevice;
var deleteLocation;
var clearName;

function clearTab(name)
{
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  clearName = name;
}

function confirmClearTab()
{
  var request = new XMLHttpRequest();
  var str = "clearName=" + clearName;
  request.open("POST", "clear.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  location.reload();
}

function deleteLoc(name)
{
  modal.style.display = "block";
  deleteLocation = name;
  deleteButt(serial);
}

function deleteDev(serial)
{
  modal.style.display = "block";
  deleteDevice = serial;
}

function confirmDelDev()
{
  var request = new XMLHttpRequest();
  var str = "removeSerial=" + deleteDevice;
  request.open("POST", "confirmRemove.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  setTimeout(function() { location.reload();}, 400);
}  
function confirmDelLoc()
{
  var request = new XMLHttpRequest();
  var str = "removeLocation=" + deleteLocation;
  request.open("POST", "removeLocation.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  setTimeout(function() { location.reload();}, 400);
}  
var nameValue;
var drinkValue;
var priceValue;

function clearSection()
{
  document.getElementById("name").style.display = "none";
  document.getElementById("price").style.display = "none";
  document.getElementById("filler1").style.display = "none";
  document.getElementById("drink").style.display = "none";
  document.getElementById("filler2").style.display = "none";
  document.getElementById("drinkSubmit").style.display = "none";
}

function name(temp)
{
  nameValue = temp;
  document.getElementById("name").innerHTML = nameValue;
  document.getElementById("name").style.display = "initial";
  document.getElementById("filler1").style.display = "initial";
}

function drink(temp, priceTemp)
{
  drinkValue = temp;
  priceValue = priceTemp;
  document.getElementById("drink").innerHTML = drinkValue;
  document.getElementById("drink").style.display = "initial";
  document.getElementById("filler2").style.display = "initial";
  document.getElementById("price").innerHTML = priceValue;
  document.getElementById("price").style.display = "initial";
  document.getElementById("drinkSubmit").style.display = "initial";
}

function drinkSubmit()
{
  var request = new XMLHttpRequest();
  var str = "/barTab/submit.php?name=" + nameValue + "&price=" + priceValue;
  request.open("GET", str, true);
  request.send(null);
  clearSection();
//  return request.responseText;
}

function barManSubmit(mode)
{
  var user = document.getElementById('barUserName').value;
  var drink = document.getElementById('barDrinkName').value;
  var price = document.getElementById('barPrice').value;

  var request = new XMLHttpRequest();
  var str = "addUser=" + user;
  str += "&addDrink=" + drink;
  str += "&drinkPrice=" + price;
  str += "&mode=" + mode;
  request.open("POST", "managerSubmit.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  location.reload();
}

function crossItem(item)
{
  console.log("Crossing off: " + item);
  var crossStatus = document.getElementById(item).className;
  if (crossStatus == "")
  {
    document.getElementById(item).className = "strike";
    retrieved(item, "y");
  }
  else
  {
    document.getElementById(item).className = "";
    retrieved(item, "n");
  }
}

function retrieved(item, mode)
{
  var request = new XMLHttpRequest();
  var str = "item=" + item + "&mode=" + mode;
  request.open("POST", "shopListUpdate.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
}

function delListItem(item)
{
  var request = new XMLHttpRequest();
  var str = "item=" + item;
  request.open("POST", "shopListDelete.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  console.log("Deleting: " + item);
  setTimeout(function () { location.reload(true); }, 1200);
}

function itemSubmit()
{
  var quantity = document.getElementById("itemQuantity").value;
  var name = document.getElementById("itemName").value;
  var category = document.getElementById("selectCategory").value;

  var request = new XMLHttpRequest();
  var str = "mode=new" + "&quant=" + quantity + "&name=" + name + "&category=" + category;
  request.open("POST", "shopListUpdate.php", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(str);
  setTimeout(function () { location.reload(true); }, 1000);
}
