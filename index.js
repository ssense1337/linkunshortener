const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const request = require('request');
const btoa = require('btoa');
var atob = require('atob');
var urlExpander=require('expand-url');
const { json } = require('express');
var Bypasser = require('node-bypasser');

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
app.use(express.static(__dirname+"/website"))


function testregex(string, regex) {
  var reg = new RegExp(regex);
  return(reg.test(string))
}

function change(url) {
  var urlobj = new URL(url);
  var path = urlobj.pathname
  var done1 = path.substring(9,path.length - 33);
  var done2 = "https://link-to.net"+done1
  return done2;
  }
app.get('/', (req,res) => {
  res.sendFile("index.html")
})
app.get('/api', (req, res) => {
    var url11 = decodeURI(req.url.substring(9));

    var output = {
      success: undefined,
      errormsg: undefined,
      bypassedlink: undefined,
      inputlink: url11,
      type: undefined
    };

    if(url11.slice(-1) == "/") {
      url11 = url11.substring(0, url11.length - 1)
    }
    if(url11 == "") {
      output.success = false;
      output.errormsg = "No URL Given Lol"
      res.end(JSON.stringify(output))
    }
    try {
      new URL(url11)
    } catch {
      output.success = false;
      output.errormsg = "Invalid URL"
      res.end(JSON.stringify(output))
    }

    if(testregex(url11, "/linkvertise\.(com|net)|link-to\.net|up-to-down\.net|direct-link\.net|filemedia\.net|linkvertise\.download|file-link\.net/")) {
      //LINKVERTISE
      output.type = "Linkvertise" 
      var urltest = url11;
      try {
      var urltestobj = new URL(urltest)
      } catch {
       output.success = false;
       output.errormsg = "Not a valid URL"
  
       res.end(JSON.stringify(output))
      }
       if(urltestobj.host != "linkvertise.download") {
                     url = url11;
       } else {
         try {
     url = change(url11)
         } catch {
           url = url11
         }
       }
       try {
        urlobj = new URL(url)
                } catch {
                  output.success = false;
                  output.errormsg = "Not a valid URL"
           
                res.end(JSON.stringify(output))
                 }
                 urlobj = new URL(url)
                 dynamic = false;
                  if(urlobj.searchParams.get("r") != null) {
//dynamic
dynamic = true;
bypassed = atob(decodeURIComponent(url.substr(url.indexOf("?r=") + 3)));

}
          if(!dynamic) {      
                 console.log(url)
                 path = urlobj.pathname
     let o={timestamp:new Date().getTime(),random:"6548307"}

      url1 = "https://publisher.linkvertise.com/api/v1/redirect/link/static" + path
     
                console.log(url1)
                 cors = "https://cors-anywhere.herokuapp.com/"
     
                 //Request #1
                 request(url1, {
                     json: true
                 }, (err, json) => {
                     if (err) {
                    
                      output.success = false;
                      output.errormsg = "Could not fetch data"
                      
                      res.end(JSON.stringify(output))
                     
                     }
                     
         
    
                     
     try {
                     if (json && json.body.data.link.id) {
                         o.link_id = json.body.data.link.id
               
                         url1 = "https://publisher.linkvertise.com/api/v1/redirect/link" + path + "/target?serial=" + encodeURIComponent(btoa(JSON.stringify(o)))
                         request(url1, {
                             json: true
                         }, (err, json) => {
     
                             if (err) {
                                 
                             }

                             if (json && json.body.data.target) {
     
     
                               bypassedthink = json.body.data.target
                               bypassedobj = new URL(bypassedthink);
                               bypassed = bypassedobj.searchParams.get("k")
                               output.success = true;
                               output.bypassedlink = bypassed
                               res.end(JSON.stringify(output))

     
     
                             }
     
                         })
     
                     } } catch {
                      output.success = false;
                      output.errormsg = "Invalid Linkvertise link. Could not fetch data"
                      
                      res.end(JSON.stringify(output))
                     }
     
                 })
                } else {
                  output.success = true;
                  output.bypassedlink = bypassed
                  res.end(JSON.stringify(output))
                }
    } else if(testregex(url11, "/goo\.gl/")) {
      output.type = "Goo.gl" 
      urlExpander.expand(url11, function(err, longUrl){
	if(err) {
    output.success = false;
    output.errormsg = "Error"
    res.end(JSON.stringify(output))
  }
  var oldobj = new URL(url11)
  var newobj = new URL(longUrl)

  var oldurl = oldobj.host+oldobj.pathname
  var newurl = newobj.host+newobj.pathname
  if(oldurl == newurl) {
    output.success = false;
    output.errormsg = "Invalid Link"
    res.end(JSON.stringify(output))
  } else {
    output.success = true;
    output.bypassedlink = longUrl;
        res.end(JSON.stringify(output))
  }

});
    } else if(testregex(url11,  "/bit\.ly/")) {
      output.type = "Bit.ly"
      var w = new Bypasser(url11);
      try {
      w.decrypt(function(err, result) {
if(err) {
  output.success = false;
  output.errormsg = err
  res.end(JSON.stringify(output))
} else {
  output.success = true;
  output.bypassedlink = result;
  res.end(JSON.stringify(output))
}

    
    });
  } catch {
    output.success = false
    output.errormsg = "Unexpected error"
    res.end(JSON.stringify(output))
  }
     } else if(testregex(url11,  "/adf\.ly|raboninco\.com|dapalan\.com|gdanstum\.net|ducolomal\.com|aclabink\.com|yoitect\.com|yoineer\.com|yamechanic\.com|skamason\.com|skamaker\.com|kializer\.com|flyserve\.co|fawright\.com/")) {

      output.type = "Adf.ly(beta)"
      request(url11, function (error, response, body) {
   if(!error) {
       
        var data = body.substring(body.indexOf('ysmm = \''), body.length)
 try {
     eval(data.substring(0,data.indexOf(";")))
     failed = false;
 } catch {
 //invalid
 failed = true;
 output.success = false;
 output.errormsg = "Invalid Adfly URL"
 res.end(JSON.stringify(output))
 }
 if(!failed) {
        r=ysmm
 
        let a,m,I="",X=""
        for(m=0;m<r.length;m++)
        {
            if(m%2==0)
            {
                I+=r.charAt(m)
            }
            else
            {
                X=r.charAt(m)+X
            }
        }
        r=I+X
        a=r.split("")
        for(m=0;m<a.length;m++)
        {
            if(!isNaN(a[m]))
            {
                for(var R=m+1;R<a.length;R++)
                {
                    if(!isNaN(a[R]))
                    {
                        let S=a[m]^a[R]
                        if(S<10)
                        {
                            a[m]=S
                        }
                        m=R
                        R=a.length
                    }
                }
            }
        }
        r=a.join('')
        r=atob(r)
        r=r.substring(r.length-(r.length-16))
        r=r.substring(0,r.length-16)
    try {
 bypassed = decodeURIComponent(new URL(r).searchParams.get("dest"))
    } catch {
      failed = true;
      output.success = false
      output.errormsg =  "Unexpected Error"
      res.end(JSON.stringify(output))
    }
if(!failed) {
  if(!(bypassed === "null")) {
    console.log(bypassed)
    output.success = true
    output.bypassedlink =  bypassed
    res.end(JSON.stringify(output))
  } else {
    output.success = false
    output.errormsg =  "Couldnt retrieve bypassed URL"
    res.end(JSON.stringify(output))
  }
}
       
      } else {
        output.success = false;
        output.errormsg = "Could not fetch data"
        res.end(JSON.stringify(output))
      }
     }
       });
     } else if(testregex(url11,  "/sub2unlock\.(com|net)/")) {
      output.type = "sub2unlock"
      request(url11, function (error, response, body) {
try {
new URL(body.substring(body.indexOf('<div id="theGetLink" style="display: none">')).substring(43,body.substring(body.indexOf('<div id="theGetLink" style="display: none">')).indexOf('</div>')))
failed = false;
} catch {
  output.success = false;
  output.errormsg = "Invalid Sub2unlock link"
  res.end(JSON.stringify(output))
  failed = true;
}
if(!failed) {
  if(body.indexOf('<div id="theGetLink" style="display: none">') != -1) {
  output.success = true;
  output.bypassedlink = body.substring(body.indexOf('<div id="theGetLink" style="display: none">')).substring(43,body.substring(body.indexOf('<div id="theGetLink" style="display: none">')).indexOf('</div>'));
  res.end(JSON.stringify(output))
  } else {
    output.success = false;
    output.errormsg = "Couldnt retrieve bypassed link"
    res.end(JSON.stringify(output))
    failed = true;
  }
}
       
      })
     } else if(testregex(url11,  "/mboost\.me/")) {
      output.type = "mboost.me"
      request(url11, function (error, response, body) {
        var data = body.substring(body.indexOf('<script id="__NEXT_DATA__" type="application/json">'))
        var data2 = data.substring(51, data.indexOf('</script>'))
        failed = false;
        try {
          JSON.parse(data2)
        
        } catch {
          failed =true;
          output.success = false;
          output.errormsg = "Cannot read bypassed link";
          res.end(JSON.stringify(output))
        }
        if(!failed) {
          output.success = true;
          output.bypassedlink = JSON.parse(data2).props.initialProps.pageProps.data.targeturl
          res.end(JSON.stringify(output))
        }
      })
     } else if(testregex(url11, "/boost\.ink|bst\.gg|bst\.wtf|booo\.st/")) {

      output.type = "boost.ink"
      var nav = function (source) {
        var respom = source.match(/(lol|version)=["']([^"']+)["']/i);
        if (respom) {
          output.success = true;
            output.bypassedlink = atob(respom[2]);;
            res.end(JSON.stringify(output))
        } else {
          output.success = false;
          output.errormsg = "Invalid Boost.ink link";
          res.end(JSON.stringify(output))
        }
    };
    request(url11, function (error, response, body) {
      if(!error) {
        nav(body);
      } else {
        output.success = false;
        output.errormsg = "Cannot send request";
        res.end(JSON.stringify(output))
      }
      
    })
     } else {



      var w = new Bypasser(url11);
      try {
        w.decrypt(function(err, result) {
  if(err) {
    output.success = false;
    output.errormsg = "This website is not supported"
    res.end(JSON.stringify(output))
  } else {

    if(new URL(output.inputlink).hostname+new URL(output.inputlink).pathname != new URL(result).hostname+new URL(result).pathname) {
      output.success = true;
      output.type = "Misc Link"
      output.bypassedlink = result;
      res.end(JSON.stringify(output))
    } else {
      output.success = false;
      output.errormsg = "Unexpected Error"
      res.end(JSON.stringify(output))
    }

  }
  
      
      });
    } catch {
      output.success = false
      output.errormsg = "Unexpected error"
      res.end(JSON.stringify(output))
    }


    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
