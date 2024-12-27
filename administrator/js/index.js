$(document).ready(function(){
    onLoad();
});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("deviceready", geoLocation, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
  	var di = device.uuid;
	localStorage.setItem('deviceid', di);
}
function geoLocation() {
	function onSuccess(position) {
		var lat = position.coords.latitude;
		var longi = position.coords.longitude;
		localStorage.setItem("latitude", lat);
		localStorage.setItem("longitude", longi);
		setTimeout(function(){ 
		    autologin(); 
		}, 3000);
	}
	function onError(error) {
		swal({
		text: "Something went wrong!",
		icon: "warning"
		});
		navigator.app.exitApp();
	}
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
function onBackKeyDown() {
	navigator.app.exitApp();
}
function autologin() {
    var deviceid = localStorage.getItem("deviceid");
    var regid = localStorage.getItem('registrationid');
    var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText;
      if(result!="0") {
    		var splitter = result.split("str_split");
    		localStorage.setItem("user_id", splitter[0]);
			localStorage.setItem("firstname", splitter[1]);
			localStorage.setItem("lastname", splitter[2]);
			localStorage.setItem("role", splitter[3]);
			location.href="dashboardapp.html";
      }
      else {
    	document.getElementById('logincard').style.display="block";
      }
    }
    };
    xmlhttp.open("GET", "https://poultrade.com/admin/admin/autologin.php?deviceid=" + deviceid + "&latitude=" + latitude + "&longitude=" + longitude, true);
    xmlhttp.send();
}
function login() {
document.getElementById('loader').style.display="block";
	if (typeof(Storage) !== "undefined") {
	var deviceid = localStorage.getItem("deviceid");
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			if(result!="Mobile No./Password Incorrect!") {
				if (typeof(Storage) !== "undefined") {
					var splitter = result.split("deli");
					localStorage.setItem("user_id", splitter[0]);
					localStorage.setItem("firstname", splitter[1]);
					localStorage.setItem("lastname", splitter[2]);
					localStorage.setItem("email", splitter[3]);
					localStorage.setItem("profilepicture", splitter[4]);
					localStorage.setItem("temppass", splitter[5]);
					localStorage.setItem("role", splitter[5]);
					document.getElementById('loader').style.display="none";
					location.href="dashboardapp.html";
				}
			}
			else {
				swal({
				    text:'Mobile No./Password Incorrect!',
				    icon:'warning'
				});
				document.getElementById('username').value="";
				document.getElementById('password').value="";
				document.getElementById('loader').style.display="none";
			}
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/login.php?username=" + username + "&password=" + password + "&deviceid=" + deviceid + "&latitude=" + latitude + "&longitude=" + longitude, true);
	xmlhttp.send();
	}
}