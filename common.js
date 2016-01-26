"use strict";
(function($)
{
  // We are using a CORS proxy in these examples. Systems that do
  // not require CORS can omit the 'http://cors.io/?u=' prefix.
  var api_prefix = 'http://ftaa.research.nicta.com.au/api/v1/json';
  $.invoke = function(url, callback)
  {
    $.getJSON(api_prefix + url).done(function(data)
    {
      if (data.deprecated)
      {
        console.error(data.deprecated);
      }
      callback(data.results);
    });
  };
}(jQuery));
