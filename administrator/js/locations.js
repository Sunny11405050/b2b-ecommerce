$(document).ready(function(){
onLoad();
getlocations();; 
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



function getlocations() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('locations').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getlocations.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("str_split");
			document.getElementById('elocationname').value=splitter[0];
			document.getElementById('elatitude').value=splitter[1];
			document.getElementById('elongitude').value=splitter[2];
			document.getElementById('eradius').value=splitter[3];
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/elocations.php?guid="+clickid, true);
	xmlhttp.send();
}


function addlocations() {
	if(document.getElementById('locationname').value=="") {
		alert("Please enter location name");
	}
	else {
	document.getElementById('loader').style.display="block";
	var locationname = document.getElementById('locationname').value;
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var radius = document.getElementById('radius').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getlocations();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addlocations.php?locationname="+locationname+"&latitude="+latitude+"&longitude="+longitude+"&radius="+radius, true);
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
			getlocations();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletelocations.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editlocations() {
	if(document.getElementById('elocationname').value=="") {
		alert("Please enter location name");
	}
	else {
	document.getElementById('loader').style.display="block";
	var locationname = document.getElementById('elocationname').value;
	var latitude = document.getElementById('elatitude').value;
	var longitude = document.getElementById('elongitude').value;
	var radius = document.getElementById('eradius').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getlocations();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editlocations.php?locationname="+locationname+"&guid="+guid+"&latitude="+latitude+"&longitude="+longitude+"&radius="+radius, true);
	xmlhttp.send();
	}
}
