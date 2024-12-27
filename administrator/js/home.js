$(document).ready(function(){
onLoad();
getpricedisplay(); 
getpricedisplay1();
getpricedisplay2();
getpricedisplay3();
getpricedisplay4();
getpricedisplay5();
getstores();
});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
swal({
  text: "Do you want to exit application?",
  icon: "warning",
  buttons: true,
  dangerMode: false,
})
.then((willDelete) => {
  if (willDelete) {
    navigator.app.exitApp();
  } else {
    return false;
  }
});
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


function screeninglist() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('screeninglist').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/screeninglist.php", true);
	xmlhttp.send();
}


function screenadd() {
	var phnnumber = document.getElementById('phnnumber').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			screeninglist();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/screenadd.php?phnnumber="+phnnumber, true);
	xmlhttp.send();
}


function deleteclick(clickid) {
    if(confirm("Are you sure, you want to delete?")==true) {
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				screeninglist();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletescreeninglist.php?guid="+clickid, true);
		xmlhttp.send();
    }
    else {
        return false;
    }
}


$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/admin/admin/addorganization.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});


$(document).ready(function (e) {
	$("#uploadForm1").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/admin/admin/editorganization.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eorgname').value=splitter[0];
			document.getElementById('eorgdescription').value=splitter[1];
			document.getElementById('guid').value=clickid;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eorganizations.php?guid="+clickid, true);
	xmlhttp.send();
}


function deleteclickorg(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getorganizations();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteorganizations.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function getorganizations() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('organizations').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getorganizations.php", true);
	xmlhttp.send();
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



function getpricedisplay() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('mbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay.php", true);
	xmlhttp.send();
}


function getpricedisplay1() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('hbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay1.php", true);
	xmlhttp.send();
}


function getpricedisplay2() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('cbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay2.php", true);
	xmlhttp.send();
}


function getpricedisplay3() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('bbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay3.php", true);
	xmlhttp.send();
}


function getpricedisplay4() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('cpbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay4.php", true);
	xmlhttp.send();
}


function getpricedisplay5() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('dipbutton').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay5.php", true);
	xmlhttp.send();
}


function disablepricefn(clickid) {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/disableprice.php?id="+clickid, true);
	xmlhttp.send();
}


function enablepricefn(clickid) {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/enablepricedisplay.php?id="+clickid, true);
	xmlhttp.send();
}
