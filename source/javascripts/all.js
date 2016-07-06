import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import SlideShow from './react/SlideShow.js';
// import MapBox from './react/MapBox.js';


ReactDOM.render(
    React.createElement(SlideShow),
    document.querySelector('#js-test')
);

ReactDOM.render(
    React.createElement(MapBox),
    document.querySelector('#js-map')
);
