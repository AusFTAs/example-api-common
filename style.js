/**
 * This script contains elements for the common look and feel aspects
 * of the example.
 */

// --------------------------------------------------

// add some helper methods to help reduce d3 verbosity

['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'li', 'pre', 'td', 'th', 'a', 'option', 'button']
.forEach(function (type)
{
  d3.selection.prototype[type] = function (contents)
  {
    return this.append(type)
      .html(contents || '');
  };
});

['hr', 'br', 'table', 'tr', 'input', 'canvas', 'ul', 'ol']
.forEach(function (type)
{
  d3.selection.prototype[type] = function ()
  {
    return this.append(type);
  };
});

d3.selection.prototype.show = function ()
{
  return this.style('display', '');
};

d3.selection.prototype.hide = function ()
{
  return this.style('display', 'none');
};

d3.selection.prototype.value = d3.selection.prototype.val = function (value)
{
  return value !== undefined ? this.property('value', value) : this.property('value');
};

['click', 'keydown']
.forEach(function (type)
{
  d3.selection.prototype[type] = function (handler)
  {
    return this.on(type, handler);
  };
});

window.$ = d3.select; // TODO: remove after

// --------------------------------------------------

d3.selection.prototype.showTree = function (nodes, renderCallback)
{
  function showTreeNode(child)
  {
    let element = document.createElement('div');
    let output = d3.select(element);

    let header = output.div()
      .classed('tree-node-head', true);

    renderCallback(header, child);

    if (child.children && child.children.length > 0)
    {
      let body = output.div()
        .classed('tree-node-body hidden', true);
      body.div()
        .classed('tree-node', true)
        .selectAll()
        .data(child.children)
        .enter()
        .append(showTreeNode);

      header.style('cursor', 'pointer');
      header.classed('expand', true);
      header.on('click', () =>
      {
        let expanded = body.classed('hidden');
        body.classed('hidden', !expanded)
        header.classed('expand', !expanded);
        header.classed('contract', expanded);
      });
    }
    return element;
  }

  this.html('')
    .div()
    .classed('tree-node', true)
    .selectAll()
    .data(nodes)
    .enter()
    .append(showTreeNode);
};
// --------------------------------------------------

window.addEventListener('load', () =>
{
  let header = d3.select('#header');

  header.html(`<div class="header-strap"><div class="header-content">
                 <img src="//ausftas.github.io/example-api-common/images/index.png" alt="australian government, australia: open for business"><div class="brand">Free Trade Agreement Portal</div></div></div>
               <div class="header-divider-strap"></div>`);

  let example = window.location.toString()
    .match(/[/](example-api-.*)[/]/) &&
    'https://github.com/AusFTAs/' + window.location.toString()
    .match(/[/](example-api-.*)[/]/)[1];

  example && header
    .div()
    .classed("ribbon left red", true)
    .a('Clone me on GitHub')
    .attr('href', example);

  example && header
    .div()
    .classed("ribbon right red", true)
    .a('Clone me on GitHub')
    .attr('href', example);

  let footer = d3.select('#footer');

  footer.br();

  footer = footer.div()
    .classed('footer-strap', true)
    .div()
    .classed('footer-content', true)
    .ul()
    .classed('footer-links', true);

  if (example)
  {
    footer.li()
      .a('Clone me on github')
      .attr('href', example);
  }

  footer.li()
    .a('API')
    .attr('href', 'http://ausftas.github.io/api/');
  footer.li()
    .a('DFAT FTA Portal')
    .attr('href', 'https://ftaportal.dfat.gov.au');
  footer.li()
    .a('DFAT Free Trade Agreements')
    .attr('href', 'http://dfat.gov.au/trade/agreements/Pages/trade-agreements.aspx');
  footer.li()
    .a('NICTA')
    .attr('href', 'https://www.nicta.com.au/');

});
