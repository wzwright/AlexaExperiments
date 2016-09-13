'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';
var SKILL_NAME = 'Juggling Teacher';
var recipes = require('./recipes');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function () {
        var intent= this.event.request&&this.event.request.intent;
        var itemSlot = intent&&intent.slots&&intent.slots.Item;
        var itemName;
        if(intent&&intent.name=="AMAZON.HelpIntent"){
            this.attributes['speechOutput'] = 'You can ask questions such as, how do you juggle three balls, or, you can say stop... ' +
                'Now, what can I help you with?';
            this.attributes['repromptSpeech'] = 'You can say things like, how do you juggle three balls, or you can say stop...' +
                ' Now, what can I help you with?';
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech']);
        }
        else if (itemSlot && itemSlot.value) {
            
            itemName = itemSlot.value.toLowerCase();

            var cardTitle = SKILL_NAME + ' - How to juggle ' + itemName;
            var recipe = recipes[itemName];

            if (recipe) {
                this.attributes['speechOutput'] = recipe + ' What else can I help with?';
                this.attributes['repromptSpeech'] = 'Try saying repeat.';
                this.emit(':askWithCard', this.attributes['speechOutput'], this.attributes['repromptSpeech'], cardTitle, this.attributes['speechOutput']);
            } else {
                var speechOutput = 'I\'m sorry, I currently do not know ';
                var repromptSpeech = 'What else can I help with?';
                if (itemName) {
                    speechOutput += 'how to juggle ' + itemName + '. ';
                } else {
                    speechOutput += 'that. ';
                }
                speechOutput += repromptSpeech;

                this.attributes['speechOutput'] = speechOutput;
                this.attributes['repromptSpeech'] = repromptSpeech;

                this.emit(':ask', speechOutput, repromptSpeech);
            }
        }
        else{
            this.attributes['speechOutput'] = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, how do you juggle' +
            ' three balls? ... Now, what can I help you with.';
            // If the user either does not reply to the welcome message or says something that is not
            // understood, they will be prompted again with this text.
            this.attributes['repromptSpeech'] = 'For instructions on what you can say, please say help me.';
            this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
        }
    },
    'RecipeIntent': function () {
        var itemSlot = this.event.request.intent.slots.Item;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = SKILL_NAME + ' - How to juggle ' + itemName;
        var recipe = recipes[itemName];

        if (recipe) {
            this.attributes['speechOutput'] = recipe + ' What else can I help with?';
            this.attributes['repromptSpeech'] = 'Try saying repeat.';
            this.emit(':askWithCard', this.attributes['speechOutput'], this.attributes['repromptSpeech'], cardTitle, this.attributes['speechOutput']);
        } else {
            var speechOutput = 'I\'m sorry, I currently do not know ';
            var repromptSpeech = 'What else can I help with?';
            if (itemName) {
                speechOutput += 'how to juggle ' + itemName + '. ';
            } else {
                speechOutput += 'that. ';
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = 'You can ask questions such as, how do you juggle three balls, or, you can say stop... ' +
            'Now, what can I help you with?';
        this.attributes['repromptSpeech'] = 'You can say things like, how do you juggle three balls, or you can say stop...' +
            ' Now, what can I help you with?';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', 'Goodbye!');
    }
};