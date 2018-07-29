import React, {Component} from 'react';
import ymaps from 'ymaps';

class Ymap extends Component{

    state = {
        routeDistance: 20
    };

    componentDidMount () {
        ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
            const map = new maps.Map('yandex-map', {
                center: [55.76, 37.64],  height:500, zoom: 10, controls: []
            });

             let routePanelControl = new maps.control.RoutePanel({
                options: {
                    // Добавим заголовок панели.
                    showHeader: true,
                    //maxWidth: '110px',
                    title: 'Окуда/Куда'
                }
            });
            let zoomControl = new maps.control.ZoomControl({
                    options: {
                        size: 'small',
                        float: 'none',
                        position: {
                            bottom: 145,
                            right: 10
                        }
                    }
                });
            // Пользователь сможет построить только автомобильный маршрут.
            routePanelControl.routePanel.options.set({
                types: {auto: true}
            });

            map.controls.add(routePanelControl).add(zoomControl);

            routePanelControl.routePanel.getRouteAsync().then(function (route) {

                // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
                route.model.setParams({results: 1}, true);

                // Повесим обработчик на событие построения маршрута.
                route.model.events.add('requestsuccess', function () {
                    var activeRoute = route.getActiveRoute();
                    if (activeRoute) {
                        // Получим протяженность маршрута.
                        let length = route.getActiveRoute().properties.get("distance");
                        var distanseInput = document.getElementById('distance');
                        distanseInput.value = Math.round(length["value"] / 1000);
                        distanseInput.dispatchEvent(new Event('change'))
                    }
                });

            });

        })
    };

    handleDistanseChange = (length) => {
        console.log(length)
        this.setState({
            routeDistance: length
        })
    };
    render() {
        return(
            <div>
                <div id="yandex-map"></div>
            </div>
        )
    }
}

export default Ymap;