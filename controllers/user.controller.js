const fs = require('fs');

exports.randomUser = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const index = Math.floor(Math.random()*(users.length-1));
    const randomUser = users[index]
    res.json({
        status: "success",
        message: "successfully got a random user",
        data: randomUser
    }) 

}

exports.allUsers = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    res.json({
        status: "success",
        message: "successfully got all users",
        data: users
    }) 

}

exports.addUser = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const user = req.body;
    !user.id && (user.id = users.length)
    users.push(user)
    const data = JSON.stringify(users, null, 2)
    fs.writeFile('users.json', data, (err)=>{console.log(err)})

    res.json({
        status: "success",
        message: "successfully saved the user",
        data: user
    })
}

exports.updateUser = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const updateBody = req.body;
    const user = users.find(usr => usr.id == updateBody.id)
    const index = users.indexOf(user)

    if(!user) {
        res.json({status: "fail", message: "could not update user"})
    }else{

        Object.keys(updateBody).forEach(key => user[key] = updateBody[key])
    
        users[index] = user
    
        const data = JSON.stringify(users, null, 2)
        fs.writeFile('users.json', data, (err)=>{console.log(err)})
    
        res.json({
            status: "success",
            message: "successfully saved the user",
            data: user
        })
    }
    
}

exports.bulkUpdate = (req, res, next) => {
    let updateCount = 0;
    const users = JSON.parse(fs.readFileSync('users.json'))
    const updateBody = req.body
    
    updateBody.forEach(body => {
        const user = users.find(usr => usr.id == body.id)
        const index = users.indexOf(user)

        if(user){
            Object.keys(body).forEach(key => user[key] = body[key])
            users[index] = user

            updateCount += 1
        }
    });

    if(updateCount > 0){
        const data = JSON.stringify(users, null, 2)
        fs.writeFile('users.json', data, (err)=>{console.log(err)})

        res.json({
            status: "success",
            message: "successfully updated the users",
            updateCount
        })
    }
    else{
        res.json({
            status: "fail",
            message: "Could no update the users",
            updateCount
        })
    }
}

exports.deleteUser = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync('users.json'))
    const user = users.find(usr => usr.id == req.body.id)

    if(user){
        const index = users.indexOf(user)
        users.pop(index)

        const data = JSON.stringify(users, null, 2)
        fs.writeFile('users.json', data, (err)=> console.log(err))

        res.json({
            status: "success",
            message: "successfully deleted the user",
            data: user
        })
    }
    else{
        res.json({
            status: "fail",
            message: "could no delete the user",
        })
    }
}