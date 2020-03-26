import "reflect-metadata";
import './polyfills';
import 'rxjs/Rx';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from "./environments/environment";
import {AppModule} from "@/app.module";
import {hmrBootstrap} from "./hmr";

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
        window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherise, log the boot error

}).catch(err => console.error(err));

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, this.bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap().catch(err => console.log(err));
}
