/// <reference types = 'Cypress' />
//const dataJson = require('../fixtures/createuser.json')

describe ('post user test', () => {
    let accessToken = 'd4232f3b8630bc42d7b8c9cc5ec05a8cc2e012429ee7ea39ed3885186b29ab2c'
    let randomText = ''
    let testEmail = ''

    it ('create user test', () => {
        let pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz'

        for (let i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }
        cy.fixture('createuser').then((payload) => { // could be used instead of initializing const dataJson
        // the first call (POST)   
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "email": testEmail, // retrieved from randomly generated data
                "name": payload.name, // retrieved from fixtures
                "gender": payload.gender,
                "status": payload.status // if using fixtures need to replace dataJson. with payload
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name', payload.name)
            expect(res.body.data).has.property('gender', payload.gender)
            expect(res.body.data).has.property('status', payload.status)
            //print JSON
            cy.log(JSON.stringify(res))
            // the purpse of the chaining GET request is to assure the user has been created
        }).then((res) => {
            const userId = res.body.data.id
            cy.log('UserId is ' + userId)
            // The second call (GET)
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).has.property('id', userId)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name', payload.name)
                expect(res.body.data).has.property('gender', payload.gender)
                expect(res.body.data).has.property('status', payload.status)        
            })
        })
    })
})
})