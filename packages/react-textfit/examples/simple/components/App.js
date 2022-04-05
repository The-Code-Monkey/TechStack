import React from 'react';
import { Textfit } from 'react-textfit';

const inlineStyle = {
    height: 400
};

export default class App extends React.Component {
    state = {
        text: 'Edit this text!',
        mode: 'multi',
        forceSingleModeWidth: true
    }

    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState({ text });
    }

    handleChangeMode = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
    }

    handleChangeForceWidth = (e) => {
        const forceSingleModeWidth = e.target.checked;
        this.setState({ forceSingleModeWidth });
    }

    render() {
        const { text, mode, forceSingleModeWidth } = this.state;
        return (
            <div>
                <h1 className="headline">
                    react-textfit
                    <a href="https://github.com/malte-wessel/react-textfit" target="_blank" style={{float: 'right'}}>
                        <i className="fa fa-github"/>
                    </a>
                </h1>
                <div className="row">
                    <div className="column-100">
                        <ul>
                            <li>fit <strong>headlines and paragraphs</strong> into any element</li>
                            <li><strong>fast:</strong> uses binary search for efficiently find the correct fit</li>
                            <li><strong>100%</strong> react-goodness</li>
                            <li>works with <strong>any style</strong> configuration (line-height, padding, ...)</li>
                        </ul>
                    </div>
                </div>
                <h2 className="headline">Examples</h2>
                <div className="row">
                    <div className="column-100">
                        <Textfit
                            mode="single"
                            max={500}
                            className="box box-fat">
                            Fat headlines!
                        </Textfit>
                    </div>
                </div>
                <div className="row">
                    <div className="column-25">
                        <Textfit style={inlineStyle}>
                            Multi line paragraphs at all sizes!
                        </Textfit>
                    </div>
                    <div className="column-25">
                        <Textfit style={inlineStyle}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </Textfit>
                    </div>
                    <div className="column-25">
                        <Textfit style={inlineStyle}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                        </Textfit>
                    </div>
                    <div className="column-25">
                        <Textfit style={inlineStyle}>
                            <strong>Lorem ipsum dolor sit amet</strong>, consetetur sadipscing elitr, <em>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</em>, sed diam voluptua. <b>At vero eos et accusam et justo duo dolores et ea rebum</b>. <br /> Stet clita kasd gubergren, <del>no sea takimata sanctus</del> est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, <small>sed diam nonumy eirmod tempor invidunt ut</small> labore et dolore magna aliquyam erat, sed diam voluptua.
                        </Textfit>
                    </div>
                </div>
                <h2 className="headline">Playground</h2>
                <div className="row">
                    <div className="column-50">
                        <Textfit
                            mode={mode}
                            forceSingleModeWidth={forceSingleModeWidth}
                            style={inlineStyle}
                            max={500}
                            className="box box-fat">
                            {text}
                        </Textfit>
                    </div>
                    <div className="column-50 playground">
                        <textarea rows="8" value={text} onChange={this.handleChangeText}/>
                        <div className="row">
                            <div className="column-50"><strong>Mode</strong></div>
                            <div className="column-50">
                                <select value={mode} onChange={this.handleChangeMode}>
                                    <option value="multi">Multi line</option>
                                    <option value="single">Single line</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column-50">
                                <strong>Force width</strong><br/>
                                <small>(only single mode)</small>
                            </div>
                            <div className="column-50">
                                <label>
                                    <input
                                        disabled={mode === 'multi'}
                                        type="checkbox"
                                        value={true}
                                        checked={forceSingleModeWidth}
                                        onChange={this.handleChangeForceWidth}/>
                                    {' '}
                                    Force width
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
