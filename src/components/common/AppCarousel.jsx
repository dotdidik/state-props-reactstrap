import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


class AppCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        activeIndex: 0,
        items : [
            {
              src: 'https://super.mataharimall.com/super11-11/images/sss/Banner-Atas-tanpa-hari-ini-min.jpg',
              altText: 'Beli dong',
              caption: 'Wah ada diskon'
            },
            {
              src: 'https://id.fashion.makestyle.me/images/jual-sepatu-adidas-gazelle-murah-di-jakarta-toko-sport-seperti-toko-jual-sepatu.jpg',
              altText: 'wow',
              caption: 'ada sepatu diskon'
            },
            {
              src: 'https://gerai-kompas-id.azureedge.net/wp-content/uploads/2019/01/Slider-Banner-Diskon-Abadi-01.jpg',
              altText: 'yey',
              caption: 'Kita code challege'
            }
          ]
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.state.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.altText}
        >
          <img style={{width: '100%', height: '600px'}} src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
export default AppCarousel
