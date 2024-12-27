$(document).ready(function(){
onLoad();
getexpensetype();
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

function getexpensetype() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('expensetypes').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getexpensetype.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			//var splitter = result.split("deli");
			document.getElementById('eexpensetype').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eexpensetype.php?guid="+clickid, true);
	xmlhttp.send();
}


function addexpensetype() {
	if(document.getElementById('expensetype').value=="") {
		alert("Please enter Expense Type");
	}
	else {
	document.getElementById('loader').style.display="block";
	var expensetype = document.getElementById('expensetype').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getexpensetype();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addexpensetype.php?expensetype="+expensetype, true);
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
			getexpensetype();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteexpensetype.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editexpensetype() {
	if(document.getElementById('eexpensetype').value=="") {
		alert("Please enter Expense Type");
	}
	else {
	document.getElementById('loader').style.display="block";
	var expensetype = document.getElementById('eexpensetype').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getexpensetype();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editexpensetype.php?expensetype="+expensetype+"&guid="+guid, true);
	xmlhttp.send();
	}
}

