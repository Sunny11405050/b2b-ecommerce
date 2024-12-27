$(document).ready(function(){
onLoad();
getproductcategories();
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
function getproductcategories() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('categories').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductcategories.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('ecategoryname').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eproductcategories.php?guid="+clickid, true);
	xmlhttp.send();
}


function addproductcategories() {
	if(document.getElementById('categoryname').value=="") {
		swal({
		    text: "Please enter category name",
		    icon: "warning"
		});
	}
	else {
	    document.getElementById('loader').style.display="block";
	    var categoryname = document.getElementById('categoryname').value;
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
				    getproductcategories();
				}, 1000);
		    }
	    };
	    xmlhttp.open("GET", "https://poultrade.com/admin/admin/addproductcategories.php?categoryname="+categoryname, true);
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
					    getproductcategories();
					}, 1000);
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteproductcategories.php?guid="+clickid, true);
			xmlhttp.send();
        } 
        else {
            return false;
        }
    });
}


function editproductcategories() {
	if(document.getElementById('ecategoryname').value=="") {
		swal({
		    text: "Please enter category name",
		    icon: "warning"
		});
	}
	else {
		document.getElementById('loader').style.display="block";
		var categoryname = document.getElementById('ecategoryname').value;
		var guid = localStorage.getItem("editid");
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
				    getproductcategories();
				}, 1000);
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/editproductcategories.php?categoryname="+categoryname+"&guid="+guid, true);
		xmlhttp.send();
	}
}
