$(document).ready(function(){
onLoad();
getihc();
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

function getihc() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('ihc').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getihc.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eminimumvalue').value=splitter[0];
			document.getElementById('emaximumvalue').value=splitter[1];
			document.getElementById('eihcpercentage').value=splitter[2];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eihc.php?guid="+clickid, true);
	xmlhttp.send();
}


function addihc() {
	if(document.getElementById('minimumvalue').value=="" || document.getElementById('maximumvalue').value=="" || document.getElementById('ihcpercentage').value=="") {
		alert("All fields are required");
	}
	else {
	document.getElementById('loader').style.display="block";
	var minimumvalue = document.getElementById('minimumvalue').value;
	var maximumvalue = document.getElementById('maximumvalue').value;
	var ihcpercentage = document.getElementById('ihcpercentage').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getihc();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addihc.php?minimumvalue="+minimumvalue+"&maximumvalue="+maximumvalue+"&ihcpercentage="+ihcpercentage, true);
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
			getihc();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteihc.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editihc() {
	if(document.getElementById('eminimumvalue').value=="" || document.getElementById('emaximumvalue').value=="" || document.getElementById('eihcpercentage').value=="") {
		alert("All fields are required");
	}
	else {
	document.getElementById('loader').style.display="block";
	var minimumvalue = document.getElementById('eminimumvalue').value;
	var maximumvalue = document.getElementById('emaximumvalue').value;
	var ihcpercentage = document.getElementById('eihcpercentage').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getihc();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editihc.php?minimumvalue="+minimumvalue+"&maximumvalue="+maximumvalue+"&ihcpercentage="+ihcpercentage+"&guid="+guid, true);
	xmlhttp.send();
	}
}

