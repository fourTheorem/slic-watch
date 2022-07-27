// Import all functions from lambda1.js
const lambda = require('../../../lambda1.js');

// This includes all tests for lambda1()
describe('Test for lambda1', function () {
    // This test invokes helloFromLambdaHandler() and compare the result 
    it('Verifies successful response', async () => {
        // Invoke helloFromLambdaHandler()
        const result = await lambda.functionHandler();
        /* 
            The expected result should match the return from your Lambda function.
            e.g. 
            if you change from `const message = 'Hello from Lambda!';` to `const message = 'Hello World!';` in hello-from-lambda.js
            you should change the following line to `const expectedResult = 'Hello World!';`
        */
        const expectedResult = 'Hello from Lambda1!';
        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
