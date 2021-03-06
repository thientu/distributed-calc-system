'use strict';

angular.module('jsSparkUiApp')
    .controller('WeatherCtrl', function ($scope, $http, socket, $timeout) {
        $scope.weather = {};

        $http.get('/api/weathers').success(function (weather) {
            $scope.weather = weather[0];
            drawCanvas(weather[0]);
        });

        $scope.speed = 0;
        $scope.clients = [];

        socket.socket.on('newWorld', function (data) {
            console.warn('new world');
        });

        socket.socket.on('newTime', function (data) {
            $scope.speed = (6000 / data).toFixed(4);
        });

        $http.get('/api/clients').success(function (clients) {
            $scope.clients = clients;
            socket.syncUpdates('client', $scope.clients);
        });

        function drawCanvas(weather) {
            var image_index = {
                sunny: {
                    x: 0,
                    y: 0,
                    width: 109,
                    height: 99
                },
                cloudy: {
                    x: 110,
                    y: 0,
                    width: 109,
                    height: 99
                },
                heavycloudy: {
                    x: 0,
                    y: 100,
                    width: 109,
                    height: 99
                },
                rainy: {
                    x: 110,
                    y: 100,
                    width: 109,
                    height: 99
                },
                snowing: {
                    x: 0,
                    y: 199,
                    width: 109,
                    height: 99
                },
                storm: {
                    x: 110,
                    y: 199,
                    width: 109,
                    height: 99
                }
            };

            var c = document.getElementById("weatherCanvas");
            var ctx = c.getContext("2d");
            var img = document.getElementById("weatherIcons");
            var weathertype;

            ctx.moveTo(0, 0);
            ctx.lineTo(600, 0);
            ctx.lineTo(600, 500);
            ctx.lineTo(0, 500);
            ctx.lineTo(0, 0);
            ctx.stroke();
            //    ctx.fillStyle = "#FF0000";
            //    ctx.fillRect(0,0,150,75);
            // current weather
            ctx.font = "30px Arial";
            ctx.fillText(weather.location, 20, 75);
            ctx.font = "20px Arial";
            ctx.fillText((weather.weather.temperature - 273.15).toFixed(1) + ' \xB0C', 20, 170);
            ctx.fillText(weather.weather.humidity + "%", 20, 225);
            weathertype = weather.weather.weathertype;
            ctx.drawImage(img, image_index[weathertype].x, image_index[weathertype].y, image_index[weathertype].width, image_index[weathertype].height, 350, 25, 200, 200);

            // forecast
            ctx.fillText(weather.weather_forecast.day1.fullname, 10, 300);
            ctx.fillText((weather.weather_forecast.day1.temperature - 273.15).toFixed(1) + ' \xB0C', 10, 330);
            ctx.fillText(weather.weather_forecast.day1.humidity + "%", 10, 360);
            weathertype = weather.weather_forecast.day1.weathertype;
            ctx.drawImage(img, image_index[weathertype].x, image_index[weathertype].y, image_index[weathertype].width, image_index[weathertype].height, 50, 375, 100, 100);
            ctx.fillText(weather.weather_forecast.day2.fullname, 210, 300);
            ctx.fillText((weather.weather_forecast.day2.temperature - 273.15).toFixed(1) + ' \xB0C', 210, 330);
            ctx.fillText(weather.weather_forecast.day2.humidity + "%", 210, 360);
            weathertype = weather.weather_forecast.day2.weathertype;
            ctx.drawImage(img, image_index[weathertype].x, image_index[weathertype].y, image_index[weathertype].width, image_index[weathertype].height, 250, 375, 100, 100);
            ctx.fillText(weather.weather_forecast.day3.fullname, 410, 300);
            ctx.fillText((weather.weather_forecast.day3.temperature - 273.15).toFixed(1) + ' \xB0C', 410, 330);
            ctx.fillText(weather.weather_forecast.day3.humidity + "%", 410, 360);
            weathertype = weather.weather_forecast.day3.weathertype;
            ctx.drawImage(img, image_index[weathertype].x, image_index[weathertype].y, image_index[weathertype].width, image_index[weathertype].height, 450, 375, 100, 100);
        }

    });
