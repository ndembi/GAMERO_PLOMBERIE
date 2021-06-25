
function placement(new_responsive) {
	//Detach() sur les éléments
	$('.br_responsive').remove();
	var panier_header = $('#btn-panier').detach(),
		reserver_header = $('#btn-reserver').detach(),
		header_top = $('#header-top').detach(), 
		baseline = $('#baseline').detach(), 
		nav = $('#nav').detach(), 
		main = $('#main').detach(), 
		sidebar = $('#sidebar').detach();
	
	
	//Positionnement
	switch (new_responsive){
		case 'desktop':
			$('#header-right').append(baseline);
			$('#content .inner').prepend(nav);
			$('#content-inner br.clear:last').remove();
			$('#content-inner').append(sidebar, main,"<br class='clear br_responsive' />");
			$('#header-right-navreserver').append(reserver_header);
			$('#header-right-navpanier').append(panier_header);
			$('#nav>ul').show();
			break;
		case 'tablette':
			$('#header-right').append(baseline);
			$('#content .inner').prepend(nav);
			$('#content-inner br.clear:last').last("br.clear").remove();
			$('#content-inner').append(main, sidebar,"<br class='clear br_responsive' />");
			$('#header-right-navpanier').append(panier_header);
			$('#header-right-navreserver').append(reserver_header);
			$('#nav>ul').show();		
			break;
		case 'mobile':
			$('#header .inner').append(baseline);
			$('#header .inner').prepend(nav);
			$('#content-inner br.clear:last').last("br.clear").remove();
			$('#content-inner').append(main, sidebar,"<br class='clear br_responsive' />");
			$('#header').prepend(panier_header);
			$('#header').prepend(reserver_header);
			$('#nav>ul').hide();
			break;
	}
}

function initHtml() {
}
