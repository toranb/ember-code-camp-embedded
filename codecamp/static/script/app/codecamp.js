CodeCamp = Ember.Application.create();

CodeCamp.Session = DS.Model.extend({
  name: DS.attr('string'),
  room: DS.attr('string'),
  desc: DS.attr('string'),
  speakers: DS.hasMany('speaker'),
  ratings: DS.hasMany('rating'),
  tags: DS.hasMany('tag')
});

CodeCamp.Speaker = DS.Model.extend({
  name: DS.attr('string'),
  session: DS.belongsTo('session')
});

CodeCamp.Rating = DS.Model.extend({
  score: DS.attr('number'),
  feedback: DS.attr('string'),
  session: DS.belongsTo('session')
});

CodeCamp.Tag = DS.Model.extend({
  description: DS.attr('string')
});

CodeCamp.SessionController = Ember.ObjectController.extend({
    actions: {
      addRating: function(event) {
        var score = this.get('score');
        var feedback = this.get('feedback');
        if (score === undefined || feedback === undefined || score.trim() === "" || feedback.trim() === "") {
          return;
        }
        var rating = { score: score, feedback: feedback, session: event};
        this.store.createRecord('rating', rating).save();
        this.set('score', '');
        this.set('feedback', '');
      }
    }
});

CodeCamp.Router.map(function() {
  this.route("sessions", { path : "/" });
  this.route("session", { path : "/session/:session_id" });
  this.route("speaker", { path : "/speaker/:speaker_id" });
});

CodeCamp.SessionsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('session');
  }
});

CodeCamp.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    namespace: 'codecamp'
});
