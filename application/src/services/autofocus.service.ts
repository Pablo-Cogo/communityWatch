class AutoFocusService {
  private focus: boolean;
  constructor(state: boolean) {
    this.focus = state;
  }
  setFocus(state: boolean) {
    this.focus = state;
  }
  getFocus() {
    return this.focus;
  }
}
export default AutoFocusService;
