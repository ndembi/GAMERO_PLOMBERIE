$(document).ready(function() {
	
	function clear(){
		ved.empty().hide();
		$(".vivreIci").css("display", "none");
		$("#vivreIci").css("display", "none");
	}

	// charge ved
	var ved = $("#right .bloc.ved, .center-right .bloc.ved, #sidebar .bloc.ved");

	if (ved.length > 0) {
		if (ved.attr('id') !== undefined && ved.attr('id') !== "") {
			// TODO remettre la bonne URL
			// var urlVED = '/meteo-service/' + ved.attr('id');
			var urlVED = ved.attr('url')+ ved.attr('id');
			$.ajax({
				url : urlVED,
				beforeSend : function() {
					ved.hide();
				},
				error : function() {
					clear();
				},
				success : function(reponse) {
					if (reponse !== null &&  reponse != undefined && reponse !== '') {
						var language = ($("meta[content=en]").length === 1 ? 'en' : 'fr');
						var today_label;
						var new_window_label;

						if (language === 'en') {
							today_label = 'Now in ';
							new_window_label = 'new window';
						} else {
							today_label = 'En direct de ';
							new_window_label = 'nouvelle fenêtre';
						}

						var $meteo = $("#vivreIci");
						/* Get data from xml */
						var tempMin = Math.round(reponse.temperature_air_min) + " C&deg; min";
						var tempMax = Math.round(reponse.temperature_air_max) + " C&deg; max";
						var ville = reponse.nom_localite;
						var icon = reponse.icone;
						var lienPrev = reponse.url_meteo_localite;
						var commentaire = reponse.commentaire_meteo;

						
						/* Set data in template */
						if (tempMin !== "") {
							$meteo.find(".temperatureMin").html(tempMin);
						}
						if (tempMax !== "") {
							$meteo.find(".temperatureMax").html(tempMax);
						}
						if (ville !== "") {
							$meteo.find(".titre").html(today_label + ville);
							$meteo.find(".titre").attr("title", today_label + ville + " (" + new_window_label + ")");
						}
						if (lienPrev !== "") {
							$meteo.find(".previsions").attr("href", lienPrev);
						}

						if (icon !== "" && lienPrev !== "") {
							meteoBloc = $("#meteo");
							var meteoLink = '<a href="' + lienPrev + '" class="href_img lien_meteo" target="_blank" title="' + commentaire + '">';
							//meteoLink += '<img class="icone" src="' + icon + '" alt="' + commentaire + '" />';
							meteoLink += '<div class="weather-font icone" >' + reponse.icone + '</div>'
							meteoLink += '</a>';

							meteoBloc.append(meteoLink);
						}

						ved.show();
						$meteo.show();
						$("#vivreIci").show();
					} else {
						clear();
					}

				}
			});

		}
	}
});
