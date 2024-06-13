beforeEach(() => {
    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
    cy.get('[alt="Material Light Theme"]', {timeout: 10000}).click();
    cy.get('[title="Modal & Overlays"]', {timeout: 10000}).click();
    cy.get('[href="/pages/modal-overlays/toastr"]', {timeout: 10000}).click();
});
describe('parametrized 2', () => {

    const testCases = [
        {testData: {
                position: 'top-right',
                title: 'test title',
                content: 'test content',
                time: '10000',
                type: 'primary'
            },
            expectedResult: {
                icon: 'email',
                title: 'test title',
                content: 'test content',
                color: 'rgb(98, 0, 238)',
                position: 'erwr'
            }
        }, {testData: {
                position: 'bottom-right',
                title: 'new title test 2',
                content: 'new content title 2',
                time: '10000',
                type: 'info'
            },
            expectedResult: {
                icon: 'question-mark',
                title: 'new title test 2',
                content: 'new content title 2',
                color: 'rgb(4, 149, 238)',
                position: 'erwr'
            }
        },
        {testData: {
                position: 'top-start',
                title: 'new title test 3',
                content: 'new content title 3',
                time: '10000',
                type: 'danger'
            },
            expectedResult: {
                icon: 'flash',
                title: 'new title test 3',
                content: 'new content title 3',
                color: 'rgb(176, 0, 32)',
                position: 'erwr'
            }
        },
        {testData: {
                position: 'bottom-left',
                title: 'new title test 4',
                content: 'new content title 4',
                time: '10000',
                type: 'warning'
            },
            expectedResult: {
                icon: 'alert-triangle',
                title: 'new title test 4',
                content: 'new content title 4',
                color: 'rgb(255, 159, 5)',
                position: 'erwr'
            }
        }

    ];


    testCases.forEach(({testData, expectedResult}) => {
        it(`Params position "${testData.position}" and type "${testData.type}"`, ()=>{


            cy.get('[class="row"] [class="form-group"] [class="select-button"]').first().click();
            cy.get(`[class="option-list"] [ng-reflect-value=${testData.position}]`).click(); // 1
            cy.get('[name="title"]').clear().type(`${testData.title}`);
            cy.get('[name="content"]').clear().type(`${testData.content}`);
            cy.get('[name="timeout"]').clear().type(`${testData.time}`);
            cy.get('[class="form-group"] button').last().click();
            cy.get(`nb-option-list [ng-reflect-value=${testData.type}]`).click();
            cy.get('nb-card-body + nb-card-footer').children().first().click();


            cy.get('nb-toastr-container nb-toast').then(pop_up => {
                expect(pop_up).to.have.css('background-color', `${expectedResult.color}`);
                cy.wrap(pop_up).find('g').last().should('have.attr', 'data-name', `${expectedResult.icon}`);
                cy.wrap(pop_up).find('span').should('include.text', `${expectedResult.title}`);
                cy.wrap(pop_up).find('.message').should('have.text', `${expectedResult.content}`);

            })
        })
    })

})
