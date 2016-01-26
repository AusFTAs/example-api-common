/**
 * This script contains elements for the common look and feel aspects
 * of the example.
 */

$(document).ready(function(){
  $('#header').html('<div class="header-strap"><div class="header-content">' +
                    '<img src="../example-api-common/images/index.png" alt="australian government, australia: open for business"><div class="brand">Free Trade Agreement Portal</div></div></div>' + 
                    '<div class="header-divider-strap"></div>');

  var example = 'https://github.com/AusFTAs/' + window.location.toString().match(/[/](example-api-.*)[/]/)[1];

  $('#header').append('<div class="ribbon left red"><a href="' + example + '">Clone me on GitHub</a></div>');
  $('#header').append('<div class="ribbon right red"><a href="' + example + '">Clone me on GitHub</a></div>');

  $('#footer').html('<br /><div class="footer-strap">' +
  '<div class="footer-content">' +
    '<ul class="footer-links">' +
      '<li><a href="' + example + '">Clone example on Github</a> | </li>' +
      '<li><a href="http://ausftas.github.io/api/">API</a> | </li>' +
      '<li><a href="https://ftaportal.dfat.gov.au">DFAT FTA Portal</a> | </li>' +
      '<li><a href="http://dfat.gov.au/trade/agreements/Pages/trade-agreements.aspx">DFAT Free Trade Agreements</a> | </li>' +
      '<li><a href="https://www.nicta.com.au/">NICTA</a></li>' +
    '</ul>' +
  '</div>' +
  '</div>');
});
