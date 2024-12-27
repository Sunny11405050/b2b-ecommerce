$(document).ready(function(){
onLoad();
getaccounts();
getbranchoptions();
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

function getaccounts() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('accounts').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getaccounts.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('ecustomername').value=splitter[0];
			document.getElementById('ephonenumber').value=splitter[1];
			document.getElementById('eaddress').value=splitter[2];
			document.getElementById('ebranch').value=splitter[3];
			document.getElementById('ecreditlimit').value=splitter[4];
            document.getElementById('ecurrentcredit').value=splitter[5];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eaccounts.php?guid="+clickid, true);
	xmlhttp.send();
}


function addaccount() {
	var customername = document.getElementById('customername').value;
	var phonenumber = document.getElementById('phonenumber').value;
	var address = document.getElementById('address').value;
	var branch = document.getElementById('branch').value;
	var creditlimit = document.getElementById('creditlimit').value;
	var currentcredit = document.getElementById('currentcredit').value;
	if(customername=="" || phonenumber=="" || address=="" || branch=="" || creditlimit=="") {
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
			getaccounts();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addaccount.php?customername="+customername+"&phonenumber="+phonenumber+"&address="+address+"&branch="+branch+"&creditlimit="+creditlimit+"&currentcredit="+currentcredit, true);
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
			getaccounts();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteaccount.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editaccount() {
	var customername = document.getElementById('ecustomername').value;
	var phonenumber = document.getElementById('ephonenumber').value;
	var address = document.getElementById('eaddress').value;
	var branch = document.getElementById('ebranch').value;
	var creditlimit = document.getElementById('ecreditlimit').value;
	var currentcredit = document.getElementById('ecurrentcredit').value;
	var guid = localStorage.getItem("editid");
	if(customername=="" || phonenumber=="" || address=="" || branch=="" || creditlimit=="" || currentcredit=="") {
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
			getaccounts();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editaccount.php?customername="+customername+"&phonenumber="+phonenumber+"&address="+address+"&branch="+branch+"&creditlimit="+creditlimit+"&guid="+guid+"&currentcredit="+currentcredit, true);
	xmlhttp.send();
	}
}


function getbranchoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('branch').innerHTML=result;
			document.getElementById('ebranch').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getemployeebranchoptions.php", true);
	xmlhttp.send();
}

