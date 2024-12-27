$(document).ready(function(){
onLoad();
getlocationoptions();
getstorestable();
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


function getstorestable() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('stores').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getstores.php", true);
	xmlhttp.send();
}


function getlocationoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('storelocation').innerHTML=result;
			document.getElementById('estorelocation').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getlocationoptions.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('estorename').value=splitter[0];
			document.getElementById('estoreaddress').value=splitter[1];
			document.getElementById('estorelocation').value=splitter[4];
			document.getElementById('elatitude').value=splitter[2];
			document.getElementById('elongitude').value=splitter[3];
			document.getElementById('eareaname').value=splitter[5];
			document.getElementById('epassword').value=splitter[6];
			document.getElementById('expenselimit1').value=splitter[7];
			document.getElementById('estoretype').value=splitter[8];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/estores.php?guid="+clickid, true);
	xmlhttp.send();
}


function addstores() {
	var storename = document.getElementById('storename').value;
	var storeaddress = document.getElementById('storeaddress').value;
	var storelocation = document.getElementById('storelocation').value;
	var latitude = document.getElementById('latitude').value;
	var longitude = document.getElementById('longitude').value;
	var areaname = document.getElementById('areaname').value;
	var password = document.getElementById('password').value;
	var storetype = document.getElementById('storetype').value;
	var expenselimit = document.getElementById('expenselimit').value;
	if(storename=="" || storeaddress=="" || storelocation=="" || latitude=="" || longitude=="" || areaname=="" || password=="") {
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
			getstores();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addstores.php?storename="+storename+"&storeaddress="+storeaddress+"&storelocation="+storelocation+"&latitude="+latitude+"&longitude="+longitude+"&areaname="+areaname+"&password="+password+"&expenselimit="+expenselimit+"&storetype="+storetype, true);
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
			getstores();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletestores.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editstores() {
	var storename = document.getElementById('estorename').value;
	var storeaddress = document.getElementById('estoreaddress').value;
	var storelocation = document.getElementById('estorelocation').value;
	var latitude = document.getElementById('elatitude').value;
	var longitude = document.getElementById('elongitude').value;
	var areaname = document.getElementById('eareaname').value;
	var password = document.getElementById('epassword').value;
	var guid = localStorage.getItem("editid");
	var expenselimit = document.getElementById('expenselimit1').value;
	var storetype = document.getElementById('storetype').value;
	if(storename=="" || storeaddress=="" || storelocation=="" || latitude=="" || longitude=="" || areaname=="" || password=="" || storetype=="") {
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
			getstores();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editstores.php?storename="+storename+"&storeaddress="+storeaddress+"&storelocation="+storelocation+"&latitude="+latitude+"&longitude="+longitude+"&guid="+guid+"&areaname="+areaname+"&password="+password+"&expenselimit="+expenselimit+"&storetype="+storetype, true);
	xmlhttp.send();
	}
}


function opencashclick(clickid) {
	document.getElementById('opencashid').value=clickid;
}


function opencash() {
	var branch = document.getElementById('opencashid').value;
	var nextday = document.getElementById('opencashbox').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/opencash.php?branch="+branch+"&nextday="+nextday, true);
	xmlhttp.send();
}


function emptyclick(clickid) {
	var branch = clickid;
    if(confirm("Destructive Action. Are you sure...You want to delete the sales data?")==true) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/emptysales.php?branch="+branch, true);
		xmlhttp.send();
    }
    else {
        return false;
    }
}


function activatestock(clickid) {
	var branch = clickid;
    if(confirm("Are you sure...You want to activate stock?")==true) {
	    var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/activatestock.php?branch="+branch, true);
		xmlhttp.send();
    }
    else {
        return false;
    }
}
