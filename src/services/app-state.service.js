export class AppStateService {
    static deliver(method) {
        this.setAppState = method;
    }
}
