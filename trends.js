var XMLHttpRequest = require('xhr2');

// function dateReviver(key, value) {
//     var a;
//     if (typeof value === 'string') {
//         a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
//         if (a) {
//             return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                             +a[5], +a[6]));
//         }
//     }
//     return value;
// }

function reqListener() {
  var data = this.responseText;
  // console.log(data);
  var array = data.match(/[^\s]+/g);
  // var array = data.split(" ");

  // This works but it's slow
  // var array = data.split("script");
  // var sub = array[32];
  // var chop = sub.substring(19, (sub.length - 2) );
  // var parsed = JSON.parse(JSON.stringify(chop));
  // console.log(Object.keys(parsed));

  var chartData = new Array();
  var flag = 0;

  for( var i = 0; i < array.length; ++i){
    //chartData is the variable I want to pull from the given response
    if (array[i] === "chartData"){
      flag = 1;
    }
    //The end of the object I want to capture
    if (array[i] === "NEWS_HEADLINE_LIST_htmlChart"){
      flag = 0;
    }
    if (flag === 1) {
      chartData.push(array[i]);
    }
  }

  //Remove the '=' and ' ' from the collected string before the data I want
  chartData.shift();
  chartData.shift();
  chartData.pop();

  //Join back to a string, reinsert a space
  var o = new Object();
  o = chartData.join(" ");
  // var d = JSON.parse(chartData);
  console.log(o);
}

function reqError(err) {
  console.log('Fetch Error :-S', err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', 'https://www.google.com/trends/trendsReport?hl=en-US&q=pluto&cmpt=q&tz=Etc%2FGMT%2B8&tz=Etc%2FGMT%2B8&content=1', true);
oReq.setRequestHeader('withCredentials', 'true');
oReq.send();
