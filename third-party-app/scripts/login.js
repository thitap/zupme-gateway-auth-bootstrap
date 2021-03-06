(function () {
  'use strict';

  function exchangeTokens(authData, saveAccessToken) {
    var data = JSON.stringify({uid: authData.uid, auth_code: authData.authCode}),
        request = $.post('http://localhost:8881/create_token', data);

    request.done(function (result) {
      saveAccessToken(result['access_token']);
      onLoginSuccess();
    });

    request.fail(function () {
      alert('Unable to complete login through backend server.');
    });
  }

  function onLoginSuccess() {
    window.location = 'index.html';
  }

  var implicitFlow = {
    callbackUrl: location.origin + 'consolidate-login.html',
    developerApplicationKey: 'a1sfdf5551de',
    scopes: ['read_bank_info', 'read_personal_data'],
    onSuccess: onLoginSuccess
  };

  var completeFlow = {
    callbackUrl: location.origin + '/consolidate-login.html',
    developerApplicationKey: 'a1sfdf5551de',
    scopes: ['read_bank_info', 'read_personal_data'],
    exchangeTokens: exchangeTokens
  };

  $('#company-login').click(function () {
    company.oauth.login(implicitFlow);
    //company.oauth.login(completeFlow);
  });

}());