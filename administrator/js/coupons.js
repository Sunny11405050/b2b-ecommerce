$(document).ready(function(){
onLoad();
getproductoptions();
getlocationoptions();
getlocationboxes();
getcoupons();
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

function getcoupons() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('coupons').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getcoupons.php", true);
	xmlhttp.send();
}


function getlocationoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('estorelocation').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getlocationoptions.php", true);
	xmlhttp.send();
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
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptions.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eproduct').value=splitter[2];
			document.getElementById('ecvalue').value=splitter[0];
			document.getElementById('estorelocation').value=splitter[1];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/ecoupons.php?guid="+clickid, true);
	xmlhttp.send();
}


function getlocationboxes() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('locationboxes').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getlocationboxes.php", true);
	xmlhttp.send();
}


function addcoupons() {
	var product = document.getElementById('product').value;
	var value = document.getElementById('cvalue').value;
	var location = document.getElementById('storelocation').value;
	if(product=="" || location=="" ||value=="") {
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
			getcoupons();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addcoupons.php?product="+product+"&value="+value+"&location="+location, true);
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
			getcoupons();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletecoupons.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editcoupons() {
	var product = document.getElementById('eproduct').value;
	var value = document.getElementById('ecvalue').value;
	var location = document.getElementById('estorelocation').value;
	var guid = localStorage.getItem("editid");
	if(product=="" || location=="" ||value=="") {
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
			getcoupons();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editcoupons.php?product="+product+"&value="+value+"&location="+location+"&guid="+guid, true);
	xmlhttp.send();
	}
}


function boxclick(clickid) {
if(document.getElementById(clickid).checked==true) {
    document.getElementById('storelocation').value=document.getElementById('storelocation').value+clickid+",";
}
else if(document.getElementById(clickid).checked==false) {
    var a = document.getElementById('storelocation').value;
    var c = clickid+",";
    var b = a.replace(c,"");
    document.getElementById('storelocation').value = b;
}
}


