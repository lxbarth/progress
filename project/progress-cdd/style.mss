
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
@lightgrey: #bbb;

#progress {
  marker-width:3;
  marker-line-opacity:0;
  marker-allow-overlap:true;
  marker-fill:@lightgrey;
  [timestamp >= 1330560000] [version = '1'] {
    [user = 'BrenoCastroAlves'] { marker-fill: @magenta; }
    [user = 'Rub21'] { marker-fill: @blue;}
    [user = 'lxbarth'] {marker-fill: @green;}
    [user = 'Geaquinto'] {marker-fill: @yellow;}
  }
}
