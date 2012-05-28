var controllers, tokens, arrows;
var aCounter = 0;
var rCounter = 0;
var vCounter = 0;
var dragSrcEl = null;
var drawerOpen = false;
var drawerI; 

$(document).ready(function() {
	
	document.getElementById( "ruledrawer" ).style.height = window.innerHeight + "px";
	document.getElementById( "ruledrawerout" ).style.height = window.innerHeight + "px";	
	
	// template picking bits    
	$('#template-blank').click(function () {
		document.getElementById("startspace").style.visibility = "visible";
        document.getElementById("startspace").innerHTML = "<br><br><h1><a onClick='templateGo(0)'>> Blank Template</a></h1><br><br>";
        document.getElementById("template-blank").innerHTML = "<h2>[selected] New.</h2>"; 
        document.getElementById("template-gta").innerHTML = "<h2>GTA.</h2>";
        document.getElementById("template-pacman").innerHTML = "<h2>Pacman.</h2>";
    });    
    $('#template-gta').click(function () {
        document.getElementById("startspace").style.visibility = "visible";
        document.getElementById("startspace").innerHTML = "<br><br><h1><a onClick='templateGo(2)'>> GTA</a></h1><br><br>";    
        document.getElementById("template-gta").innerHTML = "<h2>[selected] GTA.</h2>";    
        document.getElementById("template-blank").innerHTML = "<h2>New.</h2>";
        document.getElementById("template-pacman").innerHTML = "<h2>Pacman.</h2>";        
    });    
    $('#template-pacman').click(function () {
        document.getElementById("startspace").style.visibility = "visible";
        document.getElementById("startspace").innerHTML = "<br><br><h1><a onClick='templateGo(1)'>> Pacman</a></h1><br><br>";        
        document.getElementById("template-pacman").innerHTML = "<h2>[selected] Pacman.</h2>";
        document.getElementById("template-blank").innerHTML = "<h2>New.</h2>";
        document.getElementById("template-gta").innerHTML = "<h2>GTA.</h2>";
    });    
    document.getElementById( "ruledrawer" ).addEventListener('dragleave', handleDragLeaveSpace, false);
    
    drawerI = document.getElementById( "ruledrawer" ).offsetWidth;
        
});

function newSuperEgoServer() {
	document.getElementById( "startspace" ).style.visibility = "hidden";
	document.getElementById( "templatespace" ).style.visibility = "visible";
}

// n: 0 = blank, 1 = pacman, 2 = gta
function templateGo( n ) {
	
	document.getElementById( "templatespace" ).style.visibility = "hidden";

	if( n == 1 ) {
		document.getElementById( "ruledrawerout" ).style.visibility = "visible";
		controllers = 4;
		arrows = 2;
		tokens = 6;
		document.getElementById( "startspace" ).innerHTML = "<br><br><h1 class='dropspace' id='start0'><a onClick='plusOne(0)'>></a> four players.</h1> <h3 id='actionspace'></h3> <h1 class='dropspace' id='start1'><a onClick='plusOne(1)'>></a> two functions. </h1> <h3 id='rulespace'></h3> <h1 class='dropspace' id='start2'><a onClick='plusOne(2)'>></a> six tokens.</h1> <h3 id='viewspace'></h3> <br><br>";
	}
	else if( n == 2 ) {
		document.getElementById( "ruledrawerout" ).style.visibility = "visible";
		controllers = 1;
		arrows = 1;
		tokens = 2;
		document.getElementById( "startspace" ).innerHTML = "<br><br><h1 class='dropspace' id='start0'><a onClick='plusOne(0)'>></a> one player. </h1> <h3 id='actionspace'></h3> <h1 class='dropspace' id='start1'><a onClick='plusOne(1)'>></a> one function. </h1> <h3 id='rulespace'></h3> <h1 class='dropspace' id='start2'><a onClick='plusOne(2)'>></a> two tokens.</h1> <h3 id='viewspace'></h3> <br><br>";		
	}
	else {
		// open ruledrawer
		openDrawer();
		controllers = 1;
		arrows = 1;
		tokens = 2;
		document.getElementById( "startspace" ).innerHTML = "<br><br><h1 class='dropspace' id='start0'><a onClick='plusOne(0)'>></a> one player. </h1> <h3 id='actionspace'></h3> <h1 class='dropspace' id='start1'><a onClick='plusOne(1)'>></a> one function. </h1> <h3 id='rulespace'></h3> <h1 class='dropspace' id='start2'><a onClick='plusOne(2)'>></a> two tokens.</h1> <h3 id='viewspace'></h3> <br><br>";
		document.getElementById( "ruledrawerout" ).style.visibility = "visible";		
	}
	
	document.getElementById( "start0" ).addEventListener('dragenter', handleDragEnter, false);
	document.getElementById( "start0" ).addEventListener('dragover', handleDragOver, false);
	document.getElementById( "start0" ).addEventListener('dragleave', handleDragLeave, false);
	document.getElementById( "start0" ).addEventListener('drop', handleDrop, false);
	
	document.getElementById( "start1" ).addEventListener('dragenter', handleDragEnter, false);
	document.getElementById( "start1" ).addEventListener('dragover', handleDragOver, false);
	document.getElementById( "start1" ).addEventListener('dragleave', handleDragLeave, false);
	document.getElementById( "start1" ).addEventListener('drop', handleDrop, false);
	
	document.getElementById( "start2" ).addEventListener('dragenter', handleDragEnter, false);
	document.getElementById( "start2" ).addEventListener('dragover', handleDragOver, false);
	document.getElementById( "start2" ).addEventListener('dragleave', handleDragLeave, false);
	document.getElementById( "start2" ).addEventListener('drop', handleDrop, false);
	
}

