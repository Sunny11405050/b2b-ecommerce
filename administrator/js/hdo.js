$(document).ready(function(){
onLoad();
gethdo();
getproductoptions();
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

function gethdo() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('hdos').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/gethdo.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('ehdo').value=splitter[0];
			document.getElementById('eproduct').value=splitter[1];
			document.getElementById('edeliverycharges').value=splitter[2];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/ehdo.php?guid="+clickid, true);
	xmlhttp.send();
}


function addhdo() {
	if(document.getElementById('hdo').value=="" || document.getElementById('product').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var hdo = document.getElementById('hdo').value;
	var product = document.getElementById('product').value;
	var deliverycharges = document.getElementById('deliverycharges').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			gethdo();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addhdo.php?hdo="+hdo+"&product="+product+"&deliverycharges="+deliverycharges, true);
	xmlhttp.send();
	}
}


function deleteclick(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			gethdo();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletehdo.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function edithdo() {
	if(document.getElementById('ehdo').value=="" || document.getElementById('eproduct').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var hdo = document.getElementById('ehdo').value;
	var product = document.getElementById('eproduct').value;
	var deliverycharges = document.getElementById('edeliverycharges').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			gethdo();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/edithdo.php?hdo="+hdo+"&guid="+guid+"&product="+product+"&deliverycharges="+deliverycharges, true);
	xmlhttp.send();
	}
}


function getproductoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('product').innerHTML=result;
			document.getElementById('eproduct').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptionssaletype.php", true);
	xmlhttp.send();
}


