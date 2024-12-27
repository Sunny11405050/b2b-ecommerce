$(document).ready(function(){
onLoad();
getbranchoptions();
getlocationoptions();
getproductprices();
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
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedifference.php", true);
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


function getproductoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('productoption').innerHTML=result;
			document.getElementById('eproductoption').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproductoptions.php", true);
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


function getbranchoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('branch').innerHTML=result;
			document.getElementById('ebranch').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getbranchoptions.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('ecbamount').value=splitter[0];
			document.getElementById('ebranch').value=splitter[1];
			document.getElementById('eprice').value=splitter[2];
			document.getElementById('edifferencetype').value=splitter[3];
			document.getElementById('estorelocation').value=splitter[4];
			document.getElementById('eproductoption').value=splitter[5];
			document.getElementById('ecbamount').value=splitter[6];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/epricedifference.php?guid="+clickid, true);
	xmlhttp.send();
}


function addproductprices() {
	var cbamount = document.getElementById('cbamount').value;
	var branch = document.getElementById('branch').value;
	var price = document.getElementById('price').value;
	var differencetype = document.getElementById('differencetype').value;
	var location = document.getElementById('storelocation').value;
	var product = document.getElementById('productoption').value;
	if(cbamount=="" || branch=="" || location=="" || price=="" || differencetype=="") {
	    swal({
	        text: "All fields are compulsory",
	        icon: "warning"
	    });
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			swal({
    	        text: result,
    	        icon: "success"
    	    });
			document.getElementById('loader').style.display="none";
			getproductprices();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addpricedifference.php?cbamount="+cbamount+"&branch="+branch+"&price="+price+"&differencetype="+differencetype+"&location="+location+"&product="+product, true);
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
    			getproductprices();
    		}
    	};
    	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletepricedifference.php?guid="+clickid, true);
    	xmlhttp.send();
      } else {
        return false;
      }
    });
}


function editproductprices() {
	var cbamount = document.getElementById('ecbamount').value;
	var branch = document.getElementById('ebranch').value;
	var price = document.getElementById('eprice').value;
	var differencetype = document.getElementById('edifferencetype').value;
	var location = document.getElementById('estorelocation').value;
	var product = document.getElementById('eproductoption').value;
	var guid = localStorage.getItem("editid");
	if(cbamount=="" || branch=="" || location=="" || price=="" || differencetype=="") {
		swal({
	        text: "All fields are compulsory",
	        icon: "warning"
	    });
	}
	else {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			swal({
    	        text: result,
    	        icon: "success"
    	    });
			document.getElementById('loader').style.display="none";
			getproductprices();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editpricedifference.php?cbamount="+cbamount+"&branch="+branch+"&price="+price+"&differencetype="+differencetype+"&location="+location+"&guid="+guid+"&product="+product, true);
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
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedifferencedate.php?sdate="+a, true);
	xmlhttp.send();
}
