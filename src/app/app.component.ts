import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";

const { Storage } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isDarkMode = false;
  public appPages = [
    {
      title: "Characters",
      url: "characters",
      icon: "people"
    },
    {
      title: "Locations",
      url: "locations",
      icon: "location"
    },
    {
      title: "Episodes",
      url: "episodes",
      icon: "rocket"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.getDarkMode().then(data => {
      this.toggleDarkMode(data);
      this.isDarkMode = data;
      this.initializeApp();
    });
  }

  async setDarkMode(isDarkMode: boolean) {
    await Storage.set({
      key: "darkMode",
      value: JSON.stringify({ darkMode: isDarkMode })
    });
  }

  // JSON "get" example
  async getDarkMode() {
    return Storage.get({ key: "darkMode" })
      .then(darkModeVal => {
        if (darkModeVal.value)
          return JSON.parse(darkModeVal.value).darkMode || false;
        else return false;
      })
      .catch(err => {
        return false;
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {}

  toggleDarkMode(darkMode: boolean) {
    document.body.classList.toggle("dark", darkMode);
  }

  changeMode(event) {
    this.toggleDarkMode(event.detail.checked);
    this.isDarkMode = event.detail.checked;
    this.setDarkMode(event.detail.checked);
  }
}
