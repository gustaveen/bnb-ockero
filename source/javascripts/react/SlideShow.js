import React from 'react';
import classNames from 'classnames';


class SlideShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSlide: 0
        };
    }

    _clickHandler(direction) {
        this._moveSlide(direction);
    }

    _moveSlide(direction) {
        let index = this.state.currentSlide + direction;

        if (index < 0) {
            index = this.props.slides.length - 1;
        }

        if (index > this.props.slides.length - 1) {
            index = 0;
        }

        this.setState({
            currentSlide: index
        });

        if (this.props.autoPlay) {
            this._play();
        }
    }

    _nextSlide() {
        this._moveSlide(1);
    }

    _play() {
        clearInterval(this.timer);
        this.timer = setInterval(this._nextSlide.bind(this), this.props.playTiming);
    }

    componentDidMount() {
        if (this.props.slides.length <= 1) {
            return null;
        }

        this._moveSlide(0);
    }

    _renderControls() {
        return (
            <div className="slideshow__controls">
                <SlideShowControl direction={-1} onToggleClick={this._clickHandler.bind(this)}/>
                <SlideShowControl direction={1} onToggleClick={this._clickHandler.bind(this)}/>
            </div>
        );
    }

    render() {
        return (
            <div className="slideshow">
                {this.props.slides.map((slide, i) => {
                    let isActive = this.state.currentSlide === i;
                    return (
                        <Slide key={i} is_active={i === this.state.currentSlide} {...slide}/>
                    );
                })}
                {this.props.slides.length > 1 ? this._renderControls() : null}
            </div>
        )
    }
}

SlideShow.defaultProps = {
    autoPlay: true,
    playTiming: 4500,
    'slides': [
        {
            'src': '../images/allrum.jpg',
            'alt': 'bild 1'
        },
        {
            'src': '../images/wc.jpg',
            'alt': 'bild 2'
        },
        {
            'src': '../images/dusch.jpg',
            'alt': 'bild 3'
        },
        {
            'src': '../images/pentry-1.jpg',
            'alt': 'bild 4'
        },
        {
            'src': '../images/pentry-2.jpg',
            'alt': 'bild 5'
        }
    ]
};

function Slide(props) {
    let image = props.src;
    let backgroundImage = {
        'backgroundImage': `url(${image})`
    };

    let classes = classNames(
        'slideshow__item',
        {'slideshow__item--visible': props.is_active,
        'slideshow__item--hidden': !props.is_active}
    );

    return(
        <div className={classes} style={backgroundImage}>
        </div>
    );
}

Slide.defaultProps = {
    src: 'https://s3-eu-west-1.amazonaws.com/filesstage.olearyssportsbar.com/Screen_Shot_2016-05-18_at_17.10.59.png.640x360_q85_crop-True_upscale-True.png',
    alt: 'bildspel'
}

class SlideShowControl extends React.Component {

    _clickHandler(event) {
        event.preventDefault();
        this.props.onToggleClick(this.props.direction);
    }

    render() {
        let classes = classNames(
            'slideshow__toggle',
            {'slideshow__toggle--next': this.props.direction === 1,
            'slideshow__toggle--prev': this.props.direction === -1}
        );
        return(
            <span
                className={classes}
                onClick={this._clickHandler.bind(this)}
            ></span>
        )
    }
}


export default SlideShow;
