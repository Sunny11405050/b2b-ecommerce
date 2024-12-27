$(document).ready(function(){
onLoad();
viewnetwork();; 
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


function viewnetwork() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('nett').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/viewnetwork.php", true);
	xmlhttp.send();
}


function viewnetworksearch() {
	document.getElementById('loader').style.display="block";
	var phn = document.getElementById('nmobile').value;
	if(phn=="") {
	    alert("Please Enter Mobile Number or Name");
	}
	else {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('nett').innerHTML=result;
			document.getElementById('loader').style.display="none";
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/viewnetworksearch.php?phoneno="+phn, true);
	xmlhttp.send();
	}
}


function swapfn(clickid) {
    if(document.getElementById('primarynum').innerHTML=="") {
        var splitter = clickid.split("deli");
        document.getElementById('primarynum').innerHTML=splitter[1];
        document.getElementById('primarydev').innerHTML=splitter[2];
        document.getElementById('transfertype').innerHTML=splitter[0];
        document.getElementById('netmsg').style.display="block";
    }
    else {
        var splitter = clickid.split("deli");
        document.getElementById('secondarynum').innerHTML=splitter[1];
        document.getElementById('secondarydev').innerHTML=splitter[2];
        document.getElementById('btns').style.display="block";
    }
}


function swapnow() {
    if(confirm("Are you sure, you want to swap?")==true) {
        document.getElementById('loader').style.display="block";
        var transfertype = document.getElementById('transfertype').innerHTML;
        var primarydev = document.getElementById('primarydev').innerHTML;
        var secondarydev = document.getElementById('secondarydev').innerHTML;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				viewnetwork();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/swapnow.php?transfertype="+transfertype+"&primarydev="+primarydev+"&secondarydev="+secondarydev, true);
		xmlhttp.send();    
    }
	else {
	    return false;
	}
}
