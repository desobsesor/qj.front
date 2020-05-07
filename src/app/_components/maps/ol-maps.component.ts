import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ol-maps',
    templateUrl: './ol-maps.component.html'
})
export class OlMapsComponent implements OnInit {
    title = 'ng-openlayers';
    ngOnInit(): void {
        this.capturarCoordenadas();
    }
    capturarCoordenadas(): void {
        var content = document.getElementById("coordenadas");

        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(objPosition)
            {
                var lon = objPosition.coords.longitude;
                var lat = objPosition.coords.latitude;

                content.innerHTML = "<p><strong>Latitud:</strong> " + lat + "</p><p><strong>Longitud:</strong> " + lon + "</p>";

            }, function(objPositionError)
            {
                switch (objPositionError.code)
                {
                    case objPositionError.PERMISSION_DENIED:
                        content.innerHTML = "No se ha permitido el acceso a la posición del usuario.";
                        break;
                    case objPositionError.POSITION_UNAVAILABLE:
                        content.innerHTML = "No se ha podido acceder a la información de su posición.";
                        break;
                    case objPositionError.TIMEOUT:
                        content.innerHTML = "El servicio ha tardado demasiado tiempo en responder.";
                        break;
                    default:
                        content.innerHTML = "Error desconocido.";
                }
            }, {
                maximumAge: 75000,
                timeout: 15000
            });
        }
        else
        {
            content.innerHTML = "Su navegador no soporta la API de geolocalización.";
        }
    }

}
