$(document).ready(function(){
onLoad();
getpercentnum();
getproductoptions();
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

function getpercentnum() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('percentagenum').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpercentnum.php", true);
	xmlhttp.send();
}


function getproductoptions() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('product').innerHTML=result;
			document.getElementById('cproduct').innerHTML=result;
			document.getElementById('eproduct').innerHTML=result;
			document.getElementById('ecproduct').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptions1.php", true);
	xmlhttp.send();
}


function addpercentage() {
	document.getElementById('loader').style.display="block";
	var product = document.getElementById('product').value;
	var cproduct = document.getElementById('cproduct').value;
	var percentnum = document.getElementById('percentnum').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
	        document.getElementById('loader').style.display="none";		
			alert(result);
			getpercentnum();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addpercentage.php?product="+product+"&cproduct="+cproduct+"&percentnum="+percentnum, true);
	xmlhttp.send();
}


function editclick(clickid) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("str_split");
			document.getElementById('epercentnum').value=splitter[0];
			document.getElementById('eproduct').value=splitter[1];
			document.getElementById('ecproduct').value=splitter[2];
			document.getElementById('id').value=clickid;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/epercentage.php?id="+clickid, true);
	xmlhttp.send();
}


function editpercentage() {
	if(document.getElementById('epercentnum').value=="") {
		alert("Please enter a Number");
	}
	else {
	document.getElementById('loader').style.display="block";
	var percentagenum = document.getElementById('epercentnum').value;
	var product = document.getElementById('eproduct').value;
	var cproduct = document.getElementById('ecproduct').value;
	var id = document.getElementById('id').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getpercentnum();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editpercentage.php?percentagenum="+percentagenum+"&product="+product+"&cproduct="+cproduct+"&id="+id, true);
	xmlhttp.send();
	}
}

