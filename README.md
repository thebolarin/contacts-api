# Simple Contact API Service.

## Description

A simple contacts backend application that consist of contacts and their edit history.

## Features
* Can add a new contact
* Can edit contact
* Can view contact and its edit history
* Can delete contact


## Tools used in Project Creation
* Node.js,Typescript ,& Express
* Babel
* Eslint & Prettier
* Git
* Heroku
* Netlify

## Dependencies

- Nodejs 16.13.1
- MongoDB

## Install Nodejs
Follow the installation guide [here](https://nodejs.org/en/download/)

## Clone the repository

```
git clone https://github.com/thebolarin/contacts-api.git && cd contacts-api
```

## Install Nodejs dependencies

From your freshly checked out contacts-api repo, run:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

```

The app should be accessible through http://localhost:5000/.
## Testing

```bash
# unit tests
$ npm run test

```
## HTTP Request Methods

These are the HTTP request methods used in this project.

| Method	| Action |
| --- | --- |
| `GET` |	This method is used to get a resource|
| `POST`	| This method is used to create a resource or send data |
| `PUT`	| This method is used to send data to a server to create/update a resource |
| `DELETE`	| This method is used to delete the specified resource at the origin of server |

## HTTP Response Status Codes

These are the HTTP response codes used in this project.

| Status Codes | Indication |
| --- | --- |
| `200` |	This OK status code indicates that a request has succeeded |
| `201` |	This created status code indicates that a resource has been created |
| `400` |	This bad request error status code indicates that the request sent to the server is incorrect |
| `404` |	Returned when the request is valid, but the resource you try to access does not exist, or is outside your scope |
| `500` |	This internal server error status code indicates that something has gone wrong on the web server |

## API Endpoints
| Endpoint |	Functionality |
| --- | --- |
| POST /api/contact | Create a new contact|
| PUT /api/contact/:id |	Edit a contact |
| GET /api/contact/:id |	Get a contact |
| GET /api/contact/ |	Get all contacts |
| DELETE /api/contact/:id |	Delete a contact |

## The API Endpoints are hosted on heroku
https://simple-contact-api.herokuapp.com/api

## The API Documentaion is hosted on postman
https://documenter.getpostman.com/view/8501644/2s8Z712CnL

## Author
Moses Odutusin

## License
This is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).
