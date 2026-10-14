const {expect, test } = require("@playwright/test");


test('@API get rewquest-fetch users',async({request})=>{
const response= await request.get('https://jsonplaceholder.typicode.com/users')
await expect(response.ok()).toBeTruthy()
const body= await response.json()
expect(body.length).toBeGreaterThan(0)
console.log(body[0].name)
})

test('@API post request- create user',async({request})=>{
    const response= await request.post('https://jsonplaceholder.typicode.com/users',{
        data:
        {
            name:'john doe',
            username:'john123',
            email:'john@gmail.com'
        }
    })
    expect(response.status()).toBe(201)
    const responsebody=await response.json()
    expect(responsebody.name).toBe("john doe")
    console.log(responsebody)
})