# FEND - Restaurant Review Project
---

## Background

For this **Restaurant Reviews** projects, a static webpage has been converted into a web application that is responsive on different sized displays and accessible for screen reader use. A service worker is also used to create a seamless offline experience for your users.

## Install
The local dev API server:
- Launch the sails server
- Download or clone the dev server from [https://github.com/udacity/mws-restaurant-stage-2](https://github.com/udacity/mws-restaurant-stage-2)
- cd into the folder
- `npm i`
- `npm i sails -g`
- `node server`

The client: Note that you need 
- clone or download this code
- cd into the folder
- `npm install`
- `npm install http-server -g`
- Note that you need to install [ImageMagick](https://www.imagemagick.org/script/download.php) (need to check mark 'Install legacy utilities' and 'Add application directory to your system path' during installation to resize the images.
- `npm run build`
- cd into the `dist` folder
- Run `http-server . -p 3000`
- Open http://localhost:3000 in the browser

## Dependencies
- [MapBox API](https://www.mapbox.com/install/)
- [Normalize.css](https://cdnjs.com/libraries/normalize)
- [Dev API Server from Udacity](https://github.com/udacity/mws-restaurant-stage-2)
- IndexedIDB Promised

# Maintainers
[@vschau](https://github.com/vschau).

# Contribute
This project is for the Nanodegree and will not accept pull requests.