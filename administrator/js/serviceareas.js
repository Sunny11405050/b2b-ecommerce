$(document).ready(function(){
onLoad();
getnewbranchoptions();
getserviceareas(); 
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



function getserviceareas() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('serviceareas').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getserviceareas.php", true);
	xmlhttp.send();
}


function getnewbranchoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('branchoption').innerHTML=result;
			document.getElementById('ebranchoption').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getnewbranchoptions.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eservicearea').value=splitter[0];
			document.getElementById('ebranchoption').value=splitter[1];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eserviceareas.php?guid="+clickid, true);
	xmlhttp.send();
}


function addservicearea() {
	var servicearea = document.getElementById('servicearea').value;
	var branchoption = document.getElementById('branchoption').value;
	if(servicearea=="" || branchoption=="") {
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
			getserviceareas();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addservicearea.php?servicearea="+servicearea+"&branchoption="+branchoption, true);
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
			getserviceareas();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteservicearea.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editservicearea() {
	var guid = localStorage.getItem("editid");
	var servicearea = document.getElementById('eservicearea').value;
	var branchoption = document.getElementById('ebranchoption').value;
	if(servicearea=="" || branchoption=="") {
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
			getserviceareas();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editservicearea.php?servicearea="+servicearea+"&branchoption="+branchoption+"&guid="+guid, true);
	xmlhttp.send();
	}
}

