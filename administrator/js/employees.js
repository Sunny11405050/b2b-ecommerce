$(document).ready(function(){
onLoad();
getemployee();
getdesignationoptions();
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

function getemployee() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('employees').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getemployee.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eemployee').value=splitter[0];
			document.getElementById('edesignation').value=splitter[1];
			document.getElementById('ebranch').value=splitter[2];
			document.getElementById('esalary').value=splitter[3];
			document.getElementById('ephonenumber').value=splitter[4];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eemployee.php?guid="+clickid, true);
	xmlhttp.send();
}


function addemployee() {
	if(document.getElementById('employee').value=="" || document.getElementById('designation').value=="" || document.getElementById('branch').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var employee = document.getElementById('employee').value;
	var designation = document.getElementById('designation').value;
	var branch = document.getElementById('branch').value;
	var salary = document.getElementById('salary').value;
	var phonenumber = document.getElementById('phonenumber').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getemployee();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addemployee.php?employee="+employee+"&designation="+designation+"&branch="+branch+"&salary="+salary+"&phonenumber="+phonenumber, true);
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
			getemployee();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteemployee.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editemployee() {
	if(document.getElementById('eemployee').value=="" || document.getElementById('edesignation').value=="" || document.getElementById('ebranch').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var employee = document.getElementById('eemployee').value;
	var designation = document.getElementById('edesignation').value;
	var branch = document.getElementById('ebranch').value;
	var salary = document.getElementById('esalary').value;
	var phonenumber = document.getElementById('ephonenumber').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getemployee();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editemployee.php?employee="+employee+"&guid="+guid+"&designation="+designation+"&branch="+branch+"&salary="+salary+"&phonenumber="+phonenumber, true);
	xmlhttp.send();
	}
}


function getdesignationoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('designation').innerHTML=result;
			document.getElementById('edesignation').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getdesignationoptions.php", true);
	xmlhttp.send();
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


