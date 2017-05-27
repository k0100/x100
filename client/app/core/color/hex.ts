import { RGB } from './rgb';
export class HEX {

  private hex : string = "#000000";

  constructor(hex : string) {
    this.hex = (hex.toString().length == 6) ? "#"+hex : (hex.toString().length == 7) ? hex : null;
  }

  public toRGB() : RGB {
      let hexString : string = this.hex.substr(1).toString();
      return new RGB(parseInt(hexString.substr(0,2),16),parseInt(hexString.substr(2,2),16),parseInt(hexString.substr(4,2),16));
   }

   public toString() : string {
     return this.hex;
   }

}