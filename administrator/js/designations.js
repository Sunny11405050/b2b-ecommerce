$(document).ready(function(){
onLoad();
getdesignation();
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

function getdesignation() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('designations').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getdesignation.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			//var splitter = result.split("deli");
			document.getElementById('edesignation').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/edesignation.php?guid="+clickid, true);
	xmlhttp.send();
}


function adddesignation() {
	if(document.getElementById('designation').value=="") {
		alert("Please enter Designation");
	}
	else {
	document.getElementById('loader').style.display="block";
	var designation = document.getElementById('designation').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getdesignation();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/adddesignation.php?designation="+designation, true);
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
			getdesignation();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletedesignation.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editdesignation() {
	if(document.getElementById('edesignation').value=="") {
		alert("Please enter Designation");
	}
	else {
	document.getElementById('loader').style.display="block";
	var designation = document.getElementById('edesignation').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getdesignation();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editdesignation.php?designation="+designation+"&guid="+guid, true);
	xmlhttp.send();
	}
}


