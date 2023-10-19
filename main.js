const app = Vue.createApp({
  created() {
    this.getTodaysDate();
    this.getSavedLocations();
  },
  data() {
    return {
      api_key: "2b046146cdce8333f44ab94a46d0138b",
      url_base: "http://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      temp: "",
      description: "",
      myLocations: [],
      today: "",
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then(this.setResults)
          .then(this.saveLocation);
      }
    },
    setResults(results) {
      this.weather = results;
      console.log(results);

      this.temp = this.weather.main.temp;
      this.description = this.weather.weather[0].main;
    },
    getTodaysDate() {
      const today = new Date();
      const f = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
      });
      this.today = f.format(today);
    },
    saveLocation() {
      localStorage.setItem("locations", this.query);
    },
    getSavedLocations() {
      this.myLocations.push(localStorage.getItem("locations"));
      console.log(this.myLocations);
    },
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
});
