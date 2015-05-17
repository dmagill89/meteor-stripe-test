Meteor.startup(function() {
    Stripe.setPublishableKey(Meteor.settings.public.pubKey);
});

Template.paymentForm.events({
    'click .subButton' : function(event) {
        var ccNum = $('#ccNum').val();
        var cvc = $('#cvc').val();
        var expMo = $('#expMo').val();
        var expYr = $('#expYr').val();

        Stripe.card.createToken({
            number: ccNum,
            cvc: cvc,
            exp_month: expMo,
            exp_year: expYr
        }, function(status, response) {
            stripeToken = response.id;
            Meteor.call('chargeCard', stripeToken);
            //Meteor.call('subscribeUser', stripeToken);
        });
    }
});