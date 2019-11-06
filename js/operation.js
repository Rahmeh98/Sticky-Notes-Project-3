var tabLinks = new Array();
var contentDivs = new Array();


  var showTab = function () {
    var tabListItems = document.getElementById('tabs').childNodes;
    for ( var i = 0; i < tabListItems.length; i++ ) {
      if ( tabListItems[i].nodeName == "LI" ) {
        var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
        var id = getHash( tabLink.getAttribute('href') );
        tabLinks[id] = tabLink;
        contentDivs[id] = document.getElementById( id );
      }
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;

    for ( var id in tabLinks ) {
      tabLinks[id].onclick = showTab;
      tabLinks[id].onfocus = function() { this.blur() };
      if ( i == 0 ) tabLinks[id].className = 'selected';
      i++;
    }

    // Hide all content divs except the first
    var i = 0;

    for ( var id in contentDivs ) {
      if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
      i++;
    }
    var selectedId = getHash( this.getAttribute('href') );

    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for ( var id in contentDivs ) {
      if ( id == selectedId ) {
        tabLinks[id].className = 'selected';
        contentDivs[id].className = 'tabContent';
      } else {
        tabLinks[id].className = '';
        contentDivs[id].className = 'tabContent hide';
      }
    }

    // Stop the browser following the link
    return false;
  }
  function getFirstChildWithTagName( element, tagName ) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
      if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
  }
  function getHash( url ) {
    var hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
  }

  var i=1;
  function addBoard(){

    var para = document.createElement("li");
    var link = document.createElement("a");
    link.href="#usage"+i;
    link.addEventListener('click', showTab);
    var node = document.createTextNode("Board");
    link.appendChild(node);
    para.appendChild(link);
    var element = document.getElementById("tabs");
    element.appendChild(para);
    
    i=i+1;
  } 


  /* Start Content */

  (function () {
    'use strict';
    
    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl;
    
    onDragStart = function (ev) {
      var boundingClientRect;
      if (ev.target.className.indexOf('textareas') === -1) {
        return;
      }
      
      draggedEl = this;
      
      boundingClientRect = draggedEl.getBoundingClientRect();
      
      grabPointY = boundingClientRect.top - ev.clientY;
      grabPointX = boundingClientRect.left - ev.clientX;
    };
    
    onDrag = function (ev) {
      if (!draggedEl) {
        return;
      }
      
      var posX = ev.clientX + grabPointX,
          posY = ev.clientY + grabPointY;
      
      if (posX < 0) {
        posX = 0;
      }
      
      if (posY < 0) {
        posY = 0;
      }
      
      draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
    };
    
    onDragEnd = function () { 
      draggedEl = null;
      grabPointX = null;
      grabPointY = null;
    };
    
    createNote = function () {
      var stickerEl = document.createElement('div'),
          footerEl = document.createElement('div'),
          textareaEl = document.createElement('textarea');
      
      var transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";
      
      stickerEl.style.transform = transformCSSValue; 
      
      footerEl.classList.add('footer');
      textareaEl.classList.add('textareas');
      stickerEl.classList.add('sticker');
      
      stickerEl.appendChild(footerEl);
      stickerEl.appendChild(textareaEl); 
      
      stickerEl.addEventListener('mousedown', onDragStart, false);
      
      document.body.appendChild(stickerEl);
    };
    
    createNote(); 
    
    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click', createNote, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
  })();













  /* End Content */
 
  
