$(function(){
	let weather;
	$.ajax({
		url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
		type:'POST',
		dataType:'jsonp',
		success:function(obj){
			weather=obj.data.weather;
			console.log(weather);
			xr();
			hour();
			days()
		}
	})
	function xr(){
		$(".title").html(weather.city_name);
		$(".temperature>span").html(weather.current_temperature);
		$(".weather").html(weather.dat_condition);
		$(".show").html(weather.wind_direction);
		$(".til").html(weather.aqi);
		$(".value").html(weather.quality_level);
		$(".jindu>span").html(weather.dat_high_temperature+'/'+weather.dat_low_temperature);
		$(".mimgdu>span").html(weather.tomorrow_high_temperature+'/'+weather.tomorrow_low_temperature);
		$(".jintq").html(weather.day_condition);
		$(".mimgtq").html(weather.tomorrow_condition);
	}
	function hour(){
		weather.hourly_forecast.forEach(function(element,index){
			let str=`
				<li>
					<p class="times">${element.hour}:00</p>
					<img src="img/${element.weather_icon_id}.png" alt="">
					<p class="degree">
						<span>${element.temperature}</span>°
					</p>
				</li>`;
			$(".hours>ul").append(str);
		})
	}
	function days(){
		weather.forecast_list.forEach(function(element,index){
			let month=element.date.slice(5,7);
			let day=element.date.slice(8,10);
			let str=`
				<li>
					<p class="date">${month}/${day}</p>
					<div class="daytime">
						<p class="dayweather">${element.condition}</p>
						<img src="img/${element.weather_icon_id}.png" alt="">
					</div>
					<div class="night">
						<img src="img/${element.weather_icon_id}.png" alt="">
						<p class="nightweather">${element.condition}</p>
					</div>
					<p class="wind">${element.wind_direction}</p>
					<p class="wind">
						<span>${element.wind_level}</span>级
					</p>
				</li>`;
			$(".days>ul").append(str);
		})
	}
})