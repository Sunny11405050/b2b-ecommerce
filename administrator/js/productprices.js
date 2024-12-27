$(document).ready(function(){
onLoad();
getproductoptions();
getlocationoptions();
getlocationboxes();
getproductprices();
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
function getproductprices() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('productprices').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductprices.php", true);
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
			document.getElementById('epdate').value=splitter[0];
			document.getElementById('eproduct').value=splitter[1];
			document.getElementById('emarketprice').value=splitter[2];
			document.getElementById('ehmkprice').value=splitter[3];
			document.getElementById('estorelocation').value=splitter[4];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eproductprices.php?guid="+clickid, true);
	xmlhttp.send();
}


function addproductprices() {
	var date = document.getElementById('pdate').value;
	var product = document.getElementById('product').value;
	var marketprice = document.getElementById('marketprice').value;
	var hmkprice = document.getElementById('hmkprice').value;
	var location = document.getElementById('storelocation').value;
	if(date=="" || product=="" || location=="" || marketprice=="" || hmkprice=="") {
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
			},1000);
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addproductprices.php?date="+date+"&product="+product+"&marketprice="+marketprice+"&hmkprice="+hmkprice+"&location="+location, true);
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
					    getproductprices();
					}, 1000);
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteproductprices.php?guid="+clickid, true);
			xmlhttp.send();
        } 
        else {
            return false;
        }
    });
}

function copynextday() {
    swal({
        text: "Do you really want to copy to next day?",
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
					    getproductprices();
					}, 1000);
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/copyproductprices.php", true);
			xmlhttp.send();
        } 
        else {
            return false;
        }
    });
}


function editproductprices() {
	var date = document.getElementById('epdate').value;
	var product = document.getElementById('eproduct').value;
	var marketprice = document.getElementById('emarketprice').value;
	var hmkprice = document.getElementById('ehmkprice').value;
	var location = document.getElementById('estorelocation').value;
	var guid = localStorage.getItem("editid");
	if(date=="" || product=="" || location=="" || marketprice=="" || hmkprice=="") {
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
			    getproductprices();
			}, 1000);
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editproductprices.php?date="+date+"&product="+product+"&marketprice="+marketprice+"&hmkprice="+hmkprice+"&location="+location+"&guid="+guid, true);
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


function getproductpricesdate() {
	document.getElementById('loader').style.display="block";
	var a = document.getElementById('cdate').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('productprices').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductpricesdate.php?sdate="+a, true);
	xmlhttp.send();
}
