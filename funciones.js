function navegar(liga){
    window.location.assign(liga + '.html');
}

function verAlerta(titulo,contenido){
    document.getElementById('alerta-titulo').innerHTML = titulo;
    document.getElementById('alerta-mensaje').innerHTML = contenido;
    document.querySelector('.alerta').classList.add('ver');
    setTimeout(function(){
        document.querySelector('.alerta').classList.remove('ver')
    },4000);
    navigator.vibrate('800');
}
//-------------------------------------index---------------------------------------------------
 variablel=localStorage.getItem('variablel');
function comprobar(){
   
    if(variablel==null){
        window.location.assign('iniciosesion.html');
    }
 }

function geolocalizar(){            
    //COMPROBAR QUE SE PUEDE GEOLOCALIZAR
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(verPosicion);
    }
}
            
function verPosicion(coordenadas){
    //DENTRO DEL OBJETO COORDENADAS OBTENEMOS EL ATRIBUTO COORDS, QUE DENTRO TIENE LA LONGITUD Y LATITUD
    lat=coordenadas.coords.latitude;
    long= coordenadas.coords.longitude; 
    localStorage.setItem('lat',lat);
    localStorage.setItem('long',long);
    verAlerta('Ubicación guardada','Selecciona el botón de Navegar para ver el mapa.');
}
function posicionUsuario(coordenadas){
    latUser= coordenadas.coords.latitude;
    longUser= coordenadas.coords.longitude; 
    localStorage.setItem('latUser',latUser);
    localStorage.setItem('longUser',longUser);
}
var map;
function mostrarMapa(){
    lati = localStorage.getItem('lat');
    long = localStorage.getItem('long');
    var coordenadas = {lat: parseFloat(lati), lng: parseFloat(long)};
    navigator.geolocation.getCurrentPosition(posicionUsuario);
        latUser=parseFloat(localStorage.getItem('latUser'));
        longUser=parseFloat(localStorage.getItem('longUser'));
        var coordenadasUser = {lat: latUser, lng: longUser};
   var map = new google.maps.Map(document.getElementById('mapa'), {
            zoom: 17,
            center: new google.maps.LatLng(lati, long)
        });
        var marker = new google.maps.Marker({
            position:coordenadas,
            icon: "autoMap.png",
            map: map
        });
       var marker1 = new google.maps.Marker({
            position:coordenadasUser,
            icon: "userMap.png",
            map: map
        });
    
}
function salir(){
    localStorage.removeItem('variablel');
    window.location.assign('iniciosesion.html');
}
/*--------------------------------------- REGISTRAR DATOS ----------------------------------------------*/

function guardar() {
    nombre = document.getElementById('nombre').value;
    correo = document.getElementById('correo').value;
    modelo = document.getElementById('modelo').value;
    anio = document.getElementById('anio').value;
    contrasena = document.getElementById('contrasena').value;
    conContrasena = document.getElementById('conContrasena').value;
    
    
    if (nombre == "" && contrasena == "" && conContrasena == "" || contrasena != conContrasena) {
        
        alert("No es posible continuar, verifique que todos los campos esten completos");
        
    } else {
        
        //SI YA EXISTE EL CONTADOR, ACTUALIZARLO, SI NO, CREARLO
    if(localStorage.getItem('contadorRegistro')) {
        contadorRegistro = localStorage.getItem('contadorRegistro');
        localStorage.setItem('nombre' + contadorRegistro, nombre);
        localStorage.setItem('correo' + contadorRegistro, correo);
        localStorage.setItem('modelo' + contadorRegistro, modelo);
        localStorage.setItem('anio' + contadorRegistro, anio);
        localStorage.setItem('contrasena' + contadorRegistro, contrasena);
        contadorRegistro++;
        localStorage.setItem('contadorRegistro', contadorRegistro);
    } else {
        contadorRegistro = 0;
        localStorage.setItem('nombre' + contadorRegistro, nombre);
        localStorage.setItem('correo' + contadorRegistro, correo);
        localStorage.setItem('modelo' + contadorRegistro, modelo);
        localStorage.setItem('anio' + contadorRegistro, anio);
        localStorage.setItem('contrasena' + contadorRegistro, contrasena);
        contadorRegistro++;
        localStorage.setItem('contadorRegistro', contadorRegistro);
    }
        
        
        alert("Tus datos se guardaron exitosamente");
        window.location.assign("iniciosesion.html");
    
    }
}



/*----------------------------------------- INICIO SESION ----------------------------------------------*/

function recuperarDatos(){
    
    correoSesion = document.getElementById('correoSesion').value;
    contrasenaSesion = document.getElementById('contrasenaSesion').value;
    contadorRegistro = localStorage.getItem('contadorRegistro');
    
    
    
        
    for(j=0;j<contadorRegistro;j++){
        
        if ((localStorage.getItem('correo'+j) == correoSesion) && (localStorage.getItem('contrasena'+j) == contrasenaSesion)){
        window.location.assign('perfil.html');
        alert("INICIASTE SESION");
        localStorage.setItem('variable',j);
        localStorage.setItem('variablel',j);
        break;
    }  
}
}

/*----------------------------------------- PERFIL ----------------------------------------------*/

function datos(){
    
        
            variable = localStorage.getItem('variable');
            nombre = localStorage.getItem('nombre'+variable);
            modelo = localStorage.getItem('modelo'+variable);
            anio = localStorage.getItem('anio'+variable);
    
            document.getElementById('nombre').innerHTML = nombre;
            document.getElementById('modelo').innerHTML = modelo;
            document.getElementById('anio').innerHTML = anio;
}