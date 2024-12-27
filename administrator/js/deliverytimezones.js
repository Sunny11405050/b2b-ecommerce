$(document).ready(function(){
onLoad();
getdeliverytimes();
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

function getdeliverytimes() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('deliverytimes').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getdeliverytimes.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			//alert(result);
			var splitter = result.split("deli");
			document.getElementById('estarttime').value=splitter[0];
			document.getElementById('eclosingtime').value=splitter[1];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/edeilverytime.php?guid="+clickid, true);
	xmlhttp.send();
}


function adddeliverytime() {
	var starttime = document.getElementById('starttime').value;
	var closingtime = document.getElementById('closingtime').value;
	if(starttime=="" || closingtime=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getdeliverytimes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/adddeliverytime.php?starttime="+starttime+"&closingtime="+closingtime, true);
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
			getdeliverytimes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletedeliverytime.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editdeliverytime() {
	var guid = localStorage.getItem("editid");
	var starttime = document.getElementById('estarttime').value;
	var closingtime = document.getElementById('eclosingtime').value;
	if(starttime=="" || closingtime=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getdeliverytimes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editdeliverytime.php?starttime="+starttime+"&closingtime="+closingtime+"&guid="+guid, true);
	xmlhttp.send();
	}
}


