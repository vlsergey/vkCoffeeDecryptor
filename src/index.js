import DecryptForm from './DecryptForm';
import React from 'react';
import ReactDOM from 'react-dom';

if ( !window._babelPolyfill ) {
  require( '@babel/polyfill' );
}

require( 'bootstrap/dist/css/bootstrap.min.css' );

ReactDOM.render( <DecryptForm />, document.getElementById( 'app' ) );
