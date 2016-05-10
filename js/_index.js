// def.VARIABLES
var direccion = 'https://www.barcelonasc.com.ec/apps/bsc_news/';
var rutaimagen = 'https://www.barcelonasc.com.ec/';

var arrayNoticias;

var arrayEquipos = new Array();
var arrayPuntajesPJ = new Array();
var arrayPuntajesGD = new Array();
var arrayPuntajesPTS = new Array();

/////////////////////////////////////////////////////////////
//CARGO DE BASE
/////////////////////////////////////////////////////////////
var partidoActual = 8;


getMobileOperatingSystem();

// INICIALIZO
$( document ).ready(function() {

	getNoticias();
  getVideos();

  

  // CARGO CALENDARIO //
  myApp.onPageInit('calendario', function (page) {
    getPartidoProximo(partidoActual);

    
      var mySwiperSlow = myApp.swiper('.swiper-2', {
        pagination:'.swiper-slow .swiper-pagination',
        speed: 300
      });
    
  })


  // CARGO PLANTILLA //
  myApp.onPageInit('plantilla', function (page) {
    cargoUnidadEquipo();
  })

  // CARGO ESTADISTICAS //
  myApp.onPageInit('posiciones', function (page) {
    cargoCampeonato();
  })

  myApp.onPageInit('descargas', function (page) {

  })

  

}); // document ready




/* detect */
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
    {
      //return 'iOS';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "dist/css/framework7.ios.min.css"
      });
      css_link.appendTo('head');

      var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "css/css.ios.css"
      });
      css_cssespecifico.appendTo('head');

    }
    else if( userAgent.match( /Android/i ) )
    {

      //return 'Android';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "dist/css/framework7.material.min.css"
      });
      css_link.appendTo('head');

      var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "css/css.material.css"
      });
      css_cssespecifico.appendTo('head');
      
    }
    else
    {
      //return 'unknown';
      var css_link = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        //href: "dist/css/framework7.material.min.css"
        href: "dist/css/framework7.ios.min.css"
      });
      css_link.appendTo('head');


      /*var css_cssespecifico = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        //href: "css/css.material.css"
        href: "css/css.ios.css"
      });
      css_cssespecifico.appendTo('head');*/
      
    }
}
/*detect*/


function getNoticias() { 
  var n=0;  
    $.ajax({
      url: direccion+'actions/getInfo_1.php',
      type: "GET",
      cache: true,
      dataType: "json",
      data: {limit: 100, order: 'desc'}, 
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
        	
        	arrayNoticias = response;
		}	            
      },
      complete : function(){
      		cargoNoticias_Home();
      },
      error : function(error){     
          //alert(error);
      }
    });     
} //getNoticias

