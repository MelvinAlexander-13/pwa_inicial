const estado = document.getElementById("estado");


function actualizarEstado(){

    if(navigator.onLine){

        estado.innerHTML = "🟢 Conectado a Internet";
        estado.className = "online";

    }else{

        estado.innerHTML = "🔴 Sin conexión";
        estado.className = "offline";

    }

}


window.addEventListener("online", actualizarEstado);

window.addEventListener("offline", actualizarEstado);


actualizarEstado();



// Tipo de conexión

function mostrarConexion(){

    const conexion =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;


    if(conexion){

        document.getElementById("conexion").innerHTML =
        "📶 Tipo de conexión: " +
        conexion.effectiveType;

    }

}


mostrarConexion();



// Obtener IP pública

async function obtenerIP(){

    try{

        const respuesta =
        await fetch(
            "https://api.ipify.org?format=json"
        );


        const datos =
        await respuesta.json();


        document.getElementById("ip").innerHTML =
        "🌍 IP Pública: " + datos.ip;


    }catch{


        document.getElementById("ip").innerHTML =
        "🌍 IP Pública: No disponible";


    }

}


obtenerIP();




// Prueba de red

async function probarRed(){

    const inicio =
    performance.now();


    try{


        await fetch(
            "https://api.ipify.org?format=json",
            {
                cache:"no-store"
            }
        );



        const fin =
        performance.now();



        document.getElementById("latencia").innerHTML =
        "⚡ Latencia: " +
        Math.round(fin - inicio) +
        " ms";



        document.getElementById("hora").innerHTML =
        "🕒 Última prueba: " +
        new Date().toLocaleString();



    }catch{


        document.getElementById("latencia").innerHTML =
        "⚡ Error de conexión";


    }

}





// ==============================
// SERVICE WORKER PWA
// ==============================


if("serviceWorker" in navigator){


    window.addEventListener(
        "load",
        ()=>{


            navigator.serviceWorker.register(
                "/service-worker.js"
            )


            .then(registration=>{


                console.log(
                    "Service Worker registrado:",
                    registration.scope
                );


            })


            .catch(error=>{


                console.log(
                    "Error Service Worker:",
                    error
                );


            });


        }
    );


}





// ==============================
// INSTALACIÓN PWA ANDROID
// ==============================


let deferredPrompt = null;


const installBtn =
document.getElementById("installBtn");




window.addEventListener(
"beforeinstallprompt",
(event)=>{


    console.log(
        "PWA lista para instalar"
    );


    event.preventDefault();


    deferredPrompt = event;


    installBtn.hidden = false;


});





installBtn.addEventListener(
"click",
async()=>{


    if(!deferredPrompt){


        console.log(
            "Instalación no disponible"
        );


        return;


    }



    deferredPrompt.prompt();



    const resultado =
    await deferredPrompt.userChoice;



    console.log(
        "Resultado instalación:",
        resultado.outcome
    );



    deferredPrompt = null;


    installBtn.hidden = true;



});





// Detectar si ya fue instalada

window.addEventListener(
"appinstalled",
()=>{


    console.log(
        "PWA instalada correctamente"
    );


    installBtn.hidden = true;


});





// ==============================
// IPHONE
// ==============================


function esIOS(){


    return /iphone|ipad|ipod/i
    .test(navigator.userAgent);


}



if(esIOS()){


    document.getElementById(
        "iosMessage"
    ).hidden = false;


}
