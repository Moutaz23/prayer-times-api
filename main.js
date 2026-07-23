
let cityes = [
  {
    arabicName: "الرياض",
    name: "ar Riyad",
  },
  {
    arabicName: "مكة المكرمة",
    name: "Makkah al Mukarramah",
  },
  {
    arabicName: "جدة",
    name: "ar Jeddah",
  },
  {
    arabicName: "الخبر",
    name: "ar Khobar",
  },
  {
    arabicName: "القصيم",
    name: "ar Qasim",
  },
];
for (city of cityes) {
  const content = `
        <option value="${city.name}">${city.arabicName}</option>
        `;
  document.getElementById("cityes").innerHTML += content;
}
document.getElementById("cityes").addEventListener("change", function () {
  let cityName = "";
  for (city of cityes) {
    if (city.name == this.value) {
      cityName = city.arabicName;
    }
  }
  getPrayerTimingsOfCity(cityName);
});

function getPrayerTimingsOfCity(cityName) {
  let = params = {
    country: "SA",
    city: cityName,
  };
  axios
    .get("https://api.aladhan.com/v1/calendarByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data[0].timings;
      const readableDate = response.data.data[0].date.readable;
      const weekday = response.data.data[0].date.hijri.weekday.ar;
      fillTimeForPrayer("fajr", timings.Fajr);
      fillTimeForPrayer("sunrise", timings.Sunrise);
      fillTimeForPrayer("dhuhr", timings.Dhuhr);
      fillTimeForPrayer("asr", timings.Asr);
      fillTimeForPrayer("maghrib", timings.Maghrib);
      fillTimeForPrayer("isha", timings.Isha);
      document.getElementById("date").innerHTML = `${weekday} ${readableDate}`;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPrayerTimingsOfCity("Makkah al Mukarramah");

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}


