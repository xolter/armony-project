import 'dotenv/config'
import SibApiV3Sdk from 'sib-api-v3-sdk';

export const transactionalEmail = async(req, res) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = "";
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    sendSmtpEmail.templateId = 2;
    sendSmtpEmail.to = [{"email":"exemple@exemple.com","name":"Jane Doe"}];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function(error) {
        console.error(error);
    });
}

export const createSendingBlueContact = async(req, res) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.NODEJS_SERVER_EMAIL_API_KEY;
    let apiInstance = new SibApiV3Sdk.ContactsApi();
    let createContact = new SibApiV3Sdk.CreateContact();

    if (req.body) {
        if (req.body.email && req.body.firstName) {
            createContact.email = req.body.email;
            createContact.attributes = {"PRENOM":req.body.firstName};
            createContact.listIds = [2];
            apiInstance.createContact(createContact).then(function(data) {
                console.log('API called successfully. Returned data: ' + JSON.stringify(data));
                res.format({
                    'application/json': function() {
                        res.send({code:"200", message:"Merci! Votre inscription est confirmée."});
                    },
                    default: function () {
                        res.status(406).send('Not Acceptable')
                    }
                });
            }, function(error) {
                console.error('Error ' + error.status + ': ' + error.message + ' ' + error.response.text);
                let message;
                if (error.response.body.code === 'duplicate_parameter') {
                    message = "Cette adresse email est déjà utilisée.";
                } else {
                    message = "Votre inscription n'a pas pu être prise en compte.";
                }
                res.format({
                    'application/json': function() {
                        res.send({code:"500", message:message});
                    },
                    default: function () {
                        res.status(406).send('Not Acceptable')
                    }
                });
            });
        }
    }
}