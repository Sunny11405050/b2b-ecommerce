$(document).ready(function(){
onLoad();
getwinners();
getstores();

});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    location.href="dashboardapp.html";
}

function getwinners() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('winners').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getwinners.php", true);
	xmlhttp.send();
}


function announce() {
    if(confirm("Do you really want to announce winners today?")==true) {
        document.getElementById('loader').style.display="block";
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				getwinners();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/dip.php", true);
		xmlhttp.send();
    }
    else {
        return false;
    }
}


