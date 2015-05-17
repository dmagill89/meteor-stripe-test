Meteor.startup(function () {
});

Meteor.methods({
    'chargeCard': function(stripeToken) {
        var Stripe = StripeAPI(Meteor.settings.priKey);
        Stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            source: stripeToken
        },function(err, charge){
            console.log(err);
        });
    },

    'subscribeUser': function(stripeToken) {
        var Stripe = StripeAPI(Meteor.settings.priKey);
        Stripe.customers.create({
            source: stripeToken,
            plan: 'paugmeSub',
            email: 'dmagill89@gmail.com'
        });
    }
});