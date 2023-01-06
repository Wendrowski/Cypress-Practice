/// <reference types = 'Cypress' />

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

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "name":"Test Automation",
                "gender":"male",
                "email":testEmail,
                "status":"active"
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('name', 'Test Automation')
            expect(res.body.data).has.property('gender', 'male')
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('status', 'active')
            //print JSON
            cy.log(JSON.stringify(res))
        })
    })
})