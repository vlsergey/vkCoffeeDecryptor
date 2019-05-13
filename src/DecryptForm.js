import React, { PureComponent } from 'react';
import AES from 'crypto-js/aes';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import encUtf8 from 'crypto-js/enc-utf8';
import Form from 'react-bootstrap/Form';
import modeEcb from 'crypto-js/mode-ecb';

function hexToBytes( hex ) {
  const bytes = [];
  for ( let c = 0; c < hex.length; c += 2 )
    bytes.push( parseInt( hex.substr( c, 2 ), 16 ) );
  return bytes;
}

function utf8_to_str( a ) {
  let s = '';
  for ( let i = 0; i < a.length; i++ ) {
    let h = a[ i ].toString( 16 );
    if ( h.length < 2 ) h = '0' + h;
    s += '%' + h;
  }
  return decodeURIComponent( s );
}

export default class DecryptForm extends PureComponent {

  constructor() {
    super( ...arguments );

    this.state = {
      src: 'VK CO FF EE 4A 57 30 74 61 62 75 75 4D 32 2F 37 6B 52 45 4E 35 68 4B 67 39 77 3D 3D VK CO FF EE',
      dst: '',
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( { target } ) {
    this.setState( { [ target.name ]: target.value } );
    return true;
  }


  handleSubmit( event ) {
    event.preventDefault();
    try {
      let { src } = this.state;
      src = src.replace( /VK C0 FF EE/gi, '' );
      src = src.replace( /PP/gi, '' );
      src = src.replace( /AP ID 0G/gi, '' );
      src = src.replace( /VK CO FF EE/gi, '' );
      src = src.replace( /AP ID OG/gi, '' );
      src = src.replace( /II/gi, '' );
      src = src.replace( / /gi, '' );

      src = hexToBytes( src );
      src = utf8_to_str( src );

      const keyUtf8 = encUtf8.parse( 'stupidUsersMustD' );
      src = AES.decrypt( src, keyUtf8, { mode: modeEcb } ).toString();
      src = hexToBytes( src );
      src = utf8_to_str( src );

      this.setState( { dst: src } );
    } catch ( e ) {
      console.log( e );
      this.setState( { dst: '' + e } );
    }

    return false;
  }

  render() {
    const { state } = this;

    return <Container>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="src">
          <Form.Label>Text to decypher (starting and ending with «VK C0 FF EE» string)</Form.Label>
          <Form.Control as="textarea" name="src" onChange={this.handleChange} rows="5" type="text" value={state.src || ''} />
          <Form.Control.Feedback />
        </Form.Group>
        <Form.Group controlId="dst">
          <Form.Label>Decyphered text</Form.Label>
          <Form.Control as="textarea" name="dst" onChange={this.handleChange} rows="5" type="text" value={state.dst || ''} />
          <Form.Control.Feedback />
        </Form.Group>
        <Button type="submit" variant="primary">Decypher</Button>
      </Form>
    </Container>;
  }

}