function cargoNoticias_Home(){
	
	var loading = false;
	var lastIndex = 7;
	var maxItems = 100;
	var itemsPerLoad = 7;

	for (var i = 0; i <= 7; i++) {
		codigo = arrayNoticias[i].id;
		contenido = arrayNoticias[i].contenido; 
		anio = arrayNoticias[i].year;
		mes =arrayNoticias[i].month;
		dia = arrayNoticias[i].day;
		num_news = arrayNoticias[i].num_news;
		categoria = arrayNoticias[i].category;
		picture_quantity = arrayNoticias[i].picture_quantity;
		        
		//console.log(codigo + '' + contenido + '' + anio + '' + mes + '' + dia + '' + num_news + '' + categoria + '' + picture_quantity);
				
		var titular = arrayNoticias[i].titulo;
	    titular = titular.substring(0, 40);

	    var extracto = arrayNoticias[i].contenido;
	    extracto = extracto.substring(0, 80);

	    $('#noticiasHome .list-block ul').append('<li> <a href="noticia.html" onclick="getNoticiaPublicada('+codigo+')"> <div class="item-content"> <div class="item-media"> <img src="'+rutaimagen+'img/noticias/'+anio+'/'+mes+'/'+anio+'_'+mes+'_'+dia+'_'+num_news+'_'+picture_quantity+'.jpg" /> </div> <div class="item-inner"> <div class="item-title"> '+titular+' </div> <div class="item-after"> '+dia+'-'+mes+'-'+anio+'</div> </div> </div> </a> </li> ');
  }

          
	$('.infinite-scroll').on('infinite', function () {
		if (loading) return;
		loading = true;
		setTimeout(function () {
			loading = false;
			 
			if (lastIndex >= maxItems) {
			    myApp.detachInfiniteScroll($$('.infinite-scroll'));
			    $$('.infinite-scroll-preloader').remove();
			    return;
			}
			 
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {

			    codigo = arrayNoticias[i].id;
		        contenido = arrayNoticias[i].contenido; 
		        anio = arrayNoticias[i].year;
		        mes =arrayNoticias[i].month;
		        dia = arrayNoticias[i].day;
		        num_news = arrayNoticias[i].num_news;
		        categoria = arrayNoticias[i].category;
		        picture_quantity = arrayNoticias[i].picture_quantity;
		        
		        //console.log(codigo + '' + contenido + '' + anio + '' + mes + '' + dia + '' + num_news + '' + categoria + '' + picture_quantity);
				
				var titular = arrayNoticias[i].titulo;
		        titular = titular.substring(0, 40);

		        var extracto = arrayNoticias[i].contenido;
		        extracto = extracto.substring(0, 80);

		        //$('#noticiasHome .list-block ul').append('<li class="item-content"> <div class="item-inner"> <a href="#noticia?noticia='+codigo+'" onclick="getNoticiaPublicada('+codigo+')" data-transition="slide"> <div class="col-sm-6 col-xs-6 col-md-6"> <div class="mini col-md-12 col-sm-12 col-xs-12 text-left">'+dia+'-'+mes+'-'+anio+' </div> <div class="col-sm-10 col-xs-10 col-md-10"> <div class="titulo_noticia">'+titular+' </div></div> </div> <div class="col-sm-6 col-xs-6 col-md-6"> <div class="pictureImage square-thumb" rel="shadowbox" style="background-image:url('+rutaimagen+'img/noticias/'+anio+'/'+mes+'/'+anio+'_'+mes+'_'+dia+'_'+num_news+'_'+picture_quantity+'.jpg)"></div> </div> </a> </div> </li>');
		         
			  	html += '<li> <a href="noticia.html" onclick="getNoticiaPublicada('+codigo+')"> <div class="item-content"> <div class="item-media"> <img src="'+rutaimagen+'img/noticias/'+anio+'/'+mes+'/'+anio+'_'+mes+'_'+dia+'_'+num_news+'_'+picture_quantity+'.jpg" /> </div> <div class="item-inner"> <div class="item-title"> '+titular+' </div> <div class="item-after"> '+dia+'-'+mes+'-'+anio+'</div> </div> </div> </a> </li>';


			}
			 
			$('#noticiasHome .list-block ul').append(html);
			 
			lastIndex = $$('#noticiasHome .list-block li').length;
		}, 1000);
	});    
} //cargoNoticias_Home





/*
	------------------------------------------------------------------------------------
	------------------------------------------------------------------------------------
*/


function getVideos() { 

    $.ajax({
      url: direccion+'actions/getVideos.php',
      type: "GET",
      cache: true,
      dataType: "json",
      success: function(response){ 
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            video_embeded = value.link;
            console.log(video_embeded);
            $('#videosSlider .swiper-wrapper').append('<div class="swiper-slide"><span><iframe id="bsc" width="100%" height="150" src="https://www.youtube.com/embed/'+video_embeded+'?rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></span></div>');
            /*if(_dispositivo == 2){
            	$('.sliderVideo').append('<div style="text-align:center"><object width="100%" height="150"><param name="movie" value="https://www.youtube.com/v/'+video_embeded+'&hl=en_US&feature=player_embedded&version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed src="https://www.youtube.com/v/'+video_embeded+'?suggestedQuality=medium&hl=en_US&feature=player_embedded&version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="100%" height="150"></embed></object></div>');
           	}else{
            	$('.sliderVideo').append('<div><iframe id="bsc" width="100%" height="150" src="https://www.youtube.com/embed/'+video_embeded+'?rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></div>'); 
           	}*/
          });
        }
      },
      complete: function(){
      	var mySwiper1 = myApp.swiper('.swiper-1', {
    		  pagination:'.swiper-1 .swiper-pagination',
    		  spaceBetween: 50
    		});
      },
      error : function(error){     
        //alert(error);
      }
    });     
}

