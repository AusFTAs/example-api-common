"use strict";
(function($)
{
  var api_prefix = localStorage && localStorage.ftaPortalAPIEndpoint || 'https://api.ftaportal.dfat.gov.au/api/v2/json';
  
  // main api calling method
  $.invoke = function(url, callback, error)
  {
    var requestURL = api_prefix + url;
    $.getJSON(requestURL).done(function(data)
    {
      if (data.deprecated)
      {
        console.error(data.deprecated);
      }
      callback(data.results);
    }).error(error || function(){});
  };
  
  // common data items
  var hierarchy = null;
  var agreements = null;
  var startCallback = null;
  
  $.startExample = function(callback)
  {
    startCallback = callback;
    // wait for page to load
    $(document).ready(function()
    {
      // preload commonly used data items
      $.invoke('/version', function(dataVersion)
      {
        // Optional experimental feature.
        // Put data version before API access.
        // This will increase caching TTL when versions match or fail miserably.
        api_prefix = api_prefix.replace(/.au\/api/, '.au/' + dataVersion + '/api')
        $.invoke('/tariffs/agreements', function(agreements_)
        {
          agreements = agreements_;
          $.invoke('/tariffs/hierarchy', function(hierarchy_)
          {
            hierarchy = hierarchy_;
            (startCallback || function(){})(hierarchy, agreements);
          });
        });
      });
    });
  };
  
  // get common data items  
  $.getHSHierarchy = function(callback)
  {
    (callback || function(){})(hierarchy);
  };
  
  $.getAgreements = function(callback)
  {
    (callback || function(){})(agreements);
  };

  // convert extracted subheading data into intended hierarchy tree
  $.produceHierarchyTree = function(headingData)
  {
    var tree = {};
        
    Object.keys(headingData).forEach(function(key)
    {
      tree[key] = tree[key] || {};
      tree[key].hscode = key;
      Object.keys(headingData[key])
            .forEach(function(field)
      {
        tree[key][field] = headingData[key][field];
      });
    });
    Object.keys(tree).sort().reverse().forEach(function(key)
    {
      var parent = key;
      while (parent.length > 4)
      {
        parent = parent.substr(0, parent.length -1);
        if (parent in tree)
        {
          tree[parent].children = tree[parent].children || {};
          tree[parent].children[key] = tree[key];
          tree[parent].children[key].parent = tree[parent];
          delete tree[key];
          break;
        }
      }
    });
    return tree;
  };

  // pretty print hs code
  $.beautifyHSCode = function (code, showLabel)
  {
    var hscode = code.replace(/[^0-9]/g, '');
    switch (hscode.length)
    {
    case 0:
      return (showLabel ? 'Section ' : '') + code;
    case 1:
    case 2:
      return (showLabel ? 'Chapter ' : '') + hscode;
    case 3:
    case 4:
      return (showLabel ? 'Heading ' : '') + hscode;
    case 5:
    case 6:
      return (showLabel ? 'Subheading ' : '') + hscode.substr(0, 4) + '.' + hscode.substr(4);
    default:
      return (showLabel ? 'Item ' : '') + hscode.substr(0, 4) + '.' + hscode.substr(4, 2) + '.' + hscode.substr(6);
    }
  };
  
  // decode bit encoded lists
  $.decodeKeywords = function (target, encoded)
  {
    var output = [];
    for (var x = 0; (1 << x) <= encoded; x++)
    {
      if (((1 << x) & encoded) !== 0)
      {
        output.push(target[x]);
      }
    }
    return output;
  }

}(jQuery));
