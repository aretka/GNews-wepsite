# GNews-wepsite

This is simple gnews search engine which prints up to 9 searching artilces from GNews API and lists them below searching bar.
<img src="/screenShots/desktop_size.png" width="700" height="400"/>
<img src="/screenShots/mobile_size.png" width="250" height="400"/>

## Getting started with GNews-website

In order to set up project you have to install all the dependancies by running command below in both client and server directories (client will still work if server is not running since server part only logs searched keywords and clicked articles' info):

### `npm install`

Installs the dependancies in local node_modules folder required for a project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view client side in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## About this website

This website utilized React for a front end part, bootstrap for responsive design, axios for fetching data. <br/>It is divided into 3 sections:
* Header 
* Articles
* Footer

### Header 

 Desktop size </br>
<img src="/screenShots/header_wide.png"/>

 Mobile size </br>
<img src="/screenShots/header_mobile.png"  width="330" height="180"/>


Header part contains:
* Title
* Description
* Form 
  * Search bar
  * Search button

When button is clicked it checks validation(described below) and if it passes then fetches up to 9 articles typed in search input area and stores them in local state. If input is not valid the error message occurs above input field.

### Validation 

There are three things that are being validated:
1. Number of spaces is limited to 40 </br>
<img src="/screenShots/validation_spaces.png"  width="260" height="180"/>
2. Only alphanumeric characters are allowed </br>
<img src="/screenShots/validation_character.png"  width="260" height="180"/>
3. Cannot be empty field </br>
<img src="/screenShots/validation_empty.png"  width="260" height="180"/>

### Articles



