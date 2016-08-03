<?PHP
require_once("/home/papaya/.access/membersite_config.php");

if(!$fgmembersite->CheckLogin())
{
    $fgmembersite->RedirectToURL("access/login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>

<head>
  <title>PapI 2016</title>
  <link href="style/tester.css" rel="stylesheet">
</head>

<nav id="nav01"></nav>

<body>

  <div id="main">
  <h1>Device Manager</h1>
  <h2>Your devices
  <button class="button buttonGreen" onclick="addDevice()" class="button">Add Device</button>
  <button class="button buttonRed" onclick="removeDevice()" class="button">Remove Device</button>
  </h2>

  <h2 style="display:none" id="noDevices">No Devices Yet!</h2>

  <b><table style="display:none" id="addTitles" class="blank_table">
    <tr>
      <td id="title">Name</td>
      <td id="title">Location</td>
      <td id="title">Serial Number</td>
      <td id="title">Type Number</td>
    </tr>
  </table></b>
  <b><table style="display:none" id="removeTitles" class="blank_table">
    <tr>
      <td id="title">Serial Number</td>
    </tr>
  </table></b>

  <form style="display:none" id="addDevice" action="confirmAdd.php" method="post">
    <input type="text" class="textbox" name="addName">
    <select name="addLocation" class="textbox">
<?php
$servername = "ha-records.cxdm8r7jhkbf.us-east-1.rds.amazonaws.com";
$username = "phpUser";
$password = "24518000phpUser";
$database = "ha_records";

$conn = new mysqli($servername, $username, $password, $database);

$user_name = $fgmembersite->UserUserName();
$user_nameF = "'" . $user_name . "'";

$sql = "SELECT location_name FROM locations WHERE user_name=" . $user_nameF;

if ($conn->connect_error)
{
        die("Connection failed: " .$conn->connect_error);
}

$result = $conn->query($sql);

while ($row = $result->fetch_assoc())
  {
    echo "<option value='" . $row['location_name'] . "'>" . $row['location_name'] . "</option>";
  }
?>
  </select>
    <input type="text" class="textbox" name="addSerial">
    <input type="text" class="textbox" name="addType">
    <br>
    <input type="submit" class="button" value="Submit">
  </form>
  <form style="display:none" id="removeDevice" action="confirmRemove.php" method="post">
    <input type="text" class="textbox" name="removeSerial">
    <input type="submit" class="button" value="Submit">
  </form>


  <button id="clearButton" class="button"  style="display:none; background-color: #f44336;" onclick="clearDevices()" class="button">Clear</button>

  <script>
  function clearDevices() {
    document.getElementById("addTitles").style.display = "none";
    document.getElementById("removeTitles").style.display = "none";
    document.getElementById("clearButton").style.display = "none";
    document.getElementById("addDevice").style.display = "none";
//    document.getElementById("removeDevice").style.display = "none";
    document.getElementById("noDevices").style.display = "none";
  }
  function addDevice() {
    clearDevices()
    document.getElementById("addTitles").style.display = "table";
    document.getElementById("clearButton").style.display = "initial";
    document.getElementById("addDevice").style.display = "initial";
//    document.getElementById("addLocation").style.display = "initial";
  }
  function removeDevice() {
    clearDevices()
    document.getElementById("removeTitles").style.display = "table";
    document.getElementById("removeDevice").style.display = "initial";
    document.getElementById("clearButton").style.display = "initial";
  }
  function noDevices() {
    clearDevices()
    document.getElementById("noDevices").style.display = "initial";
  }
  </script>

<br></br>
<?php
  $result = $fgmembersite->GetDevices();

  if (($result != false) && (mysql_num_rows($result) > 0))
  {
    echo '<table class="dataTable" style="width: 75%">' . "\r\n" . '  <tr id="dataTableRow">' . "\r\n";
    echo '<td><b>Name</b></td><td><b>Location</b></td><td><b>Serial Number</b></td><td><b>Type Num</b></td></tr><tr>';
    while ($row = mysql_fetch_assoc($result))
    {
      echo "<td>" . $row["name"] . "</td>" . "\r\n";
      echo "<td>" . $row["location"] . "</td>" . "\r\n";
      echo "<td>" . $row["serial_num"] . "</td>" . "\r\n";
      echo "<td>" . $row["type_num"] . "</td>" . "\r\n";
      echo "</tr>" . "\r\n";
    }
    echo "</table>" . "\r\n";
  }
  else
  {
    echo '<script>' . 'noDevices();' . '</script>';
  }
?>

  <footer id="papFoot"></footer>
  </div>

<script src="scripts/tester.js"></script>

</body>
</html>
