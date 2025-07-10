import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchCity, setSearchCity] = useState("Москва");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const mockWeatherData = {
    current: {
      temp: 18,
      condition: "Дождь",
      humidity: 85,
      windSpeed: 12,
      pressure: 1013,
      visibility: 8,
      uvIndex: 2,
      feelsLike: 16,
    },
    forecast: [
      {
        day: "Сегодня",
        temp: "18°",
        condition: "Дождь",
        icon: "CloudRain",
        chance: 90,
      },
      {
        day: "Завтра",
        temp: "22°",
        condition: "Облачно",
        icon: "Cloud",
        chance: 30,
      },
      {
        day: "Ср",
        temp: "25°",
        condition: "Солнечно",
        icon: "Sun",
        chance: 10,
      },
      { day: "Чт", temp: "20°", condition: "Гроза", icon: "Zap", chance: 95 },
      {
        day: "Пт",
        temp: "16°",
        condition: "Дождь",
        icon: "CloudRain",
        chance: 80,
      },
      {
        day: "Сб",
        temp: "19°",
        condition: "Переменная",
        icon: "CloudSun",
        chance: 45,
      },
      { day: "Вс", temp: "23°", condition: "Ясно", icon: "Sun", chance: 5 },
    ],
    hourly: [
      { time: "12:00", temp: 18, rain: 80 },
      { time: "13:00", temp: 17, rain: 85 },
      { time: "14:00", temp: 16, rain: 90 },
      { time: "15:00", temp: 18, rain: 75 },
      { time: "16:00", temp: 19, rain: 60 },
      { time: "17:00", temp: 20, rain: 40 },
    ],
  };

  const Raindrop = ({
    delay,
    duration,
  }: {
    delay: number;
    duration: number;
  }) => (
    <div
      className="absolute w-1 h-8 bg-gradient-to-b from-rainBlue to-transparent rounded-full opacity-70"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stormGray via-rainBlue to-cloudWhite relative overflow-hidden">
      {/* Animated Rain Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-raindrop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div className="w-0.5 h-6 bg-gradient-to-b from-blue-300 to-transparent rounded-full opacity-60" />
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CloudRain" size={32} className="text-white" />
                <h1 className="text-2xl font-bold text-white">WeatherFlow</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    placeholder="Поиск города..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-3 text-white/70"
                  />
                </div>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="MapPin" size={16} className="mr-2" />
                  GPS
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Current Weather Hero */}
          <div className="mb-8">
            <Card className="bg-white/15 backdrop-blur-lg border-white/20 text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <Icon name="MapPin" size={20} className="text-white/80" />
                      <span className="text-lg">{searchCity}</span>
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white"
                      >
                        Обновлено {currentTime.toLocaleTimeString()}
                      </Badge>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-6xl font-light">
                        {mockWeatherData.current.temp}°
                      </span>
                      <span className="text-xl text-white/80">C</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon
                        name="CloudRain"
                        size={24}
                        className="text-white/80"
                      />
                      <span className="text-xl">
                        {mockWeatherData.current.condition}
                      </span>
                    </div>
                    <p className="text-white/80">
                      Ощущается как {mockWeatherData.current.feelsLike}°C
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: "Droplets",
                        label: "Влажность",
                        value: `${mockWeatherData.current.humidity}%`,
                      },
                      {
                        icon: "Wind",
                        label: "Ветер",
                        value: `${mockWeatherData.current.windSpeed} км/ч`,
                      },
                      {
                        icon: "Gauge",
                        label: "Давление",
                        value: `${mockWeatherData.current.pressure} мбар`,
                      },
                      {
                        icon: "Eye",
                        label: "Видимость",
                        value: `${mockWeatherData.current.visibility} км`,
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon
                            name={item.icon as any}
                            size={16}
                            className="text-white/70"
                          />
                          <span className="text-sm text-white/70">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-lg font-semibold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Forecast */}
          <div className="mb-8">
            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Clock" size={20} className="mr-2" />
                  Почасовой прогноз
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {mockWeatherData.hourly.map((hour, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 bg-white/10 rounded-lg p-4 text-center min-w-[100px]"
                    >
                      <p className="text-white/80 text-sm mb-2">{hour.time}</p>
                      <Icon
                        name="CloudRain"
                        size={24}
                        className="text-white mx-auto mb-2"
                      />
                      <p className="text-white font-semibold mb-2">
                        {hour.temp}°
                      </p>
                      <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                        <div
                          className="bg-rainBlue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${hour.rain}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/70">{hour.rain}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 7-Day Forecast */}
          <div className="mb-8">
            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Прогноз на неделю
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockWeatherData.forecast.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-medium w-16">
                          {day.day}
                        </span>
                        <Icon
                          name={day.icon as any}
                          size={20}
                          className="text-white"
                        />
                        <span className="text-white/80">{day.condition}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Icon
                            name="Droplets"
                            size={14}
                            className="text-rainBlue"
                          />
                          <span className="text-white/80 text-sm">
                            {day.chance}%
                          </span>
                        </div>
                        <span className="text-white font-semibold text-lg w-12 text-right">
                          {day.temp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Maps & Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Radar" size={20} className="mr-2" />
                  Радар осадков
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-stormGray/30 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <Icon
                      name="Satellite"
                      size={48}
                      className="mx-auto mb-4 animate-pulse"
                    />
                    <p>Интерактивная карта радара</p>
                    <p className="text-sm">
                      Данные обновляются каждые 10 минут
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="AlertTriangle" size={20} className="mr-2" />
                  Штормовые предупреждения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Zap" size={16} className="text-red-400" />
                      <span className="text-red-400 font-semibold">
                        Предупреждение о грозе
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Ожидается сильная гроза с 15:00 до 18:00
                    </p>
                  </div>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Wind" size={16} className="text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">
                        Усиление ветра
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Порывы ветра до 25 м/с в вечерние часы
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historical Data & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="TrendingUp" size={20} className="mr-2" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-white/80 text-sm mb-1">
                      <span>Дождливые дни в месяце</span>
                      <span>18/30</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/80 text-sm mb-1">
                      <span>Среднее количество осадков</span>
                      <span>45 мм</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/80 text-sm mb-1">
                      <span>УФ-индекс</span>
                      <span>2/10</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Bell" size={20} className="mr-2" />
                  Уведомления
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-rainBlue hover:bg-rainBlue/80 text-white">
                    <Icon name="Smartphone" size={16} className="mr-2" />
                    Настроить push-уведомления
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20"
                  >
                    <Icon name="Mail" size={16} className="mr-2" />
                    Email-подписка на прогноз
                  </Button>
                  <div className="text-center text-white/60 text-sm">
                    Получайте уведомления о погоде и предупреждения
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/15 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Settings" size={20} className="mr-2" />
                  Настройки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20"
                  >
                    <Icon name="Thermometer" size={16} className="mr-2" />
                    Единицы измерения
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20"
                  >
                    <Icon name="Globe" size={16} className="mr-2" />
                    Язык интерфейса
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Экспорт данных
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="CloudRain" size={24} className="text-white" />
                  <span className="text-white font-bold">WeatherFlow</span>
                </div>
                <p className="text-white/70 text-sm">
                  Точные прогнозы погоды с анимированными эффектами дождя
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Прогнозы</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>Текущая погода</li>
                  <li>Почасовой прогноз</li>
                  <li>7-дневный прогноз</li>
                  <li>Исторические данные</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Карты</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>Радар осадков</li>
                  <li>Спутниковые снимки</li>
                  <li>Карта ветров</li>
                  <li>Температурная карта</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Контакты</h3>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Mail" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Phone" size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-4 text-center text-white/60 text-sm">
              © 2024 WeatherFlow. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
