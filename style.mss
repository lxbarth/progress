Map { background-color:#000; }

#countries {
  line-color:#fff;
  line-join:round;
  line-width:0.5;
  }

@blue: #00aacc;
@magenta: #ff0094;
@green: #0F0;
@red: #fc0303;
@yellow: #FF0;
@orange: #F80;
@grey: #2d2c2c;

#progress {
  marker-width:1;
  marker-line-opacity:0;
  marker-allow-overlap:true;
  marker-fill:@grey;
  [timestamp >= 1330560000] [version = '1'] {
    [user = 'pieleric'] { marker-fill: @yellow;} 
    [user = 'muzito'] { marker-fill: @magenta;} 
    [user = 'Rub21'] { marker-fill: @blue;}
    [user = 'lxbarth'] {marker-fill: @green;}
  }
}
