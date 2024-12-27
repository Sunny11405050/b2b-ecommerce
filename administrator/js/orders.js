$(document).ready(function(){
onLoad();
getchickenorders();
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


function getchickenorders() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('chickenorders').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getchickenorders.php", true);
	xmlhttp.send();
}


function cconfirmclick(clickid) {
	if(confirm("Do you really want to change?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getchickenorders();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/cconfirm.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function cpackedclick(clickid) {
	if(confirm("Do you really want to change?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getchickenorders();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/cpacked.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function cdispatchedclick(clickid) {
	if(confirm("Do you really want to change?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getchickenorders();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/cdispatched.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function cdeliveryclick(clickid) {
	if(confirm("Do you really want to change?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getchickenorders();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/cdelivery.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


