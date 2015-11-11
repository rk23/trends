var XMLHttpRequest = require('xhr2');

dateTimeReviver = function (key, value) {
    var a;
    if (typeof value === 'string') {
        a = /\/Date\((\d*)\)\//.exec(value);
        if (a) {
            return new Date(+a[1]);
        }
    }
    return value;
}

function reqListener() {
  var data = this.responseText;
  // console.log(data);
  var array = data.match(/[^\s]+/g);
  // var array = data.split(" ");
  var chartData = new Array();
  var flag = 0;

  for( var i = 0; i < array.length; ++i){
    if (array[i] === "chartData"){
      flag = 1;
    }
    if (array[i] === "</script>"){
      flag = 0;
    }
    if (flag === 1) {
      chartData.push(array[i]);
    }
  }
  chartData.shift();
  chartData.shift();
  chartData = chartData.join(" ");
  // var d = JSON.parse(chartData);
  console.log(chartData);
}

function reqError(err) {
  console.log('Fetch Error :-S', err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', 'https://www.google.com/trends/trendsReport?hl=en-US&q=Java&cmpt=q&tz=Etc%2FGMT%2B8&tz=Etc%2FGMT%2B8&content=1', true);
// oReq.open('get', 'https://www.yahoo.com', true);
// oReq.setDisableHeaderCheck(true);
oReq.setRequestHeader('withCredentials', 'true');
// oReq.setRequestHeader('Access-Control-Allow-Credentials', 'true');
// oReq.setRequestHeader('Cookie', 'PREF=ID=1111111111111111:FF=4:LD=en:TM=1445280039:LM=1445280176:GM=1:V=1:S=pqOdp9m6e6XUirNy');
oReq.send();
