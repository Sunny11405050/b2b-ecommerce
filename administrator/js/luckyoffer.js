$(document).ready(function(){
onLoad();
getproductoptions();
getuomoptions();
getnews();

});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    location.href="../../dashboardapp.html";
}

function getproductoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('product').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptions.php", true);
	xmlhttp.send();
}


function getuomoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('uom').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getuomoptions.php", true);
	xmlhttp.send();
}


function getnews() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("str_split");
			document.getElementById('qty').value = splitter[0];
			document.getElementById('uom').value = splitter[1];
			document.getElementById('product').value = splitter[2];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getluckytext.php", true);
	xmlhttp.send();
}


function newscode() {
	var qty = document.getElementById('qty').value;
	var uom = document.getElementById('uom').value;
	var product = document.getElementById('product').value;
	if(qty=="" || uom=="" || product=="") {
	    swal({
		    text: "All fields are required",
		    icon: 'warning'
		})
	}
	else {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				swal({
    			    text: result,
    			    icon: 'success'
    			})
				setTimeout(function(){ 
				    getnews();
				}, 1000);
				
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/new/admin/luckycode.php?qty="+qty+"&uom="+uom+"&product="+product, true);
		xmlhttp.send();
	}
}