function getNoticiaPublicada(argument) {  
    
    var datos ={
    'noti': argument
    }
    $.ajax({
      url: direccion+'actions/getNoticia.php',
      type: "GET",
      dataType: "json",
      data: datos,
      success: function(response){
      
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            codigo = value.id;
            titular = value.titulo; 
            contenido = value.contenido; 
            anio = value.year;
            mes =value.month;
            dia = value.day;
            categoria = value.category;
            num_news = value.num_news;
            picture_quantity = value.picture_quantity;
            $('.infoNoticia').append('<div class="row"> <div class="noticia col-md-12 col-sm-12 col-xs-12"> <img src="'+rutaimagen+'img/noticias/'+anio+'/'+mes+'/'+anio+'_'+mes+'_'+dia+'_'+num_news+'_'+picture_quantity+'.jpg" /> <div class="fecha col-md-12 col-sm-12 col-xs-12 text-left"> <span>'+dia+'-'+mes+'-'+anio+' | '+ categoria +'</span> </div> <div class="titulo_de_noticia col-md-12 col-sm-12 col-xs-12"> <h2>'+titular+'</h2> </div> </div> <div class="info_de_noticia col-md-12 col-sm-12 col-xs-12"> <p>'+ contenido +'</p> </div> </div>');
            //$('.noticiaPublicada').html('<div class="noticia"><div class="imgNoticia" style="background-image:url('+rutaimagen+'img/noticias/'+anio+'/'+mes+'/'+anio+'_'+mes+'_'+dia+'_'+num_news+'_'+picture_quantity+'.jpg)"></div><div class="titulo_de_noticia"><h2>'+titular+'</h2></div><hr/><div class="info_de_noticia">'+ contenido +'</div></div>');
          });
        }              
      },
      error : function(error){     
          console.log(error);
      }
    });     
}

function getPartidoProximo(argument){   
    partidoActual = argument;
    
    var datos ={
    'fecha': partidoActual
    }
    $.ajax({
      url: direccion+'actions/getPartidoFecha.php',
      type: "GET",
      cache: true,
      dataType: "json",
      data: datos,
      success: function(response){
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            fecha = value.fecha;
            hora = value.hora;
            equipo1 = value.equipo1;
            campeonato = value.campeonato;
            equipo2 = value.equipo2;
            estadio = value.estadio;
            
            $('#cancha-vs').append('<div class="swiper-slide"><div> <div> <h4>Campeonato Ecuatoriano de Fútbol</h4> <p>Fecha: '+ fecha +' |  Hora: '+ hora +'</p> </div> <div>'+equipo1+'</div> <div></div> <div>'+equipo2+'</div> <div> <img src="'+rutaimagen+'/img/widget/'+equipo1+'.png" /> </div> <div> <span>VS.</span> </div> <div> <img src="'+rutaimagen+'/img/widget/'+equipo2+'.png" /> </div> <div> <h5>Estadio <strong> '+estadio+'</strong></h5> </div> </div></div>');
          });
        }              
      },
      complete :function(response){

      },
      error : function(error){     
          console.log(error);
      }

    }).done(function(){
       //alert(2);
      
    }).then(function(){
        //alert(3);
      
    });
}


