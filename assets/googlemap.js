/*
 * Google map javascript widget
 * 
 * @author disasterovich@mail.ru
 * @site: diz-blog.com.ua
 * @ license: GPL
 * 
 * @var google_maps_markers - array()
 * @var google_maps_params - array()
 */

var infowindow;
var markers = [];

function initialize() 
    {
    //Создаем карту
    mapOptions = 
        {
        zoom: google_maps_params['zoom'],        
        minZoom: google_maps_params['minzoom'],
        }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    //Позиционируем карту
    myLatlng = new google.maps.LatLng( google_maps_params['lat'],google_maps_params['lng'] );
    map.setCenter(myLatlng); 
    
    //Добавляем на карту маркеры со вслыв. окнами
    for (var i = 0; i < google_maps_markers.length; i++) 
        {        
        createMarker(google_maps_markers[i]);
        }
        
    //Если маркер один и его перемещение разрешено, то сделаем его перемещаемым по двойному клику
    if ( google_maps_markers.length == 1 && google_maps_markers[0].draggable == true)
        {
        google.maps.event.addListener(map, 'dblclick', function(event)
            {
            markers[0].setPosition( event.latLng );
            });        
        }
    }
    
function createMarker(google_maps_marker) 
    {
    var latlng = new google.maps.LatLng( google_maps_marker['lat'], google_maps_marker['lng'] );
    
    var marker = new google.maps.Marker(
            {
            position: latlng, 
            map: map,
            title: google_maps_marker['title'],
            draggable:google_maps_marker['draggable'],
            });
            
    google.maps.event.addListener(marker, "click", function() 
        {
        if (infowindow) infowindow.close();
        infowindow = new google.maps.InfoWindow(
            {
            content: google_maps_marker['window_content']
            });
        infowindow.open(map, marker);
        });
        
    markers.push(marker);
    }

google.maps.event.addDomListener(window, 'load', initialize);
