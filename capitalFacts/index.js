'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'World Capitals';

/**
 * Array containing space facts.
 */
var FACTS = [
    "The capital of the United States is Washington, D. C.",
    "The capital of the United Kingdom is London.",
    "The capital of the Bahamas is Nassau.",
    "The capital of Canada is Ottawa.",
    "The capital of Brazil is Brasilia.",
    "The capital of Mexico is Mexico City.",
    "The capital of China is Beijing.",
    "The capital of Australia is Canberra.",
    "The capital of Zimbabwe is Harare.",
    "The capital of Cameroon is Yaounde.",
    "The capital of India is New Delhi.",
    "The capital of Germany is Berlin.",
    "The capital of Spain is Madrid.",
    "The capital of Ireland is Dublin."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a world capital, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};