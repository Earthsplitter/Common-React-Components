/**
 * Created by wenming on 07/03/2017.
 */
import React from 'react';

class SlideShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPic: 0,
            arrowHover: false,
            dotHover: -1,
            opacity: 1
        };

        this.arrowHover = this.arrowHover.bind(this);
        this.dotHover = this.dotHover.bind(this);
        this.nextPic = this.nextPic.bind(this);
        this.lastPic = this.lastPic.bind(this);
        this.setPic = this.setPic.bind(this);
        this.resolveAnimationFrame = this.resolveAnimationFrame.bind(this);
    }

    componentWillUpdate() {
        requestAnimationFrame(this.resolveAnimationFrame);
    }

    resolveAnimationFrame() {
        if(this.state.opacity < 1) {
            this.setState((prev) => {
                return {
                    opacity: prev.opacity+0.02
                }
            })
        }
    }

    arrowHover() {
        this.setState((prevState) => {
            return {
                arrowHover: !prevState.arrowHover
            }
        });
    }

    nextPic(e) {
        this.setState((prev) => {
            return {
                currentPic: (prev.currentPic + 1) % this.props.pictures.length,
                opacity: 0
            }
        });
    }

    lastPic() {
        this.setState((prev) => {
            let newCurrent;
            if (prev.currentPic == 0) {
                newCurrent = this.props.pictures.length - 1;
            } else {
                newCurrent = (prev.currentPic - 1) % this.props.pictures.length;
            }
            return {
                currentPic: newCurrent,
                opacity: 0
            }
        })
    }

    setPic(e) {
        this.setState({
            currentPic: Number(e.target.id),
            opacity: 0
        })
    }

    dotHover(e) {
        let id = e.target.id;
        this.setState((prevState) => {
            return {
                dotHover: prevState.dotHover === -1 ? id : -1
            }
        });
    }

    render() {

        let dot = [];
        let length = this.props.pictures.length;
        for (let i = 0; i < length; i++) {
            let number = i + "";
            dot.push(<span onClick={this.setPic} id={i} key={i} onMouseEnter={this.dotHover}
                           onMouseLeave={this.dotHover} style={{
                display: "inline-block",
                backgroundColor: (this.state.currentPic == number || this.state.dotHover === number) ? "#717171" : "#bbb",
                borderRadius: "100%",
                width: "16px",
                height: "16px",
                margin: "5px",
                cursor: this.state.dotHover ? "pointer" : "initial"
            }}/>);
        }
        let currentPic = this.state.currentPic;
        return (
                <div style={{position: "relative", maxWidth: "1000px"}}>
                    <span style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        color: "white",
                        padding: "10px",
                        fontSize: "12px"
                    }}>{(this.state.currentPic + 1) + " / " + this.props.pictures.length}</span>
                    <img style={{opacity:this.state.opacity}} src={this.props.pictures[currentPic]}/>
                    <a onClick={this.lastPic} onMouseEnter={this.arrowHover} onMouseLeave={this.arrowHover} style={{
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        color: "white",
                        fontSize: "24px",
                        padding: "20px",
                        marginTop: "-38px",
                        backgroundColor: this.state.arrowHover ? "rgba(0,0,0,0.8)" : "transparent",
                        cursor: this.state.arrowHover ? "pointer" : "initial"
                    }}>&#10094;</a>
                    <a onClick={this.nextPic} onMouseEnter={this.arrowHover} onMouseLeave={this.arrowHover} style={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        color: "white",
                        fontSize: "24px",
                        padding: "20px",
                        marginTop: "-38px",
                        backgroundColor: this.state.arrowHover ? "rgba(0,0,0,0.8)" : "transparent",
                        cursor: this.state.arrowHover ? "pointer" : "initial"
                    }}>&#10095;</a>
                    <span style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        color: "white",
                        fontSize: "20px",
                        marginTop: "-64px",
                        marginLeft: "-27px"
                    }}>{this.props.captions[this.state.currentPic]}</span>
                    <div style={{textAlign: "center"}}>
                        {dot}
                    </div>
                </div>
        )
    }
}

export default SlideShow