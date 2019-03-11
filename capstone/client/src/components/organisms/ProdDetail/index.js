import React, { Component } from 'react'
import { addToCart } from '../../../actions/cart';
import { loadProductById } from '../../../actions/products'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { images } from '../../../utilities/imgimport';
import Carousel from '../Carousel';

class ProdDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      carouselSettings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false
      }
    }
  }
  addToCart(e, item) {
    let { actions } = this.props;
    actions.addToCart(item, 1);

  }
  incQty() {
    let { qty } = this.state;

    this.setState({ 'qty': qty + 1 });
  }
  decQty() {

    let { qty } = this.state;
    let updatedQty = 1;
    if (qty > 1) {
      updatedQty = qty - 1;
    }
    this.setState({ 'qty': updatedQty });
  }
  handleQtyChange(e) {
    let val = e.target.value;
    this.setState({ 'qty': val });
  }
  componentDidMount() {
    // let { qty } = this.state;
    let { actions, pid } = this.props;
    actions.loadProductById(pid);
  }

  renderThumbnails(variants) {
    if (variants) {
      return variants.map((val, idx) => {
        let imgName = val.thumbnail.split('/').pop();
        return (
          <div key={idx} className=" prod-box">
            <img src={images[imgName]} alt={val.name} className="img-responsive" style={{ maxWidth: '100%', cursor: 'pointer' }} />
          </div>
        );
      })
    }
  }
  renderProductSlides(variants) {
    if (variants) {
      return variants[0].images.map((val, idx) => {
        let imgName = val.path.split('/').pop();
        return (
          <div key={idx} className="prod-box">
            <button className="float-right" onClick={(e) => { this.toggleLiked() }}><i className="far fa-heart float-right"></i></button>
            <img src={images[imgName]} alt={val.name} className="img-responsive" style={{ maxWidth: '100%' }} />
          </div>
        );
      })
    }
  }

  render() {
    let { qty, carouselSettings } = this.state;
    let { product } = this.props;
    let slides = this.renderThumbnails(product.variants);
    let productSlides = this.renderProductSlides(product.variants);

    return (
      <div className="row">
        <div className="col-sm-12"><h2>{product.name}</h2></div>
        <div className="col-sm-6 ">
          {productSlides ? <Carousel settingParam={carouselSettings} carouselSlides={productSlides} /> : ''}
          {/* {slides ? <Carousel settingParam={carouselSettings} carouselSlides={slides} /> : ''} */}
        </div >
        <div className="col-sm-6 ">
          <form className="mt-5">
            <div className="row">
              <div className="form-group col">
                <label for="usr">Name:</label>
                <input type="text" className="form-control" id="usr" />
              </div>
              <div className="form-group col">
                <label for="size">Size:</label>
                <select className="form-control " id="size">
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <label for="qty">Qunatity:</label>
                <select className="form-control " id="qty">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">4</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col">
                <button className="btn btn-primary w-100 d-block m-auto" style={{ maxWidth: '300px' }}>Add to cart</button>
              </div>
            </div>
          </form>
        </div>
        <div className="row m-3">
          <h3>Product Description</h3>
          <p className="mt-3">{product.long_desc}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <p className="mt-3">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
      </div >
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
  cart: state.cart,
  product: state.productObj
})

const mapDispatchToProps = dispatch => ({
  // ... normally is an object full of action creators
  actions: bindActionCreators({ addToCart, loadProductById }, dispatch)
})

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connectToStore(ProdDetail);