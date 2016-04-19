"use strict";
(function($)
{
  var api_prefix = 'https://ftaportal.dfat.gov.au/api/v1/json';
  $.invoke = function(url, callback, error)
  {
    $.getJSON(api_prefix + url).done(function(data)
    {
      if (data.deprecated)
      {
        console.error(data.deprecated);
      }
      callback(data.results);
    }).error(error || function(){});
  };
}(jQuery));
