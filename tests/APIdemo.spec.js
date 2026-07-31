const {test, expect}=require("@playwright/test");

test('@api GET request - fetch users',async({request})=>{
    const response=await request.get('https://jsonplaceholder.typicode.com/users')
    expect(response.ok()).toBeTruthy()
    const body=await response.json()
    expect(body.length).toBeGreaterThan(0)
    console.log(body[0].name)
    console.log(body[1].name)
    console.log(body[1].email)
})

test('@api POST request - create users',async({request})=>{
    const response=await request.post('https://jsonplaceholder.typicode.com/users',{
        data:{
            name:'john doe',
            email:'john@gmail.com'
        }
    })
    expect(response.status()).toBe(201)
    const responseBody=await response.json()
    expect(responseBody.name).toBe('john doe')
    expect(responseBody.email).toBe('john@gmail.com')
})