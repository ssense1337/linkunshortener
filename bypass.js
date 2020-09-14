//SUB 2 CODER GAUTAM ON YT
//Here bypass defnition

module.exports = {
    bypass: function (url) {
      
      if(testregex(url, "/linkvertise\.(com|net)|link-to\.net|up-to-down\.net|direct-link\.net|filemedia\.net/")) {
        //LINKVERTISE
      } else {
          return("Bypass for this website is not available")
      }

    }
  };
  

  function testregex(string, regex) {
    var reg = new RegExp(regex);
    return(reg.test(string))
  }