function plusOne( n ) {
	var j, jOut;
	if ( n == 0 ) {
		controllers++;
		j = "<a onClick='plusOne(0)'>></a> " + controllers + " players.";
	}
	else if( n == 1 ) {
		arrows++;
		j = arrows.toString();
		j = "<a onClick='plusOne(1)'>></a> " + arrows + " functions.";
	}
	else if( n == 2 ) {
		tokens++;
		j = arrows.toString();
		j = "<a onClick='plusOne(2)'>></a> " + tokens + " tokens.";
	}
	document.getElementById( "start" + n ).innerHTML = j; 
}

function shutDrawer() {
	//ruledrawerout.style.zIndex = -1;
	if( drawerOpen ) {
		drawerOpen = false;
		document.getElementById( "ruledrawerout" ).style.visibility = "visible";
		$("#ruledrawer").animate({"left":"-=" + drawerI + "px"}, "fast");
		$("#startspace").animate({"left":"-=" + ( drawerI - 25 ) + "px"}, "fast");
	//	document.getElementById( "startspace" ).style.left = "";
		document.getElementById( "ruledrawer" ).style.visibility = "hidden";	
	}
	//ruledrawerout.style.zIndex = 0;
}

function openDrawer() {
	//ruledrawerout.style.zIndex = -1;
	if( !drawerOpen ) {
		drawerOpen = true;
		var i = document.getElementById( "ruledrawer" ).offsetWidth;
		document.getElementById( "ruledrawer" ).style.left = "-" + i + "px";
		document.getElementById( "ruledrawer" ).style.visibility = "visible";
	    document.getElementById( "ruledrawerout" ).style.visibility = "hidden";    
		$("#ruledrawer").animate({"left":"+=" + drawerI + "px"}, "fast");
		$("#startspace").animate({"left":"+=" + ( drawerI - 25 ) + "px"}, "fast");
    }
    //ruledrawerout.style.zIndex = 0;
//    document.getElementById( "startspace" ).style.left = i + "px";
}

function saveForm() {
	// get info? arvName + arvType
	// make id-able square on the right
	var n = document.getElementById( 'arvName' ).value;
//	var t = document.getElementById( 'arvType' ).value;
	var dndsetup = "<div class='drawersquare' draggable='true' id='";
//	if( t == "action" ) {
//		aCounter++;
//		$('#actionsquares').append( dndsetup + "a" + aCounter + "'><strong>&nbsp;[" + aCounter + "] </strong>" + n + "<br /></div><br />" );
//		document.getElementById( "a" + aCounter ).addEventListener('dragstart', handleDragStart, false);
//		document.getElementById( "a" + aCounter ).addEventListener('dragend', handleDragEnd, false);

//	}
//	else if( t == "rule" ) {
		rCounter++;
		$('#rulesquares').append( dndsetup + "r" + rCounter + "'><strong>&nbsp;[" + rCounter + "] </strong>" + n + "<br /></div><br />" );
		document.getElementById( "r" + rCounter ).addEventListener('dragstart', handleDragStart, false);
		document.getElementById( "r" + rCounter ).addEventListener('dragend', handleDragEnd, false);

//	}
//	else if( t == "view" ) {
//		vCounter++;
//		$('#viewsquares').append( dndsetup + "v" + vCounter + "'><strong>&nbsp;[" + vCounter + "] </strong>" + n + "<br /></div><br />" );
//		document.getElementById( "v" + vCounter ).addEventListener('dragstart', handleDragStart, false);
//		document.getElementById( "v" + vCounter ).addEventListener('dragend', handleDragEnd, false);

//	}
}



// code for dragging
function handleDragStart(e) {
  console.log( "dragstart " + this.id );
  
  dragSrcEl = this;
//  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.id);
}

function handleDragOver(e) {
  console.log( "dragover " + this.id );
   
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
//  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  console.log( "dragenter " + this.id );
  this.classList.add('over');
}

function handleDragLeave(e) {
	console.log( "dragleave " + this.id );
  	this.classList.remove('over');  // this / e.target is previous target element.
}
function handleDragLeaveSpace(e) {
	shutDrawer();
}

function handleDrop(e) {
	console.log( "drop " + this.id );
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  if( this.id == "start0" ) {
  	$( '#actionspace' ).append( "&nbsp;[ " + dragSrcEl.id + " ]" );
  }
  else if( this.id == "start1" ) {
  	$( '#rulespace' ).append( "&nbsp;[ " + dragSrcEl.id + " ]" );	
  }
  else if( this.id == "start2" ) {
  	$( '#viewspace' ).append( "&nbsp;[ " + dragSrcEl.id + " ]" );
  }

  return false;
}

function handleDragEnd(e) {
	console.log( "dragend " + this.id );
  // this/e.target is the source node.

  document.getElementById( "start0" ).classList.remove('over');
  document.getElementById( "start1" ).classList.remove('over');
  document.getElementById( "start2" ).classList.remove('over');
}
