$(document).ready(function(){
onLoad();
getsaletype();
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


function getsaletype() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('saletypes').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getsaletype.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('esaletype').value=splitter[0];
			document.getElementById('eproduct').value=splitter[1];
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/esaletype.php?guid="+clickid, true);
	xmlhttp.send();
}


function addsaletype() {
	if(document.getElementById('saletype').value=="" || document.getElementById('product').value=="") {
		swal({
		    text: "All fields are compulsory",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var saletype = document.getElementById('saletype').value;
	var product = document.getElementById('product').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			swal({
    		    text: result,
    		    icon: "success"
    		});
			document.getElementById('loader').style.display="none";
			getsaletype();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addsaletype.php?saletype="+saletype+"&product="+product, true);
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
    			getsaletype();
    		}
    	};
    	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletesaletype.php?guid="+clickid, true);
    	xmlhttp.send();
      } else {
        return false;
      }
    });
}


function editsaletype() {
	if(document.getElementById('esaletype').value=="" || document.getElementById('eproduct').value=="") {
		swal({
		    text: "All fields are compulsory",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var saletype = document.getElementById('esaletype').value;
	var product = document.getElementById('eproduct').value;
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
			getsaletype();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editsaletype.php?saletype="+saletype+"&guid="+guid+"&product="+product, true);
	xmlhttp.send();
	}
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
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptionssaletype.php", true);
	xmlhttp.send();
}
