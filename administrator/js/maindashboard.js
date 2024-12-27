$(document).ready(function(){
onLoad();
getstores();
getstockapprovals();
getconversionapprovals();
getqtyapprovals();
getbranchoptions();
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
google.charts.load('visualization', { packages: ['corechart'] });
function drawLineChart() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdate").value;
    var startdate = document.getElementById("filterdatestart").value;
    var params = "branch="+branch+"&date="+date+"&startdate="+startdate;
    $.ajax({
        url: "https://poultrade.com/admin/admin/gettotalsale1.php",
        data: params,
        type: "GET",
        success: function (dataa) {
            if(dataa!="" && dataa!=null && dataa!="null") {
                document.getElementById('totalsale').style.height = "400px";
                var data = JSON.parse(dataa);
                var arrSales = [['Product', 'Sales', { role: "style" }]];
                $.each(data, function (index, value) {
                    arrSales.push([value.productname, parseInt(value.saleamount), value.graphcolor]);
                });
                var figures = google.visualization.arrayToDataTable(arrSales)
                var view = new google.visualization.DataView(figures);
                  view.setColumns([0, 1,
                                   { calc: "stringify",
                                     sourceColumn: 1,
                                     type: "string",
                                     role: "annotation" },
                                   2]);
                var options = {
                    legend: { position: 'none' },
                    curveType: 'function'
                };
                
                var chart = new google.visualization.ColumnChart(document.getElementById('totalsale'));
                chart.draw(view, options);
            }
            else {
                document.getElementById('totalsale').style.height = "250px";
                document.getElementById('totalsale').innerHTML="<center><img src='https://poultrade.com/nodata.png' style='width: 250px; height: auto'></center>";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Got an Error');
        }
    });
}


google.charts.load('visualization', { packages: ['corechart'] });
function salestock() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdate").value;
    var startdate = document.getElementById("filterdatestart").value;
    var params = "branch="+branch+"&date="+date+"&startdate="+startdate;
    $.ajax({
        url: "https://poultrade.com/admin/admin/salestock.php",
        data: params,
        type: "GET",
        success: function (dataa) {
            if(dataa!="" && dataa!=null && dataa!="null") {
                document.getElementById('salestock').style.height = "400px";
                var data = JSON.parse(dataa);
                var arrSales = [['Product', 'Sales', { role: "style" }]];
                $.each(data, function (index, value) {
                    arrSales.push([value.productname, parseInt(value.saleamount), value.graphcolor]);
                });
                var figures = google.visualization.arrayToDataTable(arrSales)
                var view = new google.visualization.DataView(figures);
                  view.setColumns([0, 1,
                                   { calc: "stringify",
                                     sourceColumn: 1,
                                     type: "string",
                                     role: "annotation" },
                                   2]);
                var options = {
                    legend: { position: 'none' },
                    curveType: 'function'
                };
                
                var chart = new google.visualization.ColumnChart(document.getElementById('salestock'));
                chart.draw(view, options);
            }
            else {
                document.getElementById('salestock').style.height = "250px";
                document.getElementById('salestock').innerHTML="<center><img src='https://poultrade.com/nodata.png' style='width: 250px; height: auto'></center>";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Got an Error');
        }
    });
}


function executefunctions() {
    drawLineChart();
    getcustomhead();
    getbranchops();
    salestock();
    revenuestats();
    stockstatistics();
}


function getbranchoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('branchoptions').innerHTML=result;
			getydate();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getbranchoptionsd.php", true);
	xmlhttp.send();
}


function getydate() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("str_split");
			document.getElementById('filterdate').value=splitter[0];
			document.getElementById("filterdatestart").value=splitter[1];
			drawLineChart();
			getcustomhead();
			getbranchops();
			salestock();
			revenuestats();
			stockstatistics();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getydate.php", true);
	xmlhttp.send();
}


function revenuestats() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdate").value;
    var startdate = document.getElementById("filterdatestart").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('revenuestats').innerHTML=result;
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/revenuestats.php?branch="+branch+"&date="+date+"&startdate="+startdate, true);
	xmlhttp.send();
}


function stockstatistics() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdatestart").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('stockstatistics').innerHTML=result;
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/stockstatistics.php?branch="+branch+"&date="+date, true);
	xmlhttp.send();
}


function getcustomhead() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdate").value;
    var startdate = document.getElementById("filterdatestart").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("str_split");
			document.getElementById('saletext').innerHTML=splitter[0];
			document.getElementById('branchopstext').innerHTML=splitter[1];
			document.getElementById('stocksaletext').innerHTML=splitter[2];
			document.getElementById('revenuetext').innerHTML=splitter[3];
			document.getElementById('stocktext').innerHTML=splitter[4];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getcustomhead.php?branch="+branch+"&date="+date+"&startdate="+startdate, true);
	xmlhttp.send();
}


function getbranchops() {
    var branch = document.getElementById("branchoptions").value;
    var date = document.getElementById("filterdatestart").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('branchops').innerHTML=result;
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getbranchops.php?branch="+branch+"&date="+date, true);
	xmlhttp.send();
}


function getstockapprovals() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('stockapprovals').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getstockapprovals.php", true);
	xmlhttp.send();
}


function getqtyapprovals() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('qtyapprovals').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getqtyapprovals.php", true);
	xmlhttp.send();
}


function getconversionapprovals() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('conversionapprovals').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getconversionapprovals.php", true);
	xmlhttp.send();
}


function approveclick(id) {
    var splitter = id.split("str_split");
    var qty = splitter[0];
    var weight = splitter[1];
    var product = splitter[2];
    var branch = splitter[3];
    var lineid = splitter[4];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Approve?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/approvestockclosing.php?qty="+qty+"&weight="+weight+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}


function eapproveclick(id) {
    var splitter = id.split("str_split");
    var qty = splitter[0];
    var product = splitter[1];
    var branch = splitter[2];
    var lineid = splitter[3];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Approve?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/eapprovestockclosing.php?qty="+qty+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}


function capproveclick(id) {
    var splitter = id.split("str_split");
    var weight = splitter[0];
    var product = splitter[1];
    var branch = splitter[2];
    var lineid = splitter[3];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Approve?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/capprovestockclosing.php?weight="+weight+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}



function crejectclick(id) {
    var splitter = id.split("str_split");
    var weight = splitter[0];
    var product = splitter[1];
    var branch = splitter[2];
    var lineid = splitter[3];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Reject?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/crejectstockclosing.php?weight="+weight+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}


function rejectclick(id) {
    var splitter = id.split("str_split");
    var qty = splitter[0];
    var weight = splitter[1];
    var product = splitter[2];
    var branch = splitter[3];
    var lineid = splitter[4];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Reject?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/rejectstockclosing.php?qty="+qty+"&weight="+weight+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}


function erejectclick(id) {
    var splitter = id.split("str_split");
    var qty = splitter[0];
    var product = splitter[1];
    var branch = splitter[2];
    var lineid = splitter[3];
    var user_id = localStorage.getItem("user_id");
    swal({
      text: "Do you really want to Reject?",
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
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/erejectstockclosing.php?qty="+qty+"&branch="+branch+"&product="+product+"&lineid="+lineid+"&user_id="+user_id, true);
		xmlhttp.send();
      } else {
        return false;
      }
    });
}