function cargoUnidadEquipo(){
    $.ajax({
      url: direccion+'actions/getPlantilla.php',
      type: "GET",
      cache: true,
      dataType: "json",
      success: function(response){  
        console.log(response);
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            name = value.name;
            lastname = value.lastname;
            number = value.number;
            picture = value.picture;
            charge = value.charge;
            type = value.type;
            state = value.state;
            $('#cargo-unidad-equipo').append('<li class="jugador"> <div class="numberJugador col-md-5 col-xs-5 col-sm-5 text-right"> <span>'+number+'</span> </div> <div class="datos_delJugador col-md-7 col-xs-7 col-sm-7 text-left"> <strong>'+name+'</strong> <p>'+lastname+'</p> <span><strong>'+charge+'</strong> /</span> </div> <div class="imagenMenor col-md-12 col-xs-12 col-sm-12"></div> </li>');
          });
        }              
      },
      error : function(error){     
          //alert(error);
      }
    });
}

function cargoCampeonato(){

  //$('.posicionesEtapa1').empty();
  //$('.tabla_posicionesEtapa2 tbody').empty();
    $.ajax({
      url: direccion+'actions/getEstadisticas.php',
      type: "GET",
      cache: true,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 

            equipo = value.equipo;
            pj = value.pj;
            pg = value.pg;
            pe = value.pe;
            pp = value.pp;
            gf = value.gf;
            gc = value.gc;
            gd = value.gd;
            pts = value.pts;
            fase = value.fase;
            
            if(fase == 'Serie A Fase 1'){

              arrayEquipos.push(equipo);
              arrayPuntajesPJ.push(pj);
              arrayPuntajesGD.push(gd);
              arrayPuntajesPTS.push(pts);
              $('.posicionesEtapa1').append('<li class="col-md-3 col-xs-3 col-sm-3 text-right"> <img src="'+rutaimagen+'/img/widget/'+equipo.toLowerCase()+'.png" /></li><li class="col-md-2 col-xs-2 col-sm-2 text-left">  '+equipo+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+pj+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+gd+'</li> <li class="col-md-3 col-xs-3 col-sm-3 text-center"> '+pts+'</li><li class="rayaSepara col-md-12 col-xs-12 col-sm-12"></li>');
              console.log(arrayPuntajesPJ);

            }
            if(fase == 'Serie A Fase 2'){
                var h1var = arrayEquipos.indexOf(equipo);
                $('.posicionesEtapa2').append('<li class="col-md-3 col-xs-3 col-sm-3 text-right"> <img src="'+rutaimagen+'/img/widget/'+equipo.toLowerCase()+'.png" /></li><li class="col-md-2 col-xs-2 col-sm-2 text-left">  '+equipo+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+pj+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+gd+'</li> <li class="col-md-3 col-xs-3 col-sm-3 text-center"> '+pts+'</li><li class="rayaSepara col-md-12 col-xs-12 col-sm-12"></li>');
                arrayPuntajesPJ[h1var] = parseInt(arrayPuntajesPJ[h1var]) + parseInt(pj);
                arrayPuntajesGD[h1var] = parseInt(arrayPuntajesGD[h1var]) + parseInt(gd);
                arrayPuntajesPTS[h1var] = parseInt(arrayPuntajesPTS[h1var]) + parseInt(pts);
                
                $('.posicionesAcumulada').append('<li class="col-md-3 col-xs-3 col-sm-3 text-right"> <img src="'+rutaimagen+'/img/widget/'+equipo.toLowerCase()+'.png" /></li> <li class="col-md-2 col-xs-2 col-sm-2 text-left"> '+equipo+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+arrayPuntajesPJ[h1var]+'</li> <li class="col-md-2 col-xs-2 col-sm-2 text-center"> '+arrayPuntajesGD[h1var]+'</li> <li class="col-md-3 col-xs-3 col-sm-3 text-center"> '+arrayPuntajesPTS[h1var]+'</li><li class="rayaSepara col-md-12 col-xs-12 col-sm-12"></li>');
                //h1var++;
            }

             
          });
        }              
      },
      error : function(error){     
          //alert(error);
      }
    });    
}
