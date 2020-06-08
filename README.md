# wetask - Task Managment Application

![alt text](https://res.cloudinary.com/shaishar9/image/upload/v1591551510/jhqltq0tbfpyh32bzzfq.jpg "wetask main screenshot")

A Trello-like web application as part of a team of 3 developers.<br />
Developed multiple frontend components, designed the RESTful API,<br />
implemented the entire backend and developed the database.

[Try It Now](http://we-task.herokuapp.com/)

For example, the query function from the board.service (backend):
```
async function query(filterBy = {}) {
    
    // Getting the collection
    const collection = await dbService.getCollection('board')
    try {
        // Getting the boards after filter by member id and public boards. sort the board by createdAt
        const boards = await collection.find({ $or: [{ 'members._id': filterBy.userId }, { 'isPublic': true }] })
        .sort({ 'createdAt': -1 }).toArray();
        return boards
    } catch (err) {
        // Catching the error if no boards
        console.log('ERROR: cannot find boards')
        throw err;
    }
}
```

#### Technological stack:
React.js, Redux, Node.js, Express, RESTful API, MongoDB, WebSockets<br />
Axios, HTML5, Sass, Heroku, Cloudinary, SPA
