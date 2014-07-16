# [rpgbook](https://github.com/jbrousseau/rpgbook)
=======

[![Build Status](https://secure.travis-ci.org/jbrousseau/rpgbook.svg?branch=master)](https://travis-ci.org/jbrousseau/rpgbook)
[![Dependency Status](https://gemnasium.com/jbrousseau/rpgbook.svg)](https://gemnasium.com/jbrousseau/rpgbook)


A social network webapp for Role playing games
Build on Meteor.js

## Installation

**install meteor and Atmosphere package manager :**
```sh
sudo curl https://install.meteor.com | /bin/sh
npm install -g meteorite
```
**install graphicsmagick :**
```sh
http://www.graphicsmagick.org/INSTALL-unix.html
```
**With [meteor](http://meteor.com) installed and [meteorite](http://atmospherejs.com/docs/installing) installed**
```sh
# Get the project
$ git clone https://github.com/jbrousseau/rpgbook.git
# go to the project directory
$ cd rpgbook
# install dependencies and start the server on port XXXX
$ mrt --port XXXX --settings private/local-settings.json
```
**Don't forget to create this file**
```sh
//private/local-settings.json
{
    "facebook" : {
        "clientId": "XXXXX",
        "secret": "XXXXX"
    },
    "kadira": {
        "appId": "XXXXX",
        "appSecret": "XXXXX"
    }
}
```
## License

[MIT License](http://opensource.org/licenses/MIT)