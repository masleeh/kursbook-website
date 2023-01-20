<<<<<<< HEAD
# Kurs Book Order Manager

This is React.Js application made for managing orders coming from [Kurs Book Website](https://github.com/masleeh/kursbook-website) <br>

[Figma project file](https://www.figma.com/file/5Cf7IdQN7WyEVxPaEVkG2U/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0-%D0%9A%D1%83%D1%80%D1%81?node-id=175%3A4&t=qzber5mfJO04XkU2-1)
=======
# Kurs Book Website

This is my website written for book called "Kurs".
Figma design project:  
[Figma project file](https://www.figma.com/file/5Cf7IdQN7WyEVxPaEVkG2U/%D0%9A%D0%BD%D0%B8%D0%B3%D0%B0-%D0%9A%D1%83%D1%80%D1%81?node-id=175%3A4&t=qzber5mfJO04XkU2-1) 
>>>>>>> 442577c39c39b851df8dfe430c299067143c1aa2

## Project specification

***Client:***

<<<<<<< HEAD
+ Framework: **React.js**
+ Typescript
+ SCSS (transformed to CSS through VSCode Extension)
+ JSON Web Token Authorization

## Project structure

Application has login page:
IMAGE
After successful login/password verifying client receives JSON-web-token. After saving token in local storage, client <br>
makes **GEt** request for all orders.<br>
Orders manager looks like this:
IMAGE <br>

All changes are saving in Mongo DB Atlas
=======
+ Vanilla Js
+ Plain HTML/CSS

***Backend***

+ Node.Js Express framework
+ MongoDB Atlas Cloud Database

## Functionality

Website has simple form for creating order in cloud database. <br>
![Снимок экрана (16)](https://user-images.githubusercontent.com/102211370/211861752-5690bcd4-1740-4748-a5d6-993e462894d6.png)<br>

Sending data realized through ***Fetch*** <br>
Main page has animations triggered by user's scroll.

On **backend** Node.Js Express application uses Mongoose for database management and <br>
has simple CRUD architecture.

Orders management realized by [this react application](https://github.com/masleeh/Kurs-Book-Orders-Manager)
>>>>>>> 442577c39c39b851df8dfe430c299067143c1aa2
