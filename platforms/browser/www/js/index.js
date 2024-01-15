/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var model = JSON.parse(localStorage.getItem("model")) || []
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    cargarPagina();
    $("#button").on("click", function () {
        let pagina = prompt("Pagina a añadir");
        addElement(pagina)
        createDiv(pagina)
    })
    function addElement(pagina) {
        let nuevoElemento = $('<li><a href="#' + pagina + '">' + pagina + '</a><a class="edit ui-btn ui-btn-icon-notext ui-icon-edit" data-icon="edit"></a><a class="delete" data-icon="delete"></a></li>');
        $("ul").append(nuevoElemento).listview("refresh")
    }
    function createDiv(pagina) {
        model.push(pagina);
        localStorage.setItem("model", JSON.stringify(model));
        addDiv =
            '<div data-role="page" id="' + pagina + '" data-url="' + pagina + '">' +
            '<div data-role="header">' +
            '<a href="#" data-icon="back" data-rel="back" title="Go back">Back</a>' +
            '<h1>' + pagina + '</h1>' +
            '</div>' +
            '<div class="ui-content">' +
            '<p>This is ' + pagina + '</p>' +
            '</div>' +
            '<div data-role="footer" data-position="fixed">' +
            '<h1>' + pagina + '</h1>' +
            '</div>' +
            '</div>'
        $("body").append(addDiv)
    }
    $('ul').on('click', '.delete', function (event) {
        var caller = event.target || event.srcElement;
        // console.log( caller );
        caller.closest("li").remove();
        borrarElemento($(caller).closest("li").find("a:first").attr("href").substring(1))
    });
    function editElement(pagina) {
        let nuevoTexto = prompt("Nuevo texto para " + pagina);
        if (nuevoTexto) {
            $(`a[href='#${pagina}']`).text(nuevoTexto);
        }
    }
    function cargarPagina() {
        var longitudModel = model.length;
        if (longitudModel != 0) {
            for (let i = 0; i < longitudModel; i++) {
                addElement(model[i]);
            }
        }
    }
    function borrarElemento(pagina) {
        // Buscar la posición del elemento en el array
        var indice = model.indexOf(pagina);
    
        // Verificar si el elemento se encuentra en el array
        if (indice !== -1) {
            // Eliminar el elemento del array
            model.splice(indice, 1);
    
            // Actualizar el localStorage después de modificar el array
            localStorage.setItem("model", JSON.stringify(model));
    
            // También puedes realizar otras acciones necesarias aquí
    
            console.log('Elemento borrado:', pagina);
        } else {
            console.log('Elemento no encontrado en el array:', pagina);
        }
    }
    
    $('ul').on('click', '.edit', function (event) {
        var caller = event.target || event.srcElement;
        var pagina = $(caller).closest("li").find("a:first").attr("href").substring(1);
        editElement(pagina);
    });
}