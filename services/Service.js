"use strict";
export class Service {
  constructor() {
    this.onUpdate = null;
  }

  __fireUpdate() {
    if (typeof this.onUpdate === "function") {
      this.onUpdate();
    }
  }
}
