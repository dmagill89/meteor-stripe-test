if (Meteor.isClient) {

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
}

if (Meteor.isServer) {
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
      var Stripe = StripeAPI('sk_test_SaH2T7BO5EklaOPjqN1kwTL6');
      Stripe.customers.create({
        source: stripeToken,
        plan: 'paugmeSub',
        email: 'dmagill89@gmail.com'
      });
    }
  });
}
