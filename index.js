const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const request = require('request');
const btoa = require('btoa');
var atob = require('atob');
var urlExpander=require('expand-url');

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
    } else {
     output.success = false;
     output.errormsg = "Invalid URL/Website not available for unshorten"
     res.end(JSON.stringify(output))

    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
