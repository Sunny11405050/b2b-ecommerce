$(document).ready(function(){
userinfo();
getnews();
getstores();
});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    location.href="../../dashboardapp.html";
}

function getnews() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('news').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getnews.php", true);
	xmlhttp.send();
}


function newscode() {
	var a = document.getElementById('news').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/newscode.php?news="+a, true);
	xmlhttp.send();
}
