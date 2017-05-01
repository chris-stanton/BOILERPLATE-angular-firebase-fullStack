var app = angular.module("sampleApp", ["firebase"]);
//controller code
app.controller("SampleCtrl", function($firebaseAuth, $http) {

  var self = this;
//global variable must have
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
    console.log(firebaseUser);

//This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
//displays firebase user's credentials
      self.displayName = firebaseUser.user.displayName;
      self.photo = firebaseUser.user.photoURL;
      self.email = firebaseUser.user.email;
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };//end of login()

//This code runs whenever the user changes authentication states
//e.g. whevenever the user logs in or logs out
//this is where we put most of our logic so that we don't duplicate
//the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
//firebaseUser will be null if not logged in
    if(firebaseUser) {
//This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;
        });
      });//end of firebaseUser()
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }
  });//end of auth.$onAuthStateChanged()

//This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };//end of logout function

});//end of app.controller()
