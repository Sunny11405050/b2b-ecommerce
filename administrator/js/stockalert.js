$(document).ready(function(){
    onLoad();
    getproductoptions();
    getstocklimit();
    getproductoptions();
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
function getstocklimit() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('stocklimit').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getstocklimit.php", true);
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
			document.getElementById('eproduct').value=splitter[0];
			document.getElementById('ebranch').value=splitter[1];
			document.getElementById('equantity').value=splitter[2];
			document.getElementById('eweight').value=splitter[3];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/estocklimit.php?guid="+clickid, true);
	xmlhttp.send();
}


function addstocklimit() {
	var quantity = document.getElementById('quantity').value;
	var weight = document.getElementById('weight').value;
	var product = document.getElementById('product').value;
	var branch = document.getElementById('branch').value;
	if(product=="" || branch=="" || quantity=="") {
		swal({
		    text: "All fields are required",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('loader').style.display="none";
			swal({
			    text: result,
			    icon: "success"
			});
			setTimeout(function(){ 
			    location.reload();
			}, 1000);
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addstocklimit.php?quantity="+quantity+"&weight="+weight+"&product="+product+"&branch="+branch, true);
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
					setTimeout(function(){ 
					    location.reload();
					}, 1000);
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletestocklimit.php?guid="+clickid, true);
			xmlhttp.send();
        } 
        else {
            return false;
        }
    });
}


function editstocklimit() {
	var quantity = document.getElementById('equantity').value;
	var weight = document.getElementById('eweight').value;
	var product = document.getElementById('eproduct').value;
	var branch = document.getElementById('ebranch').value;
	var guid = localStorage.getItem("editid");
	if(product=="" || branch=="" || quantity=="") {
		swal({
		    text:"All fields are required",
		    icon:"warning",
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('loader').style.display="none";
			swal({
			    text: result,
			    icon: "success"
			});
			setTimeout(function(){ 
			    location.reload();
			}, 1000);
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editstocklimit.php?quantity="+quantity+"&weight="+weight+"&product="+product+"&branch="+branch+"&guid="+guid, true);
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
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptionsalert.php", true);
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
