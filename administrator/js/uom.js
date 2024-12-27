$(document).ready(function(){
onLoad();
getuom();
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


function getuom() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('uom').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getuom.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			//var splitter = result.split("deli");
			document.getElementById('euomname').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/euom.php?guid="+clickid, true);
	xmlhttp.send();
}


function adduom() {
	if(document.getElementById('uomname').value=="") {
		swal({
		    text: "Please enter UOM",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var uomname = document.getElementById('uomname').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			swal({
    		    text: result,
    		    icon: "success"
    		});
			document.getElementById('loader').style.display="none";
			getuom();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/adduom.php?uomname="+uomname, true);
	xmlhttp.send();
	}
}


function deleteclick(clickid) {
    swal({
      text: "Do you really want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
    			var result = this.responseText;
    			swal({
        		    text: result,
        		    icon: "success"
        		});
    			getuom();
    		}
    	};
    	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteuom.php?guid="+clickid, true);
    	xmlhttp.send();
      } else {
        return false;
      }
    });
}


function edituom() {
	if(document.getElementById('euomname').value=="") {
		swal({
		    text: "Please enter UOM",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var uomname = document.getElementById('euomname').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			swal({
    		    text: result,
    		    icon: "success"
    		});
			document.getElementById('loader').style.display="none";
			getuom();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/edituom.php?uomname="+uomname+"&guid="+guid, true);
	xmlhttp.send();
	}
}
