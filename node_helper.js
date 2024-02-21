'use strict';

const NodeHelper = require('node_helper');
var http = require('http');
var https = require('https');
var base64 = require('base-64');

module.exports = NodeHelper.create({
  start: function() {
    console.log('Starting node helper: '+this.name);
    this.intervalID=-1;
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    var self = this;
    console.log(notification);
    console.log(payload);
    if (notification === 'MJPEG_FEED_CONFIG') {
      this.config = payload;
      if(this.intervalID!=-1)
        clearInterval(this.intervalID);

      this.intervalID=setInterval(()=>self.rotateSrc(),this.config.rotationInterval);

      console.log(this.name + "... interval Duration=" + this.config.rotationInterval );
      this.current=0;
      this.visiblecount = this.config.visiblecount;
    }
  },

  rotateSrc: function() {
    var self = this;
    //console.log(this.name + "rotateSrc()");
    var DEFAULT_IMG="data:image/jpeg;base64,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";
    //src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    //AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
    //    9TXL0Y4OHwAAAABJRU5ErkJggg=="

    /*this.visiblecount--;
    if(this.visiblecount<=0){
      this.stop();
      return;
    }*/

    if (!this.config || !this.config.rotatingURL || this.config.rotatingURL.length==0) {
      console.log(this.name + "... sending MJPEG_FEED_URL " + DEFAULT_IMG );
      self.sendSocketNotification('MJPEG_FEED_URL', Array(this.visiblecount).fill(DEFAULT_IMG));
    } else {
      const urlcount = this.config.rotatingURL.length;
      var results = Array(this.visiblecount).fill(null);

      var len = this.visiblecount; //this.config.rotatingURL.length;
      for(var i=0; i<len; i++) {
        if(this.current >= urlcount)
          this.current=0;
        this.current++;

        var url=this.config.rotatingURL[(this.current) % urlcount];
        // var url=this.config.rotatingURL[this.current];
        if(url.indexOf("&isappend")!=-1) {
          url = url.replace("&isappend","&" + (new Date()).getTime());
        }
        if(this.config.isappend)
          url+="&" + (new Date()).getTime();
        if(url.startsWith("@")) {
          url=url.substring(1);
          if(url.startsWith("https://")) {
            https.get(current, res => {
              let data = [];
              const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
              res.on('data', chunk => {
                data.push(chunk);
              });
              res.on('end', () => {
                var html = ""+data;
                console.log('Response ended: len=' + html.length);
                var bytes = utf8.encode(html);
                var encoded = base64.encode(bytes);
                var mime = res.headers.contentType || 'image/jpeg';

                const src = "data:"+mime+";base64,"+encoded;
                results[i] = src;
                console.log(this.name + "... saving to MJPEG_FEED_URL " + src );
                if(results.every((s) => s !=null) && !this.isSentSame(results)) {
                  console.log(this.name + "... sending MJPEG_FEED_URL ");
                  console.log(results);
                  self.sendSocketNotification('MJPEG_FEED_URL',results);
                }
              });
            }).on('error', err => {
              console.log('Error: ', err.message);
            });
          } else if(url.startsWith("http://")) {
            http.get(current, res => {
              let data = [];
              const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
              res.on('data', chunk => {
                data.push(chunk);
              });
              res.on('end', () => {
                var html = ""+data;
                console.log('Response ended: len=' + html.length);
                var bytes = utf8.encode(html);
                var encoded = base64.encode(bytes);
                var mime = res.headers.contentType || 'image/jpeg';

                const src = "data:"+mime+";base64,"+encoded;
                results[i] = src;
                console.log(this.name + "... saving to MJPEG_FEED_URL " + src );
                if(results.every((s) => s !=null) && !this.isSentSame(results)) {
                  console.log(this.name + "... sending MJPEG_FEED_URL ");
                  console.log(results);
                  self.sendSocketNotification('MJPEG_FEED_URL',results);
                }

                //console.log(this.name + "... sending MJPEG_FEED_URL " + "data:"+mime+";base64,"+encoded);
                //results.every((s) => s !=null)
                //self.sendSocketNotification('MJPEG_FEED_URL', "data:"+mime+";base64,"+encoded);
              });
            }).on('error', err => {
              console.log('Error: ', err.message);
            });
          } else {
            console.error(this.name + "... unrecognized URL " + url);
          }
        } else {
            self.url = url;
            console.log(this.name + "... saving to MJPEG_FEED_URL " + url );

            results[i] = url;
            if(results.every((s) => s !=null) && !this.isSentSame(results)) {
              console.log(this.name + "... sending MJPEG_FEED_URL " );
              console.log(results);
              self.sendSocketNotification('MJPEG_FEED_URL',results);
            }
            //results.every((s) => s !=null)
            //self.sendSocketNotification('MJPEG_FEED_URL', url);
        }
      } //====== for loop end
    }
  },

  stop: function() {
    if(this.intervalID!=-1)
        clearInterval(this.intervalID);

    var url = this.url;
    this.sendSocketNotification('MJPEG_FEED_STOP', url);
  },

  isSentSame: function(updated) {
    if (!this.sent || updated.length==this.sent.length) {
      this.sent = updated;
      return false;
    }
    const sent=this.sent;
    this.sent = updated;
    const len = updated.length;
    for(var i=0; i<len; i++)
      if(updated[i]!=sent[i])
        return false;

    return true;
  },

});

