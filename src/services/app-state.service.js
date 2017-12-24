export class AppStateService {
    static deliver(methods) {
        this.appState       = methods.appState;
        this.setAppState    = methods.setState;
    }
}
