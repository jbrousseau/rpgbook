# [rpgbook](https://github.com/jbrousseau/rpgbook)
=======



[![Build Status](https://secure.travis-ci.org/jbrousseau/rpgbook.svg?branch=master)](https://travis-ci.org/jbrousseau/rpgbook)
[![Dependency Status](https://gemnasium.com/v/rpgbook.svg)](https://gemnasium.com/jbrousseau/rpgbook)


__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/jbrousseau/rpgbook.svg)]( https://github.com/jbrousseau/rpgbook/issues )

A social network webapp for Role playing games
Build on Meteor.js

## Installation

**install meteor :**
```sh
sudo curl https://install.meteor.com | /bin/sh
```
**download graphicsmagick :**
```sh
wget ftp://ftp.icm.edu.pl/pub/unix/graphics/GraphicsMagick/GraphicsMagick-LATEST.tar.gz
```
**install graphicsmagick :**
```sh
http://www.graphicsmagick.org/INSTALL-unix.html
```
**With [meteor](http://meteor.com) installed**
```sh
# Get the project
$ git clone https://github.com/jbrousseau/rpgbook.git
# go to the project directory
$ cd rpgbook
# install dependencies and start the server on port XXXX
$ meteor --port XXXX --settings private/local-settings.json
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
** and add connection to database like this**
//~/.bashrc
export MONGO_URL=mongodb://<login>:<password>@<url mongodb>
//you can also create an alias to run the application :
alias m="meteor --port 0.0.0.0:8080 --settings private/local-settings.json"
alias mp="meteor test-packages ./ --port 0..0.0:8080"

## License

[MIT License](http://opensource.org/licenses/MIT)