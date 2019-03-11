import React from 'react';

const SwatchCreator = (props) => {
  return ( 
    <div className="swatch-edit">
      <div className="swatch-edit__container">
        <fieldset className="form__field">
          <label className="label--text sml">Title</label>
          <input className="swatch-edit__input breath tiny full" type="text" placeholder="monkey blue" onChange={props.onChange} name='title' />
          <label className="label--text tiny">HEX * Required</label>
          <input className="swatch-edit__input breath tiny full" type="text" placeholder="#0034ff" onChange={props.onChange} name='hex'/>
          <label className="label--text tiny">RGB</label>
          <input className="swatch-edit__input breath tiny full" type="text" placeholder="rgb(0, 10, 255)" onChange={props.onChange} name='rgb'/>
          <label className="label--text tiny">Variable</label>
          <input className="swatch-edit__input breath tiny full" type="text" placeholder="$monekyBlue" onChange={props.onChange} name='var'/>
        </fieldset>
        <fieldset className="form__field txt-center">
          <button className="btn breath danger" 
                  type="button"
                  onClick={props.toggleSwatch}
          >Cancel</button>
          <button className="btn breath primary" 
                  type="button"
                  onClick={props.createSwatch}
          >Create</button>
        </fieldset>
      </div>
    </div>
  );
}

export default SwatchCreator;