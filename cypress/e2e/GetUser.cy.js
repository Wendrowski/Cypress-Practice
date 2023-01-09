/// <reference types = 'Cypress' />
describe('get api user test', () => {
    // declare global variable
    let accessToken = '730d3532923555b7ae14f640bb118690cce271caf6ca0e3f01963b28f779f09d' 
    it('get users', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users/4416',
            headers : {
                'authorization' : 'Bearer ' + accessToken
            }
        }).then((res) => {
            //chai assertions
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Gopal Arora CPA')
            expect(res.body.email).to.eq('gopal_arora_cpa@schowalter-nitzsche.org')
            expect(res.body.gender).to.eq('female')
            expect(res.body.status).to.eq('active')
        })
    })
    it('get users by id', () => {
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : 'Bearer 730d3532923555b7ae14f640bb118690cce271caf6ca0e3f01963b28f779f09d'
            }
        }).then((res) => {
            expect(res.body.meta.pagination.total).to.eq(3875)
            expect(res.body.meta.pagination.pages).to.eq(388)
            expect(res.body.meta.pagination.page).to.eq(1)
            expect(res.body.meta.pagination.limit).to.eq(10)
            expect(res.body.meta.pagination.links).has.property('previous', null)
        })
    })
})