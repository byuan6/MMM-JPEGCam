# MMM-JPEGCam
Will refresh image from Camera.  If static image, it can be given a update duration.  Set to 0, if MJPEG feed.

![Screenshot](https://raw.githubusercontent.com/studio-1b/MMM-JPEGCam/main/docs/MMM-JPEGCam.Screenshot%20from%202024-02-20%2023-05-17.png)https://raw.githubusercontent.com/studio-1b/MMM-JPEGCam/main/docs/MMM-JPEGCam.Screenshot%20from%202024-02-20%2023-05-17.png)

> [!NOTE]
> Please read [https://www.home-assistant.io/integrations/mjpeg/](https://www.home-assistant.io/integrations/mjpeg/) if you need a quick primer on how IP or Network Cameras work.
> These cameras often have a "MJPEG URL" and a "Still Image URL".  This module can work with both.


# Platform for the module

Module to be installed in the MagicMirror application, described in below link.

[https://github.com/MagicMirrorOrg/MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror)

The MagicMirror application is built on the [node.js](https://nodejs.org/en) application platform, and node.js package dependencies can be managed by [npm](https://www.npmjs.com/) application.

# Installation

### Step 1: Clone module from github, and install dependencies for module

```bash
cd <MagicMirror root>/modules/
git clone https://github.com/studio-1b/MMM-JPEGCam.git
cd MMM-JPEGCam
npm install
```

You should now have a folder named "<MagicMirror root>/modules/MMM-JPEGCam"

### Step 2: Add configuration to <MagicMirror root>/config/config.js

Required is to add a url.
```js
    {
        module: "MMM-JPEGCam",
        header: "Cameras",
        position: "top_right",
        config: {
            width: "360px",
            rotationInterval: 1*1000, // 1sec
            rotatingURL: [
                'http://192.168.1.3:8080/cgi-bin/<still image URL>&isappend',
                'http://192.168.1.4:8080/cgi-bin/<mjpeg url>',
            ],
            visiblecount: 1,
            isappend: false
        }
    },
```

Restart the MagicMirror application.

## General options: 

| Key | Description |
| :-- | :-- |
| width <br> `350` | Width of Map |
| height <br> `250` | Height of Map |
| isappend <br> false | If true, always appends date to end of below url to IP camera |
| rotationInterval <br> '1000' | In millisec, so default is 1sec.  The images will rotate every 1sec, which gives the still images a illusion of a video  |
| rotatingURL <br> (required) | Javascript array: [URL1, URL2] <br> At least 1 URL is required.  Each URL is to a different IP camera.  Each camera type has a specific URL for it's manufacturer and make.  If using still image URL, you should append '&isappend' to end of url, to create the illusion of motion )  |
| visiblecount <br> `1` | How many video windows to show at once.  If fewer than number of URL in rotationURL array, then the rotationInterval (above) should be used as the interval which to change images, in limited windows |

# Details

The module creates img tags for count specified in visiblecount.  Then it sends a list of url of exactly that many items, to be displayed, starting at the top list in rotatingURL.  And refreshing every rotationInterval, at where it left off.

MJPEG URL are videos by their very nature and do not need to be refreshed.



